import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from 'react';
import CustomNavigation from './components/customNavigation/customNavigation';
import Home from './components/home/home';
import AddTeam from './components/addTeam/addTeam';
import UpdateTeam from './components/updateTeam/updateTeam';
// import { TeamsContext } from './contexts/contexts';

function App() {
  useEffect(() => {
    // fetch('../resources/mockData.json');
    // const info =[];

    // const mockData = async ()=>{
    //   const res = await ('../mockData.json');
    //   info = await res.json();
    // }

    // mockData();
  }, []);

  const info = [{ id: 1, teamName: 'teamName', gameName: 'gameName', emailId: 'a@team.com' }, { id: 2, teamName: 'teamName', gameName: 'gameName', emailId: 'b@team.com' }];
  const [teams, setTeams] = useState(info);

  const search = (id, inputArray) => {
    for (let i = 0; i < inputArray.length; i++) {
      if (inputArray[i].id == id) {
        return inputArray[i];
      }
    }
  }

  const updateTeamFunc = (input) => {
    console.log("updateTeamFunc from App.js input=", input);
    let refTeam = search(input.id, teams);
    console.log("updateTeamFunc before", teams);
    if (refTeam) {
      setTeams([...teams, refTeam.teamName = input.teamName,
      refTeam.gameName = input.gameName,
      refTeam.emailId = input.emailId]);
    }
    console.log("updateTeamFunc after", teams);
  }

  const addTeamFunc = (input) => {
    console.log("addTeamFunc from App.js input=", input);
    let refTeam = search(input.id, teams);
    console.log("addTeamFunc before", teams);
    if (refTeam) {
      setTeams([...teams, refTeam.teamName = input.teamName,
      refTeam.gameName = input.gameName,
      refTeam.emailId = input.emailId]);
    }
    console.log("addTeamFunc after", teams);
  }

  return (
    <div className="container">
      <BrowserRouter>
        <CustomNavigation />
        <Routes>
          <Route path="/" element={<Home teams={info} />}></Route>
          <Route path="/home" element={<Home teams={info} />}></Route>
          <Route path="/update/:id" element={<UpdateTeam teams={info} updateTeamFunc={updateTeamFunc} />}></Route>
          <Route path="/addTeam" element={<AddTeam teams={info} addTeamFunc={addTeamFunc} />}></Route>
          <Route path="*" element={<Home teams={info} />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )

}

export default App;
