import Link from "next/link";
import Image from "next/image";
import { Star, MapPin, CheckCircle, Briefcase, ArrowLeft } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { SERVICE_CATEGORIES } from "@/types";

// Fallback mock data for when database is empty
const MOCK_ARTISANS = [
  { id: "1", full_name: "محمد أمين بلعيد", category: "electrician", wilaya: "الجزائر", municipality: "بابا حسن", average_rating: 4.9, review_count: 87, total_jobs: 234, is_verified: true, hourly_rate: 1500, years_experience: 12 },
  { id: "2", full_name: "كريم مسعودي", category: "plumber", wilaya: "وهران", municipality: "السانية", average_rating: 4.8, review_count: 64, total_jobs: 178, is_verified: true, hourly_rate: 1200, years_experience: 8 },
  { id: "3", full_name: "وليد بن عمار", category: "ac_repair", wilaya: "قسنطينة", municipality: "الخروب", average_rating: 4.9, review_count: 102, total_jobs: 312, is_verified: true, hourly_rate: 2000, years_experience: 15 },
  { id: "4", full_name: "فيصل رابحي", category: "carpenter", wilaya: "الجزائر", municipality: "بئر مراد رايس", average_rating: 4.7, review_count: 45, total_jobs: 134, is_verified: true, hourly_rate: 1800, years_experience: 10 },
  { id: "5", full_name: "عبد الرحمان زيتوني", category: "painter", wilaya: "بجاية", municipality: "بجاية", average_rating: 4.8, review_count: 73, total_jobs: 205, is_verified: true, hourly_rate: 900, years_experience: 7 },
  { id: "6", full_name: "سامي بوزيان", category: "network_technician", wilaya: "سطيف", municipality: "سطيف", average_rating: 4.6, review_count: 38, total_jobs: 89, is_verified: true, hourly_rate: 1600, years_experience: 5 },
];

function StarRating({ rating, size = "sm" }: { rating: number; size?: "sm" | "md" }) {
  const starSize = size === "sm" ? "w-3.5 h-3.5" : "w-4 h-4";
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`${starSize} ${
            star <= Math.floor(rating)
              ? "fill-yellow-400 text-yellow-400"
              : star - 0.5 <= rating
              ? "fill-yellow-200 text-yellow-400"
              : "fill-gray-200 text-gray-300"
          }`}
        />
      ))}
    </div>
  );
}

interface ArtisanData {
  id: string;
  full_name: string;
  category: string;
  wilaya: string;
  municipality: string;
  average_rating: number;
  review_count: number;
  total_jobs: number;
  is_verified: boolean;
  hourly_rate: number;
  years_experience: number;
  avatar_url?: string;
}

function ArtisanCard({ artisan }: { artisan: ArtisanData }) {
  const categoryInfo =
    SERVICE_CATEGORIES[artisan.category as keyof typeof SERVICE_CATEGORIES];

  return (
    <div className="artisan-card group cursor-pointer">
      {/* Cover gradient */}
      <div className="h-20 bg-gradient-to-br from-primary/80 to-secondary/80 relative">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: "20px 20px",
          }}
        />
      </div>

      <div className="px-5 pb-5">
        {/* Avatar */}
        <div className="relative -mt-10 mb-3 flex items-end justify-between">
          <div className="w-20 h-20 rounded-2xl overflow-hidden border-4 border-white shadow-lg bg-gray-100 flex items-center justify-center">
            {artisan.avatar_url ? (
              <Image
                src={artisan.avatar_url}
                alt={artisan.full_name}
                width={80}
                height={80}
                className="object-cover w-full h-full"
              />
            ) : (
              <span className="text-3xl">
                {categoryInfo?.icon || "👷"}
              </span>
            )}
          </div>
          {artisan.is_verified && (
            <div className="badge-trusted mb-2">
              <CheckCircle className="w-3 h-3" />
              موثوق
            </div>
          )}
        </div>

        {/* Info */}
        <div className="mb-3">
          <h3 className="font-bold text-gray-900 text-base group-hover:text-primary transition-colors">
            {artisan.full_name}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-lg">{categoryInfo?.icon}</span>
            <span className="text-sm text-gray-600 font-medium">
              {categoryInfo?.label}
            </span>
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <StarRating rating={artisan.average_rating} />
          <span className="text-sm font-bold text-gray-800">
            {artisan.average_rating.toFixed(1)}
          </span>
          <span className="text-xs text-gray-500">
            ({artisan.review_count} تقييم)
          </span>
        </div>

        {/* Meta */}
        <div className="space-y-1.5 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin className="w-3.5 h-3.5 text-primary flex-shrink-0" />
            <span>
              {artisan.municipality}، {artisan.wilaya}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Briefcase className="w-3.5 h-3.5 text-secondary flex-shrink-0" />
            <span>
              {artisan.total_jobs} مهمة منجزة · {artisan.years_experience} سنوات خبرة
            </span>
          </div>
        </div>

        {/* Price + CTA */}
        <div className="flex items-center justify-between gap-3">
          <div>
            {artisan.hourly_rate ? (
              <div className="text-xs text-gray-500">
                من
                <span className="text-primary font-bold text-base mx-1">
                  {artisan.hourly_rate.toLocaleString("ar-DZ")}
                </span>
                دج/ساعة
              </div>
            ) : null}
          </div>
          <Link
            href={`/artisan/${artisan.id}`}
            className="btn-primary text-sm py-2 px-4 rounded-xl font-semibold"
          >
            طلب الخدمة
          </Link>
        </div>
      </div>
    </div>
  );
}

export default async function TopArtisansSection() {
  let artisans: ArtisanData[] = [];

  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("artisans")
      .select(
        `
        id,
        category,
        wilaya,
        municipality,
        hourly_rate,
        years_experience,
        is_verified,
        total_jobs,
        average_rating,
        review_count,
        users!artisans_user_id_fkey (
          full_name,
          avatar_url
        )
      `
      )
      .eq("is_verified", true)
      .eq("is_available", true)
      .order("average_rating", { ascending: false })
      .limit(6);

    if (data && data.length > 0) {
      artisans = data.map((a: any) => ({
        id: a.id,
        full_name: a.users?.full_name || "حرفي",
        avatar_url: a.users?.avatar_url,
        category: a.category,
        wilaya: a.wilaya,
        municipality: a.municipality,
        average_rating: a.average_rating || 0,
        review_count: a.review_count || 0,
        total_jobs: a.total_jobs || 0,
        is_verified: a.is_verified,
        hourly_rate: a.hourly_rate,
        years_experience: a.years_experience || 0,
      }));
    } else {
      artisans = MOCK_ARTISANS;
    }
  } catch {
    artisans = MOCK_ARTISANS;
  }

  return (
    <section className="py-24 bg-white">
      <div className="container-rtl">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="section-divider mb-4" style={{ margin: "0 0 1rem" }} />
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">
              أفضل الحرفيين
            </h2>
            <p className="text-gray-600 text-lg">
              حرفيون موثوقون ومُقيَّمون من قِبل آلاف العملاء
            </p>
          </div>
          <Link
            href="/search"
            className="btn-outline flex items-center gap-2 text-sm font-semibold whitespace-nowrap"
          >
            عرض الكل
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {artisans.map((artisan) => (
            <ArtisanCard key={artisan.id} artisan={artisan} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">هل أنت حرفي محترف؟</p>
          <Link href="/auth/register?role=artisan" className="btn-secondary">
            انضم إلى منصة خدماتي
          </Link>
        </div>
      </div>
    </section>
  );
}
