import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../styles/styles";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";

import { getAllProducts } from "../../redux/actions/product";
import { backend_url, server } from "../../server";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../redux/actions/wishlist";
import { addTocart } from "../../redux/actions/cart";
import { toast } from "react-toastify";
import Ratings from "./Ratings";
import axios from "axios";


const ProductDetails = ({data}) => {




  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const { user,isAuthenticated } = useSelector((state) => state.user);
  const { products } = useSelector((state) => state.products);
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const [select, setSelect] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts(data && data?._id));
    if (wishlist && wishlist.find((i) => i._id === data?._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [data, wishlist]);


  


  if (!data) {
    return null; // Or display an appropriate placeholder
  }

  // const d = data.name;
  // const Product_name = d.replace(/\s+/g, "-");


  const incrementCount = () => {
    setCount(count + 1);
  };

  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };


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
      toast.error("Sản phẩm đã nằm trong giỏ hàng!");
    } else {
      if (data.stock < 1) {
        toast.error("Số lượng sản phẩm có hạn!");
      } else {
        const cartData = { ...data, qty: count };
        dispatch(addTocart(cartData));
        toast.success("Sản phẩm đã được thêm vào giỏ hàng!");
      }
    }
  };

  const totalReviewsLength =
    products &&
    products.reduce((acc, product) => acc + product.reviews.length, 0);

  const totalRatings =
    products &&
    products.reduce(
      (acc, product) =>
        acc + product.reviews.reduce((sum, review) => sum + review.rating, 0),
      0
    );

  const avg =  totalRatings / totalReviewsLength || 0;

  const averageRating = avg.toFixed(2);




  
  const handleMessageSubmit = async () => {



    // navigate("/inbox?conversation=.......1.10.13")
    
    if (isAuthenticated) {
      const groupTitle = data._id + user._id;
      const userId = user._id;
      const sellerId = user._id;
      await axios
        .post(`${server}/conversation/create-new-conversation`, {
          groupTitle,
          userId,
          sellerId,
        })
        .then((res) => {
          navigate(`/inbox?${res.data.conversation._id}`);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    } else {
      toast.error("làm ơn hãy tạo tài khoản để kết nối");
    }
  };

  console.log(data)


  return (
    <div className='bg-white'>
        {
            data ? (
                <div className={`${styles.section} w-[90%] 800px:w-[80%]`} >
                    <div className="w-full py-5" >

                        <div className="block w-full 800px:flex" >
                            
                            {/* bên trái */}
                            <div className='w-full 800px:w-[50%]'>
                                <img
                                    src={`${backend_url}${data && data.images[select]}`}
                                    // src={data && data.image_Url[select].url}
                                    alt=""
                                    className="w-[80%]"
                                />
                                <div className="w-full flex">
                                    {data &&
                                        data.images.map((i, index) => ( 
                                        
                                        
                                        <div className={`${
                                          select === 0 ? "border" : "null" 
                                          } cursor-pointer ` } >
                                            <img 
                                                src={`${backend_url}${i}`}
                                                // src={data?.image_Url[0].url} alt=''
                                                className="h-[200px]  overflow-hidden mr-3 mt-3"
                                                // onClick={() => setSelect(0)}
                                                onClick={() => setSelect(index)}

                                            />
                                        </div>

                                        ))}
                                    <div
                                        className={`${
                                        select === 1 ? "border" : "null"
                                        } cursor-pointer`}
                                    ></div>
                                </div>
                            </div>

                            {/* bên  phải */}
                            <div className="w-full 800px:w-[50%] pt-5" >
                    
                                <h1 className={`${styles.productTitle}`}>{data.name}</h1>
                                <p>{data.description}</p>
                                <div className="flex pt-3 justify-between">
                                    <h4 className={`${styles.productDiscountPrice}`}>
                                        {/* {data.discount_price} */}
                                        {data.originalPrice}
                                        <span className="pl-1">VNĐ</span>

                                    </h4>
                                    <h3 className={`${styles.price}`}>
                                        {data.price ? data.price + "VNĐ" : null}
                                    </h3>
                                </div>

                                {/* tăng giả số lượng mua vs trai tim */}
                                <div className="flex  mt-12 justify-between">
                                    <div className="ml-20">
                                        <button
                                        className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                                        onClick={decrementCount}
                                        >
                                        -
                                        </button>
                                        <span className="bg-gray-200 text-gray-800 font-medium px-4 py-[11px]">
                                        {count}
                                        </span>
                                        <button
                                        className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                                        onClick={incrementCount}
                                        >
                                        +
                                        </button>
                                    </div>
                                    {/* trái tim */}
                                    <div className="mr-40 ">
                                        {click ? (
                                        <AiFillHeart
                                            size={30}
                                            className="cursor-pointer"
                                            onClick={() => removeFromWishlistHandler(data)}
                                            color={click ? "red" : "#333"}
                                            title="Remove from wishlist"
                                        />
                                        ) : (
                                        <AiOutlineHeart
                                            size={30}
                                            className="cursor-pointer"
                                            onClick={() => addToWishlistHandler(data)}
                                            color={click ? "red" : "#333"}
                                            title="Add to wishlist"
                                        />
                                        )}
                                    </div>
                                </div>


                                <div className="flex justify-around w-full">
                                  {/*  thêm vào giỏ hàng */}
                                  <div
                                  className={`${styles.button} flex items-center `}
                                  onClick={() => addToCartHandler(data._id)}
                                  >
                                      <span className="  text-white flex items-center">
                                          Thêm giỏ hàng <AiOutlineShoppingCart className="mr-1" />
                                      </span>
                                  </div>

                                  {/* nhắn tin */}
                                  <div className="flex items-center"> 
                                      <div
                                          className={`${styles.button} `}
                                          onClick={handleMessageSubmit}
                                      >
                                          <span className="text-white flex items-center">
                                            Nhắn tin <AiOutlineMessage className="ml-1" />
                                          </span>
                                      </div>
                                  </div>

                                    


                                </div>

                            </div>


                        </div>
                    </div>

                    <ProductDetailsInfo
                        data={data}
                        // products={products}
                        // totalReviewsLength={totalReviewsLength}
                        // averageRating={averageRating}
                    />
                    <br />
                    <br />
                </div>
            ) : null
        }
    </div>
  )
  
}



const ProductDetailsInfo = ({
  data,
  // products,
  // totalReviewsLength,
  // averageRating,
}) => {
  const [active, setActive] = useState(1);

  return (
    <div className="bg-[#f5f6fb] px-2 800px:px-10 py-2 rounded">
      
      <div className="w-full flex justify-around border-b pt-10 pb-2">
        
        <div className="relative">
          <h5
            className={
              "text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
            }
            onClick={() => setActive(1)}
          >
            Chi tiết sản phẩm
          </h5>
          {active === 1 ? (
            <div className={`${styles.active_indicator}`} />
          ) : null}
        </div>

        <div className="relative">
          <h5
            className={
              "text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
            }
            onClick={() => setActive(2)}
          >
            Đánh giá sản phẩm
          </h5>
          {active === 2 ? (
            <div className={`${styles.active_indicator}`} />
          ) : null}
        </div>

      </div>
      

      {active === 1 ? (
        <>
        {/* tạo ra kí tự ngẫu nhiên lorem,  */}
          <p className="py-2 text-[18px] leading-8 pb-10 whitespace-pre-line">
            {data.description}
          </p>
        </>
      ) : null}


      {active === 2 ? (
          <div className="w-full min-h-[40vh] flex flex-col items-center py-3 overflow-y-scroll">
          {data &&
            data.reviews.map((item, index) => (
              <div className="w-full flex my-2">
                <img
                  src={`${backend_url}/${item.user.avatar}`}
                  alt=""
                  className="w-[50px] h-[50px] rounded-full"
                />
                <div className="pl-2 ">
                  <div className="w-full flex items-center">
                    <h1 className="font-[500] mr-3">{item.user.name}</h1>
                    <Ratings rating={data?.ratings} />
                  </div>
                  <p>{item.comment}</p>
                </div>
              </div>
            ))}

          <div className="w-full flex justify-center">
            {data && data.reviews.length === 0 && (
              <h5 className="">Không có đánh giá nào cho sản phẩm này !</h5>
            )}
          </div>
        </div>
      ) : null}



      {/* {active === 3 && (
        <div className="w-full block 800px:flex p-5">
          <div className="w-full 800px:w-[50%]">
            <Link to={`/shop/preview/${data.shop._id}`}>
              <div className="flex items-center">
                <img
                  src={`${backend_url}${data?.shop?.avatar}`}
                  className="w-[50px] h-[50px] rounded-full"
                  alt=""
                />
                <div className="pl-3">
                  <h3 className={`${styles.shop_name}`}>{data.shop.name}</h3>
                  <h5 className="pb-2 text-[15px]">
                    ({averageRating}/5) Ratings
                  </h5>
                </div>
              </div>
            </Link>
            <p className="pt-2">{data.shop.description}</p>
          </div>
          <div className="w-full 800px:w-[50%] mt-5 800px:mt-0 800px:flex flex-col items-end">
            <div className="text-left">
              <h5 className="font-[600]">
                Joined on:{" "}
                <span className="font-[500]">
                  {data.shop?.createdAt?.slice(0, 10)}
                </span>
              </h5>
              <h5 className="font-[600] pt-3">
                Total Products:{" "}
                <span className="font-[500]">
                  {products && products.length}
                </span>
              </h5>
              <h5 className="font-[600] pt-3">
                Total Reviews:{" "}
                <span className="font-[500]">{totalReviewsLength}</span>
              </h5>
              <Link to="/">
                <div
                  className={`${styles.button} !rounded-[4px] !h-[39.5px] mt-3`}
                >
                  <h4 className="text-white">Visit Shop</h4>
                </div>
              </Link>
            </div>
          </div>
        </div>
      )}
 */}

    </div>
  );
};




export default ProductDetails