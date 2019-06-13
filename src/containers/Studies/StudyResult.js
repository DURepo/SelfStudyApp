import React from 'react'

class StudyResult extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            study: props.selectedStudy,
            result: props.studyResult
        }
    }

    render(){
        
        console.log(this.state.result)
        console.log("STDY:", this.state.study)
        if(this.state.result ==1 ){
            return(
                <div>
                    <h4>Your Hypothesis is true. </h4>
                    <h5>There is a significant impact of "{this.state.study.observed_input}"" on "{this.state.study.observed_output}"</h5>
                    <p>There is significant relation in the data you provided</p>
                </div>
            )
        }
        else{
            return(
                <div>
                         <h4>Your Hypothesis is false</h4>
                         <h5>There is a Not a significant impact of "{this.state.study.observed_input}"" on "{this.state.study.observed_output}"</h5>
                </div>)
        } 
    }
}

export default StudyResult;