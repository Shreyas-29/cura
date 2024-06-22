"use client";

import { cn } from "@/lib";
import { motion } from "framer-motion";

export interface AnimationContainerProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    reverse?: boolean;
};

const AnimationContainer = ({ children, className, delay = 0.2, reverse }: AnimationContainerProps) => {
    return (
        <motion.div
            className={cn("w-full h-full", className)}
            initial={{ opacity: 0, y: reverse ? -20 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: delay, duration: 0.4, ease: "easeInOut", }}
        >
            {children}
        </motion.div>
    )
};

export default AnimationContainer
