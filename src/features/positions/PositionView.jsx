import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function PositionView() {
  const params = useParams();
  const [position, setPosition] = useState({});
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosition();
  }, []);

  const fetchPosition = async () => {
    try {
      const response = await axios.get(`/positions/${params.id}`);
      setPosition(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h3>Position Details - {params.id}</h3>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <table className="table table-bordered">
          <tbody>
            <tr>
              <th>Name</th>
              <td>{position.name}</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
}

export default PositionView;
