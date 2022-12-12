import { useState } from 'react';
import './App.css';
import AddTeam from './components/addTeam/addTeam';
import Home from './components/home/home';

function App() {
  
  const info = [{ id: 1, teamName: 'teamName', gameName: 'gameName', emailId: 'a@team.com' }];
  
  const [teams] = useState(info);

  // setTeams(info);
  
//   async function getTeams() {
//     const res = await fetch('getTeamsURL');
//     const teamsJSON = await res.json();

//     if(teamsJSON){
//         setTeams(teamsJSON);
//     } else {
//         console.log('Something went wrong -> getTeams() -> res=', teamsJSON);
//     }
// }

  return (
    <div className="container">
      <nav>
        <ul className="nav nav-tabs">
          <li className="nav-item"><a href="https://www.google.com/" className="nav-link text-info" >Home</a></li>
          <li className="nav-item"><a href="https://www.google.com/" className="nav-link text-info">Add Team</a></li>
        </ul>
      </nav>
      {/* <Home teamsInput={teams} teamDeleted={(id)=>{alert(`teamDeleted with id ${id}`)}} keepFirstTeam={()=>{alert('keepFirstTeam from App.js')}}></Home> */}
      {/* <AddTeam newTeamAdded={()=>{alert('newTeamAdded in App.js')}}></AddTeam> */}
    </div>
  );
}

export default App;
