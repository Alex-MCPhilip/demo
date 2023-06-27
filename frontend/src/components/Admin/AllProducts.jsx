import { Button } from "@mui/material";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from '@mui/x-data-grid';


import React, { useEffect } from "react";
import { AiOutlineDelete, AiOutlineEye, AiOutlineEdit } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {  getAllProducts } from "../../redux/actions/product";
import { deleteProduct } from "../../redux/actions/product";
// import Loader from "../Layout/Loader";
import axios from "axios";
import { server } from "../../server";
import { useState } from "react";


const AllProducts = () => {

  const dispatch = useDispatch();
  const [data, setData] = useState([]);

  const handDelete = (id) =>{
    // console.log(id)
    dispatch(deleteProduct(id))
    window.location.reload();
    
  }



  useEffect(() => {
    axios.get(`${server}/product/get-all-products`, {withCredentials: true}).then((res) => {
        setData(res.data.products);
    })
  }, []);



  const columns = [
    { field: "id", headerName: "Id Sản phẩm", minWidth: 250, flex: 0.7 },
    {
      field: "name",
      headerName: "Tên",
      minWidth: 100,
      flex: 1.4,
    },
    {
      field: "price",
      headerName: "Giá",
      minWidth: 100,
      flex: 0.6,
    },
    {
      field: "Stock",
      headerName: "Số lượng",
      type: "number",
      minWidth: 80,
      flex: 0.5,
    },

    {
      field: "sold",
      headerName: "Lượt bán",
      type: "number",
      minWidth: 130,
      flex: 0.6,
    },
    
    {
      field: " ",
      flex: 0.8,
      minWidth: 120,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button onClick={() => handDelete(params.id)}>
                <AiOutlineDelete size={20} />
            </Button>
          </>
        );
      },
    },

    {
      field: "Preview",
      flex: 0.8,
      minWidth: 100,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/product/${params.id}`}>
              <Button>
                <AiOutlineEye size={20} />
              </Button>
            </Link>

            {/* <Link to={`/product/${params.id}`}>
              <Button>
                <AiOutlineEdit size={20} />
              </Button>
            </Link> */}
            
          </>
        );
      },
    },
  ];

  const row = [];

  data &&
  data.forEach((item) => {
      row.push({
        id: item._id,
        name: item.name,
        price: item.price  + "VNĐ ",
        Stock: item.stock,
        sold: item?.sold_out,
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
    <>
      <div
        className="bg-white w-full max-h-[90vh] pt-5 rounded flex justify-center"
        style={{ height: 850, overflow: 'auto' }}
      >
        <DataGrid
          rows={row}
          columns={columns}
          pageSize={5}
          components={{
            Toolbar: CustomToolbar,
          }}
        />
      </div>
    </>
  );
};

export default AllProducts;