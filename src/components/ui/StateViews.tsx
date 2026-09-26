import React from "react";
import { AlertCircle, WifiOff, Inbox, RotateCw, Database } from "lucide-react";
import { Button } from "./Button";

export interface EmptyStateProps {
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
}

export function EmptyStateView({
  title,
  description,
  actionText,
  onAction,
  icon,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center rounded-xl bg-slate-50 border border-dashed border-slate-300">
      <div className="w-12 h-12 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-500 mb-3 shadow-xs">
        {icon || <Inbox className="w-6 h-6 text-slate-400" aria-hidden="true" />}
      </div>
      <h4 className="text-sm font-semibold text-slate-800 mb-1">{title}</h4>
      <p className="text-xs text-slate-500 max-w-sm mb-4 leading-relaxed">{description}</p>
      {actionText && onAction && (
        <Button size="sm" variant="outline" onClick={onAction}>
          {actionText}
        </Button>
      )}
    </div>
  );
}

export interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
}

export function ErrorStateView({
  title = "Service Temporarily Unavailable",
  message,
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="p-5 rounded-xl bg-red-50/60 border border-red-200 text-slate-900">
      <div className="flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 shrink-0" aria-hidden="true" />
        <div className="flex-1">
          <h4 className="text-sm font-semibold text-red-900">{title}</h4>
          <p className="text-xs text-red-700 mt-1 leading-relaxed">{message}</p>
          {onRetry && (
            <div className="mt-3">
              <Button size="sm" variant="outline" className="border-red-300 text-red-800 hover:bg-red-100" onClick={onRetry}>
                <RotateCw className="w-3.5 h-3.5 mr-1.5" />
                Retry Request
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export interface OfflineStateProps {
  providerName: string;
  reason?: string;
  onRetry?: () => void;
}

export function OfflineStateView({
  providerName,
  reason = "The external data provider is unreachable or disconnected.",
  onRetry,
}: OfflineStateProps) {
  return (
    <div className="p-5 rounded-xl bg-amber-50/70 border border-amber-200">
      <div className="flex items-start gap-3">
        <WifiOff className="w-5 h-5 text-amber-700 mt-0.5 shrink-0" aria-hidden="true" />
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-semibold text-amber-900">{providerName} Feed Offline</h4>
            <span className="text-[10px] font-semibold uppercase tracking-wider bg-amber-200/80 text-amber-900 px-2 py-0.5 rounded">
              Degraded Mode
            </span>
          </div>
          <p className="text-xs text-amber-800 mt-1 leading-relaxed">
            {reason} KrishiNova operates in degraded resilience mode and never displays simulated placeholders.
          </p>
          {onRetry && (
            <div className="mt-3">
              <Button size="sm" variant="outline" className="border-amber-300 text-amber-900 hover:bg-amber-100" onClick={onRetry}>
                <RotateCw className="w-3.5 h-3.5 mr-1.5" />
                Check Feed Status
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
