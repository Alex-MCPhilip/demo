import React from 'react'
import AdminHeader from '../../components/Layout/AdminHeader'
import AdminSideBar from "../../components/Admin/Layout/AdminSideBar";
import AdminEvents from "../../components/Admin/AdminEvents"

const AdminAllEvents = () => {
  return (
    <div>
        <AdminHeader />
        <div className="flex justify-between w-full">
            <div className="w-[80px] 800px:w-[330px]">
              <AdminSideBar/>
            </div>
            <div className="w-full justify-center flex">
                <AdminEvents />
            </div>
          </div>
    </div>
  )
}

export default AdminAllEvents