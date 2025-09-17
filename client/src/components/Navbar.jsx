import { useState } from "react"
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const { i18n } = useTranslation();
    const { t } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-[1200px] mx-auto px-4 flex justify-between items-center h-18">

        {/*=== Logo ===*/}
        <div className="text-2xl font-bold text-telRed">
          <NavLink to="/"><h1 className="w-32">TELETECH</h1></NavLink>
        </div>

        {/*=================== Desktop Menu ====================*/}
        <ul className="hidden md:flex space-x-6 items-center font-medium text-gray-700">

          {/*===== Domain Link =====*/}
          <li>
            <NavLink to="/" className="hover:text-red-600 transition">
              {t("nav_domain")} 
            </NavLink>
          </li>

          {/*===== Hosting Links =====*/}
          <li className="relative group">
            <NavLink className="hover:text-acetelRed transition cursor-pointer inline-flex items-center">
              {t("nav_hosting")} <span className="ml-1 text-telRed">▼</span>
            </NavLink>
            {/*===== Hosting Dropdown =====*/}
            <ul
              className="
                absolute left-0 top-full mt-2 w-48 bg-white shadow-lg rounded-md border border-gray-100
                z-50
                opacity-0 invisible
                group-hover:opacity-100 group-hover:visible
                transition-all duration-200 ease-out
              "
            >
              <Link to="/"><li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">{t("nav_web")}</li></Link>
              <Link to="/"><li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">{t("nav_vps")}</li></Link>
            </ul>
          </li>

          {/*===== Services Links =====*/}
          <li className="relative group">
            <button className="hover:text-acetelRed transition cursor-pointer inline-flex items-center">
              {t("nav_services")} <span className="ml-1 text-telRed">▼</span>
            </button>
            {/*===== Services Dropdown =====*/}
            <ul
              className="
                absolute right-0 top-full mt-2 w-48 bg-white shadow-lg rounded-md border border-gray-100
                z-50
                opacity-0 invisible
                group-hover:opacity-100 group-hover:visible
                transition-all duration-200 ease-out
              "
            >
 
              <Link to="/ict"><li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">{t("nav_ict")}</li></Link>
              <Link to="/isp"><li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">{t("nav_isp")}</li></Link>
              <Link to="/disaster-recovery"><li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">{t("nav_disaster_recovery")}</li></Link>
              <Link to="/"><li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">{t("nav_voip")}</li></Link>
            </ul>
          </li>

         {/*===== Help Link =====*/}
          <li className="relative group">
            <button className="hover:text-acetelRed transition cursor-pointer inline-flex items-center">
              {t("nav_help")} <span className="ml-1 text-telRed">▼</span>
            </button>
            {/*=== Help Dropdown ===*/}
            <ul
              className="
                absolute right-0 top-full mt-2 w-40 bg-white shadow-lg rounded-md border border-gray-100
                z-50
                opacity-0 invisible
                group-hover:opacity-100 group-hover:visible
                transition-all duration-200 ease-out
              "
            >
              <Link to="/tickets"><li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">{t("nav_ticket")}</li></Link>
              <Link to="/contact-us"><li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">{t("nav_contact")}</li></Link>
              <Link to="/about-us"><li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">{t("nav_about")}</li></Link>
            </ul>
          </li>


           {/*===== Language Link =====*/}
           <li className="relative group">
      <button className="text-sm text-white transition cursor-pointer inline-flex items-center bg-telRed py-2 px-3 rounded">
        Eng <span className="ml-1 text-white">▼</span>
      </button>
      {/*=== Language Dropdown ===*/}
      <ul
        className="
          absolute right-0 top-full mt-2 w-40 bg-white shadow-lg rounded-md border border-gray-100
          z-50
          opacity-0 invisible
          group-hover:opacity-100 group-hover:visible
          transition-all duration-200 ease-out
        "
      >
        <li onClick={() => changeLanguage("en")} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
          English
        </li>
        <li onClick={() => changeLanguage("zh")} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
          中文
        </li>
      </ul>
    </li>

        </ul>

        {/*===========================================================================*/}
        {/*============================= Mobile Menu Toggle ==========================*/}
        <div className="md:hidden">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>
      </div>

      {/*======= Mobile Menu =======*/}
      {isMobileMenuOpen && (
        <ul className="md:hidden bg-white shadow-md px-4 pb-4 space-y-4 font-medium text-gray-700">

          {/*===== Mobile Menu - Domain Link =====*/}
          <li>
            <NavLink to="/" className="block">
              {t("nav_domain")}
            </NavLink>
          </li>

          {/*===== Mobile Hosting Dropdown =====*/}
          <li>
            <details>
              <summary className="cursor-pointer">{t("nav_hosting")}</summary>
              <ul className="ml-4 mt-2 space-y-2">
                <Link to="/"><li className="hover:text-telRed cursor-pointer">{t("nav_web")}</li></Link>
                <Link to="/"><li className="hover:text-telRed cursor-pointer">{t("nav_vps")}</li></Link>
              </ul>
            </details>
          </li>

          {/*===== Mobile Services Dropdown =====*/}
          <li>
            <details>
              <summary className="cursor-pointer">{t("nav_services")}</summary>
              <ul className="ml-4 mt-2 space-y-2">
                <Link to="/"><li className="hover:text-telRed cursor-pointer">{t("nav_voip")}</li></Link>
                <Link to="/ict"><li className="hover:text-telRed cursor-pointer">{t("nav_ict")}</li></Link>
                <Link to="/isp"><li className="hover:text-telRed cursor-pointer">{t("nav_isp")}</li></Link>
                <Link to="/disaster-recovery"><li className="hover:text-telRed cursor-pointer">{t("nav_disaster_recovery")}</li></Link>
              </ul>
            </details>
          </li>

          {/*===== Mobile Help Dropdown =====*/}
          <li>
            <details>
              <summary className="cursor-pointer">{t("nav_help")}</summary>
              <ul className="ml-4 mt-2 space-y-2">
                <li className="hover:text-telRed cursor-pointer"><Link to="/tickets">{t("nav_ticket")}</Link></li>
                <li className="hover:text-telRed cursor-pointer"><Link to="/contact-us">{t("nav_contact")}</Link></li>
                <li className="hover:text-telRed cursor-pointer"><Link to="/about-us">{t("nav_about")}</Link></li>
              </ul>
            </details>
          </li>

          {/*===== Mobile Language Dropdown =====*/}
          <li>
            <details>
              <summary className="cursor-pointer">{t("nav_language")}</summary>
              <ul className="ml-4 mt-2 space-y-2">
                <li className="hover:text-telRed cursor-pointer"><button onClick={() => changeLanguage("en")}>English</button></li>
                <li className="hover:text-telRed cursor-pointer"><button onClick={() => changeLanguage("zh")}>中文</button></li>
              </ul>
            </details>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
