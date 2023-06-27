
import React, { useEffect, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../../redux/actions/product";
import { categoriesData } from "../../static/data";
import { toast } from "react-toastify";



const CreateProduct = () => {
  const { user } = useSelector((state) => state.user);
  const { success, error } = useSelector((state) => state.products);
  const navigate = useNavigate();
  const dispatch = useDispatch();



  const [images, setImages] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [tag, setTag] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [price, setprice] = useState("");
  const [stock, setStock] = useState("");

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (success) {
      toast.success("Tạo sản phẩm thành công !");
      // navigate("/admin/dashboard");
      // window.location.reload();
      window.location.reload(true); 

    }
  }, [dispatch, error, success]);

  // const handleImageChange = (e) => {
  //   e.preventDefault();


  //   let files = Array.from(e.target.files);
  //   setImages((prevImages) => [...prevImages, ...files]);

  //   // đoạn code này là biến image thành id 
  //   // let files = Array.from(e.target.files);
  //   // setImages((prevImages) => [
  //   //   ...prevImages,
  //   //   ...files.map((file) => ({
  //   //     file,
  //   //     key: `${file.name}-${Date.now()}`,
  //   //   })),
  //   // ]);

  // };


  // const handleImageChange = (e) => {
  //   e.preventDefault();
  
  //   let files = Array.from(e.target.files);
  //   setImages((prevImages) => [...prevImages, ...files.map((file) => URL.createObjectURL(file))]);
  // };
  

  const handleImageChange = (e) => {
    e.preventDefault();

    let files = Array.from(e.target.files);
    setImages((prevImages) => [...prevImages, ...files]);
  };



  const handleSubmit = (e) => {
    e.preventDefault();

    const newForm = new FormData();

    images.forEach((image) => {
      newForm.append("images", image);
    });
    newForm.append("name", name);
    newForm.append("description", description);
    newForm.append("category", category);
    newForm.append("tag", tag);
    newForm.append("originalPrice", originalPrice);
    newForm.append("price", price);
    newForm.append("stock", stock);
    newForm.append('seller', user._id);
    dispatch(createProduct(newForm));
  };




  return (
    <div className="w-[90%] 800px:w-[50%] bg-white  shadow h-[80vh] rounded-[4px] p-3 overflow-y-scroll">
      <h5 className="text-[30px] font-Poppins text-center">Tạo sản phẩm</h5>
      {/* create product form */}
      <form onSubmit={handleSubmit}>
        <br />
        <div>
          <label className="pb-2">
            Tên <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={name}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setName(e.target.value)}
            placeholder="Hãy điền tên của sản phẩm..."
          />
        </div>
        <br />
        <div>
          <label className="pb-2">
            Miêu tả <span className="text-red-500">*</span>
          </label>
          <textarea
            cols="30"
            required
            rows="8"
            type="text"
            name="description"
            value={description}
            className="mt-2 appearance-none block w-full pt-2 px-3 border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Hãy điền miêu tả cả sản phẩm..."
          ></textarea>
        </div>
        <br />
        <div>
          <label className="pb-2">
            Danh mục <span className="text-red-500">*</span>
          </label>
          <select
            className="w-full mt-2 border h-[35px] rounded-[5px]"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Choose a category">Chọn danh mục</option>
            {categoriesData &&
              categoriesData.map((i) => (
                <option value={i.title} key={i.title}>
                  {i.title}
                </option>
              ))}
          </select>
        </div>
        <br />
        <div>
          <label className="pb-2">Tags</label>
          <input
            type="text"
            name="tag"
            value={tag}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setTag(e.target.value)}
            placeholder="Hãy điền vào thẻ tags của sản phẩm..."
          />
        </div>
        <br />
        <div>
          <label className="pb-2">Giá lúc đầu</label>
          <input
            type="number"
            name="originalPrice"
            value={originalPrice}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setOriginalPrice(e.target.value)}
            placeholder="Hãy điền giá lúc đầu của sản phẩm..."
          />
        </div>
        <br />
        <div>
          <label className="pb-2">
            Giá khi giảm<span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="price"
            value={price}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setprice(e.target.value)}
            placeholder="Hãy điền giá khi giảm của sản phẩm..."
          />
        </div>
        <br />
        <div>
          <label className="pb-2">
            Số lượng sản phẩm <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="price"
            value={stock}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setStock(e.target.value)}
            placeholder="Hãy điền số lượng bán của sản phẩm..."
          />
        </div>
        <br />
        <div>
          <label className="pb-2">
            Đăng ảnh<span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            name=""
            id="upload"
            className="hidden"
            multiple
            onChange={handleImageChange}
          />
          <div className="w-full flex items-center flex-wrap">
            <label htmlFor="upload">
              <AiOutlinePlusCircle size={30} className="mt-3" color="#555" />
            </label>
              
              {images &&
              images.map((i) => (
                <img
                  src={URL.createObjectURL(i)}
                  key={i}
                  alt=""
                  className="h-[120px] w-[120px] object-cover m-2"
                />
              ))}


          </div>
          <br />
          <div>
            <input
              type="submit"
              value="Tạo sản phẩm"
              className="mt-2 cursor-pointer appearance-none text-center block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateProduct;