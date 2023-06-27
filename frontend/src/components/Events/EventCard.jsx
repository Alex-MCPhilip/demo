import React from "react";
import { backend_url } from "../../server";
import styles from "../../styles/styles";
import CountDown from "./CountDown";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addTocart } from "../../redux/actions/cart";
import { toast } from "react-toastify";

const EventCard = ({ active, data }) => {

  if (!data || !data.images) {
    return null;
  }
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const addToCartHandler = (data) => {
    const isItemExists = cart && cart.find((i) => i._id === data._id);
    if (isItemExists) {
      toast.error("Mặt hàng đã có trong giỏ hàng!");
    } else {
      if (data.stock < 1) {
        toast.error("Số lượng sản phẩm có hạn!");
      } else {
        const cartData = { ...data, qty: 1 };
        dispatch(addTocart(cartData));
        toast.success("Sản phẩm đã được thêm thành công !");
      }
    }
  }


  return (
    <div
      className={`w-full block bg-white shadow-2xl rounded-md ${
        active ? "unset" : "mb-12"
      } lg:flex p-2`}
    >
      <div className="w-full lg:-w[50%] m-auto">


      <img
          src={`${backend_url}${data.images[0]}`}
          alt=""
          className="w-full h-[170px] object-contain"
        />


        {/* <img src={`${backend_url}${data.images[0]}`} alt="" /> */}
        {/* <img src={data.image_Url[0].url} alt="" */}
            {/* className="w-full h-[170px] object-contain" */}
        {/* /> */}
      </div>
      <div className="w-full lg:[w-50%] flex flex-col justify-center">
            <h2 className={`${styles.productTitle}`}>
                {/* Sách can đảm hãy bước tiếp */}
                {data.name}
                </h2>
            <p>
                {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                Quisquam nesciunt nobis facilis, perspiciatis veritatis maxime natus. 
                Repellat quia odio repellendus ipsam, in debitis ipsum laboriosam.
                Assumenda id autem pariatur quis? */}
                {data.description}
            </p>
            <div className="flex py-2 justify-between">
                <div className="flex">
                    <h5 className="font-[500] text-[18px] text-[#ababab] pr-3 line-through">
                    {/* 5000 */}
                    {data.originalPrice}
                    VNĐ
                    </h5>
                    <h5 className="font-bold text-[20px] text-[#00ab9f] font-Roboto">
                    {/* 300 */}
                    {data.price}
                    <span className="pl-1">
                      VNĐ
                    </span>
                    </h5>
                </div>
                <span className="pr-3 font-[400] text-[17px] text-[#44a55e]">
                    {/* 500 */}
                    <span className="pr-1">
                      Đã bán được :
                    </span>
                    {data.sold_out}
                </span>
            </div>
            
            <CountDown data={data} />
            {/* <CountDown  /> */}
            <br />
            <div className="flex items-center">
                <Link to={`/product/${data._id}?isEvent=true`}>
                    <div className={`${styles.button} text-[#fff]  border-gray-800  shadow-2xl rounded-md `}>
                        Xem chi tiết
                    </div>
                </Link>
                <div className={`${styles.button} text-[#fff] ml-5  border-gray-800 shadow-2xl rounded-md `} onClick={() => addToCartHandler(data)}>
                    Thêm vào giỏ hàng
                </div>
            </div>
      </div>
    </div>
  );
};

export default EventCard;