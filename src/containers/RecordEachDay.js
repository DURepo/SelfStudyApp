import React, {Component} from "react";

class RecordEachDay extends Component{
    constructor(props){
        super(props);
        this.state={
            recordID:this.props.RecordID,
            inputSample:null,
            outputSample:null
        }
    }    

    render(){
        const date = this.props.Date;
        return(
            <div>                
                <label>On {date}, How much Did you "Eat Raw vegetable"?</label>
                <select>
                    <option>--select--</option>
                    <option value="3">High</option>
                    <option value="2">Medium</option>
                    <option value="1">Low</option>
                </select>
                <label> On 
                    { new Date(date.getFullYear(), date.getMonth(), date.getDate()+2)}
                    How was your sleep quality? (Rate between 1-100)
                    </label>
                <input></input>

            </div>
        )
    }


}


export default RecordEachDay;