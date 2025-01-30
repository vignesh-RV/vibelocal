
import { useForm } from "react-hook-form";
import { useState } from "react";
import "./signup.css"
import profilelogo from "../assets/images/profile-image.png"
import shoplogo from "../assets/images/shop-profile-image.png"
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const userType = watch("userType");
  
  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };

  const navigate = useNavigate();

  const [profileImagePreview, setProfileImagePreview] = useState("");
  const [shopLogoPreview, setShopLogoPreview] = useState(null);

  const handleImageChange = (event, setPreview) => {
    const file = event.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
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
        <input {...register("firstName", { required: "First Name is required" })} />
        {errors.firstName && <p className="text-red-500">{errors.firstName.message}</p>}
      </div>
      
      <div  className="form-control">
        <label>Last Name</label>
        <input {...register("lastName", { required: "Last Name is required" })} />
        {errors.lastName && <p className="text-red-500">{errors.lastName.message}</p>}
      </div>

      <div  className="form-control">
        <label>Mobile Number</label>
        <input {...register("mobileNumber", { required: "Mobile number is required" })} />
        {errors.mobileNumber && <p className="text-red-500">{errors.mobileNumber.message}</p>}
      </div>
      
      <div className="form-control">
        <label>User Type</label>
        <select {...register("userType", { required: "User Type is required" })}>
          <option value="">select User Type</option>
          <option value="Seller">Seller</option>
          <option value="Buyer">Buyer</option>
        </select>
        {errors.userType && <p className="text-red-500">{errors.userType.message}</p>}
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
        <input id="user-profile-selector" type="file" accept="image/*" {...register("profileImage", { required: "Profile Image is required" })} 
        onChange={(e) => handleImageChange(e, setProfileImagePreview)}/>
        <img onClick={()=>handleImageClick('#user-profile-selector')} src={profileImagePreview ? profileImagePreview : profilelogo} alt="Profile Preview" className="profile-preview w-32 h-32 mt-2 rounded-md" />
        {errors.profileImage && <p className="text-red-500">{errors.profileImage.message}</p>}
      </div>
      
      {userType === "Seller" && (
        <div className="space-y-4">
          <h4>Shop Information</h4>
          <div className="form-control">
            <label>Shop Name</label>
            <input {...register("shopName", { required: "Shop Name is required" })} />
            {errors.shopName && <p className="text-red-500">{errors.shopName.message}</p>}
          </div>
          
          <div className="form-control">
            <label>Shop Category</label>
            <input {...register("shopCategory", { required: "Shop Category is required" })} />
            {errors.shopCategory && <p className="text-red-500">{errors.shopCategory.message}</p>}
          </div>
          
          <div className="form-control">
            <label>Shop Offer</label>
            <input {...register("shopOffer", { required: "Shop Offer is required" })} />
            {errors.shopOffer && <p className="text-red-500">{errors.shopOffer.message}</p>}
          </div>
          
          <div className="form-control">
            <label>Shop Location</label>
            <input {...register("shopLocation", { required: "Shop Location is required" })} />
            {errors.shopLocation && <p className="text-red-500">{errors.shopLocation.message}</p>}
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