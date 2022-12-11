import { useEffect } from 'react';
import { useState } from 'react';
import './home.css';

function Home() {

    const [data,setData]=useState({});

    useEffect({
        // getTeams();
        setData();
    },[data]);


    function ngOnInit() {
        this.getTeams();
    }

    function getTeams() {
        this.teamService.getTeams().subscribe((res) => {
            if (res) {
                this.teams = res;
                // this.teamService.teams = res;
            } else {
                console.log('Something went wrong -> getTeams() -> res=', res);
            }
        },
            (error) => {
                console.log('Error Occured -> getTeams() -> error=', error);
            });
    }

    function updateTeam(id) {
        this.router.navigate(['updateTeam', id]);
    }

    function deleteTeam(id) {
        this.teamService.deleteTeam(id).subscribe((res) => {
            if (res) {
                this.teams = this.teams.filter((team) => {
                    return team.id != id;
                });
            } else {
                console.log('Something went wrong -> deleteTeam() -> res=', res);
            }
        },
            (error) => {
                console.log('Error Occured -> deleteTeam() -> error=', error);
            });
    }

    function keepFirst() {
        let teamsToBeKept = 1;
        this.teamService.keepFirst(teamsToBeKept).subscribe((res) => {
            if (res) {
                let idArr = [];

                res.forEach((res) => {
                    idArr.push(res.id);
                });

                this.teams = this.teams.filter((team) => {
                    return !idArr.includes(team.id);
                });

            } else {
                console.log('Something went wrong -> keepFirstX() -> res=', res);
            }
        },
            (error) => {
                console.log('Error Occured -> keepFirstX() -> error=', error);
            });
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
                    { teams && teams.map((team)=>(         
                        <tr>
                            <td className="col-1" innerText="team.id"></td>
                            <td className="col-2" innerText="team.teamName"></td>
                            <td className="col-2" innerText="team.gameName"></td>
                            <td className="col-3" innerText="team.emailId"></td>
                            <td className="col-4">
                                <button className="btn text-primary p-1 mr-2" onClick={updateTeam(team.id)}><small>Update</small></button>
                                <button className="btn text-danger p-1 mr-2" onClick={deleteTeam(team.id)}><small>Delete</small></button>
                            </td>
                        </tr>))}
                    </tbody>
                </table>
            </div>

        </>
    );
}



export default Home;
