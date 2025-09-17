import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  FaGlobe,
  FaServer,
  FaMicrochip,
  FaPhoneAlt,
  FaBroadcastTower,
  FaExclamationTriangle,
} from "react-icons/fa";

const AboutServices = () => {
  const { t } = useTranslation();

  const services = [
    {
      icon: <FaGlobe size={60} className="text-acetelRed mx-auto" />,
      title: t("services.domainHosting.title"),
      description: t("services.domainHosting.description"),
      link: "/register/domain-hosting",
    },
    {
      icon: <FaServer size={60} className="text-acetelRed mx-auto" />,
      title: t("services.vpsHosting.title"),
      description: t("services.vpsHosting.description"),
      link: "/register/vps-hosting",
    },
    {
      icon: <FaMicrochip size={60} className="text-acetelRed mx-auto" />,
      title: t("services.ict.title"),
      description: t("services.ict.description"),
      link: "/register/ict",
    },
    {
      icon: <FaPhoneAlt size={60} className="text-acetelRed mx-auto" />,
      title: t("services.voip.title"),
      description: t("services.voip.description"),
      link: "/register/voip",
    },
    {
      icon: <FaBroadcastTower size={60} className="text-acetelRed mx-auto" />,
      title: t("services.isp.title"),
      description: t("services.isp.description"),
      link: "/register/isp",
    },
    {
      icon: <FaExclamationTriangle size={60} className="text-acetelRed mx-auto" />,
      title: t("services.disasterRecovery.title"),
      description: t("services.disasterRecovery.description"),
      link: "/register/disaster-recovery",
    },
  ];

  return (
    <section className="py-16 px-6">
      {/* Section Title */}
      <h2 className="text-2xl md:text-3xl font-bold text-center text-acetelRed mb-12">
        {t("services.title")}
      </h2>

      {/* Service Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {services.map((service, index) => (
          <div
            key={index}
            className="border border-acetelRed rounded-lg p-4 shadow-sm hover:shadow-md transition text-center"
          >
            {/* Icon */}
            {service.icon}

            {/* Title */}
            <h3 className="mt-4 text-lg font-bold text-acetelRed">
              {service.title}
            </h3>

            {/* Description */}
            <p className="text-gray-700 mt-2 text-sm">{service.description}</p>

            {/* Register Link */}
            <Link
              to={service.link}
              className="block mt-4 font-semibold text-acetelRed hover:underline"
            >
              {t("services.register")}
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AboutServices;
