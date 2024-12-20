import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function EmployeeEdit() {
    const params = useParams();
    const [isLoading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        getEmployeeData();
    }, []);

    let getEmployeeData = async () => {
        try {
            const employee = await axios.get(`/api/employees/${params.id}`);
            myFormik.setValues(employee.data);
            setLoading(false);
        } catch (error) {
            console.error(error);
        }
    };

    const myFormik = useFormik({
        initialValues: {
            first_name: "",
            last_name: "",
            email: "",
            username: "",
            dob: "",
            department: "",
            position: "",
            isActive: false
        },
        validate: (values) => {
            let errors = {};

            if (!values.first_name) {
                errors.first_name = "Please enter first name";
            }

            if (!values.last_name) {
                errors.last_name = "Please enter last name";
            }

            if (!values.email) {
                errors.email = "Please enter email";
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }

            if (!values.username) {
                errors.username = "Please enter username";
            }

            if (!values.dob) {
                errors.dob = "Please enter date of birth";
            }

            if (!values.department) {
                errors.department = "Please select a department";
            }

            if (!values.position) {
                errors.position = "Please select a position";
            }

            return errors;
        },

        onSubmit: async (values) => {
            try {
                setLoading(true);
                await axios.put(`/api/employees/${params.id}`, values);
                setLoading(false);
                navigate("/portal/employee-list");
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        }
    });

    return (
        <>
            <h3>EmployeeEdit - Id: {params.id}</h3>
            <div className='container'>
                <form onSubmit={myFormik.handleSubmit}>
                    <div className='row'>
                        <div className="col-lg-6">
                            <label>First Name</label>
                            <input
                                name='first_name'
                                value={myFormik.values.first_name}
                                onChange={myFormik.handleChange}
                                type="text"
                                className={`form-control ${myFormik.errors.first_name ? "is-invalid" : ""}`} />
                            <span style={{ color: "red" }}>{myFormik.errors.first_name}</span>
                        </div>

                        <div className="col-lg-6">
                            <label>Last Name</label>
                            <input
                                name='last_name'
                                value={myFormik.values.last_name}
                                onChange={myFormik.handleChange}
                                type="text"
                                className={`form-control ${myFormik.errors.last_name ? "is-invalid" : ""}`} />
                            <span style={{ color: "red" }}>{myFormik.errors.last_name}</span>
                        </div>

                        <div className="col-lg-6">
                            <label>Email</label>
                            <input
                                name='email'
                                value={myFormik.values.email}
                                onChange={myFormik.handleChange}
                                type="email"
                                className={`form-control ${myFormik.errors.email ? "is-invalid" : ""}`} />
                            <span style={{ color: "red" }}>{myFormik.errors.email}</span>
                        </div>

                        <div className="col-lg-6">
                            <label>Username</label>
                            <input
                                name='username'
                                value={myFormik.values.username}
                                onChange={myFormik.handleChange}
                                type="text"
                                className={`form-control ${myFormik.errors.username ? "is-invalid" : ""}`} />
                            <span style={{ color: "red" }}>{myFormik.errors.username}</span>
                        </div>

                        <div className="col-lg-6">
                            <label>Date of Birth</label>
                            <input
                                name='dob'
                                value={myFormik.values.dob}
                                onChange={myFormik.handleChange}
                                type="date"
                                className={`form-control ${myFormik.errors.dob ? "is-invalid" : ""}`} />
                            <span style={{ color: "red" }}>{myFormik.errors.dob}</span>
                        </div>

                        <div className='col-lg-6'>
                            <label>Department</label>
                            <select
                                name='department'
                                value={myFormik.values.department}
                                onChange={myFormik.handleChange}
                                className={`form-control ${myFormik.errors.department ? "is-invalid" : ""}`}>
                                <option value="">----Select----</option>
                                <option value="HR">Human Resources</option>
                                <option value="IT">Information Technology</option>
                                <option value="FIN">Finance</option>
                                {/* Add more department options here */}
                            </select>
                            <span style={{ color: "red" }}>{myFormik.errors.department}</span>
                        </div>

                        <div className='col-lg-6'>
                            <label>Position</label>
                            <select
                                name='position'
                                value={myFormik.values.position}
                                onChange={myFormik.handleChange}
                                className={`form-control ${myFormik.errors.position ? "is-invalid" : ""}`}>
                                <option value="">----Select----</option>
                                <option value="Manager">Manager</option>
                                <option value="Developer">Developer</option>
                                <option value="Analyst">Analyst</option>
                                {/* Add more position options here */}
                            </select>
                            <span style={{ color: "red" }}>{myFormik.errors.position}</span>
                        </div>

                        <div className="col-lg-6 mt-3">
                            <label>
                                <input
                                    type="checkbox"
                                    name="isActive"
                                    checked={myFormik.values.isActive}
                                    onChange={myFormik.handleChange}
                                /> Is Active
                            </label>
                        </div>

                        <div className='col-lg-4 mt-3'>
                            <input
                                disabled={isLoading}
                                type="submit"
                                value={isLoading ? "Updating..." : "Update"}
                                className='btn btn-primary' />
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}

export default EmployeeEdit;
