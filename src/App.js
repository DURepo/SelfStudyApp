import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SelectStudy from './containers/SelectStudy';
import ConfirmStudy from './containers/ConfirmStudy';
import StartStudy from './containers/StartStudy';
import SelectStudyPeriod from './containers/SelectStudyPeriod';
import StudyPlan from './containers/StudyPlan';
import RecordStudyData from './containers/RecordStudyData';

class App extends Component {

  constructor(){
    super()
    this.state={
      selectedstudy: {}, //properties: studyname, studydesc, studyPeriod
      mode:"StartStudy"

      //Test Data
      //mode: "RecordStudyData",
      //selectedstudy:{studyname:"HighFibre", studydesc:"Eat more Veggies", studyPeriod:"15" }
    }
  }

  const = onselect = (event)=>{    
    
      let index = event.target.selectedIndex
      this.setState({
        selectedstudy: {studyname: event.target.value, 
                          studydesc: event.target[index].text}, 
        mode:"ConfirmStudy"})
      this.selectedMode();
  }

  confirmStudybtnsubmit =(event) =>{
    this.setState({mode:"StudyPlan"})
    this.selectedMode();    
  }

  confirmStudybtncancel =(event) =>{
    this.setState({mode:"StartStudy"})
    this.selectedMode();
  }

  startStudybtnClick=(event)=>{
    
    this.setState({mode:"SelectStudyPeriod"})
    this.selectedMode();
  }

  StudyPeriodSubmitbtnClick=(event)=>{
    
    this.setState({selectedstudy:{studyPeriod:event.target.value},
                   mode:"SelectStudy"})
    this.selectedMode();
  }

  recordStudyDatabtnClick = ()=>{
    this.setState({mode:"RecordStudyData"})
    this.selectedMode();
  }

  selectedMode = ()=>{
    switch (this.state.mode) {
      case "StartStudy":
        return <StartStudy StartStudyClick={this.startStudybtnClick} recordStudyDataClick={this.recordStudyDatabtnClick}/>
      case "SelectStudyPeriod":
        return <SelectStudyPeriod StudyPeriodSubmit={this.StudyPeriodSubmitbtnClick} />
      case "SelectStudy":
        return <SelectStudy onselect={onselect}/>
      case "ConfirmStudy":
        return <ConfirmStudy selectedstudy={this.state.selectedstudy} ConfirmStudysubmit={this.confirmStudybtnsubmit} CancelStudy={this.confirmStudybtncancel} />  
      case "StudyPlan":
        return <StudyPlan selectedstudy={this.state.selectedstudy}/>
      case "RecordStudyData":
        return <RecordStudyData />
      default:
        break;
    }
  }
  

  render() {
  
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />          
          {this.selectedMode()}
        </header>
      </div>
    );
  }
}

export default App;
