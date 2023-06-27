
import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import {
  LoginPage,
  SignupPage,
  ActivationPage,
  
  HomePage,
  ProductsPage,
  BestSellingPage,
  EventsPage,
  FAQPage,

  ProductDetailsPage,
  
  CheckoutPage,
  PaymentPage,
  OrderSuccessPage,
  
  ProfilePage,
  OrderDetailsPage,
} from "./routes/Routes";

import {
 AdminDashboardPage,
 AdminDashboardOrders,
 AdminDashboardCoupon,
 AdminDashboardUsers,
 AdminDashboardProducts,
 AdminDashboardEvents,
 AdminDashboardInbox,


 AdminAllCoupouns,
 AdminAllEvents,
 AdminCreateProduct,
 UserInbox,
 ShopOrderDetails,
 
}from "./routes/AdminRoutes"

import ProtectedRoute from "./routes/ProtectedRoute";
import ProtectedAdminRoute from "./routes/ProtectedAdminRoute"

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Store from "./redux/store";
import { loadUser } from "./redux/actions/user";
import  { getAllProducts } from "./redux/actions/product"
import  { getAllEvents } from "./redux/actions/event"

function App() {

  // const [stripeApikey, setStripeApiKey] = useState("");

  // async function getStripeApikey() {
  //   const { data } = await axios.get(`${server}/payment/stripeapikey`);
  //   setStripeApiKey(data.stripeApikey);
  // }


  useEffect(() =>{
    Store.dispatch(loadUser());
    // Store.dispatch(loadSeller());
    Store.dispatch(getAllProducts());
    Store.dispatch(getAllEvents());
    // getStripeApikey();
  },[] )

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/sign-up" element={<SignupPage/>} />
        {/* <Route path="/activation/:activation_token" element={<ActivationPage/>} /> */}
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/best-selling" element={<BestSellingPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/product/:id" element={<ProductDetailsPage />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <CheckoutPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/payment"
          element={
            <ProtectedRoute>
              <PaymentPage/>
            </ProtectedRoute>
          }
        />

        <Route path="/order/success" element={<OrderSuccessPage />} />



        <Route
          path="/inbox"
          element={
            <ProtectedRoute>
              <UserInbox />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/order/:id"
          element={
            <ProtectedRoute>
              <OrderDetailsPage />
            </ProtectedRoute>
          }
        />
  

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedAdminRoute>
              <AdminDashboardPage />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin-orders"
          element={
            <ProtectedAdminRoute>
              <AdminDashboardOrders />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/order/:id"
          element={
            <ProtectedAdminRoute>
              <ShopOrderDetails />
            </ProtectedAdminRoute>
          }
        />

         <Route
          path="/admin-coupons"
          element={
            <ProtectedAdminRoute>
              <AdminDashboardCoupon/>
            </ProtectedAdminRoute>
          }
        />
         <Route
          path="/admin-users"
          element={
            <ProtectedAdminRoute>
              <AdminDashboardUsers />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin-products"
          element={
            <ProtectedAdminRoute>
              <AdminDashboardProducts />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin-events"
          element={
            <ProtectedAdminRoute>
              <AdminDashboardEvents />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/dashboard-messages"
          element={
            <ProtectedAdminRoute>
              <AdminDashboardInbox />
            </ProtectedAdminRoute>
          }
        /> 







        <Route
          path="/dashboard-coupouns"
          element={
            <ProtectedRoute>
              <AdminAllCoupouns />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard-events"
          element={
            <ProtectedRoute>
              <AdminAllEvents />
            </ProtectedRoute>
          }
        />

        <Route
          path="/create-product"
          element={
            <ProtectedRoute>
              <AdminCreateProduct />
            </ProtectedRoute>
          }
        />




        {/* <Route
          path="/activation/:activation_token"
          element={<ActivationPage />}
        />
        <Route
          path="/seller/activation/:activation_token"
          element={<SellerActivationPage />}
        />
        

        <Route path="/order/success" element={<OrderSuccessPage />} />
        
        <Route
          path="/user/order/:id"
          element={
            <ProtectedRoute>
              <OrderDetailsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/track/order/:id"
          element={
            <ProtectedRoute>
              <TrackOrderPage />
            </ProtectedRoute>
          }
        />

        <Route path="/shop/preview/:id" element={<ShopPreviewPage />} />
        shop Routes
        <Route path="/shop-create" element={<ShopCreatePage />} />
        <Route path="/shop-login" element={<ShopLoginPage />} />
        <Route
          path="/shop/:id"
          element={
            <SellerProtectedRoute>
              <ShopHomePage />
            </SellerProtectedRoute>
          }
        />


        <Route
          path="/settings"
          element={
            <SellerProtectedRoute>
              <ShopSettingsPage />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <SellerProtectedRoute>
              <ShopDashboardPage />
            </SellerProtectedRoute>
          }
        />

        <Route
          path="/dashboard-create-product"
          element={
            <SellerProtectedRoute>
              <ShopCreateProduct />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/dashboard-orders"
          element={
            <SellerProtectedRoute>
              <ShopAllOrders />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/dashboard-refunds"
          element={
            <SellerProtectedRoute>
              <ShopAllRefunds />
            </SellerProtectedRoute>
          }
        />

        <Route
          path="/order/:id"
          element={
            <SellerProtectedRoute>
              <ShopOrderDetails />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/dashboard-products"
          element={
            <SellerProtectedRoute>
              <ShopAllProducts />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/dashboard-create-event"
          element={
            <SellerProtectedRoute>
              <ShopCreateEvents />
            </SellerProtectedRoute>
          }
        />
        
        
        <Route
          path="/dashboard-withdraw-money"
          element={
            <SellerProtectedRoute>
              <ShopWithDrawMoneyPage />
            </SellerProtectedRoute>
          }
        />
        

        */}





        {/* Admin Routes
        
       
        <Route
          path="/admin-sellers"
          element={
            <ProtectedAdminRoute>
              <AdminDashboardSellers />
            </ProtectedAdminRoute>
          }
        />
        
         
         <Route
          path="/admin-withdraw-request"
          element={
            <ProtectedAdminRoute>
              <AdminDashboardWithdraw />
            </ProtectedAdminRoute>
          }
        />
      </Routes> */}








      </Routes>
      <ToastContainer
        position="bottom-center"
        autoClose={3000} // thời gian tự động đóng là 5s 
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </BrowserRouter>
  )
}

export default App
