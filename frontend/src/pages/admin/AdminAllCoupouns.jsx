import React from 'react'
import AdminHeader from '../../components/Layout/AdminHeader'
import AdminSideBar from "../../components/Admin/Layout/AdminSideBar";
import AdminCoupons from "../../components/Admin/AdminCoupons"
// import DashboardSideBar from '../../components/Shop/Layout/DashboardSideBar'
// import AllCoupons from "../../components/Shop/AllCoupons";

const AdminAllCoupouns = () => {
  return (
    <div>
        <AdminHeader />
        <div className="flex justify-between w-full">
            <div className="w-[80px] 800px:w-[330px]">
                <AdminSideBar />
              {/* <DashboardSideBar active={9} /> */}
            </div>
            <div className="w-full justify-center flex">
                <AdminCoupons />
            </div>
          </div>
    </div>
  )
}

export default AdminAllCoupouns