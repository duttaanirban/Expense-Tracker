import { useState } from "react";
import AuthLayout from "../../components/layouts/auth.layout.jsx";
import { Link } from "react-router-dom";
import Input from "../../components/inputs/Input.jsx";
import { validateEmail } from "../../utils/helper.js";


const SignUp = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);

  //const navigate = useNavigate();

  //signup handler
  const handleSignUp = async (e) => {
    e.preventDefault();

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
    // Add signup logic here
  }

  return (
    <AuthLayout>
      <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center mt-10">
        <div className="bg-white/80 shadow-lg rounded-xl px-8 py-10 max-w-xl w-full mx-auto">
          <h3 className="text-2xl font-bold text-black mb-1">Create an Account</h3>
          <p className="text-slate-700 mb-8">Join us today by entering your details here.</p>
          <form onSubmit={handleSignUp}>
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