export default ()=>{
    return (
        <>
            <div ngIf="showMessage">

{/* <ng-container ngIf="isTeamAdded; else errorTemplate"
    className="d-flex row justify-content-around text-success border border-success"> */}

    <div ngIf="id" className="d-flex row justify-content-around text-success border border-success">
        <div className="col-11">Added Team Successfully Team id is {{id}}</div>
        <div className="col-1"><button className="bg-dark text-success border-0"
                onClick="showMessage = !showMessage">&times;</button></div>
    </div>
{/* </ng-container> */}

{/* <ng-template #errorTemplate> */}
    <div className="d-flex row justify-content-around text-danger border border-danger">
        <div className="col-11">Something went wrong!</div>
        <div className="col-1"><button className="bg-dark text-danger border-0"
                onClick="showMessage = !showMessage">&times;</button></div>
    </div>
{/* </ng-template> */}

</div>

{/* <ng-container> */}
<div ngIf="showSimilarTeamNameAndGameNameError && similarTeamDetails" className="d-flex row justify-content-around text-danger border border-danger">
    <div className="col-11">Team with name- <em className="text-info">{{similarTeamDetailsteamName}}</em> already exists in game- <em className="text-info">{{similarTeamDetailsgameName}}</em></div>
    <div className="col-1"><button className="bg-dark text-danger border-0"
            onClick="showSimilarTeamNameAndGameNameError = !showSimilarTeamNameAndGameNameError">&times;</button></div>
</div>
<div ngIf="showSimilarTeamEmailIdError && similarTeamDetails" className="d-flex row justify-content-around text-danger border border-danger">
    <div className="col-11">Team with emailId- <em ngIf="similarTeamDetails && similarTeamDetailsemailId" className="text-info">{{similarTeamDetailsemailId}}</em> already exists</div>
    <div className="col-1"><button className="bg-dark text-danger border-0"
            onClick="showSimilarTeamEmailIdError = !showSimilarTeamEmailIdError">&times;</button></div>
</div>
{/* </ng-container> */}


<form ngSubmit="()=>{onSubmit}" #addTeamForm="ngForm">

<div>
    <label className="m-2" for="teamName">teamName</label>
    <input className="col-6 bg-dark text-light" type="text" name="teamName" required
        maxlength="8"></input>
    <span hidden="teamNamevalid" className="small text-danger p-2">Maximum length 8 is allowed</span>
</div>

<div>
    <label className="m-2" for="gameName">gameName</label>
    <input className="col-6 bg-dark text-light" type="text" name="gameName" required
        minlength="4"></input>
    <span hidden="gameNamevalid" className="small text-danger p-2">Minimum length 4 is required</span>
</div>

<div>
    <label className="m-2" for="emailId">emailId</label>
    <input className="col-6 bg-dark text-light" type="email" name="emailId" required></input>
    <span hidden="emailIdvalid" className="small text-danger p-2">Mandatory field</span>
</div>

<button type="submit" disabled="!addTeamFormformvalid" className="m-2 bg-dark border rounded"
    ngClass=" !addTeamFormformvalid ? 'text-danger border-danger' : 'text-success border-success'">Submit</button>

</form>
        </>
    )
}