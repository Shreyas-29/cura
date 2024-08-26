"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp";
import { toast } from "sonner";
import { ArrowLeftIcon, EyeIcon, EyeOffIcon, LoaderIcon } from "lucide-react";
import { useSignIn, useSignUp } from "@clerk/nextjs";
import { Icons } from "@/components";

const SignUpPage = () => {

    const router = useRouter();

    const { isLoaded, signUp, setActive } = useSignUp();

    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [code, setCode] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [isVerified, setIsVerified] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isVerifying, setIsVerifying] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!isLoaded) return;

        if (!name || !email || !password) {
            toast.error("Please fill in all fields");
            return;
        }

        setIsLoading(true);

        try {
            await signUp.create({
                emailAddress: email,
                password,
                firstName: name.split(" ")[0],
                lastName: name.split(" ")[1] || "",
            });

            await signUp.prepareEmailAddressVerification({
                strategy: "email_code",
            });

            setIsVerified(true);
        } catch (error: any) {
            console.log(JSON.stringify(error, null, 2));

            switch (error.errors[0]?.code) {
                case "form_identifier_exists":
                    toast.error("This email is already registered. Please sign in.");
                    break;
                case "form_password_pwned":
                    toast.error("The password is too common. Please choose a stronger password.");
                    break;
                case "form_param_format_invalid":
                    toast.error("Invalid email address. Please enter a valid email address.");
                    break;
                case "form_password_length_too_short":
                    toast.error("Password is too short. Please choose a longer password.");
                    break;
                default:
                    toast.error("An error occurred. Please try again");
                    break;
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!isLoaded) return;

        if (!code) {
            toast.error("Please enter the verification code");
            return;
        }

        setIsVerifying(true);

        try {
            const completeSignUp = await signUp.attemptEmailAddressVerification({
                code,
            });

            if (completeSignUp.status === "complete") {
                await setActive({ session: completeSignUp.createdSessionId });
                router.push("/auth/auth-callback");
            } else {
                console.error(JSON.stringify(completeSignUp, null, 2));
                toast.error("Invalid verification code. Please try again.");
            }
        } catch (error) {
            console.error("Error:", JSON.stringify(error, null, 2));
            toast.error("An error occurred. Please try again");
        } finally {
            setIsVerifying(false);
        }
    };

    return isVerified ? (
        <div className="flex flex-col items-center justify-center h-screen gap-y-6">

            <div className="flex flex-col text-center gap-1">
                <Link href="/">
                    <Icons.logo className="w-12 h-12 mx-auto" />
                </Link>
                <h1 className="text-2xl font-bold font-heading mt-2">
                    Please check your email
                </h1>
                <p className="text-muted-foreground">
                    We&apos;ve sent a verification code to {email}
                </p>
            </div>

            <form onSubmit={handleVerify} className="w-full max-w-xs">
                <div className="space-y-2 flex flex-col items-center justify-center">
                    <Label htmlFor="name">
                        Verfication Code
                    </Label>
                    <InputOTP
                        maxLength={6}
                        value={code}
                        disabled={isVerifying}
                        onChange={(e) => setCode(e)}
                        className="pt-2"
                    >
                        <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                        </InputOTPGroup>
                    </InputOTP>
                </div>
                <div className="mt-6">
                    <Button
                        size="default"
                        type="submit"
                        disabled={isVerifying}
                        className="w-full"
                    >
                        {isVerifying ? (
                            <LoaderIcon className="w-4 h-4 animate-spin" />
                        ) : "Verify Code"}
                    </Button>
                </div>
            </form>

        </div>
    ) : (
        <div className="flex flex-col items-center justify-center h-screen gap-y-6">

            <div className="flex flex-col text-center gap-1">
                <Link href="/">
                    <Icons.logo className="w-12 h-12 mx-auto" />
                </Link>
                <h1 className="text-2xl font-bold font-heading mt-2">
                    Sign Up
                </h1>
                <p className="text-muted-foreground">
                    Create an account to start using cura
                </p>
            </div>

            <form onSubmit={handleSubmit} className="w-full max-w-xs">
                <div className="space-y-1">
                    <Label htmlFor="name">
                        Full Name
                    </Label>
                    <Input
                        id="name"
                        type="text"
                        placeholder="Enter your name"
                        value={name}
                        disabled={isLoading}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="mt-4 space-y-1">
                    <Label htmlFor="email">
                        Email address
                    </Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email address"
                        value={email}
                        disabled={isLoading}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mt-4 space-y-1">
                    <Label htmlFor="password">
                        Password
                    </Label>
                    <div className="relative w-full">
                        <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            value={password}
                            disabled={isLoading}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button
                            type="button"
                            size="icon"
                            variant="ghost"
                            disabled={isLoading}
                            className="absolute top-1 right-1 hover:translate-y-0"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ?
                                <EyeOffIcon className="w-4 h-4" /> :
                                <EyeIcon className="w-4 h-4" />
                            }
                        </Button>
                    </div>
                </div>
                <div className="mt-6">
                    <Button
                        type="submit"
                        size="default"
                        disabled={isLoading}
                        className="w-full"
                    >
                        {isLoading ? (
                            <LoaderIcon className="w-4 h-4 animate-spin" />
                        ) : "Continue"}
                    </Button>
                </div>
            </form>

            <div className="flex mt-2">
                <p className="text-sm text-muted-foreground text-center w-full">
                    Been here before? <Link href="/auth/signin" className="text-foreground font-medium">Sign In</Link>
                </p>
            </div>
        </div>
    );
};

export default SignUpPage
