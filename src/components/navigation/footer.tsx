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
                                        required
                                        type="email"
                                        placeholder="Enter your email"
                                        className="rounded-l-lg rounded-r-none border focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 h-9"
                                    />
                                    <Button
                                        type="submit"
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
                                <ul className="text-muted-foreground text-sm space-y-2">
                                    <li>
                                        <Link href="#" className="hover:text-foreground">
                                            About
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="#" className="hover:text-foreground">
                                            Services
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="#" className="hover:text-foreground">
                                            Careers
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="#" className="hover:text-foreground">
                                            Results
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-semibold mb-2">
                                    Legal
                                </h3>
                                <ul className="text-muted-foreground text-sm space-y-2">
                                    <li>
                                        <Link href="#" className="hover:text-foreground">
                                            Help
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="#" className="hover:text-foreground">
                                            Blog
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="#" className="hover:text-foreground">
                                            Privacy
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="#" className="hover:text-foreground">
                                            Terms
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-neutral-200 mt-10 pt-6 flex items-center justify-between w-full">
                        <p className="text-start text-muted-foreground text-sm">
                            All rights reserved @{new Date().getFullYear()} Cura
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
