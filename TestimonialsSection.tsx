"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const TESTIMONIALS = [
  {
    id: 1,
    name: "أمينة بوزيد",
    role: "عميلة من الجزائر",
    avatar: "🙍‍♀️",
    rating: 5,
    comment: "وجدت كهربائي ممتاز في أقل من 30 دقيقة! خدمة احترافية وسعر معقول. المنصة رائعة وسهلة الاستخدام.",
    service: "كهربائي",
    wilaya: "الجزائر",
  },
  {
    id: 2,
    name: "يوسف حمدان",
    role: "عميل من وهران",
    avatar: "👨",
    rating: 5,
    comment: "الحمد لله وجدت سباك متخصص وموثوق. كان محترفاً جداً وأصلح المشكلة في وقت قياسي. شكراً خدماتي!",
    service: "سباك",
    wilaya: "وهران",
  },
  {
    id: 3,
    name: "فاطمة الزهراء",
    role: "عميلة من قسنطينة",
    avatar: "👩",
    rating: 5,
    comment: "استعملت المنصة لطلب خدمة تنظيف المنزل. العامل كان محترماً ونظيفاً وعمله كان ممتازاً. أنصح الجميع!",
    service: "عامل تنظيف",
    wilaya: "قسنطينة",
  },
  {
    id: 4,
    name: "بلال مختار",
    role: "عميل من عنابة",
    avatar: "🧔",
    rating: 4,
    comment: "تجربة رائعة مع فني تركيب كاميرات المراقبة. الخدمة كانت في الوقت المحدد والعمل محترف جداً.",
    service: "فني كاميرات",
    wilaya: "عنابة",
  },
  {
    id: 5,
    name: "سارة بن يوسف",
    role: "عميلة من سطيف",
    avatar: "👱‍♀️",
    rating: 5,
    comment: "المنصة ساعدتني كثيراً في إيجاد نجار لإصلاح باب منزلي. التواصل كان سهلاً والعمل ممتاز!",
    service: "نجار",
    wilaya: "سطيف",
  },
  {
    id: 6,
    name: "عمر شريف",
    role: "حرفي كهربائي",
    avatar: "⚡",
    rating: 5,
    comment: "كحرفي، خدماتي أعطتني فرصة لإيجاد عملاء جدد كل يوم. المنصة سهلة وتساعدني على تنظيم عملي.",
    service: "كهربائي",
    wilaya: "بجاية",
  },
];

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          className={`w-4 h-4 ${s <= rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-300"}`}
        />
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container-rtl">
        <div className="text-center mb-16">
          <div className="section-divider" />
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mt-4 mb-4">
            ماذا يقول عملاؤنا؟
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            آلاف العملاء الراضين يثقون في منصة خدماتي يومياً
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, index) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 border border-gray-100 relative"
            >
              {/* Quote icon */}
              <Quote className="w-8 h-8 text-primary/20 mb-3" />

              {/* Content */}
              <p className="text-gray-700 text-sm leading-relaxed mb-5 font-medium">
                &ldquo;{t.comment}&rdquo;
              </p>

              {/* Rating */}
              <StarRow rating={t.rating} />

              {/* Divider */}
              <div className="border-t border-gray-100 my-4" />

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full flex items-center justify-center text-xl">
                  {t.avatar}
                </div>
                <div>
                  <div className="font-bold text-gray-900 text-sm">{t.name}</div>
                  <div className="text-xs text-gray-500 flex items-center gap-1">
                    <span className="text-secondary">•</span>
                    {t.role} · {t.service}
                  </div>
                </div>
                <div className="mr-auto">
                  <span className="text-xs bg-blue-50 text-primary font-medium px-2 py-0.5 rounded-full">
                    {t.wilaya}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
