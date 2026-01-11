import React from "react";

const LimitModal = ({
  open,
  onClose,
  title = "Trial mode",
  description = "You can generate up to 3 roadmaps for free. After that, you’ll need to login or create an account to generate more and unlock saved roadmaps.",
  trialUsed = 0,
  trialLimit = 3,
  primaryLabel = "Login",
  secondaryLabel = "Create account",
  onPrimary,
  onSecondary,
}) => {
  if (!open) return null;

  const remaining = Math.max(0, trialLimit - trialUsed);
  const isLocked = trialUsed >= trialLimit;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-md rounded-2xl border bg-white/80 p-6 text-zinc-900 shadow-xl backdrop-blur">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
            <p className="mt-1 text-sm text-zinc-600">{description}</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-md px-2 py-1 text-sm text-zinc-600 hover:bg-zinc-100"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        <div className="mt-5 rounded-xl border bg-white/70 p-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-zinc-600">Free generations</span>
            <span className="font-medium">
              {Math.min(trialUsed, trialLimit)}/{trialLimit}
            </span>
          </div>
          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-zinc-200">
            <div
              className="h-full rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600"
              style={{
                width: `${Math.min(100, (trialUsed / trialLimit) * 100)}%`,
              }}
            />
          </div>
          <div className="mt-2 text-xs text-zinc-600">
            {isLocked ? (
              <span className="font-medium text-zinc-900">
                Trial limit reached — login/signup to continue.
              </span>
            ) : (
              <span>
                {remaining} free roadmap{remaining === 1 ? "" : "s"} remaining.
              </span>
            )}
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-end">
          <button
            onClick={onPrimary}
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
          >
            {primaryLabel}
          </button>
          <button
            onClick={onSecondary}
            className="inline-flex h-10 items-center justify-center rounded-md border bg-white px-4 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            {secondaryLabel}
          </button>
        </div>

        {!isLocked && (
          <p className="mt-3 text-xs text-zinc-500">
            You can still explore in trial mode — saved roadmaps are disabled
            until you login.
          </p>
        )}
      </div>
    </div>
  );
};

export default LimitModal;