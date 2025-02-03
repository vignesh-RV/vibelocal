
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import "./signup.css"
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    signinUser(data);
  };

  const signinUser = async (userData) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("user_data",JSON.stringify(data));
        window.location.href = "./shops";
      } else {
        localStorage.clear();
        toast.error("Invalid credentials..");
      }
    } catch (error) {
      localStorage.clear();
      toast.error("Invalid credentials..");
    }
  }

  const navigate = useNavigate();


  return (
    <div className="signup-container">
      <h2>Login with your account</h2>
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto space-y-4 p-4 border rounded-lg shadow">
      
      <div  className="form-control">
        <label>Mobile Number</label>
        <input {...register("mobile_number", { required: "Mobile number is required" })} />
        {errors.mobile_number && <p className="text-red-500">{errors.mobile_number.message}</p>}
      </div>
      
      <div className="form-control">
        <label>Password</label>
        <input type="password" {...register("password", { required: "Password is required", minLength: { value: 6, message: "Invalid Password, hint: Valid password should contains more than 6 characters" } })} />
        {errors.password && <p className="text-red-500">{errors.password.message}</p>}
      </div>
      
      
      <button type="submit" className="signup-submit w-full">Login</button>
      <label className="already-info">You dont have an account with us? <span onClick={()=>navigate('/signup')}>SignUp</span> now</label>
    </form>
    </div>
  );
}