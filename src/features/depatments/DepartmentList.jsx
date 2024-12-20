import { faBuilding } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function DepartmentList() {
  const [departmentList, setDepartmentList] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch departments on load
    getDepartments();
  }, []);

  const getDepartments = async () => {
    try {
      const departments = await axios.get("/departments"); // Proxy handles the base URL
      setDepartmentList(departments.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this department?");
      if (confirmDelete) {
        await axios.delete(`/departments/${id}`); // Proxy handles the base URL
        getDepartments(); // Refresh the list after deletion
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Department List</h1>
        <Link to="/portal/create-department" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
          <FontAwesomeIcon icon={faBuilding} className="mr-2" />
          Create Department
        </Link>
      </div>
      {/* DataTables */}
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">DataTables</h6>
        </div>
        <div className="card-body">
          {
            isLoading ? <img src='https://media.giphy.com/media/ZO9b1ntYVJmjZlsWlm/giphy.gif' alt="Loading..." />
              : <div className="table-responsive">
                <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Name</th>
                      <th>Active Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tfoot>
                    <tr>
                      <th>Id</th>
                      <th>Name</th>
                      <th>Active Status</th>
                      <th>Action</th>
                    </tr>
                  </tfoot>
                  <tbody>
                    {departmentList.map((department) => (
                      <tr key={department.id}>
                        <td>{department.id}</td>
                        <td>{department.name}</td>
                        <td>{department.isActive ? "Active" : "Inactive"}</td>
                        <td>
                          <Link to={`/portal/department-view/${department.id}`} className='btn btn-primary btn-sm mr-1'>View</Link>
                          <Link to={`/portal/department-edit/${department.id}`} className='btn btn-info btn-sm mr-1'>Edit</Link>
                          <button onClick={() => handleDelete(department.id)} className='btn btn-danger btn-sm'>Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
          }
        </div>
      </div>
    </>
  );
}

export default DepartmentList;
