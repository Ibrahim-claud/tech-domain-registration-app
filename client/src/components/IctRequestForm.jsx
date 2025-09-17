import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const IctRequestForm = () => {
  const { t } = useTranslation();
  const form = useForm();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = form;

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  // ✅ Backend API endpoint
  const requestFormAPI = "/api/send-otp";

  // ===================== Send OTP =====================
const handleSendOtp = async () => {
  const values = getValues();
  const { companyName, email, phone, address, description } = values;

  if (!companyName || !email) {
    setIsError(true);
    setTimeout(() => setIsError(false), 5000);
    return;
  }

  // Save full form for verification
  localStorage.setItem("ictFormData", JSON.stringify(values));

  setIsLoading(true);
  try {
    const res = await fetch(requestFormAPI, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        name: companyName,   // ✅ backend expects "name"
      }),
    });

    const data = await res.json();

    if (res.ok) {
      navigate(`/verifyOtp?email=${encodeURIComponent(email)}`);
    } else {
      throw new Error(data.message || "Failed to send OTP");
    }
  } catch (err) {
    console.error(err);
    setIsError(true);
    setTimeout(() => setIsError(false), 5000);
  } finally {
    setIsLoading(false);
  }
};


  // ===================== Form Submit =====================
  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      console.log("Form submitted:", data);

      const response = await fetch(requestFormAPI, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log("API response:", result);

      if (response.ok) {
        setIsSubmitted(true);
        setIsError(false);
        reset();
        setTimeout(() => setIsSubmitted(false), 5000);
      } else {
        throw new Error(result.message || "Submission failed");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setIsError(true);
      setIsSubmitted(false);
      setTimeout(() => setIsError(false), 5000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      {/* ======= Title ======= */}
      <h2 className="text-2xl md:text-3xl font-bold text-telRed mb-8">
        {t("ictRequestForm.title")}
      </h2>

      {/*================== Form ====================*/}
      <motion.form
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="space-y-6"
        onSubmit={handleSubmit(onSubmit, () => {
          setIsError(true);
          setTimeout(() => setIsError(false), 5000);
        })}
        noValidate
      >
        {/*===== Company Name =====*/}
        <div>
          <label className="block text-gray-800 mb-1 font-medium">
            {t("ictRequestForm.companyName.label")}
          </label>
          <input
            type="text"
            placeholder={t("ictRequestForm.companyName.placeholder")}
            className="w-full border border-gray-400 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-telRed"
            {...register("companyName", {
              required: t("ictRequestForm.companyName.error"),
            })}
          />
          <p className="text-red-500 text-sm">{errors.companyName?.message}</p>
        </div>

        {/*===== Email & Phone =====*/}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-800 mb-1 font-medium">
              {t("ictRequestForm.email.label")}
            </label>
            <input
              type="email"
              placeholder={t("ictRequestForm.email.placeholder")}
              className="w-full border border-gray-400 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-telRed"
              {...register("email", {
                required: t("ictRequestForm.email.errorRequired"),
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: t("ictRequestForm.email.errorInvalid"),
                },
              })}
            />
            <p className="text-red-500 text-sm">{errors.email?.message}</p>
          </div>

          <div>
            <label className="block text-gray-800 mb-1 font-medium">
              {t("ictRequestForm.phone.label")}
            </label>
            <input
              type="tel"
              placeholder={t("ictRequestForm.phone.placeholder")}
              className="w-full border border-gray-400 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-telRed"
              {...register("phone", {
                required: t("ictRequestForm.phone.errorRequired"),
                pattern: {
                  value: /^\d{10}$/,
                  message: t("ictRequestForm.phone.errorInvalid"),
                },
              })}
            />
            <p className="text-red-500 text-sm">{errors.phone?.message}</p>
          </div>
        </div>

        {/*======= Address =======*/}
        <div>
          <label className="block text-gray-800 mb-1 font-medium">
            {t("ictRequestForm.address.label")}
          </label>
          <input
            type="text"
            placeholder={t("ictRequestForm.address.placeholder")}
            className="w-full border border-gray-400 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-telRed"
            {...register("address", {
              required: t("ictRequestForm.address.error"),
            })}
          />
          <p className="text-red-500 text-sm">{errors.address?.message}</p>
        </div>

        {/*======= Description =======*/}
        <div>
          <label className="block text-gray-800 mb-1 font-medium">
            {t("ictRequestForm.description.label")}
          </label>
          <textarea
            rows="4"
            placeholder={t("ictRequestForm.description.placeholder")}
            className="w-full border border-gray-400 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-telRed"
            {...register("description", {
              required: t("ictRequestForm.description.error"),
            })}
          />
          <p className="text-red-500 text-sm">{errors.description?.message}</p>
        </div>

        {/*===== Success message =====*/}
        {isSubmitted && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="p-3 rounded-md bg-green-100 text-green-700 border border-green-400 text-center"
          >
            {t("ictRequestForm.successMessage")}
          </motion.div>
        )}

        {/*===== Error message =====*/}
        {isError && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="p-3 rounded-md bg-red-100 text-red-700 border border-red-400 text-center"
          >
            {t("ictRequestForm.errorMessage")}
          </motion.div>
        )}

        {/*===== Submit Button =====*/}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="button"
          onClick={handleSendOtp}
          className="bg-telRed text-white px-6 py-3 rounded-md font-semibold hover:bg-red-700 transition flex items-center justify-center mx-auto"
          disabled={isLoading}
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
          {isLoading ? "Sending..." : t("ictRequestForm.submitButton")}
        </motion.button>
      </motion.form>
    </div>
  );
};

export default IctRequestForm;

