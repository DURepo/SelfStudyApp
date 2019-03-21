import React, {Component} from "react"

class Analysis extends Component{
    
    constructor(props){
        super(props)

        this.state={
            result:0,
            userstudyID: props.userstudyID
        }
    }

    componentDidMount(){
        
        fetch('http://localhost:3001/Analysis/'+this.state.userstudyID,{
        method:'get',
        headers:{'Content-Type':'application/json'}
        })
        .then(
            Response => Response.json())
        .then(r=> this.setState({result:r}) )
    }


    render(){
        if(this.state.result === 1){
            return(
                <div>
                    <h4>Your Hypothesis is true</h4>
                    <p>There is significant relation in the data you provided</p>
                </div>
            )

        }
        if(this.state.result===2){
           return(
           <div>
                    <h4>Your Hypothesis is false</h4>
            </div>)
        }
        else{
            return(<div>
                <h4>Analysis is not complete</h4>
            </div>
            )}

        
    }
}

export default Analysis;
