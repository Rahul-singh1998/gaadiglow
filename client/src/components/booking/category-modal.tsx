
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { useEffect } from "react";

interface CategoryModalProps {
    open: boolean;
    onClose: () => void;
}

const CATEGORIES = [
    {
        title: "HATCHBACK",
        description: "Compact cars with quick and easy cleaning",
        effort: "Low",
        examples: ["i10", "Alto", "WagonR", "Polo", "i20"],
    },
    {
        title: "SEDAN & MINI SUVs",
        description: "Mid-size cars requiring balanced cleaning effort",
        effort: "Moderate",
        examples: ["Nexon", "Tiago", "Magnite", "Dezire", "Swift", "Punch", "Ford Ecco Sport"],
    },
    {
        title: "STANDARD SUVs",
        description: "Larger vehicles with more surface to cover",
        effort: "High",
        examples: ["Creta", "Venue", "XUV 300", "Thar 3 Door", "Breeza", "Seltos"],
    },
    {
        title: "LARGE SUVs",
        description: "Full-size SUVs needing extensive cleaning time",
        effort: "Maximum",
        examples: ["Fortuner", "Endeavour", "Scorpio", "Hector", "Safari", "Ertiga", "XUV 700"],
    },
];

export default function CategoryModal({ open, onClose }: CategoryModalProps) {
    // Close on ESC
    useEffect(() => {
        if (!open) return;
        const handler = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [open, onClose]);

    // Prevent scroll when modal open
    useEffect(() => {
        if (open) document.body.style.overflow = "hidden";
        else document.body.style.overflow = "";
        return () => { document.body.style.overflow = ""; };
    }, [open]);

    return createPortal(
        <AnimatePresence>
            {open && (
                <motion.div
                    className="fixed inset-0 z-[9999] flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    {/* Backdrop */}
                    <motion.div
                        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />
                    {/* Modal */}
                    <motion.div
                        className="relative z-10 w-full max-w-md mx-4 bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl flex flex-col max-h-[85vh]"
                        initial={{ scale: 0.96, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1, transition: { type: 'spring', stiffness: 320, damping: 28 } }}
                        exit={{ scale: 0.96, opacity: 0 }}
                        role="dialog"
                        aria-modal="true"
                        tabIndex={-1}
                    >
                        {/* Close button */}
                        <button
                            className="absolute top-3 right-3 p-2 rounded-full bg-muted/40 hover:bg-muted/70 text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                            onClick={onClose}
                            aria-label="Close"
                            tabIndex={0}
                        >
                            <X className="w-5 h-5" />
                        </button>
                        {/* Fixed header — never scrolls */}
                        <div className="px-6 md:px-8 pt-6 md:pt-8 pb-3 shrink-0">
                            <h2 className="text-xl font-bold mb-1 text-center">Find Your Car Category</h2>
                            <div className="text-sm text-muted-foreground text-center">
                                Choose the closest match based on size and effort
                            </div>
                        </div>

                        {/* Scrollable area */}
                        <div className="flex flex-col gap-4 overflow-y-auto px-6 md:px-8 pb-6 md:pb-8">
                            {CATEGORIES.map((cat, idx) => (
                                <motion.div
                                    key={cat.title}
                                    whileHover={{ scale: 1.015, boxShadow: "0 4px 24px 0 rgba(80,80,120,0.08)" }}
                                    className="rounded-xl p-4 border border-border/30 bg-muted/30 transition-all duration-200 group"
                                >
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="font-semibold text-base text-foreground">{cat.title}</span>
                                        <span className="text-xs font-medium px-2 py-0.5 rounded bg-primary/10 text-primary">
                                            Effort: {cat.effort}
                                        </span>
                                    </div>
                                    <div className="text-sm text-muted-foreground mb-1">{cat.description}</div>
                                    <div className="text-xs text-muted-foreground">
                                        <span className="font-medium">Examples:</span> {cat.examples.join(", ")}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>,
        document.body
    );
}
