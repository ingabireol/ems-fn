import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function DepartmentEdit() {
  const params = useParams();
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getDepartmentData();
  }, []);

  const getDepartmentData = async () => {
    try {
      const department = await axios.get(`/departments/${params.id}`); // Replace with your API endpoint
      myFormik.setValues(department.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const myFormik = useFormik({
    initialValues: {
      name: "",
      isActive: false,
    },
    validate: (values) => {
      let errors = {};

      if (!values.name) {
        errors.name = "Please enter department name";
      } else if (values.name.length < 3) {
        errors.name = "Name shouldn't be less than 3 letters";
      } else if (values.name.length > 50) {
        errors.name = "Name shouldn't be more than 50 letters";
      }

      return errors;
    },
    onSubmit: async (values) => {
      try {
        setLoading(true);
        await axios.put(`/departments/${params.id}`, values); // Replace with your API endpoint
        setLoading(false);
        navigate("/portal/department-list");
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    },
  });

  return (
    <div className="container">
      <h3>Edit Department - Id: {params.id}</h3>
      <form onSubmit={myFormik.handleSubmit}>
        <div className="row">
          <div className="col-lg-6">
            <label>Department Name</label>
            <input
              name="name"
              value={myFormik.values.name}
              onChange={myFormik.handleChange}
              type="text"
              className={`form-control ${myFormik.errors.name ? "is-invalid" : ""}`}
            />
            <span style={{ color: "red" }}>{myFormik.errors.name}</span>
          </div>

          <div className="col-lg-6 mt-3">
            <div className="form-check">
              <input
                name="isActive"
                type="checkbox"
                checked={myFormik.values.isActive}
                onChange={myFormik.handleChange}
                className="form-check-input"
              />
              <label className="form-check-label">Is Active</label>
            </div>
          </div>

          <div className="col-lg-12 mt-3">
            <button
              disabled={isLoading}
              type="submit"
              className="btn btn-primary"
            >
              {isLoading ? "Updating..." : "Update"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default DepartmentEdit;
