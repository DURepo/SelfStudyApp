import React from "react"

const StartStudy= ({StartStudyClick})=>{
    return(
        <div>
            <button type="submit" onClick={StartStudyClick}>Start an Experiment</button>
        </div>
    )
}

export default StartStudy;