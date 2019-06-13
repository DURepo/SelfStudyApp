import React from "react";
import StartnewStudy from './CreateStudy/StartNewStudy';
import UserStudies from './Studies/UserStudies';


class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            activeMode : "none",
            userid: props.userid

        }
    }
    
    updatemode = (mode) =>{
        this.setState({activeMode: mode})
       
    }

    loadHome = () =>{
        return(
                <div>                    
                <button type="submit" onClick={()=>this.updatemode("viewStudies")}>Select Existing Study</button>
                <button type="submit" userid={this.state.userid} onClick={()=>this.updatemode("createNewStudy")}>Start a New Study</button>
                </div>
        )
    }

    
    render(){        
        
            if(this.state.activeMode==="none"){
                // return (<div>
                // {this.loadHome()}
                // </div>
                return(            
                <div>                    
                    <button type="submit" onClick={()=>this.updatemode("viewStudies")}>Select Existing Study</button>
                    <p>{"\n"}</p>
                    <button type="submit" userid={this.state.userid} onClick={()=>this.updatemode("createNewStudy")}>Start a New Study</button>
                
                </div>
                )
            }
            else if(this.state.activeMode==="createNewStudy") {
                return(
                    <div>
                        <h1>Create New Study</h1>
                        {/* {this.createStudyDisplayPage()} */}
                        <StartnewStudy userid={this.state.userid} />
                    </div>
                )
            }
            else{
                //view study
                return(<div>
                    <UserStudies userid={this.state.userid} />
                </div>)
            }
        
    }
}

export default Home;