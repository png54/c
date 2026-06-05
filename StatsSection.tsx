"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const STATS = [
  { value: 5000, suffix: "+", label: "حرفي مسجل", icon: "👷", color: "text-primary" },
  { value: 48, suffix: "", label: "ولاية مغطاة", icon: "🗺️", color: "text-secondary" },
  { value: 15000, suffix: "+", label: "عميل سعيد", icon: "😊", color: "text-accent" },
  { value: 98, suffix: "%", label: "نسبة الرضا", icon: "⭐", color: "text-primary" },
  { value: 45000, suffix: "+", label: "خدمة مُنجزة", icon: "✅", color: "text-secondary" },
  { value: 4.8, suffix: "★", label: "متوسط التقييم", icon: "🏆", color: "text-accent" },
];

function CountUp({ target, suffix, duration = 2000 }: { target: number; suffix: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!inView) return;
    const isDecimal = target % 1 !== 0;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(isDecimal ? parseFloat(current.toFixed(1)) : Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, target, duration]);

  return (
    <span ref={ref}>
      {target % 1 !== 0 ? count.toFixed(1) : count.toLocaleString("ar-DZ")}
      {suffix}
    </span>
  );
}

export default function StatsSection() {
  return (
    <section className="py-24 bg-gradient-to-br from-primary to-blue-700 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: "30px 30px",
        }}
      />

      <div className="container-rtl relative">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            أرقام تتحدث عنّا
          </h2>
          <p className="text-white/70 text-lg">
            ثقة الآلاف في منصة خدماتي لقضاء حاجياتهم
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {STATS.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-5 text-center hover:bg-white/20 transition-all duration-300"
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-3xl font-black text-white mb-1">
                <CountUp target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-white/70 text-xs font-medium leading-tight">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
