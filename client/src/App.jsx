import { useState } from 'react'
import { BrowserRouter, Routes,Route } from 'react-router-dom'
import Users from './Users';
import CreateUser from './CreateUser'
import UpdateUser from "./UpdateUser";
import DeleteUser from "./DeleteUser";
import "bootstrap/dist/css/bootstrap.min.css"; 
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Users />}></Route>
          <Route path="/create" element={<CreateUser />}></Route>
          <Route path="/update/:id" element={<UpdateUser />}></Route>
          <Route path="/delete" element={<DeleteUser />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App
