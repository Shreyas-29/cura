import { AnimationContainer, MaxWidthWrapper } from "@/components";
import { Button, buttonVariants } from "@/components/ui/button";
import { FEATURES, PLANS } from "@/constants";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib";
import { ArrowRightIcon, CheckIcon } from "lucide-react";
import Link from "next/link";
import React from 'react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const HomePage = () => {

    const baseDelay = 0.2;

    return (
        <>
            {/* hero */}
            <MaxWidthWrapper>
                <div className="flex flex-col items-center justify-center w-full py-20 text-center">
                    <h1 className="text-foreground py-6 text-5xl font-semibold md:font-semibold leading-none tracking-normal text-balance sm:text-6xl md:text-7xl lg:text-8xl w-full font-heading">
                        Your personal health assistant
                    </h1>
                    <p className="text-muted-foreground text-base md:text-lg max-w-xl py-2">
                        Instantly get the right medications for your symptoms with AI-powered recommendations
                    </p>
                    <Link href="/" className={buttonVariants({ className: "mt-8" })}>
                        Get cured
                        <ArrowRightIcon className="w-4 h-4 ml-1.5" />
                    </Link>
                </div>
            </MaxWidthWrapper>

            {/* features */}
            <MaxWidthWrapper className="py-10">
                <div className="py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-8 md:gap-y-8 md:gap-x-8 w-full">
                    {FEATURES.map((feature) => (
                        <div className="flex flex-col items-start">
                            <feature.icon className="w-8 h-8 text-primary" />
                            <h3 className="text-lg font-medium mt-4">
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
                <div className="flex flex-col text-start md:text-center text-start md:text-center justify-center w-full py-8 max-w-md mx-auto">
                    <h2 className="text-3xl md:text-4xl font-semibold font-heading text-foreground mt-6">
                        Choose a <span className="text-gradient">plan</span> that works for you
                    </h2>
                    <p className="mt-4 text-muted-foreground max-w-lg">
                        Get started with our free plan or upgrade to a premium plan for additional features
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 w-full py-8 gap-6 max-w-3xl px-0 lg:px-8 mx-auto w-full">
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
                                        <span className="text-base text-muted-foreground font-normal">
                                            /month
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
                                                        plan.name === "Pro" ? "text-primary" : "text-primary"
                                                    )}
                                                />
                                                <TooltipProvider>
                                                    <Tooltip delayDuration={0}>
                                                        <TooltipTrigger asChild>
                                                            <p className={cn(
                                                                "text-muted-foreground",
                                                                feature.tooltip && "border-b border-dotted border-border cursor-pointer"
                                                            )}>
                                                                {feature.text}
                                                            </p>
                                                        </TooltipTrigger>
                                                        <TooltipContent>
                                                            {feature.tooltip}
                                                        </TooltipContent>
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
                <div className="flex flex-col items-center justify-center max-w-lg mx-auto w-full py-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-semibold font-heading text-foreground">
                        Start your journey to better health
                    </h2>
                    <p className="text-muted-foreground max-w-lg mt-4">
                        Tried of feeling sick? Get started with Cura today and get the right medications for your symptoms
                    </p>
                    <Link href="/" className={buttonVariants({ className: "mt-8" })}>
                        Renew your health
                        <ArrowRightIcon className="w-4 h-4 ml-1.5" />
                    </Link>
                </div>
            </MaxWidthWrapper>
        </>
    )
};

export default HomePage
