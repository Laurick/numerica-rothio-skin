import { useState } from "react";
import StatsIcon from "../icons/StatsIcon";
import CloseIcon from "../icons/CloseIcon";
import { twMerge } from "tailwind-merge";
import StatsMenuContent from "./StatsMenuContent";

export default function StatsMenu() {
    const [open, setOpen] = useState(false);

    const toggleOpen = () => setOpen((prev) => !prev);

    return (
        <>
            <button
                className="absolute bottom-0 left-0 border-2 border-primary p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-4lg outline-none"
                onClick={toggleOpen}
            >
                <StatsIcon />
            </button>
            <div
                className={twMerge(
                    "fixed bottom-0 right-0 bg-primary-dark w-screen h-screen z-20 transition-transform duration-200 flex justify-center items-center font-black",
                    open
                        ? "translate-y-0 pointer-events-auto"
                        : "translate-y-full pointer-events-none"
                )}
            >
                <button
                    className="absolute top-2 right-2 border-2 border-primary text-primary p-2 rounded-lg"
                    onClick={toggleOpen}
                >
                    <CloseIcon />
                </button>
                <StatsMenuContent />
            </div>
        </>
    );
}