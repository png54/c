"use client";

import { Shield, CheckCircle, Award, HeadphonesIcon, Lock, Clock } from "lucide-react";

const BADGES = [
  { icon: Shield, title: "بيانات محمية", desc: "تشفير كامل لبياناتك الشخصية", color: "text-blue-600", bg: "bg-blue-50" },
  { icon: CheckCircle, title: "حرفيون موثقون", desc: "كل حرفي يمر بمراجعة هويته", color: "text-green-600", bg: "bg-green-50" },
  { icon: Award, title: "ضمان الجودة", desc: "نضمن جودة الخدمة أو استرداد الأموال", color: "text-amber-600", bg: "bg-amber-50" },
  { icon: HeadphonesIcon, title: "دعم 24/7", desc: "فريق الدعم متاح في أي وقت", color: "text-violet-600", bg: "bg-violet-50" },
  { icon: Lock, title: "معاملات آمنة", desc: "دفع آمن ومحمي تماماً", color: "text-rose-600", bg: "bg-rose-50" },
  { icon: Clock, title: "خدمة سريعة", desc: "ردود في أقل من ساعة", color: "text-cyan-600", bg: "bg-cyan-50" },
];

export function TrustBadgesSection() {
  return (
    <section className="py-16 bg-white border-y border-gray-100">
      <div className="container-rtl">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-black text-gray-900 mb-2">لماذا تثق بنا؟</h2>
          <p className="text-gray-500">نضع ثقتك وأمانك في أولويتنا</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {BADGES.map((badge) => {
            const Icon = badge.icon;
            return (
              <div key={badge.title} className={`${badge.bg} rounded-2xl p-4 text-center`}>
                <Icon className={`w-8 h-8 ${badge.color} mx-auto mb-3`} />
                <h3 className="font-bold text-gray-900 text-sm mb-1">{badge.title}</h3>
                <p className="text-xs text-gray-500 leading-snug">{badge.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default function AppDownloadSection() {
  return (
    <section className="py-24 bg-gradient-to-br from-gray-900 to-primary relative overflow-hidden">
      <div className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="container-rtl relative">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-2 mb-8 text-white text-sm font-medium">
            📱 قريباً على المتاجر
          </div>

          <h2 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight">
            تطبيق خدماتي
            <span className="block text-secondary mt-2">في يدك أينما كنت</span>
          </h2>

          <p className="text-white/70 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            قريباً — تطبيق خدماتي على Android و iOS ليمنحك تجربة أسرع وأسهل للوصول إلى الحرفيين في أي مكان
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="flex items-center gap-3 bg-white text-gray-900 rounded-2xl px-6 py-3.5 font-semibold hover:bg-gray-100 transition-colors w-full sm:w-auto justify-center opacity-70 cursor-not-allowed">
              <span className="text-2xl">🍎</span>
              <div className="text-right">
                <div className="text-xs text-gray-500">قريباً على</div>
                <div className="text-sm font-black">App Store</div>
              </div>
            </button>
            <button className="flex items-center gap-3 bg-white text-gray-900 rounded-2xl px-6 py-3.5 font-semibold hover:bg-gray-100 transition-colors w-full sm:w-auto justify-center opacity-70 cursor-not-allowed">
              <span className="text-2xl">🤖</span>
              <div className="text-right">
                <div className="text-xs text-gray-500">قريباً على</div>
                <div className="text-sm font-black">Google Play</div>
              </div>
            </button>
          </div>

          <p className="text-white/40 text-xs mt-6">
            سنُعلمك فور إطلاق التطبيق — سجّل بريدك الإلكتروني للحصول على إشعار مبكر
          </p>

          <div className="flex items-center gap-2 max-w-sm mx-auto mt-4">
            <input
              type="email"
              placeholder="بريدك الإلكتروني"
              className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 text-white placeholder-white/40 text-sm focus:outline-none focus:border-white/50 text-right"
              dir="rtl"
            />
            <button className="bg-secondary text-white rounded-xl px-5 py-2.5 text-sm font-semibold hover:bg-emerald-600 transition-colors whitespace-nowrap">
              أبلغني
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
