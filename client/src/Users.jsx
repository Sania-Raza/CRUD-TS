import api from "./api";
import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api
      .get("/")
      .then((result) => setUsers(result.data))
      .catch((err) => console.log(err));
  });

  const handleDelete =(id) =>{
    api
      .delete("/deleteUser/" + id)
      .then((res) => console.log(res))    // or {console.log(res)    window.location.reload}
      .catch((err) => console.log(err));
  }
  return (
    <div className="d-flex vh-100 bg-secondary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <Link to="/create" className="btn btn-info">
          Add +
        </Link>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>   Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              return (
                <tr>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.age}</td>
                  <td>
                    <Link
                      to={`/update/${user._id}`}
                      className="btn btn-warning"
                    >
                      Update
                    </Link>
                    <button
                      className="btn btn-danger mx-3 "
                      onClick={() => handleDelete(user._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default Users;
