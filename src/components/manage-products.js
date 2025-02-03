import React, { useEffect, useState } from 'react';
import './header.css';
import { toast } from 'react-toastify';
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  product_name: yup.string().required("Product Name is required"),
  category: yup.string().required("Product Category is required"),
  price: yup
    .number()
    .typeError("Price must be a valid number")
    .positive("Price must be positive")
    .required("Price is required"),
  available_quantity: yup
    .number()
    .typeError("Quantity must be a valid number")
    .positive("Quantity must be positive")
    .required("Quantity is required"),
  offer: yup
    .number()
    .typeError("Offer must be a valid number")
    .min(0, "Offer cannot be negative")
    .required("Offer is required"),
  productImage: yup
    .mixed()
    .test("required", "Product Image is required", (value) => value && value.length > 0)
    .test("fileSize", "File size must be less than 2MB", (value) =>
      value && value[0] ? value[0].size <= 2 * 1024 * 1024 : true
    )
    .test("fileType", "Only images are allowed", (value) =>
      value && value[0] ? ["image/jpeg", "image/png"].includes(value[0].type) : true
    ),
});

function ManageProducts() {
  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {}
  });

  const [preview, setPreview] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [ products, setProducts ] = useState([]);
  const [ shopId, setShopId ] = useState(null);

  const getShopId = async () => {
    try {
      let loggedInUserData = JSON.parse(localStorage.getItem("user_data"));
      
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/shops/by_user/${loggedInUserData.user_id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      const data = await response.json();
      if (response.ok) {
        if(data){
          setShopId(data.shop_id);
          getAllProducts(data.shop_id);
        }
      } else {
        toast.error(`Error on create order : ${data.message}`);
      }
    } catch (error) {
      toast.error(`Exception on create order : ${error}`);
    }
  }

  const editProduct = (product) =>{
    Object.keys(product).forEach((key) => setValue(key, product[key]));
    setShowAddForm(true);
  }

  const deleteProduct = async (product_id) => {
      try {
        
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/products/${product_id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          }
        });
  
        const data = await response.json();
        if (response.ok) {
          getAllProducts(shopId);
          setShowAddForm(false);
        } else {
          toast.error(`Error on create order : ${data.message}`);
        }
      } catch (error) {
        toast.error(`Exception on create order : ${error}`);
      }
  }
    
  const getAllProducts = async (shop_id) => {
      try {
        
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/products/byshop/${shop_id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });
  
        const data = await response.json();
        if (response.ok) {
          setProducts(data);
          setShowAddForm(false);
        } else {
          toast.error(`Error on create order : ${data.message}`);
        }
      } catch (error) {
        toast.error(`Exception on create order : ${error}`);
      }
    }

  const addProduct = async (product) => {
      try {
        let reqData = {
          product_name: product.product_name,
          category: product.category,
          price: product.price,
          available_quantity: parseInt(product.available_quantity),
          offer: product.offer,
          shop_id: shopId,
          product_image: preview,
          product_id: product.product_id,
        }
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/products${product.product_id ? '/'+product.product_id : ''}`, {
          method: product.product_id ? 'PUT' : 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(reqData)
        });
  
        const data = await response.json();
        if (response.ok) {
          getAllProducts(shopId);
        } else {
          toast.error(`Error on create order : ${data.message}`);
        }
      } catch (error) {
        toast.error(`Exception on create order : ${error}`);
      }
    }

    useEffect(() => {
      getShopId();
    }, []);
  
    const onSubmit = (data) => {
      console.log("Form Data:", data);
      addProduct(data);
    };
    
    const onError = (data) => {
      console.log("Form Data:", data);
    };
  
    const handleImageChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        setValue("productImage", event.target.files);
        convertToBase64(file,setPreview);
        trigger("productImage");
      }
    };

    const convertToBase64 = (file, imageref) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        imageref(reader.result);
      };
      reader.readAsDataURL(file);
    };

  return (
    <>
      
        <div className="cart-popup main-page product-manage-page">

        {products ? (
              <div className='cart-container'>
              <h2>Your Shop Products</h2>
              {products.length === 0 ? (
                <p>No products found..</p>
              ) : (
                <div>
                  <button className='add-product-btn' onClick={()=> setShowAddForm(!showAddForm)}><FaPlus style={{ color: "green", cursor: "pointer" }} title="Add" />Add Product</button>
                  <table>
                    <thead>
                      <tr>
                        <th>S.no</th>
                        <th>Product Image</th>
                        <th>Product Name</th>
                        <th>category</th>
                        <th>offer</th>
                        <th>price (₹)</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                    {products.map((item, ind) => (
                      <tr>
                        <td className='tb_sno'>{ind+1}</td>
                        <td className='tb_pimage'><img src={item.product_image} alt={item.name} className="shop-image" /></td>
                        <td className='tb_pname'>{item.product_name}</td>
                        <td className='tb_pcategory'>{(item.category)}</td>
                        <td className='tb_price'>₹ {item.offer} %</td>
                        <td className='tb_price'>₹ {item.price}</td>
                        <td className='tb_action'><FaEdit onClick={()=> editProduct(item)} style={{ color: "black", cursor: "pointer" }} title="Edit" />
                        <FaTrash onClick={()=> deleteProduct(item.product_id)} style={{ color: "red", cursor: "pointer" }} title="Delete" />
                        </td>
                        </tr>
                    ))}
                    
                    </tbody>
                  </table>
                
                </div>
              )}
              </div>
        ): ('')}


{showAddForm && (
      <div className="add-product-container max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-xl">
        <h2 className="text-xl font-bold mb-4">Add Product</h2>
        <form className="space-y-4">
          {/* Product Name */}
          <div className='form-container-block'>
            <label className="block font-medium">Product Name:</label>
            <input
              {...register("product_name")}
              type="text"
              className="w-full p-2 border rounded-md"
            />
            <p className="text-red-500 text-sm">{errors.product_name?.message}</p>
          </div>

          {/* Product Category */}
          <div className='form-container-block'>
            <label className="block font-medium">Product Category:</label>
            <input
              {...register("category")}
              type="text"
              className="w-full p-2 border rounded-md"
            />
            <p className="text-red-500 text-sm">{errors.category?.message}</p>
          </div>

          <div className='form-container-block'>
            <label className="block font-medium">Available Stock:</label>
            <input
              {...register("available_quantity")}
              type="number"
              className="w-full p-2 border rounded-md"
            />
            <p className="text-red-500 text-sm">{errors.available_quantity?.message}</p>
          </div>

          {/* Price */}
          <div className='form-container-block'>
            <label className="block font-medium">Price:</label>
            <input
              {...register("price")}
              type="number"
              step="0.01"
              className="w-full p-2 border rounded-md"
            />
            <p className="text-red-500 text-sm">{errors.price?.message}</p>
          </div>

          {/* Offer */}
          <div className='form-container-block'>
            <label className="block font-medium">Offer:</label>
            <input
              {...register("offer")}
              type="number"
              step="0.01"
              className="w-full p-2 border rounded-md"
            />
            <p className="text-red-500 text-sm">{errors.offer?.message}</p>
          </div>

          {/* Product Image */}
          <div className='form-container-block'>
            <label className="block font-medium">Product Image:</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full p-2 border rounded-md"
            />
            {errors.productImage && <p className="text-red-500">{errors.productImage.message}</p>}
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                className="profile-preview"
              />
            ): (
              <p className="text-red-500 text-sm">{errors.productImage?.message}</p>
            )}
          </div>
          <div className='btn-container'>
          <label className="submit-btn" onClick={handleSubmit(onSubmit, onError)}>Submit</label>
          <label className="close-btn" onClick={()=>setShowAddForm(false)}>Close</label>
          </div>
          
        </form>
      </div>
)}
            </div>
    </>
  );
}

export default ManageProducts;
