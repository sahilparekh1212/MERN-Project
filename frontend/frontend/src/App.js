import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CustomNavigation from './components/customNavigation/customNavigation';
import Home from './components/home/home';
import AddTeam from './components/addTeam/addTeam';
import UpdateTeam from './components/updateTeam/updateTeam';

function App() {

  return (
    <>
      <div className="container">
        <BrowserRouter>
          <CustomNavigation />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/home" element={<Home />}></Route>
            <Route path="/update/:id" element={<UpdateTeam />}></Route>
            <Route path="/addTeam" element={<AddTeam newTeamAdded={() => { alert('newTeamAdded in App.js') }} />}></Route>
            <Route path="*" element={<Home />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )

}

export default App;
