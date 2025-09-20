import { useState } from "react";
import AuthLayout from "../../components/layouts/auth.layout.jsx";
import { useNavigate } from "react-router-dom";
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
  }
  
  return (
    <AuthLayout>
      <div className='lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center'>
        <h3 className='text-xl font-semibold text-black'>Welcome Back</h3>
        <p className='text-slate-700 mt-[5px] mb-6'>Please enter your credentials to access your account.</p>
      
      
        <form onSubmit={handleLogin}>
          //email input
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Email Id"
            placeholder="Enter your email"
            type="text"
          />
          //password input
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
            placeholder="Enter your password"
            type="password"
          />
        </form>
      </div>
    </AuthLayout>
  )
}

export default Login;