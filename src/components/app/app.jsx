import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import axios from "axios";
import { usePrivateRoutes } from "../../hook/usePrivateRoutes";
axios.defaults.withCredentials = true;
// axios.defaults.baseURL = import.meta.env.VITE_URL;
function App() {
  const routeElements = usePrivateRoutes();

  return (
    <>
      {/* <Header /> */}

      <div className="lg:mt-34">
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            {routeElements}

            {/* Страница 404 — должна быть последней */}
            {/* <Route path="*" element={<Page_404 />} /> */}
          </Routes>
        </Suspense>
      </div>
      {/* <ToastContainer /> */}
      {/* <Footer /> */}
    </>
  );
}

export default App;
