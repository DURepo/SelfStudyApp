import React, {Component} from "react";

class RecordStudyData extends Component{ 
    

    render(){
    const {studyData, dateSelected} = this.props;    
        

    const tablecomponent = studyData.map((data,i)=>
        {return ( <button type="submit" value={data.record_id} key={data.record_id} style={{margin: "2px"}}
                             onClick={dateSelected}> 
                            {data.date}</button>) })
        return(
            <div>            
            {tablecomponent}
            </div>
        )
    }

}


export default RecordStudyData;