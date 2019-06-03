import React from "react";
import StartnewStudy from './CreateStudy/StartNewStudy';



class Home extends React.Component {

    constructor(props) {
        super();
        this.state={
            activeMode : "none"

        }
    }
    
    onStartnewStudyclick = () =>{
        return <StartnewStudy />
    }

    render(){        
        
            if(this.state.activeMode==="none"){
                return(            
                <div>                    
                    <button type="submit">Select Existing Study</button>
                    <button type="submit" onClick={this.onStartnewStudyclick}>Start a New Study</button>
                
                </div>
                )
            }
            else if(this.state.activeMode==="createNewStudy") {
                return(
                    <div></div>
                )
            }
            else{
                return(<div></div>)
            }
        
    }
}

export default Home;