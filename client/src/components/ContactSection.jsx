import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { ToastContainer, toast } from "react-toastify";
import ReCAPTCHA from "react-google-recaptcha";
import "react-toastify/dist/ReactToastify.css";

const ContactSection = () => {
  const { t } = useTranslation();
  const recaptchaRef = React.createRef();
  const handleCaptchaChange = (value) => {
    console.log("Captcha value:", value);
  };

  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);

  const handleCaptchaVerify = () => {
    recaptchaRef.current.reset();
    setIsCaptchaVerified(true);
  };

  const handleCaptchaExpire = () => {
    recaptchaRef.current.reset();
    setIsCaptchaVerified(false);
  };

  const handleCaptchaError = () => {
    recaptchaRef.current.reset();
    setIsCaptchaVerified(false);
  };


  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [isLoading, setIsLoading] = useState(false);

  const contactApiUrl = "/api/contact";

  const onSubmit = async (data) => {
    setIsLoading(true);

    try {
      const res = await fetch( contactApiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (result.status === "success") {
        toast.success("✅ Message sent successfully!");
        reset();
      } else {
        toast.error("❌ Failed to send message.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("⚠️ Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-16 px-6 bg-white">
      <ToastContainer position="top-right" autoClose={4000} />

      {/* ===== Top Cards ===== */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Details */}
        <div className="border border-gray-300 rounded-md shadow-sm w-full">
          <div className="bg-black text-white font-bold px-4 py-2 rounded-t-md">
            {t("contact.details.title")}
          </div>
          <div className="divide-y divide-gray-400">
            <div className="flex justify-between p-4">
              <span className="font-semibold">{t("contact.details.phone")}</span>
              <span className="text-gray-500">+27 111 222 000</span>
            </div>
            <div className="flex justify-between p-4">
              <span className="font-semibold">{t("contact.details.infoEmail")}</span>
              <span className="text-gray-500">info@teletech.com</span>
            </div>
            <div className="flex justify-between p-4">
              <span className="font-semibold">{t("contact.details.supportEmail")}</span>
              <span className="text-gray-500">support@teletech.com</span>
            </div>
          </div>
        </div>

        {/* Location */}
        <div className="border border-gray-300 rounded-md shadow-sm w-full">
          <div className="bg-black text-white font-bold px-4 py-2 rounded-t-md">
            {t("contact.location.title")}
          </div>
          <div className="divide-y divide-gray-400">
            <div className="flex justify-between p-4">
              <span className="font-semibold">{t("contact.location.address")}</span>
              <span className="text-gray-500">Accra Street</span>
            </div>
            <div className="flex justify-between p-4">
              <span></span>
              <span className="text-gray-500">Accra - Ghana</span>
            </div>
            <div className="flex justify-between p-4">
              <span></span>
              <span className="text-gray-500">Madina</span>
            </div>
          </div>
        </div>
      </div>

      {/* ===== Contact Form ===== */}
      <div className="mt-12 border border-gray-300 rounded-md shadow-sm max-w-4xl mx-auto">
        <div className="bg-black text-white font-bold px-4 py-2 rounded-t-md">
          {t("contact.form.title")}
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          <div className="grid grid-cols-1 gap-4">
            {/* Name */}
            <div className="grid grid-cols-3 items-start gap-4">
              <label className="font-semibold">{t("contact.form.name")}</label>
              <div className="col-span-2">
                <input
                  type="text"
                  {...register("name", { required: "Name is required" })}
                  placeholder={t("contact.placeholders.name")}
                  className="border border-gray-400 rounded px-3 py-2 focus:outline-none w-full"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                )}
              </div>
            </div>

            {/* Email */}
            <div className="grid grid-cols-3 items-start gap-4">
              <label className="font-semibold">{t("contact.form.email")}</label>
              <div className="col-span-2">
                <input
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email address",
                    },
                  })}
                  placeholder={t("contact.placeholders.email")}
                  className="border border-gray-400 rounded px-3 py-2 focus:outline-none w-full"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>
            </div>

            {/* Subject */}
            <div className="grid grid-cols-3 items-start gap-4">
              <label className="font-semibold">{t("contact.form.subject")}</label>
              <div className="col-span-2">
                <input
                  type="text"
                  {...register("subject", { required: "Subject is required" })}
                  placeholder={t("contact.placeholders.subject")}
                  className="border border-gray-400 rounded px-3 py-2 focus:outline-none w-full"
                />
                {errors.subject && (
                  <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>
                )}
              </div>
            </div>

            {/* Message */}
            <div className="grid grid-cols-3 gap-4">
              <label className="font-semibold">{t("contact.form.message")}</label>
              <div className="col-span-2">
                <textarea
                  rows="4"
                  {...register("message", { required: "Message is required" })}
                  placeholder={t("contact.placeholders.message")}
                  className="border border-gray-400 rounded px-3 py-2 focus:outline-none w-full"
                />
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                )}
              </div>
            </div>

            {/* reCAPTCHA */}
            
            <div className="flex justify-center my-4">
              <div className="w-full max-w-xs transform scale-90 sm:scale-100">
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey="6LcFM74rAAAAAPBGIUTZCqdUq-0irF3BwmzRxz5M"
                  onChange={handleCaptchaChange}
                />
              </div>
            </div>
            

            {/* Submit Button */}
            <div className="grid grid-cols-3 gap-4">
              <div></div>
              <button
                type="submit"
                disabled={isLoading}
                className="bg-black text-white px-8 py-2 rounded-md hover:bg-gray-800 transition flex items-center justify-center"
              >
                {isLoading && (
                  <svg
                    className="animate-spin h-5 w-5 mr-2 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                  </svg>
                )}
                {isLoading ? "Sending..." : t("contact.form.submit")}
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactSection;
