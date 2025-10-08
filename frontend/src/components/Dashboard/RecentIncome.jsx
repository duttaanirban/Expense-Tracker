import { LuArrowRight } from "react-icons/lu"
import TransactionInfoCard from "../Cards/TransactioninfoCard"
import moment from "moment"


const RecentIncome = ({ transactions, onSeeMore }) => {
  return (
    <div className="card">
        <div className="flex items-center justify-between">
          <h5 className="text-lg">Income</h5>
          <button onClick={onSeeMore} className="card-btn">See More <LuArrowRight className="text-base"/></button>
        </div>

        <div className="mt-6">
            {transactions?.slice(0,5)?.map((item) => (
                <TransactionInfoCard
                    key={item._id}
                    title={item.source}
                    icon={item.icon}
                    amount={item.amount}
                    date={moment(item.date).format("MMM D, YYYY")}
                    type="income"
                    hideDeleteBtn
                />
            ))}
        </div>
    </div>
  )
}

export default RecentIncome