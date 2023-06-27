import React from 'react'
import AdminHeader from '../../components/Layout/AdminHeader'
import AdminSideBar from "../../components/Admin/Layout/AdminSideBar";
import OrderDetails from "../../components/Admin/OrderDetails"

const ShopOrderDetails = () => {
  return (
    <div>
      <AdminHeader />
        <div className="flex items-center justify-between w-full ">
            <div className="w-[80px] 800px:w-[330px]">
              <AdminSideBar/>
            </div>
            <div className="w-full justify-center flex ">
                <OrderDetails />
            </div>
        </div>
    </div>
  )
}

export default ShopOrderDetails



