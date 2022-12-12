// import {  } from 'react';
import { useState } from 'react';
import './home.css';

function Home({teamsInput,teamDeleted,keepFirstTeam}) {

    const [teams, setTeams] = useState(teamsInput);

    function updateTeam(id) {
        // this.router.navigate(['updateTeam', id]);
        alert(`updateTeam > ${id}`);
    }

    async function deleteTeam(id) {
        alert(`deleteTeam > ${id}`);
        teamDeleted(id);
    //     try{
    //     const deletedTeam = await fetch('URL');
    //     const deletedTeamJSON = await deletedTeam.json();

    //     if (deletedTeamJSON.id) {
    //         setTeams((teams.filter((item) => { return item.id !== deletedTeam.id })));
    //     } else {
    //         console.log('Something went wrong -> deleteTeam() -> deletedTeam=', deletedTeam);
    //     }
    // }catch(e){
    //     console.log('Something went wrong -> deleteTeam() -> e=', e);
    // }
    }

    function keepFirst() {
        alert('reset > keepFirst');
        keepFirstTeam();
    //     try{
    //     const deletedTeams = await fetch('URL');
    //     const deletedTeamsJSON = await deletedTeams.json();

    //     if (deletedTeamsJSON) {
    //         let idArr = [];

    //         deletedTeamsJSON.forEach((res) => {
    //             idArr.push(res.id);
    //         });

    //         setTeams(teams.filter((team) => {
    //             return !idArr.includes(team.id);
    //         }));

    //     } else {
    //         console.log('Something went wrong -> keepFirstX() -> deletedTeams=', deletedTeams);
    //     }
    // }
    // catch(e){
    //     console.log('Something went wrong -> keepFirstX() -> e=', e);

    }

    return (
        <>
            <div className="my-4 mx-2">
                {/* <router-outlet></router-outlet> */}
            </div>
            <div id="resetDiv">
                <button onClick={keepFirst} className="border border-info rounded bg-dark text-info">Reset</button>
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
                        {teams && (teams.map((team,index) => (
                            <tr key={index}>
                                <td className="col-1" >{team.id}</td>
                                <td className="col-2" >{team.teamName}</td>
                                <td className="col-2" >{team.gameName}</td>
                                <td className="col-3" >{team.emailId}</td>
                                <td className="col-4">
                                    <button className="btn text-primary p-1 mr-2" onClick={()=>updateTeam(team.id)}><small>Update</small></button>
                                    <button className="btn text-danger p-1 mr-2" onClick={()=>deleteTeam(team.id)}><small>Delete</small></button>
                                </td>
                            </tr>)))}
                    </tbody>
                </table>
            </div>

        </>
    );
}

export default Home;
