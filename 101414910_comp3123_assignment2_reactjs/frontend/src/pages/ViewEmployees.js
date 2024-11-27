import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../css/ViewEmployee.css';

function ViewEmployee() {
  const { eid } = useParams();
  const [employee, setEmployee] = useState(null);
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/v1/emp/employees/${eid}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setEmployee(response.data);
      } catch (error) {
        console.error('Error fetching employee details:', error);
        alert('Error fetching employee details. Please try again.');
      }
    };
    fetchEmployee();
  }, [eid, backendUrl]);

  if (!employee) {
    return <div>Loading...</div>;
  }



  return (
    <div className="view-employee-container">
      <h2>Employee Details</h2>
      <p><strong>First Name:</strong> {employee.first_name}</p>
      <p><strong>Last Name:</strong> {employee.last_name}</p>
      <p><strong>Email:</strong> {employee.email}</p>
      <p><strong>Position:</strong> {employee.position}</p>
      <p><strong>Salary:</strong> {employee.salary}</p>
      <p><strong>Date of Joining:</strong> {employee.date_of_joining}</p>
      <p><strong>Department:</strong> {employee.department}</p>
    </div>
  );
}

export default ViewEmployee;
