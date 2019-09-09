import React from "react";
import StudyResult from "./StudyResult";
import RecordAnalyseStudy from "./RecordAnalyseStudy";
import RecordStudyData from "../RecordStudyData";


class UserStudies extends React.Component{
    constructor(props){
        super(props);
        this.state={
            userid: props.userid,
            route:'',
            selectedStudy:{},
            studyDates:{},
            studies: [],
            result:0
        }
    }

    componentDidMount(){
        console.log("did mount called")
        fetch('http://localhost:3001/studies/'+this.state.userid,{
            method:'get',
            headers:{'Content-Type':'application/json'}
        })
        .then(response=> response.json())
        .then(records=> {console.log("records:,", records)
        this.setState({studies: records})}
        )        
        
    }

    studyselected = (studyID) =>{
        //check is analysis complete, if yes redirect to results page
            //if no, redirect to complete study and perfrom ananlysis page
        let s = this.state.studies.find(item => item.study_id === studyID)        
        this.state.selectedStudy = s

        if(!(s.isAnalysisComplete===1)){
            fetch('http://localhost:3001/studyDataDates/'+ studyID, {
            method:'get',
            headers:{'Content-Type':'application/json'}
            })
            .then(response=>response.json())
            .then(records=> {console.log('RECS:',records)
            this.setState({studyDates: records})
            console.log(studyID)
            console.log('l:',records.length)
            console.log('isan:',s.isAnalysisComplete)
            
            

            if(records.length>0 && s.isAnalysisComplete === 0){
                console.log('DATEs:',this.state.studyDates)
                this.setState({route:"recordStudy"})
            }
            else{
                
                this.setState({route:"analyseStudy"})
            }          
            
            })
        }
        else
        {
            
            this.setState({route:"studyResult", result:s.result})   
            console.log( "In US", s)         
        }
       
        

    }

    loadresult=()=>{
        fetch('http://localhost:3001/loadResult/'+this.state.selectedStudy.id,{
            method:'get',
            headers:{'Content-Type':'application/json'} 
        })
        .then(Response=> Response.json())
        .then(r => {this.setState({result:r})})
    }
    
    runAnalysisbtnclick = () =>{
        console.log("STATE selectedstudy:", this.state.selectedStudy)
        fetch('http://localhost:3001/Analysis/'+this.state.selectedStudy.study_id,{
        method:'put',
        headers:{'Content-Type':'application/json'}
        })
        .then(
            Response => Response.json())
        .then(r=> {this.setState({result:r})
            this.setState({route:"studyResult"})  }  
            ) 
    
    }

    render(){
        
        const tablecomponent = this.state.studies.map((s,i) =>
        {
            return (<div><button type="submit" key={s.study_id} onClick={()=>this.studyselected(s.study_id)} >Impact of {s.observed_input} on {s.observed_output} for {s.studyPeriodInDays} Days.</button> <p>{"\n"}</p> </div>)
        })

        return(
            <div>
                {this.state.route===""
                ? <div><h1>Studies (Hypotheses) that you experimented, select one </h1>
                {tablecomponent}</div>
                :(this.state.route === 'recordStudy'
                ? <RecordAnalyseStudy selectedStudy={this.state.selectedStudy} studyDates={this.state.studyDates} />
                : (this.state.route==='analyseStudy'
                   ? <div> 
                       <label>Data is Complete, Run Analysis?</label>
                       <button type="submit" onClick={()=>this.runAnalysisbtnclick()} > Yes </button>
                        </div>
                   : <StudyResult selectedStudy={this.state.selectedStudy} studyResult={this.state.result}/>
                )
                )
        }
            </div>
        )
    }

}

export default UserStudies;