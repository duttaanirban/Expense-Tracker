import { useContext, useState } from "react";
import AuthLayout from "../../components/layouts/auth.layout.jsx";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/inputs/Input.jsx";
import { validateEmail } from "../../utils/helper.js";
import ProfilePicSelector from "../../components/inputs/ProfilePicSelector.jsx";
import axiosInstance from "../../utils/axios.js";
import { API_PATHS } from "../../utils/apiPaths.js";
import { UserContext } from "../../context/userContext.jsx";
import uploadImage from "../../utils/uploadImage.js";


const SignUp = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);

  const {updateUser} = useContext(UserContext);
  const navigate = useNavigate();

  //signup handler
  const handleSignUp = async (e) => {
    e.preventDefault();

    let profileImageUrl = "";

    if (!fullName.trim()) {
      setError('Please enter your full name.');
      return;
    }
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!password) {
      setError('Please enter your password.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setError("");
    
    //SIGNUP API CALL
    try {
      //upload image if exists
      if (profilePic) {
        const imageUploadRes = await uploadImage(profilePic);
        profileImageUrl = imageUploadRes.imageUrl;
      }

  const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, { fullName, email, password, profileImageUrl });

      const { token, user} = response.data;
      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate('/dashboard');
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  }

  return (
    <AuthLayout>
      <div className="lg:w-[70%] flex flex-col justify-center mt-20">
        <div className="bg-white/80 shadow-lg rounded-xl px-5 py-6 max-w-xl w-full mx-auto">
          <h3 className="text-xl font-bold text-black mb-1">Create an Account</h3>
          <p className="text-slate-700 mb-5">Join us today by entering your details here.</p>
          <form onSubmit={handleSignUp}>

            <ProfilePicSelector image={profilePic} setImage={setProfilePic} />
            <Input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              label="Full Name"
              placeholder="Enter your full name"
              type="text"
            />
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="Email Id"
              placeholder="Enter your email"
              type="text"
            />
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label="Password"
              placeholder="Enter your password"
              type="password"
            />
            <Input
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              label="Confirm Password"
              placeholder="Re-enter your password"
              type="password"
            />
            {error && <p className="text-red-500 text-sm mt-1 mb-2">{error}</p>}
            <button
              type="submit"
              className="w-full mt-2 bg-primary hover:bg-violet-600 transition-colors text-white font-semibold py-3 rounded-lg shadow-sm text-base mb-2"
            >
              Sign Up
            </button>
          </form>
          <div className="text-sm text-center mt-2">
            Already have an account?{' '}
            <Link to="/login" className="text-primary font-medium hover:underline">Login</Link>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default SignUp;