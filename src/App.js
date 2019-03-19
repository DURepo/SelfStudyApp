import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SelectStudy from './containers/SelectStudy';
import ConfirmStudy from './containers/ConfirmStudy';
import StartStudy from './containers/StartStudy';
import SelectStudyPeriod from './containers/SelectStudyPeriod';

class App extends Component {

  constructor(){
    super()
    this.state={
      selectedstudy: {},
      mode:"StartStudy"
    }
  }

  const = onselect = (event)=>{    
    
      let index = event.target.selectedIndex
      this.setState({
        selectedstudy: {studyname: event.target.value, 
                          studydesc: event.target[index].text}, 
        mode:"ConfirmStudy"})
      this.selectedMode()
  }

  confirmStudybtnsubmit =(event) =>{
    console.log(event)
  }

  confirmStudybtncancel =(event) =>{
    this.setState({mode:"StartStudy"})
    this.selectedMode();
  }

  startStudybtnClick=(event)=>{
    console.log(event)
    this.setState({mode:"SelectStudyPeriod"})
    this.selectedMode();
  }

  StudyPeriodSubmitbtnClick=(event)=>{
    console.log(event)
    this.setState({selectedstudy:{studyPeriod:event.target.value},
                   mode:"SelectStudy"})
    this.selectedMode();
  }

  selectedMode = ()=>{
    switch (this.state.mode) {
      case "StartStudy":
        return <StartStudy StartStudyClick={this.startStudybtnClick}/>
      case "SelectStudyPeriod":
        return <SelectStudyPeriod StudyPeriodSubmit={this.StudyPeriodSubmitbtnClick} />
      case "SelectStudy":
        return <SelectStudy onselect={onselect}/>
      case "ConfirmStudy":
        return <ConfirmStudy selectedstudy={this.state.selectedstudy} ConfirmStudysubmit={this.confirmStudybtnsubmit} CancelStudy={this.confirmStudybtncancel} />  
       
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
