
import { Button } from "@mui/material";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from '@mui/x-data-grid';

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineDelete } from "react-icons/ai";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
// import Loader from "../Layout/Loader";

const AllCoupon = () => {


  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${server}/coupon/get-coupon`, {
        withCredentials: true,
      })
      .then((res) => {
        setLoading(false);
        setCoupons(res.data.couponCodes);
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.response.data.message);
      });
  }, []);



  const columns = [
    { field: "id", headerName: "Id", minWidth: 150, flex: 0.7 },
    {
      field: "code",
      headerName: "Tên mã giảm giá",
      minWidth: 180,
      flex: 1.4,
    },
    {
      field: "discount",
      headerName: "Giá trị",
      minWidth: 100,
      flex: 0.6,
    },
    
    {
        field: "sold",
        headerName: "Số lượng",
        minWidth: 100,
        flex: 0.6,
      },
    {
      field: "",
      flex: 0.8,
      minWidth: 120,
      headerName: " ",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button onClick={() => handleDelete(params.id)}>
              <AiOutlineDelete size={20} />
            </Button>
          </>
        );
      },
    },
  ];

  const row = [];

  coupons &&
  coupons.forEach((item) => {
      row.push({
        id: item._id,
        code: item.code,
        discount: item.discount + " %",
        sold: 10,
      });
    });



  // const handleDelete = async (id) => {
  //   axios.delete(`${server}/coupon/delete-coupon/${id}`,{withCredentials: true}).then((res) => {
  //     toast.success("Coupon code deleted succesfully!")
  //   })
  //   window.location.reload();
  // };


    const handleDelete = (id) => {
      axios
        .delete(`${server}/coupon/delete-coupon/${id}`, {
          withCredentials: true,
        })
        .then((res) => {
          toast.success("Xóa mã giảm giá thành công!");
          setCoupons((prevCoupons) => prevCoupons.filter((coupon) => coupon._id !== id));
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    };


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
    <>   
    <div className="w-full mx-8 pt-1 mt-10 bg-white">
        <DataGrid
            rows={row}
            columns={columns}
            pageSize={10}
            components={{
                Toolbar: CustomToolbar,
            }}
            autoHeight
          />
    </div>
    </>
  );
};

export default AllCoupon;