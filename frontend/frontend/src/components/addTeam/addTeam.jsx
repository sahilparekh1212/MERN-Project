import { useEffect } from 'react';
import { useState } from 'react';
import './addTeam.css'

const AddTeam = (props) => {

    const search = (id, inputArray) => {
        for (let i = 0; i < inputArray.length; i++) {
            if (inputArray[i].id == id) {
                return inputArray[i];
            }
        }
        return 'none';
    }

    const [isTeamValid, setIsTeamValid] = useState(false);
    const [isTeamAdded, setIsTeamAdded] = useState(false);
    const [similarTeamDetails, setSimilarTeamDetails] = useState(false);

    const [showSimilarTeamEmailIdError, setShowSimilarTeamEmailIdError] = useState(false);
    const [showSimilarTeamNameAndGameNameError, setShowSimilarTeamNameAndGameNameError] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const [team, setTeam] = useState({ id: Math.floor(Math.random() * 100 + 1), teamName: 'z', gameName: 'game', emailId: 'z@team.com' });

    useEffect(() => {
        while (search(team.id,props.teams)!=='none'){
            setTeam({...team,id:Math.floor(Math.random() * 100 + 1)});
        }
        console.log("useEffect",team);
    }, []);

    useEffect(() => {
        if (team.emailId.includes('@') && team.emailId.includes('.') && (team.teamName.length < 8) && (team.gameName.length >= 4)) {
            setIsTeamValid(true);
        } else {
            console.log('Team is not Valid. team=', team);
            setIsTeamValid(false);
        }
    }, [team]);

    const submitTeam = (e) => {
        e.preventDefault();
        if (team.emailId.includes('@') && team.emailId.includes('.') && (team.teamName.length < 8) && (team.gameName.length >= 4)) {
            console.log(e);
            setIsTeamAdded(true);
            addTeamFunc();
        } else {
            setIsTeamAdded(false);
            console.log("form has validation error => team = ", team);
        }

        // const res = await fetch('URL', team);
        // const resJSON = await res.json();

        // if (res) {
        //     setShowMessage(true);
        // } else {
        //     console.log('submitTeam() -> Something went wrong')
        // }
        setShowMessage(true);
    }

    const addTeamFunc = () => {
        props.addTeamFunc();
    }

    return (
        <>
            {showMessage && (<>{(isTeamAdded) ? (
                <div className="d-flex row justify-content-around text-success border border-success">
                    <div className="col-11">Added Team Successfully Team id is </div>
                    <div className="col-1"><button className="bg-transparent text-success border-0"
                        onClick={() => { setShowMessage(!showMessage) }}>&times;</button></div>
                </div>
            ) : (
                <div className="d-flex row justify-content-around text-danger border border-danger">
                    <div className="col-11">Something went wrong!</div>
                    <div className="col-1"><button className="bg-transparent text-danger border-0"
                        onClick={() => { setShowMessage(!showMessage) }}>&times;</button></div>
                </div>
            )}
            </>)}

            {(showSimilarTeamNameAndGameNameError && similarTeamDetails) && (
                <div className="d-flex row justify-content-around text-danger border border-danger">
                    <div className="col-11">Team with name- <em className="text-info">{{ similarTeamDetails }}</em> already exists in game- <em className="text-info">{{ similarTeamDetails }}</em></div>
                    <div className="col-1"><button className="bg-transparent text-danger border-0"
                        onClick={() => { setShowSimilarTeamNameAndGameNameError(!showSimilarTeamNameAndGameNameError) }}>&times;</button></div>
                </div>
            )}

            {(showSimilarTeamEmailIdError && similarTeamDetails) && (
                <div className="d-flex row justify-content-around text-danger border border-danger">
                    <div className="col-11">Team with emailId- <em ngIf="similarTeamDetails && similarTeamDetails" className="text-info">{{ similarTeamDetails }}</em> already exists</div>
                    <div className="col-1"><button className="bg-transparent text-danger border-0"
                        onClick={() => { setShowSimilarTeamEmailIdError(!showSimilarTeamEmailIdError) }}>&times;</button></div>
                </div>
            )}

            <form onSubmit={submitTeam}>

                <div>
                    <label className="m-2" htmlFor="teamName">teamName</label>
                    <input className="col-6" type="text" name="teamName" required
                        onChange={(e) => { setTeam({ ...team, teamName: e.target.value }) }} value={team.teamName}></input>
                    {(team.teamName.length > 8) && <span className="small text-danger p-2">Maximum length 8 is allowed</span>}
                </div>

                <div>
                    <label className="m-2" htmlFor="gameName">gameName</label>
                    <input className="col-6" type="text" name="gameName" required
                        onChange={(e) => { setTeam({ ...team, gameName: e.target.value }) }} value={team.gameName}></input>
                    {(team.gameName.length < 4) && <span className="small text-danger p-2">Minimum length 4 is required</span>}
                </div>

                <div>
                    <label className="m-2" htmlFor="emailId">emailId</label>
                    <input className="col-6" type="text" name="emailId" required onChange={(e) => { setTeam({ ...team, emailId: e.target.value }) }} value={team.emailId}></input>
                    {(!team.emailId.includes('@') || !team.emailId.includes('.')) && <span className="small text-danger p-2">Invalid email</span>}
                </div>

                {isTeamValid ? (<button type="submit"
                    className="m-2 border rounded text-success border-success">Submit</button>) : (<button
                        className="m-2 border rounded text-danger border-danger" disabled
                    >Submit</button>)}

            </form>
        </>
    )

}
export default AddTeam;