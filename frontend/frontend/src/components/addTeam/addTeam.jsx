import { useEffect } from 'react';
import { useState } from 'react';
import './addTeam.css'

const AddTeam = ({newTeamAdded}) => {

    const [isTeamAdded,setIsTeamAdded]=useState(false);
    const [similarTeamDetails,setSimilarTeamDetails]=useState(false);

    const [showSimilarTeamEmailIdError, setShowSimilarTeamEmailIdError] = useState(false);
    const [showSimilarTeamNameAndGameNameError, setShowSimilarTeamNameAndGameNameError] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const [team, setTeam] = useState({ id: Math.floor(Math.random() * 100 + 1), teamName: 'z', gameName: 'game', emailId: 'z@team.com' });

    useEffect(() => {
        console.log(team);
    }, [team]);

    const setTeamName = (e) => {
        setTeam({ ...team, teamName: e.target.value });
    }

    const setGameName = (e) => {
        setTeam({ ...team, gameName: e.target.value });
    }

    const setEmailId = (e) => {
        setTeam({ ...team, emailId: e.target.value });
    }

    const submitTeam = (e) => {
        e.preventDefault();
        console.log(e);
        newTeamAdded();
        // console.log(e.target);
        //validation

        // const res = await fetch('URL', team);
        // const resJSON = await res.json();

        // if (res) {
        //     setShowMessage(true);
        // } else {
        //     console.log('submitTeam() -> Something went wrong')
        // }
    }

    return (
        <>
            {(showMessage && isTeamAdded) ? (
                <div className="d-flex row justify-content-around text-success border border-success">
                    <div className="col-11">Added Team Successfully Team id is </div>
                    <div className="col-1"><button className="bg-dark text-success border-0"
                        onClick={() => { showMessage = !showMessage }}>&times;</button></div>
                </div>
            ) : (
                <div className="d-flex row justify-content-around text-danger border border-danger">
                    <div className="col-11">Something went wrong!</div>
                    <div className="col-1"><button className="bg-dark text-danger border-0"
                        onClick={() => { showMessage = !showMessage }}>&times;</button></div>
                </div>
            )}

            {(showSimilarTeamNameAndGameNameError && similarTeamDetails) && (
                <div className="d-flex row justify-content-around text-danger border border-danger">
                    <div className="col-11">Team with name- <em className="text-info">{{ similarTeamDetails }}</em> already exists in game- <em className="text-info">{{ similarTeamDetails }}</em></div>
                    <div className="col-1"><button className="bg-dark text-danger border-0"
                        onClick={() => { showSimilarTeamNameAndGameNameError = !showSimilarTeamNameAndGameNameError }}>&times;</button></div>
                </div>
            )}

            {(showSimilarTeamEmailIdError && similarTeamDetails) && (
                <div className="d-flex row justify-content-around text-danger border border-danger">
                    <div className="col-11">Team with emailId- <em ngIf="similarTeamDetails && similarTeamDetails" className="text-info">{{ similarTeamDetails }}</em> already exists</div>
                    <div className="col-1"><button className="bg-dark text-danger border-0"
                        onClick={() => { showSimilarTeamEmailIdError = !showSimilarTeamEmailIdError }}>&times;</button></div>
                </div>
            )}

            <form onSubmit={submitTeam}>

                <div>
                    <label className="m-2" htmlFor="teamName">teamName</label>
                    <input className="col-6 bg-dark text-light" type="text" name="teamName" required
                        maxLength="8" onChange={setTeamName} placeholder={team.teamName}></input>
                    {/* use useEffect */}
                    <span hidden="teamNamevalid" className="small text-danger p-2">Maximum length 8 is allowed</span>
                </div>

                <div>
                    <label className="m-2" htmlFor="gameName">gameName</label>
                    <input className="col-6 bg-dark text-light" type="text" name="gameName" required
                        minLength="4" onChange={setGameName} placeholder={team.gameName}></input>
                    <span hidden="gameNamevalid" className="small text-danger p-2">Minimum length 4 is required</span>
                </div>

                <div>
                    <label className="m-2" htmlFor="emailId">emailId</label>
                    <input className="col-6 bg-dark text-light" type="email" name="emailId" required onChange={setEmailId}  placeholder={team.emailId}></input>
                    <span hidden="emailIdvalid" className="small text-danger p-2">Mandatory field</span>
                </div>

                <button type="submit"
                    // disabled="!addTeamFormformvalid" 
                    className="m-2 bg-dark text-light border rounded"
                    // ngClass=" !addTeamFormformvalid ? 'text-danger border-danger' : 'text-success border-success'"
                    >Submit</button>

            </form>
        </>
    )

}
export default AddTeam;