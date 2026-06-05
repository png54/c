"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { SERVICE_CATEGORIES, type ServiceCategory } from "@/types";

const services = Object.entries(SERVICE_CATEGORIES).map(([key, val]) => ({
  key: key as ServiceCategory,
  ...val,
}));

const colorMap: Record<string, { bg: string; text: string; border: string; shadow: string }> = {
  "#F59E0B": { bg: "bg-yellow-50", text: "text-yellow-600", border: "border-yellow-200", shadow: "shadow-yellow-100" },
  "#3B82F6": { bg: "bg-blue-50", text: "text-blue-600", border: "border-blue-200", shadow: "shadow-blue-100" },
  "#92400E": { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200", shadow: "shadow-amber-100" },
  "#EC4899": { bg: "bg-pink-50", text: "text-pink-600", border: "border-pink-200", shadow: "shadow-pink-100" },
  "#6B7280": { bg: "bg-gray-50", text: "text-gray-600", border: "border-gray-200", shadow: "shadow-gray-100" },
  "#8B5CF6": { bg: "bg-violet-50", text: "text-violet-600", border: "border-violet-200", shadow: "shadow-violet-100" },
  "#06B6D4": { bg: "bg-cyan-50", text: "text-cyan-600", border: "border-cyan-200", shadow: "shadow-cyan-100" },
  "#10B981": { bg: "bg-emerald-50", text: "text-emerald-600", border: "border-emerald-200", shadow: "shadow-emerald-100" },
  "#EF4444": { bg: "bg-red-50", text: "text-red-600", border: "border-red-200", shadow: "shadow-red-100" },
  "#2563EB": { bg: "bg-indigo-50", text: "text-indigo-600", border: "border-indigo-200", shadow: "shadow-indigo-100" },
};

export default function ServicesSection() {
  return (
    <section className="py-24 bg-background">
      <div className="container-rtl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="section-divider" />
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mt-4 mb-4">
            خدماتنا المتاحة
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
            نوفر لك طيفاً واسعاً من الخدمات المنزلية والمهنية عبر جميع ولايات الجزائر
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-12">
          {services.map((service, index) => {
            const colors = colorMap[service.color] || {
              bg: "bg-blue-50",
              text: "text-blue-600",
              border: "border-blue-200",
              shadow: "shadow-blue-100",
            };

            return (
              <motion.div
                key={service.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Link
                  href={`/search?category=${service.key}`}
                  className={`service-card group flex flex-col items-center p-4 rounded-2xl border ${colors.border} ${colors.bg} hover:shadow-lg ${colors.shadow} transition-all duration-300`}
                >
                  {/* Icon */}
                  <div
                    className={`w-14 h-14 rounded-2xl ${colors.bg} border ${colors.border} flex items-center justify-center text-3xl mb-3 group-hover:scale-110 transition-transform duration-300`}
                  >
                    {service.icon}
                  </div>

                  {/* Name */}
                  <h3 className={`text-sm font-bold ${colors.text} text-center mb-1`}>
                    {service.label}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-gray-500 text-center leading-relaxed hidden sm:block">
                    {service.description}
                  </p>

                  {/* Arrow */}
                  <div className={`mt-3 w-8 h-8 rounded-full ${colors.bg} border ${colors.border} flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
                    <ArrowLeft className={`w-3.5 h-3.5 ${colors.text}`} />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/services"
            className="btn-outline inline-flex items-center gap-2 text-sm font-semibold"
          >
            عرض جميع الخدمات
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
