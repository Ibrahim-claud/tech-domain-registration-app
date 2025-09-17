import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useTranslation } from "react-i18next";

const need = "src/assets/images/need.png";
const plan = "src/assets/images/plan.png";
const service = "src/assets/images/service.png";

const Steps = () => {
  const { t } = useTranslation();

  useEffect(() => {
    AOS.init({ duration: 900, once: true, easing: "ease-out-quart" });
  }, []);

  //===================== Steps Card Data =====================//
  const steps = [
    {
      topTitle: t("step_one_title"),
      innerTitle: t("step_one_inner"),
      img: need,
      desc: t("step_one_desc"),
    },
    {
      topTitle: t("step_two_title"),
      innerTitle: t("step_two_inner"),
      img: plan,
      desc: t("step_two_desc"),
    },
    {
      topTitle: t("step_three_title"),
      innerTitle: t("step_three_inner"),
      img: service,
      desc: t("step_three_desc"),
    },
  ];

  return (
    <section className="bg-white py-24 px-4">
      <div className="max-w-[1100px] mx-auto">
        
        {/*============== Main heading ==============*/}
        <h2
          className="text-center text-2xl md:text-2xl font-bold mb-12"
          data-aos="fade-up"
        >
          {t("steps_section_title")}
        </h2>

        {/*============ Cards with top headings =============*/}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((s, i) => (
            <div key={i} className="flex flex-col items-center text-center">
              {/*===== top heading above each card =====*/}
              <h3
                className="text-xl md:text-xl font-bold text-telRed mb-6"
                data-aos="fade-up"
                data-aos-delay={i * 150}
              >
                {s.topTitle}
              </h3>

              {/*===== card =====*/}
              <div
                className="w-full border rounded-xl p-4 shadow-sm hover:shadow-lg transition bg-white border-telRed/30"
                data-aos="zoom-in"
                data-aos-delay={150 + i * 150}
              >
                <img src={s.img} className="w-16 h-16 mx-auto" />

                <h4 className="text-l font-bold text-telRed mt-1">
                  {s.innerTitle}
                </h4>

                <p className="mt-2 text-gray-700 leading-relaxed">
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Steps;
