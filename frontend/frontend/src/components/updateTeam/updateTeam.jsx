import './updateTeam.css'
import { useState } from 'react';

const UpdateTeam = (props) => {

    const search = (id, inputArray) => {
        for (let i = 0; i < inputArray.length; i++) {
            if (inputArray[i].id == id) {
                return inputArray[i];
            }
        }
    }

    const windowHref = window.location.href;

    const currentTeamId = windowHref.substring(windowHref.indexOf('update') + (('update').length + 1), windowHref.length);

    const [currentTeam, setCurrentTeam] = useState(search(currentTeamId, props.teams));

    const submitTeam = (e) => {
        e.preventDefault();
        props.updateTeamFunc(currentTeam);
    }

    const resetForm = () => {
        setCurrentTeam(search(currentTeamId, props.teams));
    }

    const  deleteTeamFunc = () => {
        props.deleteTeamFunc(search(currentTeamId, props.teams));
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

            {currentTeam && <form onSubmit={submitTeam}>

                <div>
                    <label className="m-2" htmlFor="teamId">Team Id:&nbsp;</label>
                    <input className="col-6" type="text" name="teamId" disabled value={currentTeam.id} />
                </div>

                <div>
                    <label className="m-2" htmlFor="teamName">Team Name:&nbsp;</label>
                    <input className="col-6" type="text" name="teamName"
                        onChange={(e) => { setCurrentTeam({ ...currentTeam, teamName: e.target.value }) }} value={currentTeam.teamName} />
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
                    <input className="col-6" type="text" name="gameName"
                        onChange={(e) => { setCurrentTeam({ ...currentTeam, gameName: e.target.value }) }} value={currentTeam.gameName} />
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
                    <input className="col-6" type="text" name="emailId"
                        onChange={(e) => { setCurrentTeam({ ...currentTeam, emailId: e.target.value }) }} value={currentTeam.emailId} />
                    <small className="text-danger mx-2">
                        {/* <span ngIf="emailId?errors?'required'">
                            required &emsp;
                        </span> */}
                    </small>
                </div>

                <button type="submit" className="m-2 rounded">Submit</button>
                <button onClick={resetForm} className="m-2 rounded text-info border-info">Reset</button>
                <button onClick={deleteTeamFunc} className="m-2 rounded text-info bg-danger border-info">Delete</button>
            </form>
            }
        </>
    )
}

export default UpdateTeam;