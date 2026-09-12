import api from "./api";
import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

interface User {
  _id: string;
  name: string;
  email: string;
  age: number;
}

function Users() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    api
      .get("/")
      .then((result) => {
        console.log("Result:", result);
        console.log("Data:", result.data);
        console.log("Is Array:", Array.isArray(result.data));
        setUsers(result.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id: string) => {
    api
      .delete("/deleteUser/" + id)
      .then((res) => console.log(res)) // or {console.log(res)    window.location.reload}
      .catch((err) => console.log(err));
  };
  return (
    <div className="d-flex min-vh-100 bg-secondary justify-content-center align-items-center py-4">
      <div className="w-100 w-md-75 w-lg-50 bg-white rounded p-3 mx-2">
        <Link to="/create" className="btn btn-info mb-2">
          Add +
        </Link>
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Age</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => {
                return (
                  <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.age}</td>
                    <td>
                     <div className="d-flex flex-column flex-sm-row align-items-center justify-content-center gap-2">
                        <Link
                          to={`/update/${user._id}`}
                          className="btn btn-warning"
                        >
                          Update
                        </Link>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDelete(user._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
export default Users;
