import React from 'react'

const StudyPlan = ({selectedstudy})=>{

    const month = [];
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";

    const GenerateDays = ()=>{     
       let d = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
       let stdyPeriod = selectedstudy.studyPeriod
       let schedule = []
       let count = stdyPeriod/2;
        let i=1
       for(i; i<count; i ++){
        d.setDate(d.getDate()+2)   
        schedule.push(new Date(d))
       }       
       return schedule
    }

    const daysComponent = GenerateDays()



    return(
        <div>
            <p>Your Schedule:</p>
            <p>"{selectedstudy.studydesc}" on below days:</p>
            {daysComponent.map((d,i)=>{
                return<p key={i}> {month[d.getMonth()]} {d.getDate()}, {d.getFullYear()}</p>
            })}
        </div>
    )

}

export default StudyPlan;