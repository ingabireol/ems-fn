import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function EmployeeView() {
  const params = useParams();
  const [employee, setEmployee] = useState({});
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    // On Load
    getEmployee();
    console.log("Welcome to EmployeeView");
  }, []);

  let getEmployee = async () => {
    try {
      const response = await axios.get(`/employees/${params.id}`); // Replace with your actual API endpoint
      setEmployee(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div>EmployeeView - {params.id}</div>
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">Employee Details</h6>
        </div>
        <div className="card-body">
          {
            isLoading ? <img src="https://media.giphy.com/media/ZO9b1ntYVJmjZlsWlm/giphy.gif" alt="Loading..." />
              :
              <div className="table-responsive">
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
                    </tr>
                  </tfoot>
                  <tbody>
                    <tr>
                      <td>{employee.id}</td>
                      <td>{employee.first_name}</td>
                      <td>{employee.last_name}</td>
                      <td>{employee.email}</td>
                      <td>{employee.department}</td>
                      <td>{employee.position}</td>
                      <td>{employee.isActive ? "Active" : "Inactive"}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
          }
        </div>
      </div>
    </>
  );
}

export default EmployeeView;
