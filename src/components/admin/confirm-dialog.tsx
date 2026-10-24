"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ConfirmDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  tone?: "default" | "destructive";
  className?: string;
};

function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel = "Confirmar",
  cancelLabel = "Cancelar",
  onConfirm,
  tone = "default",
  className,
}: ConfirmDialogProps) {
  const dialogRef = React.useRef<HTMLDialogElement>(null);

  React.useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  const handleCancel = () => onOpenChange(false);

  return (
    <dialog
      ref={dialogRef}
      onCancel={handleCancel}
      onClose={() => onOpenChange(false)}
      aria-labelledby="confirm-dialog-title"
      className={cn(
        "m-auto w-[min(26rem,calc(100vw-2rem))] rounded-2xl border border-border bg-card p-0 text-foreground shadow-card backdrop:bg-night-950/50",
        className,
      )}
    >
      <div className="p-6">
        <h2 id="confirm-dialog-title" className="font-display text-xl font-medium">
          {title}
        </h2>
        {description ? (
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {description}
          </p>
        ) : null}

        <div className="mt-7 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <Button type="button" variant="outline" onClick={handleCancel}>
            {cancelLabel}
          </Button>
          <Button
            type="button"
            variant={tone === "destructive" ? "primary" : "accent"}
            onClick={() => {
              onConfirm();
              onOpenChange(false);
            }}
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </dialog>
  );
}

export { ConfirmDialog };
export type { ConfirmDialogProps };
