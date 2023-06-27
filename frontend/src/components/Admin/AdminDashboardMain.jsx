import React, { useEffect, useState, useCallback } from "react";

import axios from "axios";

import styles from "../../styles/styles";
import { 
  // AiOutlineArrowRight, 
  AiOutlineMoneyCollect 
} from "react-icons/ai";
import { MdBorderClear } from "react-icons/md";
import { Link } from "react-router-dom";



import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersOfAdmin } from "../../redux/actions/order";
import { getAllUsers } from "../../redux/actions/user";


import Loader from "../Layout/Loader";




import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,

  PieChart,
  Pie,
  Sector,


  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,


} from "recharts";



// biểu đồ tròn 


const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    totalSales
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload._id}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#00ab9f"
      >{`Doanh thu: ${totalSales}`} VNĐ</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#00ab9f"
      >
        {`(Chiếm:${(percent * 100).toFixed(2)}%) `}
      </text>
    </g>
  );
};





const AdminDashboardMain = () => {


  const dispatch = useDispatch();

  const { adminOrders,adminOrderLoading } = useSelector((state) => state.order);
  const { users } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getAllOrdersOfAdmin());
    dispatch(getAllUsers());
  }, []);

   const adminEarning = adminOrders && adminOrders.reduce((acc,item) => acc + item.totalPrice * .10, 0);


   const adminBalance = adminEarning?.toFixed(2);




    // biểu đồ cột
    const [ProductData, setProductData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:4000/api/v2/admin/sales-by-product")
    
    .then((response) => {
      const sortedData = response.data.productSales
      .sort(
        (a, b) => b.Tổng_Tiền - a.Tổng_Tiền
      );
      const top5Products = sortedData.slice(0,10);
      setProductData(top5Products);
    })
    
    
    // .then((product) => 
    //   setProductData(product.data.productSales))
    .catch((error) => console.log(error));
  }, []);


  // console.log(ProductData)


  // biểu đồ hình nhện
  const [responseData, setResponseData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:4000/api/v2/admin/sales-by-category")
    .then((response) => 
            setResponseData(response.data.categorySales))
    .catch((error) => console.log(error));
  }, []);


  // console.log(responseData)



  //  biểu đồ tròn 
  const [activeIndex, setActiveIndex] = useState(0);
  const onPieEnter = useCallback(
    (_, index ) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );



  return (
   <>
    {
      adminOrderLoading ? (
        <Loader />
      ) : (
        <div className="w-full p-4">
          {/* <h3 className="text-[22px] font-Poppins pb-2">Tổng quan</h3> */}
          <div className="w-full block 800px:flex items-center justify-between">

            <div className=" flex flex-col">
              
                <div className="w-full mb-4 min-h-[20vh] bg-white shadow-2xl rounded-md px-2 py-5">

                <div className="flex items-center">
                  <AiOutlineMoneyCollect
                    size={30}
                    className="mr-2"
                    fill="#00000085"
                  />
                  <h3
                    className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}
                  >
                    Tổng thu nhập
                  </h3>
                </div>

                <h5 className="pt-2 pl-[36px] text-[22px] font-[500]"> 
                
                  {adminBalance}
          
                </h5>
                  {/* <span className="pr-[36px]">VNĐ</span> */}

              </div>

              


              <div className="w-full mb-4 min-h-[20vh] bg-white  shadow-2xl rounded-md px-2 py-5">
                
                <div className="flex items-center">
                  <MdBorderClear size={30} className="mr-2" fill="#00000085" />
                  <h3
                    className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}
                  >
                    Tất cả tài khoản
                  </h3>
                </div>
                <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">
                  
                  {users && users.length}

                </h5>
                <Link to="/admin-users">
                  <h5 className="pt-4 pl-2 text-[#077f9c]">Xem tài khoản</h5>
                </Link>

            </div>

            </div>


      
              <div className="min-h-[20vh] bg-white  px-2 py-5 shadow-2xl rounded-md" >

                  <PieChart width={500} height={300}>
                    <Pie
                      activeIndex={activeIndex}
                      activeShape={renderActiveShape}
                      data={responseData}
                      cx={270}
                      cy={150}
                      innerRadius={60}
                      outerRadius={80}
                      fill="#00ab9f"
                      dataKey="totalSales"
                      onMouseEnter={onPieEnter}
                    />
                  </PieChart>

              </div>


    
           


    
            <div className=" min-h-[20vh] bg-white shadow-2xl rounded-md px-2 py-5">
              
                <RadarChart
                  cx={270}
                  cy={150}
                  outerRadius={100}
                  width={480}
                  height={300}
                  data={responseData}
                  
                >
                  <PolarGrid />
                  <PolarAngleAxis dataKey="_id" />
                  <PolarRadiusAxis />
                  <Radar
                    name="Danh mục"
                    dataKey="totalSales"
                    stroke="#8884d8"
                    fill="#00ab9f"
                    fillOpacity={0.7}
                  />
                </RadarChart>





              {/* <div className="flex items-center">
                <AiOutlineMoneyCollect
                  size={30}
                  className="mr-2"
                  fill="#00000085"
                />
                <h3
                  className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}
                >
                  Tất cả đơn đặt hàng
                </h3>
              </div>
              <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">

                {adminOrders && adminOrders.length}
                
                </h5>
              <Link to="/admin-orders">
                <h5 className="pt-4 pl-2 text-[#077f9c]">Xem đơn đặt hàng</h5>
              </Link> */}


            </div>

          </div>
    
          
          <h3 className="text-[20px] font-Poppins pb-1">Top 10 sản phẩm có doanh thu cao nhất</h3>
          <div className="w-full h-[35vh] bg-white shadow-2xl rounded-md">
            

            <BarChart
                width={1200}
                height={250}
                data={ProductData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="_id" />
                <YAxis />
                <Tooltip  />
                <Legend />
                <Bar dataKey="Tổng_Tiền" barSize={20} fill="#00ab9f" />
            </BarChart>



          </div>

      </div>
       )
    } 
   </>
  );
};

export default AdminDashboardMain;