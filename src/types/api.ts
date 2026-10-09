export type UserOut = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  is_active: boolean;
  created_at: string;
};

export type UserRegister = {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
};

export type UserLogin = {
  email: string;
  password: string;
};

export type Token = {
  access_token: string;
  token_type?: string;
};

export type DestinationOut = {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  state: string | null;
  country: string;
  cover_image_url: string | null;
  is_active: boolean;
  created_at: string;
};

export type HotelOut = {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  city: string;
  address: string | null;
  star_rating: number | null;
  amenities: string | null;
  cover_image_url: string | null;
  is_active: boolean;
  created_at: string;
};

export type PackageOut = {
  id: number;
  destination_id: number;
  title: string;
  slug: string;
  summary: string | null;
  description: string | null;
  duration_days: number;
  duration_nights: number;
  price: string;
  currency: string;
  cover_image_url: string | null;
  is_active: boolean;
  created_at: string;
};

export type PackageStopOut = {
  id: number;
  name: string;
  description: string | null;
  location_note: string | null;
  sort_order: number;
};

export type PackageDayOut = {
  id: number;
  day_number: number;
  title: string;
  description: string | null;
  stops: PackageStopOut[];
};

export type PackageHotelOut = {
  id: number;
  nights: number;
  notes: string | null;
  sort_order: number;
  hotel: HotelOut;
};

export type PackageMediaOut = {
  id: number;
  url: string;
  alt_text: string | null;
  media_type: string;
  sort_order: number;
};

export type PackageDetailOut = PackageOut & {
  destination: DestinationOut;
  days: PackageDayOut[];
  hotels: PackageHotelOut[];
  media: PackageMediaOut[];
};

export type DestinationCreate = {
  name: string;
  slug?: string | null;
  description?: string | null;
  state?: string | null;
  country?: string;
  cover_image_url?: string | null;
  is_active?: boolean;
};

export type DestinationUpdate = Partial<DestinationCreate>;

export type HotelCreate = {
  name: string;
  city: string;
  slug?: string | null;
  description?: string | null;
  address?: string | null;
  star_rating?: number | null;
  amenities?: string | null;
  cover_image_url?: string | null;
  is_active?: boolean;
};

export type HotelUpdate = Partial<HotelCreate>;

export type PackageStopCreate = {
  name: string;
  description?: string | null;
  location_note?: string | null;
  sort_order?: number;
};

export type PackageDayCreate = {
  day_number: number;
  title: string;
  description?: string | null;
  stops?: PackageStopCreate[];
};

export type PackageHotelLinkCreate = {
  hotel_id: number;
  nights?: number;
  notes?: string | null;
  sort_order?: number;
};

export type PackageMediaCreate = {
  url: string;
  alt_text?: string | null;
  media_type?: string;
  sort_order?: number;
};

export type PackageCreate = {
  destination_id: number;
  title: string;
  duration_days: number;
  duration_nights: number;
  price: number | string;
  slug?: string | null;
  summary?: string | null;
  description?: string | null;
  currency?: string;
  cover_image_url?: string | null;
  is_active?: boolean;
  days?: PackageDayCreate[];
  hotels?: PackageHotelLinkCreate[];
  media?: PackageMediaCreate[];
};

export type PackageUpdate = {
  destination_id?: number | null;
  title?: string | null;
  slug?: string | null;
  summary?: string | null;
  description?: string | null;
  duration_days?: number | null;
  duration_nights?: number | null;
  price?: number | string | null;
  currency?: string | null;
  cover_image_url?: string | null;
  is_active?: boolean | null;
  /** If present (including []), replaces existing nested rows entirely. */
  days?: PackageDayCreate[] | null;
  hotels?: PackageHotelLinkCreate[] | null;
  media?: PackageMediaCreate[] | null;
};

export type CommentAuthorOut = {
  id: number;
  first_name: string;
  last_name: string;
};

export type CommentOut = {
  id: number;
  body: string;
  rating: number | null;
  package_id: number | null;
  hotel_id: number | null;
  created_at: string;
  user: CommentAuthorOut;
};

export type CommentCreate = {
  body: string;
  rating?: number | null;
};

export type UploadFolder = "destinations" | "packages" | "hotels" | "general";

export type UploadOut = {
  url: string;
  public_id: string | null;
  width: number | null;
  height: number | null;
  format: string | null;
  bytes: number | null;
};

export type ApiErrorBody = {
  detail?: string | { msg: string; loc?: (string | number)[] }[];
};
