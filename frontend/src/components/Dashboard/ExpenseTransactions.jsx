import { LuArrowRight } from 'react-icons/lu';
import TransactionInfoCard from '../Cards/TransactioninfoCard';
import moment from 'moment';

const ExpenseTransactions = ({ transactionsData, onSeeMore }) => {
  return (
    <div className='card'>
        <div className='flex items-center justify-between'>
          <h5 className='text-lg'>Expense</h5>

          <button className='card-btn' onClick={onSeeMore}>See More <LuArrowRight className='text-base'/></button>
        </div>

        <div className='mt-6'>
          {transactionsData?.slice(0,5)?.map((expense) => (
            <TransactionInfoCard
              key={expense._id}
              title={expense.category}
              icon={expense.icon}
              date={moment(expense.date).format('MMMM Do YYYY')}
              amount={expense.amount}
              type='expense'
              hideDeleteBtn
            />
          ))}
        </div>
    </div>
  )
}

export default ExpenseTransactions;