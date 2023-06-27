import React from "react";
import styles from "../../styles/styles";

const Sponsored = () => {
  return (
    <div
      className={`${styles.section} hidden sm:block bg-white py-10 px-5 mb-12 cursor-pointer rounded-xl`}
    >
      <div className="flex justify-between w-full">
        <div className="flex items-start">
          <img
            src="https://theme.hstatic.net/1000363117/1000911694/14/logo.png?v=293"
            alt=""
            style={{width:"150px", objectFit:"contain"}}
          />
        </div>
        <div className="flex items-start">
          <img
            src="https://th.bing.com/th/id/OIP.YS-72bqjkj69hwGX3R5LGwHaDF?w=314&h=145&c=7&r=0&o=5&dpr=1.3&pid=1.7"
            style={{width:"150px", objectFit:"contain"}}
            alt=""
          />
        </div>
        <div className="flex items-start">
          <img
            src="https://www.vectorlogo.zone/logos/apple/apple-ar21.png"
            style={{width:"150px", objectFit:"contain"}}
            alt=""
          />
        </div>
        <div className="flex items-start">
          <img
            src="https://th.bing.com/th/id/OIP.-hPN6wl7VuTDwZ6qiCDM7gHaBn?w=281&h=76&c=7&r=0&o=5&dpr=1.3&pid=1.7"
            style={{width:"150px", objectFit:"contain"}}
            alt=""
          />
        </div>
        <div className="flex items-start">
          <img
            src="https://nhasachphuongnam.com/images/logos/124/logo_h%C3%A8_290x56.png"
            style={{width:"150px", objectFit:"contain"}}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Sponsored;