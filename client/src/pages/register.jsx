import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../store/auth";

export const Register = () => {
    const [user, setUser] = useState({
        name: "",
        email: "",
        phone: "",
        gender: "",
        source: "",
        city: "",
        state: "",
        password: ""
    });

    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setUser({
            ...user,
            [name]: value
        });
    };

    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:3000/api/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user),
            });

            const res_data = await response.json();
            if (response.ok) {
                setUser({ name: "", email: "", phone: "", gender: "", source: "", city: "", state: "", password: "" });
                storeTokenInLS(res_data.token);
                toast.success("Registration Successful");
                navigate("/");
            }
            else {
                toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);
            }
        } catch (error) {
            console.log("Register: ", error);
        }
    };

    return (
        <>
            <section>
                <main>
                    <div className="section-registration">
                        <div className="container grid grid-two-cols">
                            <div className="reg-img">
                                <img src="/images/register.png" alt="" width="400" height="500" />
                            </div>
                            <div className="registration-form">
                                <h1 className="main-heading mb-3">registration form</h1>
                                <br />
                                <form onSubmit={handleSubmit}>
                                    <div>
                                        <label htmlFor="name">name</label>
                                        <input type="text" name="name" value={user.name} onChange={handleInput} placeholder="name" />
                                    </div>
                                    <div>
                                        <label htmlFor="email">email</label>
                                        <input type="email" name="email" value={user.email} onChange={handleInput} placeholder="email" />
                                    </div>
                                    <div>
                                        <label htmlFor="phone">phone</label>
                                        <input type="number" name="phone" value={user.phone} onChange={handleInput} placeholder="email" />
                                    </div>
                                    <div>
                                        <label htmlFor="gender">gender</label>
                                        <input type="text" name="gender" value={user.gender} onChange={handleInput} placeholder="gender" />
                                    </div>
                                    <div>
                                        <label htmlFor="source">source</label>
                                        <input type="text" name="source" value={user.source} onChange={handleInput} placeholder="source" />
                                    </div>
                                    <div>
                                        <label htmlFor="city">city</label>
                                        <input type="text" name="city" value={user.city} onChange={handleInput} placeholder="city" />
                                    </div>
                                    <div>
                                        <label htmlFor="state">state</label>
                                        <input type="text" name="state" value={user.state} onChange={handleInput} placeholder="state" />
                                    </div>
                                    <div>
                                        <label htmlFor="password">password</label>
                                        <input type="password" name="password" value={user.password} onChange={handleInput} placeholder="password" />
                                    </div>
                                    <br />
                                    <button type="submit" className="btn btn-submit"> Register Now </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </main>
            </section>
        </>
    );
};