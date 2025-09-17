import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useTranslation } from "react-i18next";

const Tabs = () => {
  const { t } = useTranslation();

  //===== AOS Initialization =====//
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  // Default active tab (matches translation keys)
  const [activeTab, setActiveTab] = useState("domainHosting");

  // Tab keys for translation lookup
  const tabs = [
    "domainHosting",
    "vpsHosting",
    "voip",
    "ict",
    "isp",
    "dr",
  ];

  return (
    <div className="bg-gray-200 py-8 px-4">
      <div className="max-w-[1100px] mx-auto">
        {/*=============== Title ===============*/}
        <h2
          data-aos="fade-down"
          className="text-center text-2xl md:text-3xl font-bold mb-6"
        >
          {t("tabs.sectionTitle.line1")}
          <br />
          {t("tabs.sectionTitle.line2")}
        </h2>

        {/*=============== Tabs Button ===============*/}
        <div
          data-aos="fade-up"
          className="flex flex-wrap justify-center gap-2 w-full"
        >
          {tabs.map((tabKey) => (
            <button
              key={tabKey}
              onClick={() => setActiveTab(tabKey)}
              className={`px-4 py-2 font-medium transition ${
                activeTab === tabKey
                  ? "bg-telRed text-white"
                  : "bg-white text-black hover:bg-gray-200"
              }`}
            >
              {t(`tabs.${tabKey}.label`)}
            </button>
          ))}
        </div>

        {/*============= Content Section ==============*/}
        <div
          data-aos="zoom-in"
          key={activeTab}
          className="relative bg-white shadow-lg border-2 border-telRed overflow-hidden mt-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/*=== Left Image ===*/}
            <div className="relative h-56 md:h-auto">
              <img
                src={t(`tabs.${activeTab}.img`)}
                alt={t(`tabs.${activeTab}.label`)}
                className="w-full h-full object-cover"
              />
            </div>

            {/*=== Right Text ===*/}
            <div className="flex items-center justify-center p-6 bg-gray-900 bg-opacity-70 text-center">
              <div data-aos="fade-left">
                <h3 className="text-white text-xl md:text-2xl font-bold drop-shadow-lg">
                  {t(`tabs.${activeTab}.title`)}
                </h3>
                <p className="text-gray-200 text-base md:text-lg mt-2 drop-shadow-md">
                  {t(`tabs.${activeTab}.desc`)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tabs;
