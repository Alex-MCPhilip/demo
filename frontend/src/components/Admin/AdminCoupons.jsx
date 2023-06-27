
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../styles/styles";
// import Loader from "../Layout/Loader";
import { server } from "../../server";
import { toast } from "react-toastify";

const AllCoupons = () => {
  const [open, setOpen] = useState(false);
  const [code, setCode] = useState("");
  const [discount, setDiscount] = useState(null);

  const [minAmount, setMinAmout] = useState(null);
  const [maxAmount, setMaxAmount] = useState(null);

  // const [selectedProducts, setSelectedProducts] = useState(null);
  

  const { user } = useSelector((state) => state.user);

  // const { products } = useSelector((state) => state.products);


  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post(
        `${server}/coupon/create-coupon-code`,
        {
          code,
          discount,
          minAmount,
          maxAmount,
          // selectedProducts,
          createdBy: user._id,
        },
        { withCredentials: true }
      )
      .then((res) => {
       toast.success("Mã giảm giá được tạo thành công !");
       setOpen(false);
      //  window.location.reload();
       window.location.reload(true); 
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  return (
    <>
    <div className="w-[90%] 800px:w-[50%] bg-white  shadow h-[80vh] rounded-[4px] p-3 overflow-y-scroll mt-10">
      <h5 className="text-[30px] font-Poppins text-center"> Tạo mã giảm giá</h5>
      {/* create coupons form  */}
      <form 
        onSubmit={handleSubmit} aria-required={true}
        >
          <br />
          <div>
            <label className="pb-2">
              Tên mã giảm giá <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              required
              value={code}
              className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              onChange={(e) => setCode(e.target.value)}
              placeholder="Hãy điền mã giảm giá..."
            />
          </div>
          <br />
          <div>
            <label className="pb-2">
              % giảm giá {" "}
              <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="value"
              value={discount}
              required
              className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              onChange={(e) => setDiscount(e.target.value)}
              placeholder="Hãy điền % giảm giả..."
            />
          </div>
          <br />
          <div>
            <label className="pb-2">Giá trị tối thiểu</label>
            <input
              type="number"
              name="value"
              value={minAmount}
              className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              onChange={(e) => setMinAmout(e.target.value)}
              placeholder="Hãy điền giá trị tối thiểu áp dụng mã giảm giá..."
            />
          </div>
          <br />
          <div>
            <label className="pb-2">Giá trị tối đa</label>
            <input
              type="number"
              name="value"
              value={maxAmount}
              className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              onChange={(e) => setMaxAmount(e.target.value)}
              placeholder="Hãy điền giá trị tối đã áp dụng mã giảm giá..."
            />
          </div>
          <br />


          {/* <div>
            <label className="pb-2">Selected Product</label>
            <select
              className="w-full mt-2 border h-[35px] rounded-[5px]"
              value={selectedProducts}
              onChange={(e) => setSelectedProducts(e.target.value)}
            >
              <option value="Choose your selected products">
                Choose a selected product
              </option>
              {products &&
                products.map((i) => (
                  <option value={i.name} key={i.name}>
                    {i.name}
                  </option>
                ))}
            </select>
          </div> */}


          <br />
          <div>
            <input
              type="submit"
              value="Tạo mã giảm giá"
              className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
      </form>
    </div>

    </>
  );
};

export default AllCoupons;