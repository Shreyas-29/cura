"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useMediaQuery } from "usehooks-ts";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle
} from "@/components/ui/drawer";

interface Props {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    result: string | null;
}

const HealthPlanModal = ({ isOpen, setIsOpen, result }: Props) => {

    const isDesktop = useMediaQuery("(min-width: 768px)");

    if (isDesktop) {
        return (
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="sm:max-w-lg">
                    <DialogHeader>
                        <DialogTitle>
                            Health Plan
                        </DialogTitle>
                    </DialogHeader>
                    <div className="pt-6">
                        <ReactMarkdown remarkPlugins={[remarkGfm]} className="whitespace-pre-line">
                            {result}
                        </ReactMarkdown>
                    </div>
                    <DialogFooter>
                        <DialogClose>
                            <Button size="sm" variant="black" onClick={() => setIsOpen(false)}>
                                Got it!
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        )
    }

    return (
        <Drawer open={isOpen} onOpenChange={setIsOpen}>
            <DrawerContent>
                <DrawerHeader className="text-left">
                    <DrawerTitle>
                        Health plan
                    </DrawerTitle>
                </DrawerHeader>
                <div className="pt-6 px-4">
                    <ReactMarkdown remarkPlugins={[remarkGfm]} className="whitespace-pre-line">
                        {result}
                    </ReactMarkdown>
                </div>
            </DrawerContent>
        </Drawer>
    )
};

export default HealthPlanModal
