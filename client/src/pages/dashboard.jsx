import { useState, useEffect } from "react";
import { Link as LinkRouter, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../store/auth";
import { FloatingButton } from "../components/Floating-Button";

export const Dashboard = () => {
    const { user } = useAuth();
    const { name, email, phone, gender, city, state } = user;
    const [cust, setCust] = useState("");
    const { authorizationToken } = useAuth();
    const [isOnline, setIsOnline] = useState(true); // Track online 
    const [sortOrder, setSortOrder] = useState(localStorage.getItem("sortOrder"));
    const [searchTerm, setSearchTerm] = useState(localStorage.getItem("searchTerm"));
    const [filteredCustomers, setFilteredCustomers] = useState([]);

    const getAllCustomersData = async () => {
        try {
            // Check if the device is online before making the API call
            if (!navigator.onLine) {
                setIsOnline(false);
                toast.error("No Internet Connection");
                return;
            }

            const response = await fetch(`http://localhost:3000/api/dashboard/customers/order/${sortOrder}`, {
                method: "GET",
                headers: {
                    Authorization: authorizationToken
                }
            });

            const data = await response.json();
            if (response.ok) {
                setCust(data.message);
            }
            else {
                toast.error(data.extraDetails ? data.extraDetails : data.message);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const deleteUser = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/api/dashboard/customers/delete/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: authorizationToken
                }
            });

            if (response.ok) {
                toast.success("User Deleted Successfully");
                getAllCustomersData();
            }
        } catch (error) {
            console.log(error);
        }
    };
    
    const navigate = useNavigate();
    const handleFloatSubmit = () => {
        navigate("/add");
    };
    
    useEffect(() => {
        getAllCustomersData();
        
        // Update online status on component mount
        setIsOnline(navigator.onLine);

        // Add event listeners to update online status dynamically
        window.addEventListener("online", () => setIsOnline(true));
        window.addEventListener("offline", () => setIsOnline(false));

        // Cleanup event listeners on component unmount
        return () => {
            window.removeEventListener("online", () => setIsOnline(true));
            window.removeEventListener("offline", () => setIsOnline(false));
        };
    }, []);
    
    // SortBy and Search Implementation    
    useEffect(() => {
        localStorage.setItem("sortOrder", sortOrder);
        localStorage.setItem("searchTerm", searchTerm);
    }, [sortOrder, searchTerm]);
    
    useEffect(() => {
        const sorted = [...cust].sort((a, b) => {
            if (sortOrder === "A-Z") {
                return a.name.localeCompare(b.name);
            }
            else if (sortOrder === "Z-A") {
                return b.name.localeCompare(a.name);
            }
            else if (sortOrder === "Last Modified") {
                // Implement logic for Last Modified sorting
                // For now, assuming you have a timestamp field in your customer data
                return b.lastModifiedTimestamp - a.lastModifiedTimestamp;
            }
            else if (sortOrder === "Last Inserted") {
                // Implement logic for Last Inserted sorting
                // For now, assuming you have a timestamp field in your customer data
                return b.insertedTimestamp - a.insertedTimestamp;
            }
        });
    
        const filteredData = sorted.filter((customer) => {
            return (
                customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                customer.phone.toLowerCase().includes(searchTerm.toLowerCase())
            );
        });
        setFilteredCustomers(filteredData);
    }, [cust, sortOrder, searchTerm]);
    
    const handleSortChange = (event) => {
        setSortOrder(event.target.value);
    };
    
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };
    
    return (
        <>
            <FloatingButton onClick={handleFloatSubmit} />
            <div className="container grid">
                <div className="user-details-container">
                    <p><strong>Name:</strong> {name}</p>
                    <p><strong>Email:</strong> {email}</p>
                    <p><strong>Phone:</strong> {phone}</p>
                    <p><strong>Gender:</strong> {gender}</p>
                    <p><strong>City:</strong> {city}</p>
                    <p><strong>State:</strong> {state}</p>
                </div>
                <section className="admin-users-section">
                    <div className="container">
                        <h1 className="main-heading mb3">Customers Data</h1>
                        {/* Filter and Search Bar */}
                        <div className="filter-search-bar">
                            <label>
                                Sort By:
                                <select value={sortOrder} onChange={handleSortChange}>
                                    <option value="A-Z">A-Z</option>
                                    <option value="Z-A">Z-A</option>
                                    <option value="Last Modified">Last Modified</option>
                                    <option value="Last Inserted">Last Inserted</option>
                                </select>
                            </label>
                            <label> Search:
                                <input type="text" onChange={handleSearchChange}/>
                            </label>
                        </div>
                    </div>
                    <div className="container admin-users">
                        {
                            Array.from(filteredCustomers).length == 0 ? <p>No User Found</p> :
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Phone</th>
                                            <th>Edit</th>
                                            <th>Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            Array.from(filteredCustomers).map((curr, idx) => {
                                                return (
                                                    <tr key={idx}>
                                                        <td>{curr.name}</td>
                                                        <td>{curr.email}</td>
                                                        <td>{curr.phone}</td>
                                                        <td><LinkRouter to={`/${curr._id}/edit`}>Edit</LinkRouter></td>
                                                        <td><button onClick={() => deleteUser(curr._id)}>Delete</button></td>
                                                    </tr>
                                                );
                                            })
                                        }
                                    </tbody>
                                </table>
                        }
                    </div>
                </section>
            </div>
        </>
    );
};