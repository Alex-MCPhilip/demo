import React, { Suspense } from "react";

// import  { useState, useEffect,useCallback, Suspense } from "react";


import { Link } from "react-router-dom";
import styles from "../../../styles/styles";
import "./Hero.css"
import Book from "../../../components/Book"

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial, Stage } from "@react-three/drei";




const Hero = () => {
  return (

    <div
      className={`
      relative
      min-h-[70vh] 800px:min-h-[80vh] w-full 
      ${styles.noramlFlex}`}
      bg-no-repeat 
      style={{
        background: "linear-gradient(160deg, hsl(140, 21%, 95%),hsla(240, 1%, 17%, 0.96) )",
        
      }}
    >
      <div className="relative top-[-200px] max-md:top-[-162px] right-20 ">
              <Canvas  >
                <Suspense fallback={null}>
                  <OrbitControls enableZoom={false} />
                  <ambientLight intensity={3} />
                  <directionalLight position={[3, 2, 1 ]} />
                  <Sphere args={[1, 100, 200]} scale={2.4} >
                    <MeshDistortMaterial
                      color="#3b3c40"
                      attach="material"
                      distort={0.5}
                      speed={2}
                    />
                  </Sphere>
                </Suspense>
              </Canvas>
      </div>


      <div className=" relative top-[100px] right-[100px] ">
              <Canvas  >
                <Suspense fallback={null}>
                  <OrbitControls enableZoom={false} />
                  <ambientLight intensity={3} />
                  <directionalLight position={[3, 2, 1 ]} />
                  <Sphere args={[1, 100, 200]} scale={2.5} >
                    <MeshDistortMaterial
                      color="#3b3c40"
                      attach="material"
                      distort={0.5}
                      speed={2}
                    />
                  </Sphere>
                </Suspense>
              </Canvas>
      </div>
      


      <div className="max-md:hidden relative top-0 right-[-100px]   ">
              <Canvas  >
                <Suspense fallback={null}>
                  <OrbitControls enableZoom={false} />
                  <ambientLight intensity={3} />
                  <directionalLight position={[3, 2, 1 ]} />
                  <Sphere args={[1, 100, 200]} scale={2.5} >
                    <MeshDistortMaterial
                      color="#3b3c40"
                      attach="material"
                      distort={0.5}
                      speed={2}
                    />
                  </Sphere>
                </Suspense>
              </Canvas>
      </div>





      <div className="absolute flex lg:justify-between max-md:flex-col md:mt-10 w-full max-md:h-auto select-none">
          

      


          <div className="ml-16 max-md:mb-1 max-md:mt-1 flex-1">
            <h1 className="text-[35px] leading-[1.2] lg:text-[60px] text-[#3d3a3a] font-[600] capitalize">
              {/* Đồng Đế <br /> */}
              nguồn cảm hứng cho trí tuệ <br />
              và đam mê sách
            </h1>
            <p className="pt-5 text-[16px] font-[Poppins] font-[400] text-[#000000ba]">
              Tựa sách vạn ngôn, cùng Đồng Đế trở thành người đọc sách sáng suốt, sở hữ tri thức và tận hưởng niềm đam mê.
            </p>
            <Link to="/products" className="inline-block">
              <div className={`${styles.button} mt-5 
                    border-gray-800 shadow-2xl rounded-md`}>
                <span className="text-[#fff] font-[Poppins] text-[18px]">Mua sắm ngay</span>
              </div>
            </Link>
          </div>





          <div className=" tb w-auto h-full   ml-10 flex-1 max-md:hidden" 
          style={{ width:"400px", height:"400px" }}
          >

<Canvas>
    <Suspense fallback={null}>
      <Stage environment={"night"}  intensity={0.0000001} >
        
        <Book/>
      </Stage>
      <OrbitControls enableZoom={false} autoRotate />
    </Suspense>
  </Canvas>
</div>







          {/* <div className="tb"> */}
         
              {/* <div className="tb w-auto h-full   ml-10 flex-1">
              <Canvas  >
                <Suspense fallback={null}>
                  <OrbitControls enableZoom={false} />
                  <ambientLight intensity={3} />
                  <directionalLight position={[3, 2, 1 ]} />
                  <Sphere args={[1, 100, 200]} scale={2.4} >
                    <MeshDistortMaterial
                      color="#3b3c40"
                      attach="material"
                      distort={0.5}
                      speed={2}
                    />
                  </Sphere>
                </Suspense>
              </Canvas>

              </div> */}
            {/* <img src="http://localhost:4000/chuyendong.png" alt="" /> */}

         
      
          {/* </div> */}

      </div>


    </div>
    
      
   
  );
};

export default Hero;