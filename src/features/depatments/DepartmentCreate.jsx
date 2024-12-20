import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function DepartmentCreate() {
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

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
        const response = await axios.post("/departments", values); // Replace with actual endpoint
        console.log(response.data);
        navigate("/portal/department-list");
      } catch (error) {
        console.error(error);
        alert("Failed to create department");
        setLoading(false);
      }
    },
  });

  return (
    <div className="container">
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
              {isLoading ? "Submitting..." : "Create"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default DepartmentCreate;
