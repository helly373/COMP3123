import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/EmployeeList.css';

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch employees on component mount
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/v1/emp/employees`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
  
        setEmployees(response.data);
        setFilteredEmployees(response.data);
      } catch (error) {
        console.error('Error fetching employees:', error);
        alert('Error fetching employee list. Please try again later.');
      }
    };
    fetchEmployees();
  }, [backendUrl]);

  // Function to handle employee deletion
  const handleDelete = async (eid) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await axios.delete(`${backendUrl}/api/v1/emp/employees`, {
          params: { eid },
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setEmployees(employees.filter((employee) => employee._id !== eid));
        setFilteredEmployees(
          filteredEmployees.filter((employee) => employee._id !== eid)
        );
        alert('Employee deleted successfully.');
      } catch (error) {
        console.error('Error deleting employee:', error);
        alert('Error deleting employee. Please try again later.');
      }
    }
  };

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from local storage
    alert('Logged out successfully');
    navigate('/login'); // Redirect to login page
  };

  // Function to handle search
  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter employees based on department or position
    const filtered = employees.filter(
      (employee) =>
        employee.department.toLowerCase().includes(query) ||
        employee.position.toLowerCase().includes(query)
    );
    setFilteredEmployees(filtered);
  };

  return (
    <div className="employee-list-container">
      <div className="employee-list-card">
        <div className="employee-list-header">
          <h1>Welcome to the Employee Management System</h1>
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
        <h2>Employee List</h2>
        <div className="action-buttons">
        <input
            type="text"
            placeholder="Search by Department or Position"
            value={searchQuery}
            onChange={handleSearch}
            className="search-input"
          />
          <button
            className="add-employee-button"
            onClick={() => navigate('/add-employee')}
          >
            Add Employee
          </button>
        </div>
        <table className="employee-table">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Position</th>
              <th>Department</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee._id}>
                <td>{employee.first_name}</td>
                <td>{employee.last_name}</td>
                <td>{employee.email}</td>
                <td>{employee.position}</td>
                <td>{employee.department}</td>
                <td>
                  <div className="button-group">
                    <button
                      className="action-button view-button"
                      onClick={() => navigate(`/view-employee/${employee._id}`)}
                    >
                      View
                    </button>
                    <button
                      className="action-button update-button"
                      onClick={() => navigate(`/edit-employee/${employee._id}`)}
                    >
                      Update
                    </button>
                    <button
                      className="action-button delete-button"
                      onClick={() => handleDelete(employee._id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EmployeeList;
