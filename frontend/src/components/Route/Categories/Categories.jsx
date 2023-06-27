import React from "react";
import { useNavigate } from "react-router-dom";
import { brandingData, categoriesData } from "../../../static/data";
import styles from "../../../styles/styles";

const Categories = () => {
  const navigate = useNavigate();
  return (
    <>
        {/* các ưu điểm khi mua hàng tại đây */}
      <div className={`${styles.section} hidden sm:block`}>
        <div
          className={`branding my-12 flex justify-between w-full  bg-white p-5 shadow-2xl rounded-md`}
        >
          {brandingData &&
            brandingData.map((i, index) => (

              <div className="flex items-start" key={index}>
                {React.cloneElement(i.icon, {
                  strokeWidth: "2",
                  strokeMiterlimit: "10",
                  strokeLinecap: "round"
                })}
                <div className="px-3">
                  <h3 className="font-bold text-sm md:text-base">{i.title}</h3>
                  <p className="text-xs md:text-sm">{i.Description}</p>
                </div>
              </div>


            ))}
        </div>
      </div>

        {/* các danh mục sản phẩm hiện ra  */}
      <div
        className={`${styles.section} mb-12`}
        id="categories"
        title="xem thêm"
      >
        <div className="grid grid-cols-1 gap-[5px] md:grid-cols-2 md:gap-[10px] lg:grid-cols-4 lg:gap-[20px] xl:grid-cols-5 xl:gap-[10px]   ">
          {categoriesData &&
            categoriesData.map((i) => {
              const handleSubmit = (i) => {
                navigate(`/products?category=${i.title}`);
              };
              return (
                

                <div
                  className=" bg-white rounded-lg w-full h-[150px] flex items-center justify-center cursor-pointer overflow-hidden"
                  key={i.id}
                  onClick={() => handleSubmit(i)}
                >

                    <h5 className={`text-[15px] leading-[1.3]`}>{i.title}</h5>
                    <img
                      src={i.image_Url}
                      className="w-[120px] object-cover transform transition duration-300 hover:scale-105 hover:translate-x-2 "
                      alt=""
                    />

                </div>



              );
            })}

        </div>
      </div>


    </>
  );
};

export default Categories;