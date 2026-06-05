"use client";

import { motion } from "framer-motion";
import { Search, UserCheck, MessageCircle, Star } from "lucide-react";

const STEPS = [
  {
    step: "01",
    icon: Search,
    title: "ابحث عن خدمة",
    description: "حدد نوع الخدمة وولايتك، وستظهر لك قائمة الحرفيين المتاحين في منطقتك",
    color: "from-blue-500 to-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-100",
  },
  {
    step: "02",
    icon: UserCheck,
    title: "اختر الحرفي",
    description: "تصفح ملفات الحرفيين وتقييماتهم وأعمالهم السابقة، ثم اختر من يناسبك",
    color: "from-emerald-500 to-emerald-600",
    bg: "bg-emerald-50",
    border: "border-emerald-100",
  },
  {
    step: "03",
    icon: MessageCircle,
    title: "أرسل طلبك",
    description: "أرسل طلب الخدمة مع وصف المشكلة وصور توضيحية وتحديد موعد مناسب",
    color: "from-violet-500 to-violet-600",
    bg: "bg-violet-50",
    border: "border-violet-100",
  },
  {
    step: "04",
    icon: Star,
    title: "قيّم الخدمة",
    description: "بعد إنهاء العمل، قيّم الحرفي وشاركنا تجربتك لمساعدة الآخرين",
    color: "from-amber-500 to-amber-600",
    bg: "bg-amber-50",
    border: "border-amber-100",
  },
];

export default function HowItWorksSection() {
  return (
    <section className="py-24 bg-white">
      <div className="container-rtl">
        <div className="text-center mb-16">
          <div className="section-divider" />
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mt-4 mb-4">
            كيف تعمل المنصة؟
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            أربع خطوات بسيطة تفصلك عن الحصول على خدمة احترافية وموثوقة
          </p>
        </div>

        <div className="relative">
          {/* Connector line (desktop) */}
          <div className="hidden lg:block absolute top-20 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-emerald-500 to-amber-500 opacity-30 z-0" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {STEPS.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className={`relative ${step.bg} border ${step.border} rounded-2xl p-6 text-center group hover:shadow-lg transition-all duration-300`}
                >
                  {/* Step number */}
                  <div className="absolute -top-4 -right-2 w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center text-xs font-black">
                    {step.step}
                  </div>

                  {/* Icon */}
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
