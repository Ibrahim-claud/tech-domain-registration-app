import { useSearchParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Footer from "../components/Footer";

const ThankYou = () => {
  const [params] = useSearchParams();
  const status = params.get("status");
  const { t } = useTranslation();

  return (
    <>
      <div className="max-w-md mx-auto p-8 text-center m-20">
        {status === "success" && (
          <div>
            <h2 className="text-2xl font-bold border border-green-600 rounded-md p-8 text-green-600">
              {t("thankyou.success")}
            </h2>
            <Link
              to="/"
              className="mt-6 inline-block bg-telRed text-white px-6 py-2 rounded-md hover:bg-red-700 transition"
            >
              {t("thankyou.backHome")}
            </Link>
          </div>
        )}

        {status === "expired" && (
          <h2 className="text-2xl font-bold text-yellow-600">
            {t("thankyou.expired")}
          </h2>
        )}

        {!status && (
          <h2 className="text-2xl font-bold">
            {t("thankyou.noStatus")}
          </h2>
        )}
      </div>

      <Footer />
    </>
  );
};

export default ThankYou;
