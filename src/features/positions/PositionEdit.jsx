import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function PositionEdit() {
  const [isLoading, setLoading] = useState(false);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchPosition();
  }, []);

  const fetchPosition = async () => {
    try {
      const response = await axios.get(`/positions/${params.id}`);
      formik.setValues(response.data);
    } catch (error) {
      console.error(error);
    }
  };

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
        await axios.put(`/positions/${params.id}`, values);
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
      <h3>Edit Position - {params.id}</h3>
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
          {isLoading ? 'Updating...' : 'Update'}
        </button>
      </form>
    </div>
  );
}

export default PositionEdit;
