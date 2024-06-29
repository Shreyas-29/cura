import { Loader } from "@/components";
import React from "react"

const Loading = () => {
    return (
        <div className="flex items-center justify-center h-screen z-[999]">
            <Loader />
        </div>
    )
};

export default Loading
