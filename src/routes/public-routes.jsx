import About from "../pages/about/About";
import Home from "../pages/home/home";
import StocksPage from "../pages/stock/StocksPage";
import Register from "../pages/register/register";
import SingleProduct from "../pages/singleProduct/SingleProduct";
import Login from "../pages/login/Login";
import ForgotPassword from "../pages/forgot-password/ForgotPassword";
import Page_404 from "../pages/404/404";
import ConditionsPage from "../pages/conditions/ConditionsPage";
import ComplaintBookPage from "../pages/complaintBook/ComplaintBookPage";
import ProductInformationPage from "../pages/productInformation/ProductInformationPage";
import FaqPage from "../pages/faq/FaqPage";
import VacanciesPage from "../pages/vacancies/VacanciesPage";
import ContactsPage from "../pages/contacts/ContactsPage";
import PaymentPage from "../pages/payment/PaymentPage";
import PizzeriaPage from "../pages/pizzeria/PizzeriaPage";

import SearchPage from "../pages/search/SearchPage";

import Verification from "../pages/verification/Verification";
import TwoHalvedPizza from "../pages/singleProduct/twoHalvedPizza/TwoHalvedPizza";
import Favourites from "../pages/favourites/Favourites";
import Category from "../pages/categories/Category";
import StockDetails from "../pages/stock/StockDetails";

export const publicRoutes = [
  { path: "/", element: <Home />, name: "home" },

  { path: "/stocks", element: <StocksPage />, name: "stocks" },
  { path: "/stocks/:id", element: <StockDetails />, name: "stock-details" },


  { path: "/about", element: <About />, name: "about" },
  { path: "/404", element: <Page_404 />, name: "404" },
  { path: "/faq", element: <FaqPage />, name: "faq" },
  {
    path: "/conditions",
    element: <ConditionsPage />,
    name: "conditions",
  },
  {
    path: "/complaintBook",
    element: <ComplaintBookPage />,

    name: "complaintBook",
  },
  {
    path: "/vacancies",
    element: <VacanciesPage />,

    name: "vacancies",
  },
  {
    path: "/payment",
    element: <PaymentPage />,

    name: "payment",
  },
  {
    path: "/pizzeria",
    element: <PizzeriaPage />,
    name: "pizzeria",
  },
  {
    path: "/contacts",
    element: <ContactsPage />,
    name: "contacts",
  },
  {
    path: "/search",
    element: <SearchPage />,
    name: "search",
  },
  {
    path: "/productInformation",
    element: <ProductInformationPage />,
    name: "productInformation",
  },

  { path: "/register", element: <Register />, name: "register" },
  { path: "/login", element: <Login />, name: "login" },
  { path: "/verification", element: <Verification />, name: "verification" },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
    name: "forgot-password",
  },

  {
    path: "/single-product/:url",
    element: <SingleProduct />,
    name: "single-product",
  },
  {
    path: "/single-product/constructor",
    element: <TwoHalvedPizza />,
    name: "single-product",
  },
  {
    path: "/single-product/combination",
    element: <TwoHalvedPizza />,
    name: "/single-product/combination",
  },
  {
    path: "/categories/pizza",
    element: <Category />,
    name: "/categories/pizza",
  },
  {
    path: "/favorites",
    element: <Favourites />,
    name: "/favorites",
  },
];
