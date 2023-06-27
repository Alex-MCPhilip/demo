import React, { useEffect } from "react";
import AdminHeader from "../../components/Layout/AdminHeader";
import AdminSideBar from "../../components/Admin/Layout/AdminSideBar";
import { Link } from "react-router-dom";
import { server } from "../../server";

import { Button } from "@mui/material";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from '@mui/x-data-grid';

import { AiOutlineArrowRight } from "react-icons/ai";


import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersOfAdmin } from "../../redux/actions/order";

const AdminDashboardOrders = () => {
  

  const { adminOrders, adminOrderLoading } = useSelector(
    (state) => state.order
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrdersOfAdmin());
  }, []);

  const columns = [
    { field: "id", headerName: "ID Đơn đăt hàng", minWidth: 150, flex: 0.7 },
    // { field: 'name', headerName: 'Name', minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Trạng thái",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.row.status === "Đã giao hàng"
        ? "greenColor"
        : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Tổng số lượng",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Tổng giá",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },
    {
        field: "createdAt",
        headerName: "Ngày đặt hàng",
        type: "date",
        minWidth: 130,
        flex: 0.8,
        valueFormatter: (params) => {
          const date = new Date(params.value.slice(0, 10));
          const formattedDate = new Intl.DateTimeFormat("vi-VN").format(date);
          return formattedDate;
        },
    },

    

    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/order/${params.id}`}>
              <Button>
                <AiOutlineArrowRight size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

  adminOrders &&
    adminOrders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item?.cart?.reduce((acc, item) => acc + item.qty, 0),
        total: item?.totalPrice + "VNĐ",
        status: item?.status,
        createdAt: item?.createdAt.slice(0,10),
      });
    });


function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  }


  return (
    <div>
      <AdminHeader />
      <div className="w-full flex">
        <div className="flex items-start justify-between w-full">
          <div className="w-[80px] 800px:w-[330px]">
            <AdminSideBar active={2} />
          </div>

          <div className=" w-full max-h-[80vh] pt-5 rounded flex justify-center">
            <div className="w-[97%] flex justify-center bg-white">
                <DataGrid
                    rows={row}
                    columns={columns}
                    pageSize={5}
                    components={{
                        Toolbar: CustomToolbar,
                    }}
                  
                />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardOrders;