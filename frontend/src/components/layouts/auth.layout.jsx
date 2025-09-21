
import card1 from '../../assets/images/card1.png'

import { LuTrendingUpDown } from 'react-icons/lu'
import ThreeDBackground from '../ThreeDBackground';

const AuthLayout = ({ children }) => {
  return (
    <div className="flex">
      <div className="relative w-screen h-screen md:w-[60vw] flex flex-col items-center justify-center overflow-hidden">
        {/* 3D Background */}
        <div className="absolute inset-0 -z-10 hidden md:block">
          <ThreeDBackground />
        </div>
        <div className="flex items-center gap-3 absolute top-8 left-12 z-20">
          {/* SVG Wallet Icon */}
          <span className="inline-block w-9 h-9">
            <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <rect x="3" y="8" width="26" height="16" rx="4" fill="#875cf5"/>
              <rect x="5" y="10" width="22" height="12" rx="3" fill="#fff"/>
              <rect x="18" y="14" width="7" height="4" rx="2" fill="#a855f7"/>
              <rect x="7" y="12" width="10" height="8" rx="2" fill="#ede9fe"/>
              <circle cx="21.5" cy="16" r="1.2" fill="#fff"/>
              <rect x="3" y="8" width="26" height="16" rx="4" stroke="#7c3aed" strokeWidth="1.5"/>
            </svg>
          </span>
          <h2 className="text-lg font-medium text-black">Expense Tracker</h2>
        </div>
  <div className="relative z-10 w-full flex flex-col items-center justify-center">{children}</div>
      </div>

      <div className='hidden md:block w-[40vw] h-screen bg-violet-50 bg-auth-bg bg-cover bg-n0-repeat bg-center overflow-hidden p-8 relative'>
        <div className='w-48 h-48 rounded-[40px] bg-purple-600 absolute -top-7 -left-5'></div>
        <div className='w-48 h-48 rounded-[40px] border-[20px] border-fuchsia-600 absolute top-[30%] -right-10'></div>
        <div className='w-48 h-48 rounded-[40px] bg-violet-500 absolute -bottom-7 -left-5'></div>

        <div className='grid grid-cols-1 z-20'>
          <StatsInfoCard
            icon={<LuTrendingUpDown />}
            label="Track Income & Expense"
            value="430,000"
            color="bg-primary"
          />
        </div>

        <img src={card1} alt="chart" className='w-64 lg:w-[90%] absolute bottom-10 shadow-lg shadow-blue-400/15 rounded-3xl' />
      </div>
    </div>
  )
}

export default AuthLayout;

const StatsInfoCard = ({ icon, label, value, color }) => {
  return (
    <div className='flex gap-6 bg-white p-4 rounded-xl shadow-md shadow-purple-400/10 border border-gray-200/50 z-10'>
      <div
      className={`w-12 h-12 flex items-center justify-center text-[26px] text-white ${color} rounded-full drop-shadow-xl`}
      >
        {icon}
      </div>
      <div className='mt-2'>
        <h6 className='text-sm text-gray-500 mb-1'>{label}</h6>
        <span className='text-[20px]'>${value}</span>
      </div>
    </div>
  )
}