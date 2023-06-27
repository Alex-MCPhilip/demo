import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";
import {
  AiFillHeart,
  AiFillStar,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineStar,
} from "react-icons/ai";
// cái xem sản phẩm nhỏ hơn mác định
import ProductDetailsCard from "../ProductDetailsCard/ProductDetailsCard";
import { backend_url } from "../../../server";
import { useDispatch, useSelector } from "react-redux";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../../redux/actions/wishlist";
import { addTocart } from "../../../redux/actions/cart";
import { toast } from "react-toastify";
import Ratings from "../../Products/Ratings";

const ProductCard = ({ data,isEvent }) => {
  
    const { wishlist } = useSelector((state) => state.wishlist);
    const { cart } = useSelector((state) => state.cart);

    const [click, setClick] = useState(false);
    const [open, setOpen] = useState(false);
    
    const dispatch = useDispatch();

    // const d = data.name
    // const Product_name = d.replace(/\s+/g, "-");


  useEffect(() => {
    if (wishlist && wishlist.find((i) => i._id === data._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [wishlist]);

  const removeFromWishlistHandler = (data) => {
    setClick(!click);
    dispatch(removeFromWishlist(data));
  };

  const addToWishlistHandler = (data) => {
    setClick(!click);
    dispatch(addToWishlist(data));
  };

  const addToCartHandler = (id) => {
    const isItemExists = cart && cart.find((i) => i._id === id);
    if (isItemExists) {
      toast.error("Sản phẩm đã có trong giỏ hàng!");
    } else {
      if (data.stock < 1) {
        toast.error("Số lượng sản phẩm có hạn!");
      } else {
        const cartData = { ...data, qty: 1 };
        dispatch(addTocart(cartData));
        toast.success("Sản phẩm đã được thêm vào giỏ hàng thành công !");
      }
    }
  };


  return (
    <>
      <div className=" w-full h-[370px] bg-white shadow-2xl rounded-md p-3 relative cursor-pointer">
        <div className="  transform transition duration-300 
        hover:scale-[120%]
        ">
          {/* hover:drop-shadow-md  */}
          {/* hover:-translate-y-2  */}

        <Link to={`${isEvent === true ? `/product/${data._id}?isEvent=true` : `/product/${data._id}`}`} >

            <img
            src={`${backend_url}${data.images && data.images[0]}`}
            // src={data.image_Url[0].url} 
            alt=""
            className="drop-shadow-xl w-full h-[170px] object-contain "
            />
        </Link>

        </div>

        <Link to={`${isEvent === true ? `/product/${data._id}?isEvent=true` : `/product/${data._id}`}`}>


            <h4 className={`mt-10 pb-3 font-[500] ${data.name.length < 40 ? 'mb-1' : ''}`}>
              {data.name.length > 40 ? data.name.slice(0, 40) + "..." : data.name}
            </h4>


            <div className="flex">
              <Ratings rating={data?.ratings} />
            </div>

            <div className="py-2 flex items-center justify-between">
              
              <div className="flex flex-col">
                
                <h3 className={`${styles.price}`}>
                  {data.originalPrice ? data.originalPrice + "VNĐ" : null}
                  {/* {data.originalPrice ? data.originalPrice : null} */}
                </h3>
                
                <h5 className={`${styles.productDiscountPrice,"text-[#00ab9f] font-[700] "}`}>

                {/* {data.originalPrice === 0
                  ? data.originalPrice
                  : data.discountPrice} */}

                  {data.price === 0
                    ? data.price
                    : data.price}
                  <span className="pl-1">VNĐ</span>
                </h5>
                
              </div>

              <span className="font-[400] text-[17px] text-[#68d284]">
                đã bán : 
                {/* {data.total_sell} */}
                {data?.sold_out}
              </span>
            </div>

        </Link>



        {/* side options */}
        <div>
          {click ? (
            <AiFillHeart
              size={22}
              className="cursor-pointer absolute right-2 top-5"
              onClick={() => removeFromWishlistHandler(data)}
              color={click ? "red" : "#333"}
              title="Remove from wishlist"
            />
          ) : (
            <AiOutlineHeart
              size={22}
              className="cursor-pointer absolute right-2 top-5"
              onClick={() => addToWishlistHandler(data)}
              color={click ? "red" : "#333"}
              title="Thêm vào danh sách yêu thích"
            />
          )}
          <AiOutlineEye
            size={22}
            className="cursor-pointer absolute right-2 top-14"
            onClick={() => setOpen(!open)}
            color="#333"
            title="Xem nhanh"
          />
          <AiOutlineShoppingCart
            size={25}
            className="cursor-pointer absolute right-2 top-24"
            onClick={() => addToCartHandler(data._id)}
            color="#444"
            title="Thêm vào giỏ hàng"
          />
          {open ? <ProductDetailsCard setOpen={setOpen} data={data} /> : null}
        </div>

      
      </div>
    </>
  );
};

export default ProductCard;





