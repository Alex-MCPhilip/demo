
import React, { useEffect, useState } from "react";
import styles from "../../styles/styles";
import { BsFillBagFill } from "react-icons/bs";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersOfAdmin } from "../../redux/actions/order";
import { backend_url, server } from "../../server";
import axios from "axios";
import { toast } from "react-toastify";

const OrderDetails = () => {


  const { adminOrders, adminOrderLoading } = useSelector((state) => state.order);
//   const { seller } = useSelector((state) => state.seller);
  const dispatch = useDispatch();
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    dispatch(getAllOrdersOfAdmin());
  }, [dispatch]);

  const data = adminOrders && adminOrders.find((item) => item._id === id);

  const orderUpdateHandler = async (e) => {
    await axios
      .put(
        `${server}/order/update-order-status/${id}`,
        {
          status,
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success("Cập nhật đơn hàng!");
        // navigate("/dashboard-orders");
        navigate("/admin-orders");

      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const refundOrderUpdateHandler = async (e) => {
    await axios
    .put(
      `${server}/order/order-refund-success/${id}`,
      {
        status,
      },
      { withCredentials: true }
    )
    .then((res) => {
      toast.success("Cập nhật đơn hàng!");
      dispatch(getAllOrdersOfAdmin());
    })
    .catch((error) => {
      toast.error(error.response.data.message);
    });
  }



  console.log(data?.status);



  return (

    <div className={`${styles.section}`}>

        {/* header */}
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center">
          <BsFillBagFill size={30} color="crimson" />
          <h1 className="pl-2 text-[25px]">Chi tiết đơn đặt hàng </h1>
        </div>
        <Link to="/admin-orders">
          <div
            className={`${styles.button} !bg-[#fce1e6] !rounded-[8px] text-[#e94560] font-[600] !h-[45px] text-[20px] w-full p-2`}
          >
            Danh sách đơn đặt hàng
          </div>
        </Link>
      </div>

      <div className="w-full flex items-center justify-between">
        <h5 className="text-[#00000084]">
          Order ID: <span>#{data?._id?.slice(0, 8)}</span>
        </h5>
        <h5 className="text-[#00000084]">
          {/* tính luôn dấu gạch ngang 2001 - 15 - 06 */}
          Ngày đặt: <span>{data?.createdAt?.slice(0, 10)}</span>
        </h5>
      </div>


      {/* ở giữa */}      
      <div className="w-full max-h-[200px] overflow-y-auto" >
        {data &&
            data?.cart.map((item, index) => (
            <div className="w-full flex items-start mb-5">
                <img
                src={`${backend_url}/${item.images[0]}`}
                alt=""
                className="w-[30x] h-[30px]"
                />
                <div className="w-full">
                <h5 className="pl-3 text-[20px]">{item.name}</h5>
                <h5 className="pl-3 text-[20px] text-[#00000091]">
                    {item.price} VNĐ x {item.qty} 
                </h5>
                </div>
            </div>
            ))}
      </div>

      <div className="border-t w-full text-right">
        <h5 className="pt-3 text-[18px]">
          Tổng tiền : <strong>{data?.totalPrice}<span className="pl-1">VNĐ</span></strong>
        </h5>
      </div>
      

        {/* địa chỉ giao hàng. thanh  toán */}
      <div className="w-full 800px:flex items-center">
        {/* địa chỉ giao hàng */}
        <div className="w-full 800px:w-[60%]">
          <h4 className="pt-3 text-[20px] font-[600]">Địa chỉ giao hàng:</h4>
          
          <div className="pt-3 text-[20px] flex items-center">
              <h4 className=" text-[20px] 800px:text-[unset] p-2">
                {data?.shippingAddress.address1}
              </h4>
              /
              <h4 className="text-[20px] 800px:text-[unset] p-2">
                {data?.shippingAddress.address2}
              </h4>
          </div>
          <div className="pt-3 text-[20px] flex items-center">
              <h4 className=" text-[20px]">
                {data?.shippingAddress.country}
              </h4>
              <span className="p-2">-</span>
             <h4 className=" text-[20px]">
                {data?.shippingAddress.city}
             </h4>
             <span className="p-2">-</span>
            <h4 className=" text-[20px]">
                {data?.user?.phoneNumber}
            </h4>
          </div>

        </div>

        {/* thanh toán trức tuyến */}
        <div className="w-full 800px:w-[40%]">
          <h4 className="pt-3 text-[20px]">Thông tin thanh toán:</h4>
          <h4>
            Trạng thái:{" "}
            {data?.paymentInfo?.status ? data?.paymentInfo?.status : "Chưa trả tiền"}
          </h4>
        </div>

      </div>
      

      <h4 className="pt-3 text-[20px] font-[600]">Trạng thái đơn hàng:</h4>
      {data?.status !== "Xử lý hoàn tiền" && data?.status !== "Hoàn tiền thành công" && (
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-[200px] mt-2 border h-[35px] rounded-[5px]"
        >
          {[
            "Đang chờ xử lý",
            "Đã chuyển cho đối tác giao hàng",
            "Đang chuyển hàng",
            "Đã nhận",
            "Trên đường giao",
            "Đã giao hàng",
          ]
            .slice(
              [
                "Đang chờ xử lý",
                "Đã chuyển cho đối tác giao hàng",
                "Đang chuyển hàng",
                "Đã nhận",
                "Trên đường giao",
                "Đã giao hàng",
              ].indexOf(data?.status)
            )
            .map((option, index) => (
              <option value={option} key={index}>
                {option}
              </option>
            ))}
        </select>
      )}
      {
        data?.status === "Xử lý hoàn tiền" || data?.status === "Hoàn tiền thành công" ? (
        <select value={status} 
            onChange={(e) => setStatus(e.target.value)}
            className="w-[200px] mt-2 border h-[35px] rounded-[5px]"
        >
        {[
            "Xử lý hoàn tiền",
            "Hoàn tiền thành công",
          ]
            .slice(
              [
                "Xử lý hoàn tiền",
                "Hoàn tiền thành công",
              ].indexOf(data?.status)
            )
            .map((option, index) => (
              <option value={option} key={index}>
                {option}
              </option>
            ))}
      </select>
        ) : null
      }

      <div
        className={`${styles.button}  mt-5 !bg-[#FCE1E6] !rounded-[4px] text-[#E94560] font-[600] !h-[45px] text-[18px] text-center p-4 w-full`}
        onClick={data?.status !== "Hoàn tiền thành công" ? orderUpdateHandler : refundOrderUpdateHandler} // data ko tồn tại, status ko tồn tại === undefined  !=== true/false chạy order chạy refund
      >
        Cập nhật trạng thái
      </div>
    </div>
  )
}

export default OrderDetails