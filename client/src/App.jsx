import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
// import './App.css'
import { Home } from "./pages/home";
import { Login } from "./pages/login";
import { Register } from "./pages/register";
import { Logout } from "./pages/logout";
import { Dashboard } from "./pages/dashboard";
import { UpdateUser } from "./pages/Customer-Update";
import { AddUser } from "./pages/Customer-Add";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path=":id/edit" element={<UpdateUser />} />
          <Route path="/add" element={<AddUser />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  )
}

export default App;