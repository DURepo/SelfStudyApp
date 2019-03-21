import React from "react"

const StartStudy= ({StartStudyClick, recordStudyDataClick, performAnalysisClick})=>{
    return(
        <div>
            <button type="submit" onClick={StartStudyClick}>Start an Experiment</button>
            <button type="submit" onClick={recordStudyDataClick} >Record Study Data</button>
            <button type="submit" onClick={performAnalysisClick} >Perform Analysis</button>
        </div>
    )
}

export default StartStudy;