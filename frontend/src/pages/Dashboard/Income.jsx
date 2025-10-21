import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout"
import IncomeOverview from "../../components/Income/IncomeOverview";
import axiosInstance from "../../utils/axios";
import { API_PATHS } from "../../utils/apiPaths";
import Modal from "../../components/Modal";
import AddIncomeForm from "../../components/Income/AddIncomeForm";
import { toast } from "react-hot-toast";
import IncomeList from "../../components/Income/IncomeList";
import DeleteAlert from "../../components/DeleteAlert";
import useUserAuth from "../../hooks/useUserAuth";

const Income = () => {
  useUserAuth();
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
  const handleAddIncome = async (income) => {
    const {source, amount, date, icon} = income;

    //simple validation
    if (!source.trim()) {
      toast.error("Please enter a valid income source.");
      return;
    }
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error("Please enter a valid amount greater than zero.");
      return;
    }
    if (!date) {
      toast.error("Please select a valid date.");
      return;
    }

    try {
      await axiosInstance.post(`${API_PATHS.INCOME.ADD_INCOME}`, {
        source,
        amount,
        date,
        icon,
      });

      setOpenAddIncomeModal(false);
      toast.success("Income added successfully!");
      fetchIncomeData();
    } catch (error) {
      console.error("Error adding income:", error);
      toast.error("Failed to add income. Please try again.");
    }
  };

  //handleDeleteIncome
  const handleDeleteIncome = async (id) => {
    try {
      await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(id));

      setOpenDeleteAlert({show: false, data: null});
      toast.success("Income deleted successfully!");
      fetchIncomeData();
    } catch (error) {
      console.error("Error deleting income:", error);
      toast.error("Failed to delete income. Please try again.");
    }
  };

  //handleDownloadIncome
  const handleDownloadIncome = async () => {};

  useEffect(() => {
    fetchIncomeData();

    return () => {};
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

          <IncomeList
            transactions={incomeData}
            onDelete={(id) => {
              setOpenDeleteAlert({show: true, data: id});
            }}
            onDownload={handleDownloadIncome}
          />
        </div>

        <Modal
          isOpen={OpenAddIncomeModal}
          onClose={() => setOpenAddIncomeModal(false)}
          title="Add New Income"
        >
          <div>
            <AddIncomeForm onAddIncome={handleAddIncome} />
          </div>
        </Modal>

        <Modal
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({show: false, data: null})}
          title="Confirm Delete"
        >
          <DeleteAlert
            content="Are you sure you want to delete this income entry? This action cannot be undone."
            onDelete={() => handleDeleteIncome(openDeleteAlert.data)}
          />
        </Modal>
      </div>
    </DashboardLayout>
  )
}

export default Income