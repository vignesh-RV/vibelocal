
import { useForm } from "react-hook-form";
import { useState } from "react";
import "./signup.css"
import profilelogo from "../assets/images/profile-image.png"
import shoplogo from "../assets/images/shop-profile-image.png"
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';


export default function Signup() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const userType = watch("user_type");
  
  const onSubmit = (data) => {
    console.log("Form Data:", data);
    data.profile_image = profileImagePreview;
    data.shop_logo = shopLogoPreview;
    createUser(data);
  };

  const convertToBase64 = (file, imageref) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      imageref(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const createUser = async (userData) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success("User created successfully!");
        userData.owner_id = data.user_id;
        createShop(userData);
        setTimeout(()=> navigate("/signin"), 1500);
      } else {
        toast.error(`Error: ${data.message}`);
      }
    } catch (error) {
      toast.error(`Exception: ${error}`);
    }
  }

  const createShop = async (userData) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/shops`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      if (response.ok) {
        console.dir(data);
      } else {
        toast.error(`Error: ${data.message}`);
      }
    } catch (error) {
      toast.error(`Exception: ${error}`);
    }
  }

  const navigate = useNavigate();

  const [profileImagePreview, setProfileImagePreview] = useState("");
  const [shopLogoPreview, setShopLogoPreview] = useState(null);

  const handleImageChange = (event, setPreview) => {
    const file = event.target.files[0];
    if (file) {
      convertToBase64(file,setPreview);
      // setPreview(URL.createObjectURL(file));
    }
  };

  const handleImageClick = (selector) => {
    document.querySelector(selector).click();
  };

  return (
    <div className="signup-container">
      <h2>Create your account</h2>
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto space-y-4 p-4 border rounded-lg shadow">
      <h4>Personal Information</h4>
      <div className="form-control">
        <label>First Name</label>
        <input {...register("first_name", { required: "First Name is required" })} />
        {errors.first_name && <p className="text-red-500">{errors.first_name.message}</p>}
      </div>
      
      <div  className="form-control">
        <label>Last Name</label>
        <input {...register("last_name", { required: "Last Name is required" })} />
        {errors.last_name && <p className="text-red-500">{errors.last_name.message}</p>}
      </div>

      <div  className="form-control">
        <label>Mobile Number</label>
        <input {...register("mobile_number", { required: "Mobile number is required" })} />
        {errors.mobile_number && <p className="text-red-500">{errors.mobile_number.message}</p>}
      </div>
      
      <div className="form-control">
        <label>User Type</label>
        <select {...register("user_type", { required: "User Type is required" })}>
          <option value="">select User Type</option>
          <option value="Seller">Seller</option>
          <option selected value="Buyer">Buyer</option>
        </select>
        {errors.user_type && <p className="text-red-500">{errors.user_type.message}</p>}
      </div>
      
      <div className="form-control">
        <label>Password</label>
        <input type="password" {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters" } })} />
        {errors.password && <p className="text-red-500">{errors.password.message}</p>}
      </div>
      
      <div className="form-control">
        <label>Confirm Password</label>
        <input type="password" {...register("confirmPassword", {
          required: "Confirm Password is required",
          validate: value => value === watch("password") || "Passwords do not match"
        })} />
        {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}
      </div>
      
      <div className="form-control">
        <label>User Profile Image</label>
        <input id="user-profile-selector" type="file" accept="image/*" {...register("profile_image", { required: "Profile Image is required" })} 
        onChange={(e) => handleImageChange(e, setProfileImagePreview)}/>
        <img onClick={()=>handleImageClick('#user-profile-selector')} src={profileImagePreview ? profileImagePreview : profilelogo} alt="Profile Preview" className="profile-preview w-32 h-32 mt-2 rounded-md" />
        {errors.profile_image && <p className="text-red-500">{errors.profile_image.message}</p>}
      </div>
      
      {userType === "Seller" && (
        <div className="space-y-4">
          <h4>Shop Information</h4>
          <div className="form-control">
            <label>Shop Name</label>
            <input {...register("shop_name", { required: "Shop Name is required" })} />
            {errors.shop_name && <p className="text-red-500">{errors.shop_name.message}</p>}
          </div>
          
          <div className="form-control">
            <label>Shop Category</label>
            <input {...register("category", { required: "Shop Category is required" })} />
            {errors.category && <p className="text-red-500">{errors.category.message}</p>}
          </div>
          
          <div className="form-control">
            <label>Shop Offer</label>
            <input {...register("offer", { required: "Shop Offer is required" })} />
            {errors.offer && <p className="text-red-500">{errors.offer.message}</p>}
          </div>
          
          <div className="form-control">
            <label>Shop Location</label>
            <input {...register("location", { required: "Shop Location is required" })} />
            {errors.location && <p className="text-red-500">{errors.location.message}</p>}
          </div>
          
          <div className="form-control">
            <label>Shop Logo</label>
            <input type="file" id="shop-logo-selector" {...register("shopLogo", { required: "Shop Logo is required" })} 
            onChange={(e) => handleImageChange(e, setShopLogoPreview)}/>
            <img onClick={()=>handleImageClick('#shop-logo-selector')}  src={shopLogoPreview ? shopLogoPreview:  shoplogo} alt="Profile Preview" className="profile-preview w-32 h-32 mt-2 rounded-md" />
            {errors.shopLogo && <p className="text-red-500">{errors.shopLogo.message}</p>}
          </div>
        </div>
      )}
      
      <button type="submit" className="signup-submit w-full">Sign Up</button>
      <label className="already-info">Already having an account with us? <span onClick={()=> navigate("/signin")}>Login</span> now</label>
    </form>
    </div>
  );
}