import { useState } from "react";
import { Link } from "react-router-dom";
import { Check } from "lucide-react"; // for the check icon
const Banner = "src/assets/images/website-banner.jpg";
import { useTranslation } from "react-i18next";

const Hero = () => {
  const { t } = useTranslation();

  // State for domain search
  const [domain, setDomain] = useState("");
  const [searchedDomain, setSearchedDomain] = useState("");

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (domain.trim() !== "") {
      // Save searched domain (e.g. add ".co.za" if you want default extension)
      setSearchedDomain(`${domain}.co.za`);
    }
  };

  return (
    <>
      <section
        className="w-full h-[400px] flex items-center justify-center text-center bg-cover bg-center"
        style={{ backgroundImage: `url(${Banner})` }}
      >
        <div className="max-w-[1200px] mx-auto px-4">
          {/*========== Heading ==========*/}
          <h1 className="text-white text-xl sm:text-2xl md:text-3xl font-medium mb-6 md:mb-8">
            {t("register_domain_title")}
          </h1>

          {/*========== Search Bar ==========*/}
          <form className="w-full max-w-[950px] mx-auto" onSubmit={handleSubmit}>
            <div
              className="
                flex flex-col sm:flex-row
                rounded-lg overflow-hidden shadow-lg
              "
            >
              {/*========== WWW block ==========*/}
              <span className="bg-gray-200 text-gray-800 font-semibold px-5 sm:px-6 py-3 flex items-center justify-center sm:justify-start">
                {t("www")}
              </span>

              {/*========== Input ==========*/}
              <input
                type="text"
                aria-label="Search domain name"
                placeholder={t("find_your_new_domain_name_here")}
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                className="
                  flex-1 min-w-0
                  px-2 py-3
                  bg-white text-gray-800 placeholder-gray-400
                  focus:outline-none
                "
              />

              {/*========== Button ==========*/}
              <button
                type="submit"
                className="
                  bg-telRed hover:bg-red-700 text-white
                  px-6 sm:px-8 py-3
                  shrink-0
                "
              >
                {t("search")}
              </button>
            </div>
          </form>
        </div>
      </section>

      {/*========== Show result only if a domain was searched ==========*/}
      {searchedDomain && (
        <div className="flex items-center justify-between max-w-2xl mx-auto bg-white border border-green-500 rounded-md shadow-sm px-4 py-3 my-16">
          {/*=== Left side - check icon + text ===*/}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 flex items-center justify-center bg-green-600 rounded-full">
              <Check className="text-white w-5 h-5" />
            </div>
            <p className="text-lg">
              <span className="font-bold">{searchedDomain}</span>{" "}
              <span className="text-gray-700">{t("domain_available")}</span>
            </p>
          </div>

          {/*=== Right side - button ===*/}
          <Link to="/" className="bg-black text-white px-5 py-2 rounded-md hover:bg-gray-800 transition">
            {t("domain_button")}
          </Link>
        </div>
      )}
    </>
  );
};

export default Hero;
