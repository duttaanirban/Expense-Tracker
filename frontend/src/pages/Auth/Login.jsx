import { useState } from "react";
import AuthLayout from "../../components/layouts/auth.layout.jsx";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/inputs/Input.jsx";

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();

  //login handler
  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    // Add login logic here
  }

  return (
    <AuthLayout>
      <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
        <div className="bg-white/80 shadow-lg rounded-xl px-8 py-10 max-w-xl w-full mx-auto">
          <h3 className="text-2xl font-bold text-black mb-1">Welcome Back</h3>
          <p className="text-slate-700 mb-8">Please enter your credentials to access your account.</p>
          <form onSubmit={handleLogin}>
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
            {error && <p className="text-red-500 text-sm mt-1 mb-2">{error}</p>}
            <button
              type="submit"
              className="w-full mt-2 bg-primary hover:bg-violet-600 transition-colors text-white font-semibold py-3 rounded-lg shadow-sm text-base mb-2"
            >
              Login
            </button>
          </form>
          <div className="text-sm text-center mt-2">
            Don't have an account?{' '}
            <a href="/signup" className="text-primary font-medium hover:underline">Sign Up</a>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}

export default Login;