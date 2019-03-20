import React, {Component} from "react";
import RecordEachDay from "./RecordEachDay";

class RecordStudyData extends Component{


    
    
    dateselected = (event) =>{ 
        const d = this.studyData.filter(ele => ele.ID == event.target.value)
        console.log(d[0].RecordDate)
        return <RecordEachDay RecordID={event.target.value} Date={d[0].RecordDate}/>      
    }

    studyData =[{
        ID:1,
        StudyID:1,
        RecordDate:"2019/03/20",
        inputSample:2,  //3:High Veggies, 2: Medium Veggies, 1: Low Veggies
        ouputSample:80 // range(0,100) 0:low quality of sleep, 100 High quality of sleep
    },
    {ID:2,
        StudyID:1,
        RecordDate:"2019/03/22",
        inputSample:3,  
        ouputSample:90 
    },
    {ID:3,
        StudyID:1,
        RecordDate:"2019/03/24",
        inputSample:1,  
        ouputSample:50 
    },
    {ID:4,
        StudyID:1,
        RecordDate:"2019/03/24",
        inputSample:3,  
        ouputSample:95 
    }]

    render(){

        

    const tablecomponent = this.studyData.map((data,i)=>
        {return ( <button type="submit" value={data.ID} key={data.ID} style={{margin: "2px"}} onClick={this.dateselected}> 
                            {data.RecordDate}</button>) })
        return(
            <div>
            <h5>Select Date to update:</h5>
            {tablecomponent}
            </div>
        )
    }

}


export default RecordStudyData;