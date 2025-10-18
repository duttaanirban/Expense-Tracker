import React, { useState } from 'react'
import Input from '../inputs/Input';

const AddIncomeForm = ({ onAddIncome }) => {
    const [income, setIncome] = useState({
        source: '',
        amount: '',
        date: '',
        icon: '',
    });

    const handleChange = (key, value) => setIncome({ ...income, [key]: value });

    return (
        <div>
            <Input
                value={income.source}
                onChange={(e) => handleChange('source', e.target.value)}
                label="Income Source"
                placeholder="e.g. Salary, Freelance"
                type="text"
            />

            <Input
                value={income.amount}
                onChange={(e) => handleChange('amount', e.target.value)}
                label="Amount"
                placeholder="e.g. 5000"
                type="number"
            />

            <Input
                value={income.date}
                onChange={(e) => handleChange('date', e.target.value)}
                label="Date"
                type="date"
            />

            <div className='flex justify-end mt-6'>
                <button
                    type='button'
                    className='add-btn add-btn-fill'
                    onClick={() => onAddIncome(income)}
                >
                    Add Income
                </button>
            </div>
        </div>
  )
}

export default AddIncomeForm