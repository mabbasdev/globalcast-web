import { cn } from "@/lib/utils";

function Skeleton({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn("animate-pulse rounded-lg bg-slate-800/60 backdrop-blur-sm", className)}
            {...props}
        />
    );
}

export { Skeleton };