import StoryBook from "../pages/storyBook/StoryBook";
import Cart from "../pages/cart/Cart";
import UserProfile from "../pages/userProfile/UserProfile";
import OrderPage from "../pages/order/OrderPage";
import OrderAcceptedPage from "../pages/order-accepted/OrderAcceptedPage";

export const protectedRoutes = [
  {
    path: "/story-book",
    element: <StoryBook />,
    name: "Story Book",
  },
  { path: "/cart", element: <Cart />, name: "cart" },
  { path: "/order", element: <OrderPage />, name: "order" },
  {
    path: "/order-accepted",
    element: <OrderAcceptedPage />,
    name: "order-accepted",
  },

  {
    path: "/user-profile",
    element: <UserProfile />,
    public: true,
    name: "user-profile",
  },
];
