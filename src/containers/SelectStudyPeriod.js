import React from 'react';

const SelectStudyPeriod =({StudyPeriodSubmit})=>{
    return(
        <div>
            <p>How long an experiment do you want to do?</p>
            <select onChange={StudyPeriodSubmit} >
                <option value="">--select--</option>
                <option value="15">15 Days</option>
                <option value="30">30 Days</option>
                <option value="45">45 Days</option>
                <option value="60">60 Days</option>
            </select>
        </div>
    )

}

export default SelectStudyPeriod;