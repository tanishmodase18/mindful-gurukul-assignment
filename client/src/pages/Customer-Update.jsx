import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../store/auth";

export const UpdateUser = () => {
    const [user, setUser] = useState({
        name: "",
        email: "",
        phone: ""
    });

    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setUser({
            ...user,
            [name]: value
        });
    };

    const { authorizationToken } = useAuth();
	const params = useParams();
    const navigate = useNavigate();

    const getUserData = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/dashboard/customers/${params.id}`, {
                method: "GET",
                headers: {
                    "Authorization":authorizationToken
                },
            });

            const data = await response.json();
            setUser({
                name: data.response.name,
                email: data.response.email,
                phone: data.response.phone
            });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getUserData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:3000/api/dashboard/customers/update/${params.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization":authorizationToken
                },
                body: JSON.stringify(user),
            });

            const res_data = await response.json();
            if (response.ok) {
                setUser({ name: "", email: "", phone: "" });
                toast.success("Update Successful");
                navigate("/dashboard");
            }
            else {
                toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <section>
                <main>
                    <div className="section-registration">
                        <div className="container grid grid-two-cols">
                            <div className="registration-form">
                                <h1 className="main-heading mb-3">Update Customer</h1>
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
                                    <br />
                                    <button type="submit" className="btn btn-submit"> Update </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </main>
            </section>
        </>
    );
};