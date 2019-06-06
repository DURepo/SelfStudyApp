import React, {Component} from "react";
import RecordStudyData from "./RecordStudyData";
import RecordEachDay from "./RecordEachDay";


class RecordDataMaster extends Component{
    constructor(props){
        super(props);
        
        this.state={
            Displaymessage:"",
            displayMode:"None",
            dateSelected:"",
            RecordID:"",
            inputSample:"",
            outputSample:"",
            studyData: props.studyData,
            studyDates:props.studyDates
            

        }
        
        
    }

    

    dateSelectedbtnClick = (event) =>{ 
        console.log("HERE: event val ", event.target.value)
        console.log("HERE2: ", this.state.studyData)
        console.log("HERE3: ", this.state.studyDates)
        const d = this.state.studyDates.filter(ele => ele.id == event.target.value)
        
        this.setState({dateSelected:d[0].date,
                        RecordID:event.target.value,
                        displayMode: "show EachDay record to update",
                        Displaymessage:""
                    })
        return <RecordEachDay RecordID={event.target.value} Date={d[0].date}/>      
    }

    onInputSampleChange = (event)=> {
        
       this.setState({inputSample:event.target.value})
    }

    onOuputSampleChange = (event) =>{
        this.setState({outputSample: event.target.value})
        
    }

    onDayRecordSavebtnclick =()=>{      
        
        fetch('http://localhost:3001/recordStudy',{
            method:'put',
            headers:{'Content-type':'application/json'},
            body: JSON.stringify({
                RecordID: this.state.RecordID,
                inputSample: this.state.inputSample,
                outputSample: this.state.outputSample
            })
            
        })

        this.setState({displayMode:"None", Displaymessage:"Saved"})

    }



    
    render(){ 
        const {studyData, studyDates} = this.props;
                
        return(
            <div>
                <h5>Select a Date to record Data</h5>
                
                <RecordStudyData studyDates={studyDates} dateSelectedbtnClick={this.dateSelectedbtnClick}/>
                {this.state.displayMode==="None" 
                ? <div><p>{this.state.Displaymessage}</p></div>
                : <div><RecordEachDay dateSelected={this.state.dateSelected} 
                                onInputSampleChange={this.onInputSampleChange}
                                onOuputSampleChange={this.onOuputSampleChange}  />
                        <button type="submit" onClick={this.onDayRecordSavebtnclick}>Save</button>
                        <p>{this.state.Displaymessage}</p>
                    </div>}
            </div>
        )
    }

}

export default RecordDataMaster;
