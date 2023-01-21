import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import CustomNavigation from './components/customNavigation/customNavigation';
import Home from './components/home/home';
import AddTeam from './components/addTeam/addTeam';
import UpdateTeam from './components/updateTeam/updateTeam';

function App() {

  const [teams, setTeams] = useState([]);

  useEffect(() => {
    getTeams();
  }, []);

  const getTeams = () => {
    fetch("http://localhost:5000/api/v1/teams", {
      method: 'GET'
    })
      .then((res) => res.json()).then((data) => {
        console.log('Get Teams > data.teams= ', data.teams);
        setTeams(data.teams);
      })
  }

  const deleteTeam = (team) => {
    fetch("http://localhost:5000/api/v1/teams/deleteTeam", {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: team._id
      })
    })
      .then((res) => res.json()).then((data) => {
        console.log('deleteTeam > data= ', data);
        getTeams();
      })
  }

  return (
    <div className="container">
      <BrowserRouter>
        <CustomNavigation />
        <Routes>
          <Route path="/home" element={<Home teamsList={teams} deleteTeam={deleteTeam} getTeams={getTeams} />}></Route>
          <Route path="/update/:id" element={<UpdateTeam teamsList={teams} getTeams={getTeams} />}></Route>
          <Route path="/addTeam" element={<AddTeam teamsList={teams} getTeams={getTeams} />}></Route>
          <Route path="*" element={<Home teamsList={teams} deleteTeam={deleteTeam} getTeams={getTeams} />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )

}

export default App;
