import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useTranslation } from "react-i18next";

const WhyChooseUs = () => {
  const { t } = useTranslation();

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  // Translation keys for reasons
  const reasons = ["reason1", "reason2", "reason3", "reason4"];

  return (
    <section className="bg-telDark text-white py-16 px-6">
      <div className="max-w-[1100px] mx-auto">
        {/* Section Heading */}
        <h2
          className="text-3xl md:text-4xl font-bold mb-12"
          data-aos="fade-up"
        >
          {t("whyChooseUs.sectionTitle")}
        </h2>

        {/* Grid of Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {reasons.map((key, i) => (
            <div
              key={key}
              className="border border-gray-600 rounded-lg p-6 bg-black/30 hover:shadow-lg transition"
              data-aos="fade-up"
              data-aos-delay={i * 150}
            >
              <h3 className="text-xl font-bold text-telRed mb-4">
                {t(`whyChooseUs.${key}.title`)}
              </h3>
              <p className="text-gray-200 leading-relaxed">
                {t(`whyChooseUs.${key}.desc`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
