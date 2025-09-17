import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { useTranslation } from "react-i18next";
const footerIMG = 'src/assets/images/fotter.jpg'
const FooterLogo = 'src/assets/ACELOGO-white.png'

const Footer = () => {
  const { t } = useTranslation();

//===== Shorten about content for footer =====//
const aboutSlice = t("about_content");
let newAboutContent = aboutSlice.slice(0, 250);

  return (
    <>
     <footer
      className="bg-black text-white py-10 relative mt-20"
      style={{
        backgroundImage: `url(${footerIMG})`, // -- Background Image ...
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-[1200px] mx-auto grid md:grid-cols-3 gap-8 px-6">
        {/*==================================================*/}
        {/*================== Left Section ==================*/}
        {/*==================================================*/}
        <div>
          <h1
            className="w-48 mb-4 text-telRed text-2xl font-bold"
          >TELETECH</h1>
          <p className="text-sm leading-relaxed">
            {newAboutContent}...
          </p>
          <div className="flex space-x-4 mt-4 text-2xl">
            <Link to="#" className="hover:text-red-500">
              <FaFacebookF />
            </Link>
            <Link to="#" className="hover:text-red-500">
              <FaInstagram />
            </Link>
            <Link to="#" className="hover:text-red-500">
              <FaLinkedinIn />
            </Link>
            <Link to="#" className="hover:text-red-500">
              <FaXTwitter />
            </Link>
          </div>
        </div>

        {/*====================================================*/}  
        {/*================== Middle Section ==================*/}
        {/*====================================================*/}
        <div>
          <h3 className="text-xl font-semibold text-red-500 mb-4">{t("footer_services")}</h3>
          <ul className="space-y-2 ">
            <li className="hover:text-red-400"><Link to="/">{t("nav_domain")}</Link></li>
            <li className="hover:text-red-400"><Link to="/isp">{t("nav_isp")}</Link></li>
            <li className="hover:text-red-400"><Link to="/">{t("nav_voip")}</Link></li>
            <li className="hover:text-red-400"><Link to="/">{t("nav_vps")}</Link></li>
            <li className="hover:text-red-400"><Link to="/disaster-recovery">{t("nav_disaster_recovery")}</Link></li>
            <li className="hover:text-red-400"><Link to="/ict">{t("nav_ict")}</Link></li>
          </ul>
        </div>

        {/*====================================================*/}
        {/*==================== Right Section ================*/}
        {/*====================================================*/}
        <div>
          <h3 className="text-xl font-semibold text-red-500 mb-4">{t("footer_company")}</h3>
          <ul className="space-y-2">
            <li className="hover:text-red-400"><Link to="/about-us">{t("nav_about")}</Link></li>
            <li className="hover:text-red-400"><Link to="/contact-us">{t("nav_contact")}</Link></li>
            <li className="hover:text-red-400"><Link to="/terms-and-conditions">{t("terms")}</Link></li>
            <li className="hover:text-red-400"><Link to="/policy">{t("policy")}</Link></li>
          </ul>
        </div>
      </div>

     
    </footer>

     {/*============ Bottom Bar ============*/}
      <div className="bg-telRed text-center text-white py-3">
        <p className="text-sm">
          {t("footer_copyright")}
        </p>
      </div>
    
    </>
  )
}

export default Footer