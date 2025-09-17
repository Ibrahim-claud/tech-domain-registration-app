import { useTranslation } from "react-i18next";
const ContactHero = () => {
  const { t } = useTranslation();
  return (
    <section className="bg-white py-16 px-6">
      {/*=========== Title ==========*/}
      <h2 className="text-3xl md:text-4xl font-bold text-center text-telRed mb-6">
        {t("contact_heading")}
      </h2>

      {/*========== Description ==========*/}
      {/* -----}
      <p className="max-w-3xl mx-auto text-center text-gray-800 text-base md:text-lg leading-relaxed">
        quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid 
        ex ea commodi consequatur. quis nostrum exercitationem ullam corporis suscipit 
        laboriosam, nisi ut aliquid ex ea commodi consequatur. quis nostrum exercitationem 
        ullam corporis suscipit laboriosam
      </p>
      ----*/}
    </section>
  );
};

export default ContactHero;
