import React from 'react'

const ConfirmStudy = ({selectedstudy, ConfirmStudysubmit, CancelStudy})=> {
    return(
        <div>
            <p>Your hypotheses is that if you "{selectedstudy.studydesc}", you will get better sleep.</p>
            <p>And you want to experiment this for "{selectedstudy.studyPeriod}" Days.</p>
            <p> Is that correct?</p>
            <button type="submit" onClick={ConfirmStudysubmit}>Yes Start My Study</button>
            <button type="cancel" onClick={CancelStudy}>Cancel, I changed My mind</button>
        </div>
    )

}

export default ConfirmStudy;