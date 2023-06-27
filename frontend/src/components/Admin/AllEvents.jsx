import { Button } from "@mui/material";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from '@mui/x-data-grid';

import axios from "axios";
import React, { useEffect, useState } from "react";
import {  AiOutlineEye, AiOutlineDelete} from "react-icons/ai";
import { Link } from "react-router-dom";
import { server } from "../../server";



import { useDispatch, useSelector } from "react-redux";

import { deleteEvent } from "../../redux/actions/event";
// import { getAllProductsShop } from "../../redux/actions/product";
// import { deleteProduct } from "../../redux/actions/product";
// import Loader from "../Layout/Loader";


const AllEvents = () => {

  const [events, setEvents] = useState([]);
  useEffect(() => {
   axios.get(`${server}/event/admin-all-events`, {withCredentials: true}).then((res) =>{
    setEvents(res.data.events);
   })
  }, []);


  const dispatch = useDispatch();
  

  const handleDelete = (id) =>{
    // console.log(id)
    dispatch(deleteEvent(id))
    window.location.reload();
    
  }





  const columns = [

    { field: "id", headerName: "Id Sản phẩm", minWidth: 100, flex: 0.5 },
    {
      field: "name",
      headerName: "Tên sách",
      minWidth: 180,
      flex: 1.2,
    },
    {
      field: "price",
      headerName: "Giá",
      minWidth: 130,
      flex: 1,
    },
    {
      field: "start_Date",
      headerName: "Ngày bắt đầu",
      type: "date",
      minWidth: 120,
      flex: 0.9,
      valueFormatter: (params) => {
        const date = new Date(params.value.slice(0, 10));
        const formattedDate = new Intl.DateTimeFormat("vi-VN").format(date);
        return formattedDate;
      },
      // valueFormatter: (params) => new Date(params.value.slice(0,10)),
    },
    {
      field: "Finish_Date",
      headerName: "Ngày kết thúc",
      type:'date' ,
      minWidth: 120,
      flex: 0.9,
      valueFormatter: (params) => {
        const date = new Date(params.value.slice(0, 10));
        const formattedDate = new Intl.DateTimeFormat("vi-VN").format(date);
        return formattedDate;
      },
      // valueFormatter: (params) => new Date(params.value.slice(0,10)),
    },
    {
      field: "sold",
      headerName: "Lượt bán",
      type: "number",
      minWidth:  100,
      flex: 0.8,
    },
    {
      field: "status",
      headerName: "Trạng thái",
      minWidth: 100,
      flex: 0.8,
    },    
    {
      field: "",
      flex: 0.6,
      minWidth: 80,
      headerName: "Xóa",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>

            <Button
              onClick={() => handleDelete(params.id)}
            >
              <AiOutlineDelete size={20} />
            </Button>

            {/* <Link to={`/product/${params.id}?isEvent=true`}>
              <Button>
                <AiOutlineEye size={20} />
              </Button>
            </Link> */}
          </>
        );
      },
    },
   
  ];

  const row = [];

  events &&
    events.forEach((item) => {
      row.push({
        id: item._id,
        name: item.name,
        price: item.price + "VNĐ ", 
        start_Date: item.start_Date,
        Finish_Date: item.Finish_Date,
        sold: item.sold_out,
        status: item.status,
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
  );
};

export default AllEvents;