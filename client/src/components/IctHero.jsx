import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const IctHero = () => {
  const { t } = useTranslation();

  return (
    <section className="bg-[#F0F0F0]">
      <div className="max-w-[1200px] mx-auto px-4 py-12">
        {/* Title */}
        <motion.h2
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-telRed mb-6"
        >
          {t("ictHero.title")}
        </motion.h2>

        {/* Subtitle */}
        <motion.h3
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-xl md:text-2xl font-semibold text-black leading-relaxed mb-6"
        >
          {t("ictHero.subtitle")}
        </motion.h3>

        {/* Paragraph */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          viewport={{ once: true }}
          className="text-base md:text-lg text-gray-800 leading-relaxed"
        >
          {t("ictHero.paragraph")}
        </motion.p>
      </div>
    </section>
  );
};

export default IctHero;
