import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Login from './pages/auth/Login.jsx'
import SignUp from './pages/auth/SignUp.jsx';
import Income from './pages/Dashboard/Income.jsx';
import Home from './pages/Dashboard/Home.jsx';
import Expense from './pages/Dashboard/Expense.jsx';

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Root />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Home />} />
          <Route path="/income" element={<Income />} />
          <Route path="/expenses" element={<Expense />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App


const Root = () => {
  const isAuthenticated = !!localStorage.getItem('token');

  return isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />;
}