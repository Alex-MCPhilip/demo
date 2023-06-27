import React, { useState, useEffect } from "react";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import styles from '../styles/styles'
import Loader1 from "../components/Layout/Loader1";

const OrderSuccessPage = () => {
  return (
    <div>
      <Header />
      <Success />
      <Footer />
    </div>
  );
};

const Success = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 4000); // Đặt thời gian tạm thời là 2 giây (2000 milliseconds)
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader1 />
      ) : (
        <div className={`${styles.section}`}>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />

          <>
            <h5 className="flex justify-center mt-30 mb-30 text-[25px] text-[#000000a1]">
              Bạn đã đặt hàng thành công 😍
            </h5>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
          </>
        </div>
      )}
    </>
  );
};

export default OrderSuccessPage;
