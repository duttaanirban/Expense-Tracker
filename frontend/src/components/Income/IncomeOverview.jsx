import { LuPlus } from "react-icons/lu"
import CustomBarChart from "../Charts/CustomBarChart"
import { useEffect, useState } from "react"
import { prepareIncomeBarChartData } from "../../utils/helper"

const IncomeOverview = ({ transactions, onAddIncome }) => {
  
  const [chartData, setChartData] = useState([])

  useEffect(() => {
    const result = prepareIncomeBarChartData(transactions);
    setChartData(result);

    return () => {};
  }, [transactions]);


  return (
    <div className="">

    </div>
  )
}

export default IncomeOverview