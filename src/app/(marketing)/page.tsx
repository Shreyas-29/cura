import { AnimationContainer, Icons, MaxWidthWrapper } from "@/components";
import { Button, buttonVariants } from "@/components/ui/button";
import { FEATURES, PLANS } from "@/constants";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib";
import { ArrowRightIcon, CheckIcon } from "lucide-react";
import Link from "next/link";
import React from "react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import Image from "next/image";

const HomePage = () => {

    const baseDelay = 0.2;

    return (
        <>
            {/* hero */}
            <MaxWidthWrapper className="flex flex-col items-center w-full relative">
                <div className="flex flex-col items-center justify-center w-full py-20 text-center">
                    <div className="flex items-center justify-center lg:gap-16 w-full absolute top-[15%] left-1/2 -translate-x-1/2 -z-10">
                        <div className="w-52 h-52 rounded-full bg-orange-500 blur-[10rem] opacity-70 -z-10"></div>
                        <div className="hidden lg:w-52 h-52 rounded-full bg-amber-500 blur-[10rem] opacity-70 -z-10"></div>
                    </div>
                    <h1 className="text-foreground py-6 text-4xl sm:text-6xl md:text-7xl font-semibold md:font-bold !leading-snug tracking-normal text-balance w-full">
                        Your personal <br /> <span className="bg-gradient-to-r from-primary to-amber-500 text-transparent bg-clip-text">health</span> assistant
                    </h1>
                    <p className="text-muted-foreground text-base md:text-lg max-w-xl py-2">
                        Instantly get the right medications for your symptoms with AI-powered recommendations
                    </p>
                    <div className="flex flex-row md:flex-row items-center justify-center gap-4 mt-8 w-full">
                        <Link href="/dashboard" className={buttonVariants()}>
                            Start for free
                            <ArrowRightIcon className="w-4 h-4 ml-1.5" />
                        </Link>
                        <Link href="#" className={buttonVariants({ variant: "black" })}>
                            <Icons.store className="w-4 h-4 mr-1.5" />
                            Get the app
                        </Link>
                    </div>
                </div>
                <div className="relative py-20 bg-transparent w-full mx-auto">
                    <AnimationContainer delay={baseDelay + 0.3} className="flex items-center justify-center">
                        <div className="absolute md:top-[20%] left-1/2 gradient w-3/4 -translate-x-1/2 h-1/4 md:h-1/3 inset-0 blur-[10rem] animate-image-glow"></div>
                        <div className="-m-2 rounded-xl p-2 ring-1 ring-inset ring-foreground/20 lg:-m-4 lg:rounded-2xl bg-opacity-50 backdrop-blur-3xl mx-auto flex items-center justify-center w-max">
                            <Image
                                src="/images/dashboard.png"
                                alt="Dashboard"
                                width={2560}
                                height={1426}
                                quality={100}
                                priority
                                className="rounded-md lg:rounded-xl mx-auto bg-foreground/10 ring-1 ring-border"
                            />
                        </div>
                    </AnimationContainer>
                </div>
            </MaxWidthWrapper>

            {/* features */}
            <MaxWidthWrapper className="py-10">
                <div className="flex flex-col text-start md:text-center justify-center w-full py-8 max-w-md mx-auto">
                    <h2 className="text-3xl md:text-4xl font-semibold font-heading text-foreground mt-6">
                        Features that will <span className="text-gradient">amaze</span> you
                    </h2>
                    <p className="mt-4 text-muted-foreground max-w-lg">
                        Cura is packed with features that will help you get the right medications for your symptoms
                    </p>
                </div>
                <div className="py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-8 md:gap-y-8 md:gap-x-8 w-full">
                    {FEATURES.map((feature) => (
                        <div key={feature.title} className="flex flex-col items-start">
                            <feature.icon className="w-8 h-8 text-primary" />
                            <h3 className="text-lg font-medium font-heading mt-4">
                                {feature.title}
                            </h3>
                            <p className="text-muted-foreground mt-1 text-sm md:text-base">
                                {feature.info}
                            </p>
                        </div>
                    ))}
                </div>
            </MaxWidthWrapper>

            {/* pricing */}
            <MaxWidthWrapper className="py-10">
                <div className="flex flex-col text-start md:text-center justify-center w-full py-8 max-w-md mx-auto">
                    <h2 className="text-3xl md:text-4xl font-semibold font-heading text-foreground mt-6">
                        Choose a <span className="text-gradient">plan</span> that works for you
                    </h2>
                    <p className="mt-4 text-muted-foreground max-w-lg">
                        Get started with our free plan or upgrade to a premium plan for additional features
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 py-8 gap-6 max-w-3xl px-0 lg:px-8 mx-auto w-full">
                    {PLANS.map((plan, index) => (
                        <AnimationContainer key={plan.name} delay={baseDelay + index / 5} className="flex flex-col w-full h-full">
                            <Card className={cn(
                                "w-full h-full flex flex-col rounded-xl border-2 shadow-none",
                                plan.name === "Pro" ? "border-primary" : "border-border"
                            )}>
                                <CardHeader>
                                    <CardTitle className="font-heading">
                                        {plan.name}
                                    </CardTitle>
                                    <CardDescription>
                                        {plan.info}
                                    </CardDescription>
                                    <h5 className="text-3xl md:text-4xl font-semibold font-heading pt-2">
                                        ${plan.price}
                                        <span className="text-sm text-muted-foreground font-normal">
                                            {plan.name === "Pro" ? "(one time)" : ""}
                                        </span>
                                    </h5>
                                </CardHeader>
                                <CardContent className="w-full">
                                    <ul className="flex flex-col items-start gap-4">
                                        {plan.features.map((feature, index) => (
                                            <li key={index} className="flex items-center gap-2">
                                                <CheckIcon
                                                    className={cn(
                                                        "w-5 h-5",
                                                        plan.name === "Pro" ? "text-primary" : "text-foreground"
                                                    )}
                                                />
                                                <TooltipProvider>
                                                    <Tooltip delayDuration={0}>
                                                        <TooltipTrigger asChild>
                                                            <p className={cn(
                                                                "text-sm text-muted-foreground",
                                                                feature.tooltip && "border-b border-dotted border-border cursor-pointer"
                                                            )}>
                                                                {feature.text}
                                                            </p>
                                                        </TooltipTrigger>
                                                        {feature.tooltip && (
                                                            <TooltipContent>
                                                                {feature.tooltip}
                                                            </TooltipContent>
                                                        )}
                                                    </Tooltip>
                                                </TooltipProvider>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                                <CardFooter className="mt-auto w-full">
                                    <Button asChild variant={plan.name === "Pro" ? "default" : "secondary"}>
                                        <Link href={plan.btn.href} className="flex items-center w-full group">
                                            {plan.btn.text}
                                            <ArrowRightIcon className="w-4 h-4 ml-1 group-hover:translate-x-0.5 transition-all" />
                                        </Link>
                                    </Button>
                                </CardFooter>
                            </Card>
                        </AnimationContainer>
                    ))}
                </div>
            </MaxWidthWrapper>

            {/* cta */}
            <MaxWidthWrapper className="py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 max-w-full mx-auto w-full py-8 text-start gap-8">
                    <div className="flex w-full relative">
                        <Image
                            src="/images/mockup-phone.svg"
                            alt="mockup"
                            width={1000}
                            height={1200}
                            quality={100}
                            priority
                            className="mx-auto lg:mr-auto h-[420px] max-w-full sm:max-w-sm"
                        />
                    </div>
                    <div className="flex flex-col items-center justify-center text-center md:items-start md:text-start w-full">
                        <h2 className="text-3xl md:text-4xl font-semibold font-heading text-foreground">
                            Start your journey to better health
                        </h2>
                        <p className="text-muted-foreground max-w-lg mt-4">
                            Tried of feeling sick? Get started with Cura today and get the right medications for your symptoms
                        </p>
                        <Link href="/dashboard" className={buttonVariants({ className: "mt-8" })}>
                            Renew your health
                            <ArrowRightIcon className="w-4 h-4 ml-1.5" />
                        </Link>
                    </div>
                </div>
            </MaxWidthWrapper>
        </>
    )
};

export default HomePage
