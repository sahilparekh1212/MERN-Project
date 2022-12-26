import './updateTeam.css'

const UpdateTeam = () => {

    const submitTeam = (e)=>{
        e.preventDefault();
        console.log("submitTeam e=",e);
    }

    return (
        <>
            <h4>Update Team</h4>

            {/* {showMessage && (
                <div>
                    {isTeamUpdated ? (
                        <div className="d-flex row justify-content-around text-success border border-success">
                            <div ngIf="teamid" className="d-flex row justify-content-around text-success border border-success">
                                <div className="col-11">Updated Team Successfully The team id is </div>
                                <div className="col-1"><button className="text-success border-0"
                                    click="showMessage = !showMessage">&times</button></div>
                            </div>
                        </div>
                    ) : (
                        <div className="d-flex row justify-content-around text-danger border border-danger">
                            <div className="col-11">Something went wrong!</div>
                            <div className="col-1"><button className="text-danger border-0"
                                click="showMessage = !showMessage">&times;</button></div>
                        </div>
                    )}
                </div>
            )} */}

            <form onSubmit={submitTeam}>

                <div>
                    <label className="m-2" htmlFor="teamId">Team Id:&nbsp;</label>
                    <input className="col-6 text-light" type="text" name="teamId" value="teamid" disabled></input>
                </div>

                <div>
                    <label className="m-2" htmlFor="teamName">Team Name:&nbsp;</label>
                    <input className="col-6 text-light" type="text" name="teamName"></input>
                    <small className="text-danger mx-2">
                        {/* <span ngIf="teamName?errors?'required'">
                            required &emsp;
                        </span>
                        <span ngIf="teamName?errors?'maxlength'">
                            maximum 8 characters can be added&emsp;
                        </span> */}
                    </small>
                </div>

                <div>
                    <label className="m-2" htmlFor="gameName">Game Name:&nbsp;</label>
                    <input className="col-6 text-light" type="text" name="gameName"></input>
                    <small className="text-danger mx-2">
                        {/* <span ngIf="gameName?errors?'required'">
                            required &emsp;
                        </span>
                        <span ngIf="gameName?errors?'minlength'">
                            minimum 4 characters are required &emsp;
                        </span> */}
                    </small>
                </div>

                <div>
                    <label className="m-2" htmlFor="emailId">Email Id:&nbsp;</label>
                    <input className="col-6 text-light" type="email" name="emailId"></input>
                    <small className="text-danger mx-2">
                        {/* <span ngIf="emailId?errors?'required'">
                            required &emsp;
                        </span> */}
                    </small>
                </div>

                <button type="submit" className="m-2 rounded">Submit</button>
                <button click="clearForm" className="m-2 rounded text-info border-info">Clear</button>
            </form>
        </>
    )
}

export default UpdateTeam;