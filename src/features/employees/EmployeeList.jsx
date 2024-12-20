import { faUser } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function EmployeeList() {
  const [employeeList, setEmployeeList] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    // On Load
    getEmployees();
  }, []);

  let getEmployees = async () => {
    try {
      const employees = await axios.get("/employees"); // Replace with your actual API endpoint
      setEmployeeList(employees.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  let handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this employee?");
      if (confirmDelete) {
        await axios.delete(`/employees/${id}`); // Replace with your actual API endpoint
        getEmployees();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Employee List</h1>
        <Link to="/portal/create-employee" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
          <FontAwesomeIcon icon={faUser} className="mr-2" />
          Create Employee
        </Link>
      </div>
      {/* <!-- DataTables --> */}
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">DataTables</h6>
        </div>
        <div className="card-body">
          {
            isLoading ? <img src="https://media.giphy.com/media/ZO9b1ntYVJmjZlsWlm/giphy.gif" alt="Loading..." />
              : <div className="table-responsive">
                <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Email</th>
                      <th>Department</th>
                      <th>Position</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tfoot>
                    <tr>
                      <th>Id</th>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Email</th>
                      <th>Department</th>
                      <th>Position</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </tfoot>
                  <tbody>
                    {employeeList.map((employee) => {
                      return (
                        <tr key={employee.id}>
                          <td>{employee.id}</td>
                          <td>{employee.first_name}</td>
                          <td>{employee.last_name}</td>
                          <td>{employee.email}</td>
                          <td>{employee.department}</td>
                          <td>{employee.position}</td>
                          <td>{employee.isActive ? "Active" : "Inactive"}</td>
                          <td>
                            <Link to={`/portal/employee-view/${employee.id}`} className="btn btn-primary btn-sm mr-1">View</Link>
                            <Link to={`/portal/employee-edit/${employee.id}`} className="btn btn-info btn-sm mr-1">Edit</Link>
                            <button onClick={() => handleDelete(employee.id)} className="btn btn-danger btn-sm mr-1">Delete</button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
          }
        </div>
      </div>
    </>
  );
}

export default EmployeeList;
