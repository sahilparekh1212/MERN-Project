import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './home.css';

function Home({ teamsList, deleteTeam, keepFirstX }) {

    const [teams, setTeams] = useState([]);

    useEffect(() => {
        setTeams(teamsList);
    }, [teamsList, teams]);

    const updateTeam = (id) => {
        navigateConst(`/update/${id}`);
    }

    const deleteTeamFunc = (team) => {
        if (window.confirm(`Want to delete Team with id ${team._id} ?`)) {
            deleteTeam(team);
        } else {
            alert('did not delete');
        }
    }

    const navigateConst = useNavigate();

    return (
        <>
            <div id="resetDiv">
                <button onClick={keepFirstX} className="border border-info rounded bg-transparent text-info p-1">Reset</button>
            </div>
            <div className="row justify-content-around p-1 mt-2">
                <table className="col-lg-9 col-md-11 col-12">
                    <thead>
                        <tr className="border-bottom text-info">
                            <td className="col-1 text-wrap">Id</td>
                            <td className="col-2">Team Name</td>
                            <td className="col-2">Game Name</td>
                            <td className="col-3">Email Id</td>
                            <td className="col-4">Actions</td>
                        </tr>
                    </thead>
                    <tbody>
                        {(teams && teams.length !== 0) ? (<>
                            {teams && (teams.map((team, index) => (
                                <tr key={index}>
                                    <td className="col-1" >{team._id}</td>
                                    <td className="col-2" >{team.teamName}</td>
                                    <td className="col-2" >{team.gameName}</td>
                                    <td className="col-3" >{team.emailId}</td>
                                    <td className="col-4">
                                        <button className="btn text-primary p-1 mr-2" onClick={() => updateTeam(team._id)}><small>Update</small></button>
                                        <button className="btn text-danger p-1 mr-2" onClick={() => deleteTeamFunc(team)}><small>Delete</small></button>
                                    </td>
                                </tr>)))}
                        </>) : (<tr><td colSpan="5">Loading...</td></tr>)}
                    </tbody>
                </table>
            </div>

        </>
    );
}

export default Home;
