"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { ApiError } from "@/lib/api";
import { emptyToNull } from "@/lib/form";
import { createDestination, updateDestination } from "@/services/destinations";
import { useAuthStore } from "@/stores/auth";
import type { DestinationOut } from "@/types/api";

type Props = {
  mode: "create" | "edit";
  initial?: DestinationOut;
};

export function DestinationForm({ mode, initial }: Props) {
  const router = useRouter();
  const token = useAuthStore((s) => s.token);
  const [name, setName] = useState(initial?.name ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [state, setState] = useState(initial?.state ?? "");
  const [country, setCountry] = useState(initial?.country ?? "India");
  const [coverImageUrl, setCoverImageUrl] = useState(initial?.cover_image_url ?? "");
  const [isActive, setIsActive] = useState(initial?.is_active ?? true);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!token) {
      setError("Not authenticated");
      return;
    }

    setPending(true);
    setError(null);

    const payload = {
      name: name.trim(),
      slug: emptyToNull(slug),
      description: emptyToNull(description),
      state: emptyToNull(state),
      country: country.trim() || "India",
      cover_image_url: emptyToNull(coverImageUrl),
      is_active: isActive,
    };

    try {
      if (mode === "create") {
        await createDestination(payload, token);
      } else if (initial) {
        await updateDestination(initial.id, payload, token);
      }
      router.push("/admin/destinations");
      router.refresh();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Save failed");
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="admin-panel mx-auto max-w-2xl space-y-4">
      <Input label="Name" name="name" required value={name} onChange={(e) => setName(e.target.value)} />
      <Input
        label="Slug (optional)"
        name="slug"
        value={slug}
        onChange={(e) => setSlug(e.target.value)}
        placeholder="auto-generated if empty"
      />
      <Textarea
        label="Description"
        name="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <Input label="State" name="state" value={state} onChange={(e) => setState(e.target.value)} />
        <Input label="Country" name="country" value={country} onChange={(e) => setCountry(e.target.value)} />
      </div>
      <Input
        label="Cover image URL"
        name="cover_image_url"
        value={coverImageUrl}
        onChange={(e) => setCoverImageUrl(e.target.value)}
      />
      <Checkbox
        label="Active"
        name="is_active"
        checked={isActive}
        onChange={(e) => setIsActive(e.target.checked)}
      />
      {error ? <p className="text-sm text-red-300">{error}</p> : null}
      <div className="flex gap-3 pt-2">
        <Button type="submit" disabled={pending}>
          {pending ? "Saving…" : mode === "create" ? "Create destination" : "Save changes"}
        </Button>
        <Button type="button" variant="outline" className="!text-white !ring-white/20" onClick={() => router.back()}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
