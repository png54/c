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

export default function TrustBadgesSection() {
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
