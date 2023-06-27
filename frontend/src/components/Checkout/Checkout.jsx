import React, { useState } from "react";
import styles from "../../styles/styles";
import { Country, State } from "country-state-city";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";

const Checkout = () => {
  const { user } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.cart);
  const [userInfo, setUserInfo] = useState(false);
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  // const [zipCode, setZipCode] = useState(null);

  const [couponCode, setCouponCode] = useState(""); // là biến lưu trữ mã giảm giá được người dùng nhập vào.
  const [couponCodeData, setCouponCodeData] = useState(null); // là biến lưu trữ thông tin về mã giảm giá sau khi được truy xuất từ server
  const [discountPrice, setDiscountPrice] = useState(null);//  là biến lưu trữ giá trị giảm giá được tính toán dựa trên subTotalPrice (tổng giá trị của giỏ hàng) và tỷ lệ giảm giá (value) từ couponCodeData.
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const paymentSubmit = () => {
   if(address1 === "" || address2 === "" || country === "" || city === ""){
      toast.error("Làm ơn hãy điền đầy đủ thông tin !")
   } else{
    const shippingAddress = {
      address1,
      address2,
      country,
      city,
    };

    const orderData = {
      cart,// giỏ hàng
      totalPrice,//tổng giá trị đơn hàng
      subTotalPrice, // tổng giá trị của giỏ hàng trước khi nhập mã giảm giá
      shipping,
      discountPrice,
      shippingAddress,
      user,//thông tin người dùng
    }

    // lưu orderData thành latestOrder để lấy ra tính tiền
    localStorage.setItem("latestOrder", JSON.stringify(orderData));
    navigate("/payment");
   }
  };


  // tính tổng giá trị của giỏ hàng trước khi nhập mã giảm giá
  const subTotalPrice = cart.reduce(
    (acc, item) => acc + item.qty * item.price, //acc là biến tích lũy, ban đầu có giá trị là 0. item là phần tử hiện tại đang được xem xét trong mỗi lần lặp.
    0
  );

  // tính phí vận chuyển bằng 10%
  const shipping = subTotalPrice * 0.1;


  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = couponCode;
  
    try {
      const response = await axios.get(`${server}/coupon/get-coupon-value/${name}`);
      const couponCode = response.data.couponCode;
      const couponCodeValue = couponCode?.discount;
  
      if (couponCode !== null) {
        const discountPrice = (subTotalPrice * couponCodeValue) / 100;
        setDiscountPrice(discountPrice);
        setCouponCodeData(couponCode);
        setCouponCode("");
      } else {
        toast.error("Mã giảm giá không tồn tại!");
        setCouponCode("");
      }
    } catch (error) {
      toast.error("Đã xảy ra lỗi khi kiểm tra mã giảm giá!");
      setCouponCode("");
    }
  };
  

  // Biến subTotalPrice là tổng giá trị của giỏ hàng, 
  // được tính bằng cách lấy tổng của (qty * discountPrice)
  // của từng sản phẩm trong giỏ hàng.

  // discountPrice là giá trị giảm giá được tính toán 
  // dựa trên tổng giá trị hàng





  // tính giá trị giảm giá dựa trên giá giảm { couponCode }
  // nếu couponCodeData = rỗng thì " null"  nếu có thì = discountPrice
  const discountPercentenge = couponCodeData ? discountPrice : "";

  // subTotal Price : tổng giá trị của giỏ hàng
  // thành tiền cuối cùng : total price
  const totalPrice = couponCodeData
    ? (subTotalPrice + shipping - discountPercentenge).toFixed(2)
    : (subTotalPrice + shipping).toFixed(2);

  console.log(discountPercentenge);

  return (
    <div className="w-full flex flex-col items-center py-8">
      <div className="w-[90%] 1000px:w-[70%] block 800px:flex">
        <div className="w-full 800px:w-[65%]">
          <ShippingInfo
            user={user}
            country={country}
            setCountry={setCountry}
            city={city}
            setCity={setCity}
            userInfo={userInfo}
            setUserInfo={setUserInfo}
            address1={address1}
            setAddress1={setAddress1}
            address2={address2}
            setAddress2={setAddress2}
          />
        </div>
        <div className="w-full 800px:w-[35%] 800px:mt-0 mt-8">
          <CartData
            handleSubmit={handleSubmit}
            totalPrice={totalPrice}
            shipping={shipping}
            subTotalPrice={subTotalPrice}
            couponCode={couponCode}
            setCouponCode={setCouponCode}
            discountPercentenge={discountPercentenge}
          />
        </div>
      </div>
      <div
        className={`${styles.button} w-[150px] 800px:w-[280px] mt-10`}
        onClick={paymentSubmit}
      >
        <h5 className="text-white">Đi đến thanh toán </h5>
      </div>
    </div>
  );
};

const ShippingInfo = ({
  user,
  country,
  setCountry,
  city,
  setCity,
  userInfo,
  setUserInfo,
  address1,
  setAddress1,
  address2,
  setAddress2,
 
}) => {
  return (
    <div className="w-full 800px:w-[95%] bg-white rounded-md p-5 pb-8">
      <h5 className="text-[18px] font-[500]">Địa chỉ giao hàng</h5>
      <br />
      <form>
        <div className="w-full flex pb-3">
          {/* full name */}
          <div className="w-[50%]">
            <label className="block pb-2">Tên đầy đủ</label>
            <input
              type="text"
              value={user && user.name}
              required
              className={`${styles.input} !w-[95%]`}
            />
          </div>
          {/*  phone */}
          <div className="w-[50%]">
            <label className="block pb-2">Số điện thoại</label>
            <input
              type="number"
              required
              value={user && user.phoneNumber}
              className={`${styles.input} !w-[95%]`}
            />
          </div>
        </div>


        <div className="w-full flex pb-3">
          {/* country */}
          <div className="w-[50%]">
            <label className="block pb-2">Quốc gia</label>
            <select
              className="w-[95%] border h-[40px] rounded-[5px]"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            >
              <option className="block pb-2" value="">
                Hãy chọn quốc gia
              </option>

              {Country &&
                Country.getAllCountries().map((item) => (
                  <option key={item.isoCode} value={item.isoCode}>
                    {item.name}
                  </option>
                ))}

            </select>
          </div>
          {/* city */}
          <div className="w-[50%]">
            <label className="block pb-2">Thành phố</label>
            <select
              className="w-[95%] border h-[40px] rounded-[5px]"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            >
              <option className="block pb-2" value="">
                Hãy chọn thành phố
              </option>

              {State &&
                State.getStatesOfCountry(country).map((item) => (
                  <option key={item.isoCode} value={item.isoCode}>
                    {item.name}
                  </option>
                ))}
                
            </select>
          </div>
        </div>


        <div className="w-full flex pb-3">
          {/* addres 1  */}
          <div className="w-[50%]">
            <label className="block pb-2">Địa chỉ 1</label>
            <input
              type="address"
              required
              value={address1}
              onChange={(e) => setAddress1(e.target.value)}
              className={`${styles.input} !w-[95%]`}
            />
          </div>
          {/* address 2  */}
          <div className="w-[50%]">
            <label className="block pb-2">Địa chỉ 2</label>
            <input
              type="address"
              value={address2}
              onChange={(e) => setAddress2(e.target.value)}
              required
              className={`${styles.input}`}
            />
          </div>
        </div>

      </form>
      <h5 
      // border-[#f63b60] text-center text-[#f63b60] rounded-[3px] mt-8 cursor-pointer
        className={`${styles.input} text-[18px] cursor-pointer inline-block bg-[#f6f6f5]`}
        
        onClick={() => setUserInfo(!userInfo)}
      >
        Lấy địa chỉ trong hệ thống 
      </h5>
      {userInfo && (
        <div>
          {user &&
            user.addresses.map((item, index) => (
              <div className="w-full flex mt-1">
                <input
                  type="checkbox"
                  className="mr-3"
                  value={item.addressType}
                  onClick={() =>
                    setAddress1(item.address1) ||
                    setAddress2(item.address2) ||
        
                    setCountry(item.country) ||
                    setCity(item.city)
                  }
                />
                <h2>
                  {item.addressType}
                  </h2>
              </div>
            ))}
        </div>
       )}
    </div>
  );
};

const CartData = ({
  handleSubmit,
  totalPrice,
  shipping,
  subTotalPrice,
  couponCode,
  setCouponCode,
  discountPercentenge,
}) => {
  return (
    <div className="w-full bg-[#fff] rounded-md p-5 pb-8">
      <div className="flex justify-between">
        {/* tổng tiền hàng */}
        <h3 className="text-[16px] font-[400] text-[#000000a4]">Tổng thanh toán :</h3>
        <h5 className="text-[18px] font-[600]">
          {subTotalPrice}
          <span className="pl-1">VNĐ</span>
        </h5>
      </div>
      <br />
      {/* Phí vẫn chuyển */}
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">Phí vận chuyển :</h3>
        <h5 className="text-[18px] font-[600]">
          {shipping.toFixed(2)}
          <sapn className="pl-1">VNĐ</sapn>
        </h5>
      </div>
      <br />
      {/* giảm giá */}
      <div className="flex justify-between border-b pb-3">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">Giảm giá :</h3>
        <h5 className="text-[18px] font-[600]">
          - {discountPercentenge ? discountPercentenge.toString()  + "VNĐ"  : null}
        </h5>
      </div>
      {/* tông tiền hàng */}
      <h5 className="text-[18px] font-[600] text-end pt-3">
        {totalPrice}
        <span className="pl-1">VNĐ</span>
      </h5>
      <br />


      <form 
      onSubmit={handleSubmit}
      >
        {/* coupon */}
        <input
          type="text"
          className={`${styles.input} h-[40px] pl-2 `}
          placeholder="Coupoun code"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          required
        />
        {/* supmit */}
        <input
          className={`w-full h-[40px] border border-[#f63b60] text-center text-[#f63b60] rounded-[3px] mt-8 cursor-pointer  `}
          required
          value="Apply code"
          type="submit"
        />
      </form>
    </div>
  );
};

export default Checkout;