import React from 'react'
import RecordDataMaster from '../RecordDataMaster';
import RecordStudy from './RecordStudy'

class RecordAnalyseStudy extends React.Component{
    constructor(props){
        super(props);
        this.state={
            currentstudy : props.selectedStudy,            
            studyDates:props.studyDates,
            mode: "record"

        }
    }

   



    render(){
        
        const {selectedStudy, studyDates} = this.props
        return(
            
            <div>
                <h1>Record And Analyse Study</h1>
                
                {this.state.currentstudy.isDataComplete===1
                ?<div>
                <button type="submit" > Perform Analysis</button>
                </div>
                : <div>
                   {/*<RecordDataMaster studyData={this.state.currentstudy} studyDates={this.state.studyDates} />*/}
                   <RecordStudy studyData={this.state.currentstudy} studyDates={this.state.studyDates} />
                </div>
                }
                
                
                
                
                
                

            </div>
        )
    }
}

export default RecordAnalyseStudy;