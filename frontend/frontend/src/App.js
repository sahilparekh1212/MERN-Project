import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from 'react';
import CustomNavigation from './components/customNavigation/customNavigation';
import Home from './components/home/home';
import AddTeam from './components/addTeam/addTeam';
import UpdateTeam from './components/updateTeam/updateTeam';

function App() {
  const info = [{ id: 1, teamName: 'teamName', gameName: 'gameName', emailId: 'a@team.com' }, { id: 2, teamName: 'teamName', gameName: 'gameName', emailId: 'b@team.com' }];
  const [teams, setTeams] = useState(info);

  useEffect(() => {
    // fetch('../resources/mockData.json');
    // const info =[];

    // const mockData = async ()=>{
    //   const res = await ('../mockData.json');
    //   info = await res.json();
    // }

    // mockData();
    console.log("useEffects teams=", teams);
  }, [teams]);

  const updateTeamFunc = (input) => {
    console.log("updateTeamFunc from App.js input=", input);
    console.log("updateTeamFunc before", teams);
    let inputArray = teams;
    for (let i = 0; i < inputArray.length; i++) {
      if (inputArray[i].id == input.id) {
        inputArray[i] = input;
        setTeams(inputArray);
      }
    }
    // console.log("updateTeamFunc after", teams);
  }

  const addTeamFunc = (input) => {
    console.log("addTeamFunc from App.js input=", input);
    let refTeams = teams;
    refTeams.push(input);
    setTeams(refTeams);
    // console.log("addTeamFunc after", teams);
  }

  const deleteTeamFunc = (team) => {
    let teamsRef = teams;
    let teamIndex = teamsRef.indexOf(team);
    teamsRef.splice(teamIndex, 1);
    setTeams(teamsRef);
    // console.log("deleteTeamFunc after", teams);
  }

  return (
    <div className="container">
      <BrowserRouter>
        <CustomNavigation />
        <Routes>
          <Route path="/" element={<Home teams={info} />}></Route>
          <Route path="/home" element={<Home teams={info} deleteTeamFunc={deleteTeamFunc} />}></Route>
          <Route path="/update/:id" element={<UpdateTeam teams={info} updateTeamFunc={updateTeamFunc} deleteTeamFunc={deleteTeamFunc} />}></Route>
          <Route path="/addTeam" element={<AddTeam teams={info} addTeamFunc={addTeamFunc} />}></Route>
          <Route path="*" element={<Home teams={info} />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )

}

export default App;
