import { configureStore } from "@reduxjs/toolkit";
import registerSlice from "./auth/register/RegisterSlice";
import forgotPasswordSlice from "./auth/forgot-password/ForgotPasswordSlice";
import loginSlice from "./auth/login/LoginSlice";
import userSingleSlice from "./user/userSingle/UserSingleSlice";
import getCategoriesSlice from "./catalog/categoties/CategoriesSlice";
import getProductsSlice from "./catalog/productList/ProductsSlice";
import getSingleProductSlice from "./catalog/singleProduct/SingleProductSlice";
import chatReducer from "./chat/chatSlice/ChatSlice";
import branchesGetSlice from "./branches/BranchesSlice";
import cityGetSlice from "./cities/citiesSlice";
import getCart from "./cart/get/cartSlice";
import addProductToCartSlice from "./cart/add/addProcuctSlice";
import updateCartSlice from "./cart/update/updateProductSlice";
import { loadCart, saveCart } from "./storage";
const preloadedState = { cart: loadCart() };
import actionsSlice from "./actions/actionsSlice/ActionsSlice";
import pizzeriaSlice from "./pizzeria/pizzeriaSlice/PizzeriaSlice";
import singleActionSlice from "./actions/actionSingleSlice/actionSingleSlice";
import streetSlice from "./street/streetSlice/streetSlice";
import checkBillSlice from "./check-bill/checkBillSlice/checkBillSlice";

import favorites from "./favorites/favoritesSice";
import recommendations from "./recommedations/recommendationsSlice";
import timesSlice from "./times/timesSlice/timesSlice";
import loyalitySlice from "./loyality/loyalitySlice/loyalitySlice";
import allPagesSlice from "./staticPage/allPageSlice/allPageSlice";
import getPageSingleSlice from "./staticPage/getPageSingleSlice/getPageSingleSlice";
import seoDataSlice from "./seo/seoSlice/seoSlice";

const store = configureStore({
  reducer: {
    register: registerSlice,
    login: loginSlice,
    forgotPassword: forgotPasswordSlice,

    userSingle: userSingleSlice,

    categories: getCategoriesSlice,
    products: getProductsSlice,
    product: getSingleProductSlice,

    branches: branchesGetSlice,

    chat: chatReducer,

    actions: actionsSlice,
    actionSingle: singleActionSlice,

    pizzeria: pizzeriaSlice,

    street: streetSlice,

    checkBill: checkBillSlice,

    times: timesSlice,

    loyality: loyalitySlice,

    cities: cityGetSlice,

    cart: getCart,
    addProduct: addProductToCartSlice,
    updateProduct: updateCartSlice,

    favorites: favorites,

    recommendations: recommendations,
    pagesUrl: allPagesSlice,
    pageSingle: getPageSingleSlice,

    seoMeta: seoDataSlice,
  },
  preloadedState,
});

let prevCart = store.getState().cart?.cart;

store.subscribe(() => {
  const currentCart = store.getState().cart?.cart;
  if (currentCart !== prevCart) {
    prevCart = currentCart;
    saveCart(currentCart);
  }
});

export default store;
