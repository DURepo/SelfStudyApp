import React from "react"

const StartStudy= ({StartStudyClick, recordStudyDataClick})=>{
    return(
        <div>
            <button type="submit" onClick={StartStudyClick}>Start an Experiment</button>
            <button type="submit" onClick={recordStudyDataClick} >Record Study Data</button>
        </div>
    )
}

export default StartStudy;