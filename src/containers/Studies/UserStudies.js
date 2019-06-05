import React from "react";
import StudyResult from "./StudyResult";
import RecordAnalyseStudy from "./RecordAnalyseStudy";


class UserStudies extends React.Component{
    constructor(props){
        super();
        this.state={
            route:'',
            selectedStudy:{},
            studies: [
                {id:1,
                studyinput:"veg",
                studyoutput:"sleep",
                duration:30,
                analysisComplete:true
                },
                {
                    id:2,
                studyinput:"veg",
                studyoutput:"sleep",
                duration:10,
                analysisComplete: false
                }
            ]
        }
    }

    submitbtnOnClick = (studyID) =>{
        //check is analysis complete, if yes redirect to results page
            //if no, redirect to complete study and perfrom ananlysis page
        let s = this.state.studies.find(item => item.id === studyID)
        this.state.selectedStudy = s
       if(s.analysisComplete){
           console.log("TRUE")
            this.setState({route:"recordAnalyseStudy"})
       }
         
       else {
        console.log("FALSE")
        this.setState({route:"studyResult"})
       }
        

    }
    

    render(){
        
        const tablecomponent = this.state.studies.map((s,i) =>
        {
            return (<button type="submit" key={s.id} onClick={()=>this.submitbtnOnClick(s.id)} >Impact of {s.studyinput} on {s.studyoutput} for {s.duration} Days.</button>)
        })

        return(
            <div>
                {this.state.route===""
                ? <div><h1>Studies (Hypotheses) that you experimented, select one </h1>
                {tablecomponent}</div>
                :(this.state.route === 'recordAnalyseStudy'
                ? <RecordAnalyseStudy />
                : <StudyResult/>
                )
        }
            </div>
        )
    }

}

export default UserStudies;