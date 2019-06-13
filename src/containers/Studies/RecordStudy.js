import React from 'react'

class RecordStudy  extends React.Component{
    constructor(props){
        super(props)

        this.state= {
            selectedinput : "",
            selectedoutput :"",
            studyDates: this.props.studyDates,
            study: this.props.studyData,
            mode:"",
            displayMessage:"",
            displayDate:"",
            displayedDate_id:""
        }
    }

    updatemode = (date,date_id) => {
        
        this.setState({mode:"RecordDay", displayMessage:"", displayDate:date,displayedDate_id:date_id})

    }

    onInputChange = (event) => {
        this.setState({selectedinput: event.target.value})

    }

    onOutputChange= (event) =>{
        this.setState({selectedoutput: event.target.value})
    }

    saveDaybtnclick = () =>{
        console.log(this.state.studyDates)
        this.setState({ mode:"", displayMessage:"Saved!!!"})
        
        fetch('http://localhost:3001/recordStudy',{
            method:'put',
            headers:{'Content-type':'application/json'},
            body: JSON.stringify({
                id: this.state.displayedDate_id,
                input_data: this.state.selectedinput,
                output_data: this.state.selectedoutput
            })
            
        })
        .then(response => console.log("RESP:",response))
        console.log("PROPS:")
        console.log( this.state.selectedinput)
        console.log(this.state.selectedoutput)
        console.log(this.state.displayedDate_id)


    }

    render(){
        const {s, studyDates} = this.props
        console.log('PROPS:',studyDates)
        const tablecomponent = studyDates.map((d,i)=>
        {
            let D = new Date(d.date)
            let displayDate = D.toString().split('00')[0]
        return (<button style={{margin:"2px"}} type="submit" key={d.id} value={d.id} onClick={()=>this.updatemode(displayDate,d.id)} >{displayDate}</button>)
        }       
        )

        return(
            <div>
                <h5> Select a Date: </h5>
                
                {this.state.mode==="RecordDay"
                ?<div>
                    <label>On {this.state.displayDate}</label>
                    <p>{"\n"}</p>                 
                    <label>Rate {this.state.study.observed_input} as low or high</label>
                    <select onChange={this.onInputChange}>
                        <option>--select--</option>
                        <option value="1">High</option>
                        <option value="0">Low</option>
                    </select>
                    <p>{"\n"}</p>
                    <label>Rate {this.state.study.observed_output} on scale of (0-100) (0: Low, 100 High) </label>
                    <input id="output" onChange={this.onOutputChange}></input>
                    <p>{"\n"}</p>
                    <button type="submit" onClick={this.saveDaybtnclick} >Save</button>
                    <p>{"\n"}</p>
                 </div>
                 :<div>
                     <label>{this.state.displayMessage}</label>
                 </div>
                }
                <div style={{margin:"5px"}}>
                {tablecomponent}
                </div>
               
            </div>
        )
    }
}

export default RecordStudy

