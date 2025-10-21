import moment from "moment";


export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const getInitials = (name) => {
  if (!name) return "";

  const words = name.split(" ");
  let initials = "";

  for (let i = 0; i < Math.min(words.length, 2); i++) {
    initials += words[i][0];
  }
  return initials.toUpperCase();
};

export const addThousandsSeparator = (number) => {
  if (isNaN(number)) return number;
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const prepareExpenseBarChartData = (data = []) => {
  // Each bar is a separate expense entry
  const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));
  const chartData = sortedData.map((item) => ({
    name: item?.category || "Expense",
    amount: Number(item?.amount || 0),
    date: moment(item?.date).format("DD MMM YYYY"),
  }));
  return chartData;
};

export const prepareIncomeBarChartData = (data = []) => {
  // Each bar is a separate income entry
  const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));
  const chartData = sortedData.map((item) => ({
    name: item?.source || "Income",
    amount: Number(item?.amount || 0),
    date: moment(item?.date).format("DD MMM YYYY"),
  }));
  return chartData;
};