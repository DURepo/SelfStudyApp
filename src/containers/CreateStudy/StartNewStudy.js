import React from "react";
import Home from '../Home';

class StartnewStudy extends React.Component{
    constructor(props){
        super(props);
        this.state={
            userid:props.userid,
            display:'default',
            studyinput:'',
            studyoutput:'',
            studyduration:0            
        }

    }

    updateDisplay=(mode)=>{        

        this.setState({display:mode})

    }

    onstudyInputChange =(event)=>{
        this.setState({studyinput:event.target.value})        
    }

    onstudyOutputChange = (event) =>{
        this.setState({studyoutput:event.target.value})        
    }

    onDurationSelection = (event) => {
        this.setState({studyduration: event.target.value})        
    }

    confirmStudysubmit = (event) =>{
        // call server update study details
        fetch('http://localhost:3001/createuserStudy',{
      method: 'post',
      headers:{'Content-Type': 'application/json'},
      body: JSON.stringify({          
          userid: this.state.userid,
          studyinput: this.state.studyinput,
          studyoutput: this.state.studyoutput,
          studyPeriodinDays: this.state.studyduration
          
      })
    })
    .then(resp => console.log("RESPONSE: " + resp))
        this.updateDisplay("studyCreated")
    }

    CancelStudy=()=>{
        this.updateDisplay("studyCanceled") 
    }

    render(){
        
        switch (this.state.display) {
            case "default" : 
            return (<div>
                <label>What do you want to study?</label>
                <p>Impact of</p>
                <input id="studyinput" onChange={this.onstudyInputChange} ></input>
                <p>on</p>
                <input id="studyoutput" onChange={this.onstudyOutputChange} ></input>
                <p>Ex: Impact of "high vegetable intake" on "sleep"</p>
                <button type="submit" onClick={()=>this.updateDisplay("duration")}>Next</button>
                </div>)                
            case "duration":
                return (<div>
                    <label>How long a study do you want to conduct</label>
                    <select onChange={this.onDurationSelection}>
                        <option value="">--select--</option>
                        <option value="15">15 Days</option>
                        <option value="30">30 Days</option>
                        <option value="45">45 Days</option>
                        <option value="60">60 Days</option>
                    </select>
                    <button type="submit" onClick={()=>this.updateDisplay("showHypothesis")}>Next</button>
                </div>)
            case "showHypothesis":
                return (
                    <div>
                        <p>Your Hypthosis is {this.state.studyinput} has impact on {this.state.studyoutput}</p>
                        <button type="submit" onClick={()=>this.confirmStudysubmit()}>Yes Start My Study</button>
                        <button type="cancel" onClick={()=>this.CancelStudy()}>Cancel, I changed My mind</button>
                    </div>
                )
            case "studyCreated":
                return(
                    <div>
                        <p>Your Study has been created, update study Data on below days:----</p>
                    </div>
                )
            case "studyCanceled":
                return(
                    <Home />
                )
            default:
            break;             



        }
      
    }

}

export default StartnewStudy ;