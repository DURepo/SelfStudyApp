import React from "react";


const  RecordEachDay =({dateSelected, onInputSampleChange, onOuputSampleChange})=>{
    
    return(        
        <div>                
        <label>On {dateSelected}, How much Did you "Eat Raw vegetable"?</label>        
        <select onChange={onInputSampleChange}>
            <option>--select--</option>
            <option value="3">High</option>
            <option value="2">Medium</option>
            <option value="1">Low</option>
        </select>
        <p></p>
        <label> On {dateSelected} night, how was your sleep quality? (Rate between 1-100)</label>
        <input onChange={onOuputSampleChange}></input>

    </div>
           )   

}


export default RecordEachDay;