import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function DepartmentView() {
  const params = useParams();
  const [department, setDepartment] = useState({});
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch department details on load
    getDepartment();
  }, []);

  const getDepartment = async () => {
    try {
      const response = await axios.get(`/departments/${params.id}`); // Proxy handles the base URL
      setDepartment(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div>DepartmentView - {params.id}</div>
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">Department Details</h6>
        </div>
        <div className="card-body">
          {isLoading ? (
            <img src="https://media.giphy.com/media/ZO9b1ntYVJmjZlsWlm/giphy.gif" alt="Loading..." />
          ) : (
            <div className="table-responsive">
              <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Active Status</th>
                  </tr>
                </thead>
                <tfoot>
                  <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Active Status</th>
                  </tr>
                </tfoot>
                <tbody>
                  <tr>
                    <td>{department.id}</td>
                    <td>{department.name}</td>
                    <td>{department.description}</td>
                    <td>{department.isActive ? "Active" : "Inactive"}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
export default DepartmentView;
