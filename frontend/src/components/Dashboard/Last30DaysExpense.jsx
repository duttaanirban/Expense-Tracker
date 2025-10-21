import { useEffect, useState } from 'react';
import CustomPieChart from '../Charts/CustomPieChart';

const Last30DaysExpense = ({ data }) => {
  
    const [pieData, setPieData] = useState([]);
    useEffect(() => {
        // Format data for pie chart: [{ name, amount }]
        const result = data.map(item => ({
            name: item.category || 'Expense',
            amount: Number(item.amount || 0)
        }));
        setPieData(result);
        return () => {};
    }, [data]);
    
    const COLORS = ["#875CF5", "#FA2C37", "#FF6900", "#2EC4B6", "#FFB400", "#3A86FF", "#FF006E"];
    const totalAmount = pieData.reduce((sum, item) => sum + item.amount, 0);
    return (
        <div className="card col-span-1">
            <div className="flex items-center justify-between">
                <h5 className="text-lg">Last 30 Days Expenses</h5>
            </div>
            <CustomPieChart
                data={pieData}
                label="Expenses"
                totalAmount={`$${totalAmount}`}
                colors={COLORS}
                showTextAnchor
            />
        </div>
    );
}

export default Last30DaysExpense