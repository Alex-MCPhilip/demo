import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "../../../styles/styles";
// import {productData} from "../../../static/data"
import ProductCard from "../ProductCard/ProductCard";

// import { getAllProducts } from "../../../redux/actions/product";


const BestDeals = () => {

  // lấy ra sản phẩm mà có giá thấp nhất 

    const [data, setData] = useState([]);
    const products = useSelector((state) => state.products.allProducts); //hook useSelector để lấy data từ store

    useEffect(() => {// use khi product change
      const sortedProducts = products ? [...products] : []; // use toán tử spread để tạo 1 bản sao product || [rỗng]
      // const sortedData = sortedProducts.sort((a, b) => b.sold_out - a.sold_out); // săp xếp mảng sortedProducts theo trường sold_out giảm dần, điều này sẽ đặt các phần tử sold_out cao nhất lên đầu mảng, a b là giá trị sử dụng để so sánh các phần tử trong mảng
      const sortedData = sortedProducts.sort((a, b) => {
        const diffA = a.originalPrice - a.price;
        const diffB = b.originalPrice - b.price;
        return diffB - diffA;
      });// sắp xêp 1 array giẩm dần, đưa gia trị chênh lệch ra đầu tiên
      
      const firstFive = sortedData.slice(0, 5); // (start- end ) cắt 1 phần của mảng lớn
      setData(firstFive);
      // console.log(firstFive)
    }, [products]);
      // console.log(products)




// useEffect(() => {
//     const d = productData && productData.sort((a,b) => b.total_sell - a.total_sell); 
//     const firstFive = d.slice(0, 5);
//     setData(firstFive);
// }, []);
  

  return (
    <div>
      <div className={`${styles.section}`}>
        <div className={`${styles.heading}`}>
          <h1>Ưu đãi tất nhất</h1>
        </div>
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12 border-0">
           {
            data && data.length !== 0 &&(
              <>
               {data && data.map((i, index) => <ProductCard data={i} key={index} />)}
              </>
            )
           }
        </div>
      </div>
    </div>
  );
};

export default BestDeals;