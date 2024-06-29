import React from "react"
import MaxWidthWrapper from "../global/max-width-wrapper";
import AnimationContainer from "../global/animation-container";
import Icons from "../global/icons";
import Link from "next/link";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const Footer = () => {
    return (
        <footer className="w-full relative bottom-0 border-t border-border pt-20 pb-8">
            <MaxWidthWrapper>
                <AnimationContainer>
                    <div className="flex flex-col md:flex-row items-start justify-between w-full">
                        <div className="flex flex-col items-start justify-between w-full max-w-md mr-auto">
                            <div className="flex items-center gap-2 mb-6 md:mb-0">
                                <Icons.logo className="w-8 h-8" />
                            </div>
                            <div className="flex flex-col items-start mt-5">
                                <h2 className="text-lg font-semibold font-heading mb-2">
                                    Join our newsletter
                                </h2>
                                <p className="text-muted-foreground text-sm mb-4 text-center md:text-left">
                                    Sign up to our newsletter to get the latest news and updates.
                                </p>
                                <form className="flex">
                                    <Input
                                        type="email"
                                        placeholder="Enter your email"
                                        className="rounded-l-lg rounded-r-none border focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 h-9"
                                    />
                                    <Button
                                        type="button"
                                        className="rounded-r-lg rounded-l-none hover:shadow-none hover:translate-y-0"
                                    >
                                        Get notified
                                    </Button>
                                </form>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 md:text-left mt-8 gap-20">
                            <div>
                                <h3 className="font-semibold mb-2">
                                    Company
                                </h3>
                                <ul className="text-muted-foreground space-y-2">
                                    <li>
                                        <Link href="#">
                                            About
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="#">
                                            Services
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="#">
                                            Careers
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="#">
                                            Results
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-semibold mb-2">
                                    Legal
                                </h3>
                                <ul className="text-muted-foreground space-y-2">
                                    <li>
                                        <Link href="#">
                                            Help
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="#">
                                            Blog
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="#">
                                            Privacy
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="#">
                                            Terms
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-neutral-200 mt-10 pt-6 flex items-center justify-between w-full">
                        <p className="text-start text-muted-foreground">
                            All rights reserved @{new Date().getFullYear()} Polymath Pods
                        </p>
                        <Button size="sm" variant="outline">
                            Feedback
                        </Button>
                    </div>
                </AnimationContainer>
            </MaxWidthWrapper>
        </footer>
    )
};

export default Footer
