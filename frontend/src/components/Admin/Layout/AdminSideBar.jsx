import React from "react";
import { FiShoppingBag } from "react-icons/fi";
import { RxDashboard } from "react-icons/rx";
import { CiMoneyBill, CiSettings } from "react-icons/ci";
import { Link } from "react-router-dom";
import { HiOutlineUserGroup } from "react-icons/hi";
import { BsHandbag } from "react-icons/bs";
import { MdOutlineEventBusy } from "react-icons/md";
import { AiOutlineLogout } from "react-icons/ai";
import { RiCoupon2Line} from "react-icons/ri";
import { BiMessage, BiMessageAdd, BiMessageAltCheck, BiMessageAltError } from "react-icons/bi";

import axios from "axios";
import { server } from "../../../server";
import { toast } from "react-toastify";


const AdminSideBar = ({ active }) => {


  const logoutHandler = () => {
    axios
      .get(`${server}/user/logout `, { withCredentials: true })
      .then((res) => {
        toast.success(res.data.message);
        // window.location.reload(true);
        // navigate("/");
        window.location.href = "/"; // Chuyển đến trang chủ
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };



  return (
    <div className="w-full h-[90vh] bg-white shadow-sm overflow-y-scroll sticky top-0 left-0 z-10">
      {/* single item */}
      {/* /admin/dashboard */}
      <div className="w-full flex items-center p-4">
        <Link to="/admin/dashboard" className="w-full flex items-center">
          <RxDashboard
            size={30}
            color={`${active === 1 ? "crimson" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 1 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            Bản điều khiển
          </h5>
        </Link>
      </div>
      
      {/* /admin-orders */}
      <div className="w-full flex items-center p-4">
        <Link to="/admin-orders" className="w-full flex items-center">
          <FiShoppingBag
            size={30}
            color={`${active === 2 ? "crimson" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 2 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            Tất cả đơn đặt hàng
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link to="/admin-coupons" className="w-full flex items-center">
          <RiCoupon2Line
            size={30}
            color={`${active === 3 ? "crimson" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 3 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            Tất cả mã giảm giá
          </h5>
        </Link>
      </div>


        {/* /admin-users */}
      <div className="w-full flex items-center p-4">
        <Link to="/admin-users" className="w-full flex items-center">
          <HiOutlineUserGroup
            size={30}
            color={`${active === 4 ? "crimson" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 4 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            Tất cả người dùng
          </h5>
        </Link>
      </div>

      {/* /admin-products */}
      <div className="w-full flex items-center p-4">
        <Link to="/admin-products" className="w-full flex items-center">
          <BsHandbag
            size={30}
            color={`${active === 5 ? "crimson" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 5 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            Tất cả sản phẩm
          </h5>
        </Link>
      </div>

        {/* /admin-events */}
      <div className="w-full flex items-center p-4">
        <Link to="/admin-events" className="w-full flex items-center">
          <MdOutlineEventBusy
            size={30}
            color={`${active === 6 ? "crimson" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 6 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            Tất cả sự kiện
          </h5>
        </Link>
      </div>


        {/*  message */}
      <div className="w-full flex items-center p-4">
        <Link
          to="/dashboard-messages"
          className="w-full flex items-center"
        >
          <BiMessage
            size={30}
            color={`${active === 7 ? "crimson" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 7 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            Tất cả tin nhắn
          </h5>
        </Link>
      </div>



       {/* đăng xuất */}
       <div
        className="w-full flex items-center p-4 cursor-pointer"
        onClick={logoutHandler}
      >
        <AiOutlineLogout 
          size={30} 
          // color={active === 8 ? "red" : ""}
          color={`${active === 8 ? "crimson" : "#555"}`}
        />
        <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 8 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            Đăng suất
        </h5>
      </div>


    </div>
  );
};

export default AdminSideBar;





// import { AiOutlineFolderAdd, AiOutlineGift } from "react-icons/ai";
// import { FiPackage, FiShoppingBag } from "react-icons/fi";
// import { MdOutlineLocalOffer } from "react-icons/md";
// import { RxDashboard } from "react-icons/rx";
// import { VscNewFile } from "react-icons/vsc";
// import { CiMoneyBill, CiSettings } from "react-icons/ci";
// import { BiMessageSquareDetail } from "react-icons/bi";
// import { HiOutlineReceiptRefund } from "react-icons/hi";

//     <div className="w-full h-[90vh] bg-white shadow-sm overflow-y-scroll sticky top-0 left-0 z-10">
//       {/* single item */}
//       <div className="w-full flex items-center p-4">
//         <Link to="/dashboard" className="w-full flex items-center">
//           <RxDashboard
//             size={30}
//             color={`${active === 1 ? "crimson" : "#555"}`}
//           />
//           <h5
//             className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
//               active === 1 ? "text-[crimson]" : "text-[#555]"
//             }`}
//           >
//             Dashboard
//           </h5>
//         </Link>
//       </div>

//       <div className="w-full flex items-center p-4">
//         <Link to="/dashboard-orders" className="w-full flex items-center">
//           <FiShoppingBag
//             size={30}
//             color={`${active === 2 ? "crimson" : "#555"}`}
//           />
//           <h5
//             className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
//               active === 2 ? "text-[crimson]" : "text-[#555]"
//             }`}
//           >
//             All Orders
//           </h5>
//         </Link>
//       </div>

//       <div className="w-full flex items-center p-4">
//         <Link to="/dashboard-products" className="w-full flex items-center">
//           <FiPackage size={30} color={`${active === 3 ? "crimson" : "#555"}`} />
//           <h5
//             className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
//               active === 3 ? "text-[crimson]" : "text-[#555]"
//             }`}
//           >
//             All Products
//           </h5>
//         </Link>
//       </div>

//       <div className="w-full flex items-center p-4">
//         <Link
//           to="/dashboard-create-product"
//           className="w-full flex items-center"
//         >
//           <AiOutlineFolderAdd
//             size={30}
//             color={`${active === 4 ? "crimson" : "#555"}`}
//           />
//           <h5
//             className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
//               active === 4 ? "text-[crimson]" : "text-[#555]"
//             }`}
//           >
//             Create Product
//           </h5>
//         </Link>
//       </div>

//       <div className="w-full flex items-center p-4">
//         <Link to="/dashboard-events" className="w-full flex items-center">
//           <MdOutlineLocalOffer
//             size={30}
//             color={`${active === 5 ? "crimson" : "#555"}`}
//           />
//           <h5
//             className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
//               active === 5 ? "text-[crimson]" : "text-[#555]"
//             }`}
//           >
//             All Events
//           </h5>
//         </Link>
//       </div>

//       <div className="w-full flex items-center p-4">
//         <Link to="/dashboard-create-event" className="w-full flex items-center">
//           <VscNewFile
//             size={30}
//             color={`${active === 6 ? "crimson" : "#555"}`}
//           />
//           <h5
//             className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
//               active === 6 ? "text-[crimson]" : "text-[#555]"
//             }`}
//           >
//             Create Event
//           </h5>
//         </Link>
//       </div>

//       <div className="w-full flex items-center p-4">
//         <Link
//           to="/dashboard-withdraw-money"
//           className="w-full flex items-center"
//         >
//           <CiMoneyBill
//             size={30}
//             color={`${active === 7 ? "crimson" : "#555"}`}
//           />
//           <h5
//             className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
//               active === 7 ? "text-[crimson]" : "text-[#555]"
//             }`}
//           >
//             Withdraw Money
//           </h5>
//         </Link>
//       </div>

//       <div className="w-full flex items-center p-4">
//         <Link to="/dashboard-messages" className="w-full flex items-center">
//           <BiMessageSquareDetail
//             size={30}
//             color={`${active === 8 ? "crimson" : "#555"}`}
//           />
//           <h5
//             className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
//               active === 8 ? "text-[crimson]" : "text-[#555]"
//             }`}
//           >
//             Shop Inbox
//           </h5>
//         </Link>
//       </div>

//       <div className="w-full flex items-center p-4">
//         <Link to="/dashboard-coupouns" className="w-full flex items-center">
//           <AiOutlineGift
//             size={30}
//             color={`${active === 9 ? "crimson" : "#555"}`}
//           />
//           <h5
//             className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
//               active === 9 ? "text-[crimson]" : "text-[#555]"
//             }`}
//           >
//             Discount Codes
//           </h5>
//         </Link>
//       </div>

//       <div className="w-full flex items-center p-4">
//         <Link to="/dashboard-refunds" className="w-full flex items-center">
//           <HiOutlineReceiptRefund
//             size={30}
//             color={`${active === 10 ? "crimson" : "#555"}`}
//           />
//           <h5
//             className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
//               active === 10 ? "text-[crimson]" : "text-[#555]"
//             }`}
//           >
//             Refunds
//           </h5>
//         </Link>
//       </div>

//       <div className="w-full flex items-center p-4">
//         <Link to="/settings" className="w-full flex items-center">
//           <CiSettings
//             size={30}
//             color={`${active === 11 ? "crimson" : "#555"}`}
//           />
//           <h5
//             className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
//               active === 11 ? "text-[crimson]" : "text-[#555]"
//             }`}
//           >
//             Settings
//           </h5>
//         </Link>
//       </div>
//     </div>
