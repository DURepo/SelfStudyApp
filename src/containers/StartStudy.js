import React from "react"

const StartStudy= ({StartStudyClick, recordStudyDataClick, performAnalysisClick})=>{
    return(
        <div>
            <button type="submit" onClick={StartStudyClick} style={{margin: "2px"}}>Start an Experiment</button>
            <button type="submit" onClick={recordStudyDataClick} style={{margin: "2px"}}>Record Study Data</button>
            <button type="submit" onClick={performAnalysisClick} style={{margin: "2px"}}>Perform Analysis</button>
        </div>
    )
}

export default StartStudy;