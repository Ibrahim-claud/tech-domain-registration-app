import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Footer from "../components/Footer";

const PageNotFound = () => {
  const { t } = useTranslation();

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-[40vh] bg-white text-center px-4 py-12">
        {/* 404 text */}
        <h1 className="text-[8rem] md:text-[12rem] font-bold text-telRed leading-none">
          {t("404")}
        </h1>

        {/* Ooops! message */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-lg md:text-xl mt-2"
        >
          <span className="text-telRed font-semibold">Ooops!</span> {t("404_description")}
        </motion.p>

        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="mt-4"
        >
          <Link
            to="/"
            className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
          >
            {t("404_suggestion")}
          </Link>
        </motion.div>
      </div>
      <Footer />
    </>
  );
};

export default PageNotFound;
