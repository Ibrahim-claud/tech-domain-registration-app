import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const AboutHero = () => {
  const { t } = useTranslation();

  return (
    <>
     <section className="bg-[#F0F0F0] py-16 px-6">
      <div className="max-w-4xl mx-auto text-center">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-red-600 mb-6"
        >
          {t("about_heading")}
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-lg text-gray-800 leading-relaxed"
        >
          {t("about_content")}
        </motion.p>
      </div>
    </section>
    </>
  )
}

export default AboutHero