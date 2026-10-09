"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { ImageUploadField } from "@/features/admin/ImageUploadField";
import { ApiError } from "@/lib/api";
import { emptyToNull, optionalNumber } from "@/lib/form";
import { createHotel, updateHotel } from "@/services/hotels";
import { useAuthStore } from "@/stores/auth";
import type { HotelOut } from "@/types/api";

type Props = {
  mode: "create" | "edit";
  initial?: HotelOut;
};

export function HotelForm({ mode, initial }: Props) {
  const router = useRouter();
  const token = useAuthStore((s) => s.token);
  const [name, setName] = useState(initial?.name ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [city, setCity] = useState(initial?.city ?? "");
  const [address, setAddress] = useState(initial?.address ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [starRating, setStarRating] = useState(
    initial?.star_rating != null ? String(initial.star_rating) : "",
  );
  const [amenities, setAmenities] = useState(initial?.amenities ?? "");
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
      city: city.trim(),
      slug: emptyToNull(slug),
      address: emptyToNull(address),
      description: emptyToNull(description),
      star_rating: optionalNumber(starRating),
      amenities: emptyToNull(amenities),
      cover_image_url: emptyToNull(coverImageUrl),
      is_active: isActive,
    };

    try {
      if (mode === "create") {
        await createHotel(payload, token);
      } else if (initial) {
        await updateHotel(initial.id, payload, token);
      }
      router.push("/admin/hotels");
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
      <div className="grid gap-4 sm:grid-cols-2">
        <Input label="City" name="city" required value={city} onChange={(e) => setCity(e.target.value)} />
        <Input
          label="Star rating (1–5)"
          name="star_rating"
          type="number"
          min={1}
          max={5}
          value={starRating}
          onChange={(e) => setStarRating(e.target.value)}
        />
      </div>
      <Input label="Slug (optional)" name="slug" value={slug} onChange={(e) => setSlug(e.target.value)} />
      <Input label="Address" name="address" value={address} onChange={(e) => setAddress(e.target.value)} />
      <Textarea
        label="Description"
        name="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Textarea
        label="Amenities"
        name="amenities"
        value={amenities}
        onChange={(e) => setAmenities(e.target.value)}
        placeholder="Pool, WiFi, Breakfast…"
      />
      <ImageUploadField
        label="Cover image"
        folder="hotels"
        value={coverImageUrl}
        onChange={setCoverImageUrl}
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
          {pending ? "Saving…" : mode === "create" ? "Create hotel" : "Save changes"}
        </Button>
        <Button type="button" variant="outline" className="!text-white !ring-white/20" onClick={() => router.back()}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
