// ==== import React Router Dom components
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from "react-router-dom";

//=== import Layouts ===//
import MainLayouts from "./layouts/MainLayouts";

//=== import Pages ===//
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import ICTpage from "./pages/ICTpage"
import ContactUs from "./pages/ContactUs";
import VerifyOtp from "./pages/VerifyOtp";
import ThankYou from "./pages/ThankYou";
import PageNotFound from "./pages/PageNotFound";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayouts />}>
      <Route index element={<Home />} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/contact-us" element={<ContactUs />} />
      <Route path="/ict" element={<ICTpage />} />
      <Route path="/verifyOtp" element={<VerifyOtp />} />
      <Route path="/thank-you" element={<ThankYou />} />  
      <Route path="*" element={<PageNotFound />} />
    </Route>
  )
);


const App = () => {
  return (
    <><RouterProvider router={router} /></>
  )
}

export default App