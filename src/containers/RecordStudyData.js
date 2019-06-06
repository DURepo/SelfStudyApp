import React, {Component} from "react";

class RecordStudyData extends Component{ 
    

    render(){
    const {studyDates, dateSelectedbtnClick} = this.props;    

    console.log("STUDYDATEs: ", studyDates)
    
    if(studyDates){
    const tablecomponent = studyDates.map((data,i)=>
        {return ( <button type="submit" value={data.id} key={data.id} style={{margin: "2px"}}
                             onClick={dateSelectedbtnClick}> 
                            {data.date}</button>) })
        return(
            <div>            
            {tablecomponent}
            </div>
        )
    }
    else
    {    return <div></div>
    }
    }

}


export default RecordStudyData;