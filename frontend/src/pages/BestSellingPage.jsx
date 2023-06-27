
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import Header from "../components/Layout/Header";
import Loader2 from "../components/Layout/Loader2";
import ProductCard from "../components/Route/ProductCard/ProductCard";
import styles from "../styles/styles";
import Footer from "../components/Layout/Footer";
import { productData } from "../static/data";

const BestSellingPage = () => {

  const [data, setData] = useState([]);
  const {allProducts,isLoading} = useSelector((state) => state.products);  //hook useSelector để lấy data từ store

  useEffect(() => {
    const allProductsData = allProducts ? [...allProducts] : []; //spread bản sao
    const sortedData = allProductsData?.sort((a,b) => b.sold_out - a.sold_out);  //giá trị a và b sắp xếp theo trường sort_out giảm dần, để đưa sort_out cao lên đầu mảng 
    setData(sortedData);
  }, [allProducts]);


    // const [data, setData] = useState([]);
    // const products = useSelector((state) => state.products.allProducts);
    
    // useEffect(() => {
    //   const sortedProducts = products ? [...products] : [];
    //   const sortedData = sortedProducts.sort((a, b) => b.sold_out - a.sold_out);
    //   setData(sortedData);

    // }, []);
    


    return (
        <>
        <Header activeHeading={2} />
            <br />
            <br />
        {
         isLoading ? (
           <Loader2/>
         ) : (
           <div>
            
            <div className={`${styles.section}`}>
                <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
                    {
                        data && data.map((i, index) => <ProductCard data={i} key={index} />) // kiểm tra biến data map(i: mỗi phần tử, index:chỉ số)
                    }
                </div>
            </div>
            </div>
          )
        }  
        <Footer />
        </>
       );
}

export default BestSellingPage
