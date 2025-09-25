import { Suspense, useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import ru from "date-fns/locale/ru";
import Header from "../widgets/header/Header";
import Footer from "../widgets/footer/Footer";
import Page_404 from "../../pages/404/404";
import axios from "axios";

registerLocale("ru", ru); // Регистрация русской локали
setDefaultLocale("ru"); // Установка русской локали по умолчанию
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { getCategoriesThunk } from "../../store/catalog/categoties/CategoriesSlice";
import { useDispatch, useSelector } from "react-redux";
import Category from "../../pages/categories/Category";
import { usePrivateRoutes } from "../../hook/usePrivateRoutes";
import { userSingle } from "../../store/user/userSingle/UserSingleSlice";
import { allPages } from "../../store/staticPage/allPageSlice/allPageSlice";
import TextPage from "../../pages/textPage/textPage";
import { seoData } from "../../store/seo/seoSlice/seoSlice";
import Seo from "../widgets/seo/seo";
import { useCity } from "../../hook/useCity";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_URL;
function App() {
  const dispatch = useDispatch();
  const routeElements = usePrivateRoutes();
  const { categories } = useSelector((state) => state.categories);
  const { user } = useSelector((state) => state.userSingle);
  const { pages } = useSelector((state) => state.pagesUrl);
  const { seo } = useSelector((state) => state.seoMeta);
  const { getCurrentCity } = useCity();
  const city = getCurrentCity();
  const location = useLocation(); // Получаем текущий URL

  useEffect(() => {
    if (categories.length === 0) {
      dispatch(getCategoriesThunk());
    }
    if (!user) {
      dispatch(userSingle());
    }
    if (pages.length === 0) {
      dispatch(allPages());
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(seoData({ url: location.pathname, cityId: city?.cityId }));
  }, [location.pathname]);

  return (
    <>
      <Header />
      <Seo
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
      />
      <div className="lg:mt-34">
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            {routeElements}
            {/* Динамические маршруты для категорий */}
            {categories?.data?.map((category) => (
              <Route
                key={category.url} // предполагаем, что у категории есть поле url
                path={`${category.url}`} // формируем путь
                element={<Category category={category} />} // передаем данные категории
              />
            ))}

            {/* Динамические маршруты для статичных страниц */}
            {pages?.map((page) => (
              <Route
                key={page.url} // предполагаем, что у страницы есть поле url
                path={`${page.url}`} // формируем путь
                element={<TextPage page={page} />} // передаем данные страницы
              />
            ))}
            {/* Страница 404 — должна быть последней */}
            <Route path="*" element={<Page_404 />} />
          </Routes>
        </Suspense>
      </div>
      <ToastContainer />
      <Footer />
    </>
  );
}

export default App;
