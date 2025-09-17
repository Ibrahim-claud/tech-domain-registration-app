import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const email = searchParams.get("email");

  const verifyOtpAPI = "/api/verify-otp"
  const sendOtpAPI = "/api/send-otp"

const handleVerify = async () => {
  setLoading(true);
  setMessage("");

  const formData = JSON.parse(localStorage.getItem("ictFormData") || "{}");

  try {
    const res = await fetch( verifyOtpAPI, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        otp,
        name: formData.companyName,        // ✅ backend requires "name"
        company_name: formData.companyName,
        company_address: formData.address,
        requirements: formData.description,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.removeItem("ictFormData");
      navigate("/thank-you?status=success");
    } else {
      if (data.message?.includes("expired")) {
        navigate("/thank-you?status=expired");
      } else {
        setMessage("❌ Incorrect code. Please try again.");
      }
    }
  } catch (err) {
    setMessage("⚠️ Something went wrong. Please try again.");
  } finally {
    setLoading(false);
  }
};

 const handleResend = async () => {
  setLoading(true);
  setMessage("");

  const formData = JSON.parse(localStorage.getItem("ictFormData") || "{}");

  try {
    const res = await fetch( sendOtpAPI, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        name: formData.companyName || "User", // backend requires name + email
      }),
    });

    const data = await res.json();
    if (res.ok) {
      setMessage(`📩 ${data.message}`);
    } else {
      throw new Error();
    }
  } catch {
    setMessage("⚠️ Could not resend OTP. Try again later.");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow-md">
      <h2 className="text-xl font-bold mb-2 text-center">Verify OTP</h2>
      {email && (
        <p className="text-center text-gray-600 mb-4">
          We’ve sent a 6-digit code to <span className="font-medium">{email}</span>.  
          Please enter it below to verify your account.
        </p>
      )}

      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        className="w-full border px-3 py-2 rounded mb-3 text-center tracking-widest text-lg"
        maxLength={6}
      />

      <div className="flex gap-3">
        <button
          onClick={handleVerify}
          disabled={loading}
          className="bg-telRed text-white px-6 py-2 rounded-md w-full hover:bg-red-700 transition"
        >
          {loading ? "Verifying..." : "Verify"}
        </button>
        <button
          onClick={handleResend}
          disabled={loading}
          className="bg-gray-500 text-white px-6 py-2 rounded-md w-full hover:bg-gray-600 transition"
        >
          {loading ? "Resending..." : "Resend OTP"}
        </button>
      </div>

      {message && (
        <p className="mt-4 text-center text-sm text-red-600">{message}</p>
      )}
    </div>
  );
};

export default VerifyOtp;


  