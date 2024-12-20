import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function PositionList() {
  const [positions, setPositions] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetchPositions();
  }, []);

  const fetchPositions = async () => {
    try {
      const response = await axios.get('/positions');
      setPositions(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm('Are you sure you want to delete this position?');
    if (confirm) {
      try {
        await axios.delete(`/positions/${id}`);
        fetchPositions();
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="container">
      <h3>Positions</h3>
      <Link to="/portal/position-create" className="btn btn-primary mb-3">Create Position</Link>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {positions.map((position) => (
              <tr key={position.id}>
                <td>{position.id}</td>
                <td>{position.name}</td>
                <td>
                  <Link to={`/portal/position-view/${position.id}`} className="btn btn-info btn-sm mr-2">View</Link>
                  <Link to={`/portal/position-edit/${position.id}`} className="btn btn-warning btn-sm mr-2">Edit</Link>
                  <button onClick={() => handleDelete(position.id)} className="btn btn-danger btn-sm">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default PositionList;
