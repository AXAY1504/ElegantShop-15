import * as React from "react";
import { X } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "./utils";

const alertVariants = cva(
  "relative w-full rounded-lg border px-4 py-3 text-sm transition-all duration-300 ease-in-out flex items-start gap-3",
  {
    variants: {
      variant: {
        default: "bg-card text-card-foreground border-border",
        destructive:
          "bg-red-50 text-red-700 border-red-200",
        success:
          "bg-green-50 text-green-700 border-green-200",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface AlertProps
  extends React.ComponentProps<"div">,
    VariantProps<typeof alertVariants> {
  duration?: number; // milliseconds
  showClose?: boolean;
}

function Alert({
  className,
  variant,
  duration = 2000, // 🔥 2 seconds default
  showClose = true,
  children,
  ...props
}: AlertProps) {
  const [visible, setVisible] = React.useState(true);
  const [fadeOut, setFadeOut] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        setVisible(false);
      }, 30); // match fade duration
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  if (!visible) return null;

  return (
    <div
      role="alert"
      className={cn(
        alertVariants({ variant }),
        fadeOut ? "opacity-0 translate-y-1" : "opacity-100 translate-y-0",
        className
      )}
      {...props}
    >
      <div className="flex-1">{children}</div>

      {showClose && (
        <button
          onClick={() => setVisible(false)}
          className="opacity-60 hover:opacity-100 transition"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}

function AlertTitle({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("font-semibold text-sm", className)}
      {...props}
    />
  );
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("text-sm opacity-90", className)}
      {...props}
    />
  );
}

export { Alert, AlertTitle, AlertDescription };