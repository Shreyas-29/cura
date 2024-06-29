import React from "react"

const Loader = () => {
    return (
        <div className="flex items-center justify-center h-screen w-full absolute inset-0 z-[999] bg-background">
            <div className="flex items-center justify-center w-full -ml-10">
                <svg
                    className="container"
                    x="0px"
                    y="0px"
                    viewBox="0 0 50 31.25"
                    height="31.25"
                    width="50"
                    preserveAspectRatio="xMidYMid meet"
                >
                    <path
                        className="track"
                        strokeWidth="2"
                        fill="none"
                        pathLength="100"
                        d="M0.625 21.5 h10.25 l3.75 -5.875 l7.375 15 l9.75 -30 l7.375 20.875 v0 h10.25"
                    />
                    <path
                        className="car"
                        strokeWidth="2"
                        fill="none"
                        pathLength="100"
                        d="M0.625 21.5 h10.25 l3.75 -5.875 l7.375 15 l9.75 -30 l7.375 20.875 v0 h10.25"
                    />
                </svg>
            </div>
        </div>
    )
};

export default Loader
