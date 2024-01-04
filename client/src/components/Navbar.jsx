import { NavLink } from "react-router-dom";
import { useAuth } from "../store/auth";
import "./Navbar.css";

export const Navbar = () => {
    const { isLoggedIn } = useAuth();
    
    return (
        <>
            <header>
                <div className="container">
                    <div className="logo-brand">
                        <NavLink to="/"> Tanish Modase </NavLink>
                    </div>

                    <nav>
                        <ul>
                            <li><NavLink to="/"> Home </NavLink></li>
                            {
                            isLoggedIn
                                ? <>
                                    <li><NavLink to="/dashboard"> Dashboard </NavLink></li>
                                    <li><NavLink to="/logout"> Logout </NavLink></li>
                                  </>
                                : <>
                                    <li><NavLink to="/register"> Register </NavLink></li>
                                    <li><NavLink to="/login"> Login </NavLink></li>
                                  </>
                            }
                        </ul>
                    </nav>
                </div>
            </header>
        </>
    );
}