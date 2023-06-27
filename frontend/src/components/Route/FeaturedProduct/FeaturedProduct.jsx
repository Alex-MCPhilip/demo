import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import styles from "../../../styles/styles";
import ProductCard from "../ProductCard/ProductCard";
import { productData } from "../../../static/data";

const FeaturedProduct = () => {

 

  const products = useSelector((state) => state.products.allProducts);  // dùng hook đẻ lấy ra allproduct trong store
 
  
  const sortedProducts = products && [...products]
    .sort((a , b) => b.ratings - a.ratings);     // săp xếp mảng sortedProducts theo trường ratings giảm dần, điều này sẽ đặt các phần tử ratings cao nhất lên đầu mảng, a b là giá trị sử dụng để so sánh các phần tử trong mảng
  const topRatedProducts = sortedProducts && sortedProducts.slice(0, 10);
  // console.log(topRatedProducts)
   
  return (
    <div>
      <div className={`${styles.section}`}>
        <div className={`${styles.heading}`}>
          <h1>Sản phẩm nổi bật</h1>
        </div>
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12 border-0">
        
        {
          topRatedProducts &&
          topRatedProducts.length !== 0 &&
          topRatedProducts.map((i, index) => <ProductCard data={i} key={index} />)
        
        }
     
        </div>
      </div>
    </div>
  );
};

export default FeaturedProduct;


// {
            
//   // productData && productData.map((i,index) => <ProductCard data={i} key={index}/>)
//   products && products.length !== 0 &&(
//     <>
//      {products && products.map((i, index) => <ProductCard data={i} key={index} />)}
//     </>
//     //  {data && data.length > 0 && data.map((i, index) => <ProductCard data={i} key={index} />)}
//     //  </>
//   )
// }