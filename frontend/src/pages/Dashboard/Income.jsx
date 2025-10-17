import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout"
import IncomeOverview from "../../components/Income/IncomeOverview";
import axiosInstance from "../../utils/axios";
import { API_PATHS } from "../../utils/apiPaths";


const Income = () => {

  const [incomeData, setIncomeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({show: false, data: null});
  
  const [OpenAddIncomeModal, setOpenAddIncomeModal] = useState(false);
  
  //getAllIncomeDetails
  const fetchIncomeData = async () => {
    if (loading) return;

    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `${API_PATHS.INCOME.GET_ALL_INCOME}`
      );

      if (response.data) {
        setIncomeData(response.data);
      }
    } catch (error) {
        console.error("Error fetching income data:", error);
    } finally {
      setLoading(false);
    }
  };

  //handleAddIncome
  const handleAddIncome = () => {};


  //handleDeleteIncome
  const handleDeleteIncome = () => {};


  //handleDownloadIncome
  const handleDownloadIncome = () => {};

  useEffect(() => {
    fetchIncomeData();

    return () => {
      
    }
  }, []);

  return (
    <DashboardLayout activeMenu="Income">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div className="">
            <IncomeOverview
              transactions={incomeData}
              onAddIncome={() => setOpenAddIncomeModal(true)}
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Income