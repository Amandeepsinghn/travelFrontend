"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { ApiError } from "@/lib/api";
import { emptyToNull } from "@/lib/form";
import { createPackage, updatePackage } from "@/services/packages";
import { useAuthStore } from "@/stores/auth";
import type {
  DestinationOut,
  HotelOut,
  PackageCreate,
  PackageDayCreate,
  PackageDetailOut,
  PackageHotelLinkCreate,
  PackageMediaCreate,
} from "@/types/api";

type Props = {
  mode: "create" | "edit";
  destinations: DestinationOut[];
  hotels: HotelOut[];
  initial?: PackageDetailOut;
};

type DayDraft = {
  day_number: string;
  title: string;
  description: string;
  stopName: string;
};

export function PackageForm({ mode, destinations, hotels, initial }: Props) {
  const router = useRouter();
  const token = useAuthStore((s) => s.token);

  const [destinationId, setDestinationId] = useState(
    initial ? String(initial.destination_id) : destinations[0] ? String(destinations[0].id) : "",
  );
  const [title, setTitle] = useState(initial?.title ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [summary, setSummary] = useState(initial?.summary ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [durationDays, setDurationDays] = useState(String(initial?.duration_days ?? 3));
  const [durationNights, setDurationNights] = useState(String(initial?.duration_nights ?? 2));
  const [price, setPrice] = useState(initial?.price ?? "");
  const [currency, setCurrency] = useState(initial?.currency ?? "INR");
  const [coverImageUrl, setCoverImageUrl] = useState(initial?.cover_image_url ?? "");
  const [isActive, setIsActive] = useState(initial?.is_active ?? true);
  const [days, setDays] = useState<DayDraft[]>(
    initial?.days?.length
      ? initial.days.map((day) => ({
          day_number: String(day.day_number),
          title: day.title,
          description: day.description ?? "",
          stopName: day.stops?.[0]?.name ?? "",
        }))
      : [{ day_number: "1", title: "Arrival", description: "", stopName: "" }],
  );
  const [hotelId, setHotelId] = useState(
    initial?.hotels?.[0]?.hotel.id ? String(initial.hotels[0].hotel.id) : "",
  );
  const [hotelNights, setHotelNights] = useState(
    initial?.hotels?.[0]?.nights != null ? String(initial.hotels[0].nights) : "1",
  );
  const [mediaUrl, setMediaUrl] = useState(initial?.media?.[0]?.url ?? "");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const destinationOptions = useMemo(
    () => destinations.map((d) => ({ value: d.id, label: d.name })),
    [destinations],
  );
  const hotelOptions = useMemo(
    () => hotels.map((h) => ({ value: h.id, label: `${h.name} · ${h.city}` })),
    [hotels],
  );

  function updateDay(index: number, patch: Partial<DayDraft>) {
    setDays((prev) => prev.map((day, i) => (i === index ? { ...day, ...patch } : day)));
  }

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!token) {
      setError("Not authenticated");
      return;
    }

    setPending(true);
    setError(null);

    try {
      if (mode === "edit" && initial) {
        await updatePackage(
          initial.id,
          {
            destination_id: Number(destinationId),
            title: title.trim(),
            slug: emptyToNull(slug),
            summary: emptyToNull(summary),
            description: emptyToNull(description),
            duration_days: Number(durationDays),
            duration_nights: Number(durationNights),
            price,
            currency: currency.trim() || "INR",
            cover_image_url: emptyToNull(coverImageUrl),
            is_active: isActive,
          },
          token,
        );
      } else {
        const dayPayload: PackageDayCreate[] = days
          .filter((day) => day.title.trim())
          .map((day) => ({
            day_number: Number(day.day_number) || 1,
            title: day.title.trim(),
            description: emptyToNull(day.description),
            stops: day.stopName.trim()
              ? [{ name: day.stopName.trim(), sort_order: 1 }]
              : [],
          }));

        const hotelPayload: PackageHotelLinkCreate[] = hotelId
          ? [
              {
                hotel_id: Number(hotelId),
                nights: Number(hotelNights) || 1,
                sort_order: 0,
              },
            ]
          : [];

        const mediaPayload: PackageMediaCreate[] = mediaUrl.trim()
          ? [{ url: mediaUrl.trim(), media_type: "image", sort_order: 0 }]
          : [];

        const payload: PackageCreate = {
          destination_id: Number(destinationId),
          title: title.trim(),
          slug: emptyToNull(slug),
          summary: emptyToNull(summary),
          description: emptyToNull(description),
          duration_days: Number(durationDays),
          duration_nights: Number(durationNights),
          price,
          currency: currency.trim() || "INR",
          cover_image_url: emptyToNull(coverImageUrl),
          is_active: isActive,
          days: dayPayload,
          hotels: hotelPayload,
          media: mediaPayload,
        };

        await createPackage(payload, token);
      }

      router.push("/admin/packages");
      router.refresh();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Save failed");
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="admin-panel mx-auto max-w-3xl space-y-5">
      <Select
        label="Destination"
        name="destination_id"
        required
        options={destinationOptions}
        value={destinationId}
        onChange={(e) => setDestinationId(e.target.value)}
        placeholder="Select destination"
      />
      <Input label="Title" name="title" required value={title} onChange={(e) => setTitle(e.target.value)} />
      <Input label="Slug (optional)" name="slug" value={slug} onChange={(e) => setSlug(e.target.value)} />
      <Input label="Summary" name="summary" value={summary} onChange={(e) => setSummary(e.target.value)} />
      <Textarea
        label="Description"
        name="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <div className="grid gap-4 sm:grid-cols-3">
        <Input
          label="Days"
          name="duration_days"
          type="number"
          min={1}
          required
          value={durationDays}
          onChange={(e) => setDurationDays(e.target.value)}
        />
        <Input
          label="Nights"
          name="duration_nights"
          type="number"
          min={0}
          required
          value={durationNights}
          onChange={(e) => setDurationNights(e.target.value)}
        />
        <Input
          label="Price"
          name="price"
          required
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="14999"
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Input label="Currency" name="currency" value={currency} onChange={(e) => setCurrency(e.target.value)} />
        <Input
          label="Cover image URL"
          name="cover_image_url"
          value={coverImageUrl}
          onChange={(e) => setCoverImageUrl(e.target.value)}
        />
      </div>
      <Checkbox
        label="Active"
        name="is_active"
        checked={isActive}
        onChange={(e) => setIsActive(e.target.checked)}
      />

      {mode === "create" ? (
        <>
          <div className="space-y-3 border-t border-white/10 pt-5">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-lg font-semibold text-white">Itinerary days</h2>
              <Button
                type="button"
                variant="outline"
                className="!text-white !ring-white/20"
                onClick={() =>
                  setDays((prev) => [
                    ...prev,
                    {
                      day_number: String(prev.length + 1),
                      title: "",
                      description: "",
                      stopName: "",
                    },
                  ])
                }
              >
                Add day
              </Button>
            </div>
            {days.map((day, index) => (
              <div key={index} className="grid gap-3 rounded-2xl border border-white/10 bg-white/4 p-4 sm:grid-cols-2">
                <Input
                  label="Day #"
                  name={`day_number_${index}`}
                  type="number"
                  min={1}
                  value={day.day_number}
                  onChange={(e) => updateDay(index, { day_number: e.target.value })}
                />
                <Input
                  label="Title"
                  name={`day_title_${index}`}
                  value={day.title}
                  onChange={(e) => updateDay(index, { title: e.target.value })}
                />
                <Input
                  label="First stop (optional)"
                  name={`day_stop_${index}`}
                  value={day.stopName}
                  onChange={(e) => updateDay(index, { stopName: e.target.value })}
                />
                <Textarea
                  label="Description"
                  name={`day_description_${index}`}
                  className="min-h-20"
                  value={day.description}
                  onChange={(e) => updateDay(index, { description: e.target.value })}
                />
              </div>
            ))}
          </div>

          <div className="grid gap-4 border-t border-white/10 pt-5 sm:grid-cols-2">
            <Select
              label="Linked hotel (optional)"
              name="hotel_id"
              options={hotelOptions}
              value={hotelId}
              onChange={(e) => setHotelId(e.target.value)}
              placeholder="No hotel"
            />
            <Input
              label="Hotel nights"
              name="hotel_nights"
              type="number"
              min={1}
              value={hotelNights}
              onChange={(e) => setHotelNights(e.target.value)}
            />
            <Input
              label="Media image URL (optional)"
              name="media_url"
              className="sm:col-span-2"
              value={mediaUrl}
              onChange={(e) => setMediaUrl(e.target.value)}
            />
          </div>
          <p className="text-xs text-white/45">
            Days, hotel links, and media can only be set on create — edit updates package fields only.
          </p>
        </>
      ) : (
        <p className="text-xs text-white/45">
          Editing updates top-level package fields. Itinerary / hotel links need a new create for now.
        </p>
      )}

      {error ? <p className="text-sm text-red-300">{error}</p> : null}
      <div className="flex gap-3 pt-2">
        <Button type="submit" disabled={pending || !destinationId}>
          {pending ? "Saving…" : mode === "create" ? "Create package" : "Save changes"}
        </Button>
        <Button type="button" variant="outline" className="!text-white !ring-white/20" onClick={() => router.back()}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
