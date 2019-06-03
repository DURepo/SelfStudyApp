import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SelectStudy from './containers/SelectStudy';
import ConfirmStudy from './containers/ConfirmStudy';
import StartStudy from './containers/StartStudy';
import SelectStudyPeriod from './containers/SelectStudyPeriod';
import StudyPlan from './containers/StudyPlan';
import RecordDataMaster from './containers/RecordDataMaster';
import Analysis from './containers/Analysis';
import Signin from './signin';
import Register from './register';
import Navigation from './navigation';
import 'tachyons';
import Home from './containers/Home';

class App extends Component {

  constructor(){
    super()
    this.state={
      selectedstudy: {}, //properties: studyname, studydesc, studyPeriod
      studyPeriod:0,
      mode:"StartStudy",
      studyData: [],
      userstudyID:8,
      route: 'home', //route to be 'signin'  
      isSignedIn : false,
      user:{
        id:'',
        name:'',
        email:''
      }

      //Test Data
      //mode: "PerformAnalysis"
      //selectedstudy:{studyname:"HighFibre", studydesc:"Eat more Veggies", studyPeriod:"15" }
    }
  }

  loadUser = (data)=>{
    this.setState({user:{
        id:data.id,
        name:data.name,
        email:data.email}
    })
  }

  componentDidMount(){
    console.log("did mount called")
    fetch('http://localhost:3001/studyData/'+this.state.userstudyID,{
      method:'get',
      headers:{'Content-Type':'application/json'}
    })
    .then(response => response.json())
    .then(records=> { this.setState({studyData:records})  
    })
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
    fetch('http://localhost:3001/createuserStudy',{
      method: 'post',
      headers:{'Content-Type': 'application/json'},
      body: JSON.stringify({
          studyID: 1,
          userID: 1,
          studyPeriodinDays: this.state.studyPeriod
      })
  })
  .then(resp => console.log("fetch: " + resp))
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
    
    this.setState({studyPeriod:event.target.value,
                   mode:"SelectStudy"})
    this.selectedMode();
  }

  recordStudyDatabtnClick = ()=>{
    this.setState({mode:"RecordDataMaster"})
    this.selectedMode();
  }

  performAnalysisbtnClick =() => {
    this.setState({mode:"PerformAnalysis"})
    this.selectedMode();
  }

  selectedMode = ()=>{
    switch (this.state.mode) {
      case "StartStudy":
        return <StartStudy StartStudyClick={this.startStudybtnClick} 
                          recordStudyDataClick={this.recordStudyDatabtnClick}
                          performAnalysisClick = {this.performAnalysisbtnClick}/>
      case "SelectStudyPeriod":
        return <SelectStudyPeriod StudyPeriodSubmit={this.StudyPeriodSubmitbtnClick} />
      case "SelectStudy":
        return <SelectStudy onselect={onselect}/>
      case "ConfirmStudy":
        return <ConfirmStudy selectedstudy={this.state.selectedstudy} ConfirmStudysubmit={this.confirmStudybtnsubmit} CancelStudy={this.confirmStudybtncancel} />  
      case "StudyPlan":
        return <StudyPlan selectedstudy={this.state.selectedstudy} studyPeriod={this.state.studyPeriod}/>
      case "RecordDataMaster":
        return <RecordDataMaster studyData={this.state.studyData} />
      case "PerformAnalysis":
        return <Analysis userstudyID={this.state.userstudyID} />
      default:
        break;
    }
  }

  onRouteChange = (route) => {
    console.log("Routename: ", route);
    if(route === 'signout'){
      this.setState({isSignedIn:false})
      this.setState({route: "signin"});
    }
    else if(route === 'home'){
      console.log("seeting signin to true")
      this.setState({isSignedIn:true})
      this.setState({route: route});
    }
    else if(route=='register' || route==='signin'){
      this.setState({isSignedIn:false, route:route})
    }
    
  }

  
  render() {
  
    return (
      <div className="App">
      
        <header className="App-header">
        <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange}/>
        {this.state.route === 'home' 
            ? <div>            
            <img src={logo} className="App-logo" alt="logo" />          
            <Home />
            {/* {this.selectedMode()}  */}
            </div>             
            : (this.state.route === 'signin' 
              ? <Signin loadUser={this.loadUser} onRouteChange = {this.onRouteChange}/> 
              : <Register loadUser={this.loadUser} onRouteChange = {this.onRouteChange}/> 

            )
             }
                   
          
        </header>
      </div>
    );
  }
}

export default App;
