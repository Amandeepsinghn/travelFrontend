"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ApiError } from "@/lib/api";
import { deleteDestination } from "@/services/destinations";
import { deleteHotel } from "@/services/hotels";
import { deletePackage } from "@/services/packages";
import { useAuthStore } from "@/stores/auth";

type Resource = "destination" | "package" | "hotel";

type Props = {
  resource: Resource;
  id: number;
  label: string;
};

const confirmCopy: Record<Resource, (label: string) => string> = {
  destination: (label) =>
    `Delete "${label}"? Its packages will also be deactivated.`,
  package: (label) => `Delete package "${label}"?`,
  hotel: (label) => `Delete hotel "${label}"?`,
};

export function AdminDeleteButton({ resource, id, label }: Props) {
  const router = useRouter();
  const token = useAuthStore((s) => s.token);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onDelete() {
    if (!token) {
      setError("Not authenticated");
      return;
    }
    if (!window.confirm(confirmCopy[resource](label))) return;

    setPending(true);
    setError(null);
    try {
      if (resource === "destination") {
        await deleteDestination(id, token);
      } else if (resource === "package") {
        await deletePackage(id, token);
      } else {
        await deleteHotel(id, token);
      }
      router.refresh();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Delete failed");
    } finally {
      setPending(false);
    }
  }

  return (
    <span className="inline-flex flex-col items-end gap-1">
      <button
        type="button"
        onClick={() => void onDelete()}
        disabled={pending}
        className="text-sm font-semibold text-red-300 hover:text-red-200 disabled:opacity-50"
      >
        {pending ? "Deleting…" : "Delete"}
      </button>
      {error ? <span className="max-w-[12rem] text-right text-xs text-red-300">{error}</span> : null}
    </span>
  );
}
