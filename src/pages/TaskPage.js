import React, {useState, useEffect} from "react";
import axios from "axios";
import TaskList from "../components/TaskList";
import config from "../config";
import {Button} from "@mui/material";
import {Link} from "react-router-dom";

function TasksPage() {
    const [filters, setFilters] = useState({
        userId: "",
        completed: "",
        startDate: "",
        endDate: "",
    });

    const [users, setUsers] = useState([]);


    useEffect(() => {
        fetchUsers();
    }, []);


    const fetchUsers = async () => {
        try {
            const usersResponse = await axios.get(`${config.API_URL}/Users`);
            const dataUsers = usersResponse.data.$values || [];
            setUsers(Array.isArray(dataUsers) ? dataUsers : []);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const handleFilterChange = (e) => {
        const {name, value} = e.target;
        setFilters({...filters, [name]: value});
        console.log("Filters", filters);
    };

    const handleResetFilters = () => {
        setFilters({
            userId: "",
            completed: "",
            startDate: "",
            endDate: "",
        });
    };

    return (
        <div>
            <h2>Tasks</h2>
            <div>
                <label>
                    User ID:
                    <select
                        name="userId"
                        value={filters.userId}
                        onChange={handleFilterChange}
                    >
                        <option value="">All</option>
                        {Array.isArray(users) &&
                            users.map((user) => (
                                <option key={user.id} value={user.id}>
                                    {user.username}
                                </option>
                            ))}
                    </select>
                </label>
                <label>
                    Completed:
                    <select
                        name="completed"
                        value={filters.completed === 'true'}
                        onChange={handleFilterChange}
                    >
                        <option value="">Both</option>
                        <option value="true">Completed</option>
                        <option value="false">Not Completed</option>
                    </select>
                </label>
                <label>
                    Start Date:
                    <input
                        type="date"
                        name="startDate"
                        value={filters.startDate}
                        onChange={handleFilterChange}
                    />
                </label>
                <label>
                    End Date:
                    <input
                        type="date"
                        name="endDate"
                        value={filters.endDate}
                        onChange={handleFilterChange}
                    />
                </label>
                <button onClick={handleResetFilters}>Reset Filters</button>
            </div>

            <TaskList
                filters={filters}
                editable={true}
            />

            <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/tasks/add"
            >
                Add Task
            </Button>
        </div>
    );
}

export default TasksPage;
