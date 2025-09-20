import { useState } from 'react'
import {FaRegEye, FaRegEyeSlash} from 'react-icons/fa6'

const Input = ({value, onChange, label, placeholder, type}) => {
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
      setShowPassword(!showPassword);
    };

    return (
      <div className="mb-4">
        {label && (
          <label className="block text-[13px] text-slate-800 mb-1 font-medium">{label}</label>
        )}
        <div className="relative flex items-center">
          <input
            value={value}
            onChange={(e) => onChange(e)}
            placeholder={placeholder}
            type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
            className="input-box pr-10 focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200"
            autoComplete={type === 'password' ? 'current-password' : 'on'}
          />
          {type === 'password' && (
            <span className="absolute right-4 cursor-pointer select-none" onClick={toggleShowPassword}>
              {showPassword ? (
                <FaRegEye size={20} className="text-primary" />
              ) : (
                <FaRegEyeSlash size={20} className="text-slate-400" />
              )}
            </span>
          )}
        </div>
      </div>
    )
}

export default Input