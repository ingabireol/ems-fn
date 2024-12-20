import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function PositionCreate() {
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validate: (values) => {
      let errors = {};
      if (!values.name) {
        errors.name = 'Position name is required';
      }
      return errors;
    },
    onSubmit: async (values) => {
      try {
        setLoading(true);
        await axios.post('/positions', values);
        setLoading(false);
        navigate('/portal/position-list');
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    },
  });

  return (
    <div className="container">
      <h3>Create Position</h3>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <label>Position Name</label>
          <input
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            className={`form-control ${formik.errors.name ? 'is-invalid' : ''}`}
          />
          {formik.errors.name && <div className="invalid-feedback">{formik.errors.name}</div>}
        </div>
        <button type="submit" disabled={isLoading} className="btn btn-primary">
          {isLoading ? 'Creating...' : 'Create'}
        </button>
      </form>
    </div>
  );
}

export default PositionCreate;
