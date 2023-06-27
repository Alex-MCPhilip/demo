

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import Loader2 from "../components/Layout/Loader2";
import ProductCard from "../components/Route/ProductCard/ProductCard";
import styles from "../styles/styles";
import { getAllProducts } from "../redux/actions/product";

const ProductsPage = () => {

  const dispatch = useDispatch();
  
  const [data, setData] = useState([]);
  const [searchParams] = useSearchParams();
  const categoryData = searchParams.get("category");
  const products = useSelector((state) => state.products.allProducts); // lấy ra allrpoduct từ hook useSelector
  const isLoading = useSelector((state) => state.products.isLoading);

  


  // Code khác trong component

    useEffect(() => {
      if (categoryData === null) {
        // const sortedProducts = products && [...products]; // Kiểm tra products trước khi tạo bản sao
        // const d = sortedProducts && sortedProducts.sort((a, b) => a.total_sell - b.total_sell);
        const d = products
        setData(d);
      } else {
        const d = products && products.filter((i) => i.category === categoryData);
        setData(d);
      }
      window.scrollTo(0, 0);
    }, [products
      , categoryData
    ]);

    // Code tiếp theo trong component


    useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  return (
    <>
    <Header activeHeading={3} />
        <br />
        <br />
      {
          isLoading ? (
            <Loader2/>
          ) : (
      <div>
        

        <div className={`${styles.section}`}>
          <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
            {data &&
              data.map((i, index) => <ProductCard data={i} key={index} />)}
          </div>
          {data && data.length === 0 ? (
            <h1 className="text-center w-full pb-[100px] text-[20px]">
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
                Không tìm thấy sản phẩm!
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>

            </h1>
          ) : null}
        </div>

      </div>
       )
        }
        <Footer />

    </>
  );
};

export default ProductsPage;



