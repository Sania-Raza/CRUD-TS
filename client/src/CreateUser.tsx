import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "./api";

function CreateUser() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [age, setAge] = useState<string>("");

  const navigate = useNavigate();

  const Submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const ageNumber = Number(age);

    if (!name || !email || !age) {
      alert("Please fill all fields");
      return;
    }

    if (Number.isNaN(ageNumber)) {
      alert("Age must be a number");
      return;
    }

    api
      .post("/createUser", {
        name,
        email,
        age: ageNumber,
      })
      .then((result) => {
        console.log(result);
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex vh-100 bg-secondary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <form onSubmit={Submit}>
          <h2>Add User</h2>

          <div className="mb-2">
            <label htmlFor="name">Name</label>

            <input
              id="name"
              type="text"
              placeholder="Enter name"
              className="form-control"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mb-2">
            <label htmlFor="email">Email</label>

            <input
              id="email"
              type="email"
              placeholder="Enter email"
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-2">
            <label htmlFor="age">Age</label>

            <input
              id="age"
              type="number"
              placeholder="Enter Age"
              className="form-control"
              onChange={(e) => setAge(e.target.value)}
            />

            <button className="mt-3 btn btn-info">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateUser;
