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
    
    onStartnewStudyclick = (mode) =>{
        this.setState({activeMode: mode})
       
    }

    
    render(){        
        
            if(this.state.activeMode==="none"){
                return(            
                <div>                    
                    <button type="submit" onClick={()=>this.onStartnewStudyclick("viewStudies")}>Select Existing Study</button>
                    <button type="submit" userid={this.state.userid} onClick={()=>this.onStartnewStudyclick("createNewStudy")}>Start a New Study</button>
                
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
                    <UserStudies />
                </div>)
            }
        
    }
}

export default Home;