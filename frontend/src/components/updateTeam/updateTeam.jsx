import './updateTeam.css'
import { useState, useEffect } from 'react';

const UpdateTeam = ({ teamsList, getTeams }) => {

    const search = (id, inputArray) => {
        for (let i = 0; i < inputArray.length; i++) {
            if (inputArray[i]._id == id) {
                return inputArray[i];
            }
        }
    }

    const windowHref = window.location.href;

    const currentTeamId = windowHref.substring(windowHref.indexOf('update') + (('update').length + 1), windowHref.length);

    const [currentTeam, setCurrentTeam] = useState(search(currentTeamId, teamsList));
    const [isCurrentTeamValid, setIsCurrentTeamValid] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const [isTeamUpdated, setIsTeamUpdated] = useState(false);

    useEffect(() => {
        setCurrentTeam(search(currentTeamId, teamsList));
    }, []);

    useEffect(() => {
        if (currentTeam && currentTeam.emailId.includes('@') && currentTeam.emailId.includes('.') && (currentTeam.teamName.length < 8) && (currentTeam.teamName.length !== 0) && (currentTeam.gameName.length >= 4)) {
            setIsCurrentTeamValid(true);
        } else {
            console.log('CurrentTeam is not Valid. currentTeam=', currentTeam);
            setIsCurrentTeamValid(false);
        }
    }, [currentTeam]);

    const submitTeam = (e) => {
        e.preventDefault();
        updateTeamFunc(currentTeam);
    }

    const updateTeamFunc = (input) => {
        fetch("http://localhost:5000/api/v1/teams/updateTeam", {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: input._id,
                teamName: input.teamName,
                gameName: input.gameName,
                emailId: input.emailId,
                city: "updated" + new Date().toLocaleTimeString()
            })
        })
            .then((res) => res.json()).then((data) => {
                console.log('updateTeamFunc > data= ', data);
                if (data.result && data.result === "success") {
                    getTeams();
                    setIsTeamUpdated(true);
                } else {
                    setIsTeamUpdated(false);
                }
                setShowMessage(true);
            })
    }

    const resetForm = (e) => {
        e.preventDefault();
        setCurrentTeam(search(currentTeamId, teamsList));
    }

    return (
        <>
            <h4>Update Team</h4>

            {showMessage && (
                <div>
                    {isTeamUpdated ? (
                        <div className="d-flex row justify-content-around text-success border border-success">
                            <div className="d-flex row justify-content-around text-success border border-success">
                                <div className="col-11">Updated Team Successfully The team id is {currentTeamId}</div>
                                <div className="col-1"><button className="bg-transparent text-success border-0"
                                    onClick={() => { setShowMessage(!showMessage) }}>&times;</button></div>
                            </div>
                        </div>
                    ) : (
                        <div className="d-flex row justify-content-around text-danger border border-danger">
                            <div className="col-11">Something went wrong! Please try again later.</div>
                            <div className="col-1"><button className="bg-transparent text-danger border-0"
                                onClick={() => { setShowMessage(!showMessage) }}>&times;</button></div>
                        </div>
                    )}
                </div>
            )}

            {currentTeam && <form onSubmit={submitTeam}>

                <div>
                    <label className="m-2" htmlFor="teamId">Team Id:&nbsp;</label>
                    <input className="col-6" type="text" name="teamId" disabled value={currentTeam._id} />
                </div>

                <div>
                    <label className="m-2" htmlFor="teamName">Team Name:&nbsp;</label>
                    <input className="col-6" type="text" name="teamName"
                        onChange={(e) => { setCurrentTeam({ ...currentTeam, teamName: e.target.value }) }} value={currentTeam.teamName} />
                    {((currentTeam.teamName.length > 8) || (currentTeam.teamName.length === 0)) && <span className="small text-danger p-2">Length of 1 to 8 is allowed</span>}
                </div>

                <div>
                    <label className="m-2" htmlFor="gameName">Game Name:&nbsp;</label>
                    <input className="col-6" type="text" name="gameName"
                        onChange={(e) => { setCurrentTeam({ ...currentTeam, gameName: e.target.value }) }} value={currentTeam.gameName} />
                    {(currentTeam.gameName.length < 4) && <span className="small text-danger p-2">Minimum length 4 is required</span>}
                </div>

                <div>
                    <label className="m-2" htmlFor="emailId">Email Id:&nbsp;</label>
                    <input className="col-6" type="text" name="emailId"
                        onChange={(e) => { setCurrentTeam({ ...currentTeam, emailId: e.target.value }) }} value={currentTeam.emailId} />
                    {(!currentTeam.emailId.includes('@') || !currentTeam.emailId.includes('.')) && <span className="small text-danger p-2">Invalid email</span>}
                </div>

                {isCurrentTeamValid ? (<button type="submit"
                    className="m-2 h6 border-1 rounded text-success border-success">Submit</button>) : (<button
                        className="m-2 h6 border-1 rounded text-danger border-danger" disabled
                    >Submit</button>)}
                <button onClick={resetForm} className="m-2 h6 rounded text-primary border-primary">Reset</button>
            </form>
            }
        </>
    )
}

export default UpdateTeam;