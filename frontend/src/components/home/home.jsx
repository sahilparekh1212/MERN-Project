import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './home.css';

function Home({ teamsList, getTeams, deleteTeam }) {

    const [teams, setTeams] = useState([]);

    useEffect(() => {
        setTeams(teamsList);
        console.log("home > teams=", teams);
    }, [teams]);

    const updateTeam = (id) => {
        navigateConst(`/update/${id}`);
    }

    const deleteTeamFunc = (team) => {
        if (window.confirm(`Want to delete Team with id ${team._id} ?`)) {
            deleteTeam(team);
            // alert('deleted successfully');
        } else {
            alert('did not delete');
        }
    }

    const keepFirstX = () => {
        alert('reset > keepFirst');
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
                // setTeams(data.teams);
                getTeams();
            });
    }

    const navigateConst = useNavigate();

    return (
        <>
            <div id="resetDiv">
                <button onClick={keepFirstX} className="border border-info rounded bg-dark text-info">Reset</button>
            </div>
            <div className="row justify-content-around p-1">
                <table className="col-12">
                    <thead>
                        <tr className="border-bottom text-info">
                            <td className="col-1">Id</td>
                            <td className="col-2">Team Name</td>
                            <td className="col-2">Game Name</td>
                            <td className="col-3">Email Id</td>
                            <td className="col-4">Actions</td>
                        </tr>
                    </thead>
                    <tbody>
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
                    </tbody>
                </table>
            </div>

        </>
    );
}

export default Home;
