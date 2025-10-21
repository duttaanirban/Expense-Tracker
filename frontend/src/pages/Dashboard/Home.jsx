import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import useUserAuth from '../../hooks/useUserAuth.jsx';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axios.js';
import { API_PATHS } from '../../utils/apiPaths.js';
import InfoCard from '../../components/Cards/InfoCard.jsx';
import { LuHandCoins, LuWalletMinimal } from 'react-icons/lu';
import { IoMdCard } from 'react-icons/io';
import { addThousandsSeparator } from '../../utils/helper.js';
import RecentTransactions from '../../components/Dashboard/RecentTransactions.jsx';
import FinanceOverview from '../../components/Dashboard/FinanceOverview.jsx';
import ExpenseTransactions from '../../components/Dashboard/ExpenseTransactions.jsx';
import Last30DaysExpense from '../../components/Dashboard/Last30DaysExpense.jsx';
import RecentIncomeWithChart from '../../components/Dashboard/RecentIncomeWithChart.jsx';
import RecentIncome from '../../components/Dashboard/RecentIncome.jsx';



const Home = () => {
  useUserAuth();

  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchDashboardData = async () => {
    if (loading) return; // Prevent multiple requests
    setLoading(true);

    try {
      const response = await axiosInstance.get(`${API_PATHS.DASHBOARD.GET_DATA}`);

      if (response.data) {
        setDashboardData(response.data);
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    return () => {};
  }, []);
  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className='my-5 mx-auto'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          <InfoCard
            icon={<IoMdCard />}
            label="Total Balance"
            value={addThousandsSeparator(dashboardData?.totalBalance || 0)}
            colors="bg-primary"
          />
          <InfoCard
            icon={<LuWalletMinimal />}
            label="Total Income"
            value={addThousandsSeparator(dashboardData?.totalIncome || 0)}
            colors="bg-orange-500"
          />
          <InfoCard
            icon={<LuHandCoins />}
            label="Total Expense"
            value={addThousandsSeparator(dashboardData?.totalExpense || 0)}
            colors="bg-red-500"
          />
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>
          <RecentTransactions
            transactions={dashboardData?.last5Transactions || []}
            onSeeMore={() => navigate("/expense")}
          />

          <FinanceOverview
            totalBalance={dashboardData?.totalBalance || 0}
            totalIncome={dashboardData?.totalIncome || 0}
            totalExpense={dashboardData?.totalExpense || 0}
          />

          <ExpenseTransactions
            transactionsData={dashboardData?.last30daysExpenseTransactions?.transactions}
            onSeeMore={() => navigate("/expense")}
          />

          <Last30DaysExpense
            data={dashboardData?.last30DaysExpenseTransactions?.transactions || []}
          />

          <RecentIncomeWithChart
            data={dashboardData?.last60DaysIncomeTransactions?.transactions?.slice(0,4) || []}
            totalIncome={dashboardData?.totalIncome || 0}
          />

          <RecentIncome
            transactions={dashboardData?.last60DaysIncomeTransactions?.transactions || []}
            onSeeMore={() => navigate("/income")}
          />
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Home;