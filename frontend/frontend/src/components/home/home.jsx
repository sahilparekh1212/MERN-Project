import './home.css';

function Home() {
    return (
        <>

            <div className="my-4 mx-2">
                {/* <router-outlet></router-outlet> */}
            </div>
            <div id="resetDiv">
                <button onClick="()=>{keepFirst}" className="border border-info rounded bg-dark text-info">Reset</button>
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
                    <tbody ngIf="teams">
                        <tr ngFor="let team of teams">
                            <td className="col-1" innerText="team.id"></td>
                            <td className="col-2" innerText="team.teamName"></td>
                            <td className="col-2" innerText="team.gameName"></td>
                            <td className="col-3" innerText="team.emailId"></td>
                            <td className="col-4">
                                <button className="btn text-primary p-1 mr-2" onClick="updateTeam(team.id)"><small>Update</small></button>
                                <button className="btn text-danger p-1 mr-2" onClick="deleteTeam(team.id)"><small>Delete</small></button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </>
    );
}

export default Home;
