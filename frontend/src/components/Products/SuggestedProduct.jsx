import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { productData } from "../../static/data";
import styles from "../../styles/styles";
import ProductCard from "../Route/ProductCard/ProductCard";
import { useNavigate } from "react-router-dom";

const SuggestedProduct = ({ data }) => {

  const navigate = useNavigate();
  
    const [products,setProducts] = useState([]);
    const {allProducts} = useSelector((state) => state.products);

  useEffect(() => {
    // const d = productData && productData.filter((i) => i.category === data.category)
    const d =
    allProducts && allProducts.filter((i) => i.category === data.category);
    setProducts(d);
  }, []);


  const handleProductClick = (product) => {
  
    navigate(`/product/${product}`); // Chuyển hướng đến trang chi tiết sản phẩm
  };

  return (
    <div>
      {data ? (
        <div className={`p-4 ${styles.section}`}>
            <h2
                className={`${styles.heading} text-[25px] font-[500] border-b mb-5`}
            >
                Các sản phẩm liên quan
            </h2>
            <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
            {
            
                products && products.map((i,index) => <ProductCard data={i} key={index}
                onClick={() => handleProductClick(i)} // Xử lý sự kiện khi nhấn vào sản phẩm
                />)

            
            }

{/* {products &&
              products.map((product) => (
                <ProductCard
                  data={product}
                  key={product.id}
                  onClick={() => handleProductClick(product.id)} // Xử lý sự kiện khi nhấn vào sản phẩm
                />
              ))} */}

            </div>
        </div>
      ) : null}
    </div>
  );
};

export default SuggestedProduct;