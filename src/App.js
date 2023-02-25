
import Login from "./components/Login";
import Signup from "./components/Signup";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import About from "./pages/About";
import Payment from "./pages/Payment";
import Cards from "./pages/Cards";
import Upgrade from "./pages/Upgrade";
import PreArrival from "./pages/PreArrival";
// import UserDetail from "./pages/UserDetail";
import Homepage from "./pages/Homepage";
import Card from './components/Card';
import Button from './components/Button';
import AgentList from './pages/AgentList';
import ADBoard from './pages/ADBoard';
import FeedbackForm from './pages/FeedbackForm';

import { Context } from "./context/Context";
import { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import './App.css';

function App() {
      const { user, dispatch, token } = useContext(Context);
  return (
    

      <BrowserRouter>
      <Routes>
        <Route
          exact
          path="/login"
          element={<Login />}
        />
        
        <Route
          exact
          path="/signup"
          element={<Signup />}
        />
        <Route
          exact
          path="/payment"
          element={<Payment />}
        />
        <Route
          exact
          path="/card"
          element={<Card />}
        />
        <Route
          exact
          path="/cards"
          element={<Cards />}
        />
       
        <Route
          exact
          path="/footer"
          element={<Footer />}
        />
        <Route
          exact
          path="/agentlist"
          element={<AgentList />}
        />
        <Route
          exact
          path="/agentdashboard"
          element={<ADBoard />}
        />
        <Route
          exact
          path="/prearrival"
          element={<PreArrival />}
        />
        <Route
          exact
          path="/payment"
          element={<Payment />}
        />
        </Routes>
        </BrowserRouter>
  );
}

export default App;
