import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from 'react';
import CustomNavigation from './components/customNavigation/customNavigation';
import Home from './components/home/home';
import AddTeam from './components/addTeam/addTeam';
import UpdateTeam from './components/updateTeam/updateTeam';

function App() {
  const search = (id, inputArray) => {
    for (let i = 0; i < inputArray.length; i++) {
      if (inputArray[i]._id === id) {
        return inputArray[i];
      }
    }
    return 'none';
  }

  const [teams, setTeams] = useState([]);
  const [isTeamDeleted, setIsTeamDeleted] = useState(false);
  const [showDeleteMessage, setShowDeleteMessage] = useState(false);
  const [isResetDone, setIsResetDone] = useState(false);
  const [showResetMessage, setShowResetMessage] = useState(false);
  const [deletedTeam, setDeletedTeam] = useState({});

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
      });
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
        if (data.result && data.result === "success") {
          setDeletedTeam(search(team._id, teams));
          setIsTeamDeleted(true);
          window.location.reload();
        } else {
          setIsTeamDeleted(false);
        }
        showDeleteMessage(true);
      })
  }

  const keepFirstX = () => {
    let keepTotalTeams = prompt("How many teams do you want to keep?");

    fetch(`http://localhost:5000/api/v1/teams?keepFirstX=${parseInt(keepTotalTeams)}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then((res) => res.json()).then((data) => {
        console.log('deleteTeamFunc > data= ', data);
        if (data.result && data.result === "success") {
          setIsResetDone(true);
          window.location.reload();
        } else {
          setIsResetDone(false);
        }
        setShowResetMessage(true);
      });
  }

  return (
    <div className="container">
      <BrowserRouter>
        <CustomNavigation />
        {showResetMessage && (<>{(isResetDone) ? (
          <div className="d-flex row justify-content-around text-success border border-success">
            <div className="col-11">Reset Successfully Done</div>
            <div className="col-1"><button className="bg-transparent text-success border-0"
              onClick={() => { setShowResetMessage(!showResetMessage) }}>&times;</button></div>
          </div>
        ) : (
          <div className="d-flex row justify-content-around text-danger border border-danger">
            <div className="col-11">Something went wrong! Please try again later.</div>
            <div className="col-1"><button className="bg-transparent text-danger border-0"
              onClick={() => { setShowResetMessage(!showResetMessage) }}>&times;</button></div>
          </div>
        )}
        </>)}
        {showDeleteMessage && (<>{(isTeamDeleted) ? (
          <div className="d-flex row justify-content-around text-success border border-success">
            <div className="col-11">Deleted Team Successfully with id {deletedTeam._id}</div>
            <div className="col-1"><button className="bg-transparent text-success border-0"
              onClick={() => { setShowDeleteMessage(!showDeleteMessage) }}>&times;</button></div>
          </div>
        ) : (
          <div className="d-flex row justify-content-around text-danger border border-danger">
            <div className="col-11">Something went wrong! Please try again later.</div>
            <div className="col-1"><button className="bg-transparent text-danger border-0"
              onClick={() => { setShowDeleteMessage(!showDeleteMessage) }}>&times;</button></div>
          </div>
        )}
        </>)}
        <Routes>
          <Route path="/home" element={<Home teamsList={teams} deleteTeam={deleteTeam} getTeams={getTeams} keepFirstX={keepFirstX} />}></Route>
          <Route path="/update/:id" element={<UpdateTeam teamsList={teams} getTeams={getTeams} />}></Route>
          <Route path="/addTeam" element={<AddTeam teamsList={teams} getTeams={getTeams} />}></Route>
          <Route path="*" element={<Home teamsList={teams} deleteTeam={deleteTeam} getTeams={getTeams} keepFirstX={keepFirstX} />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )

}

export default App;
