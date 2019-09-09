const express = require('express');
const bodyParser = require('body-parser');
const mwu = require('mann-whitney-utest');
const knex = require('knex');
const cors = require('cors');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const db = knex({
    client: 'mysql',
    connection: {
      host : 'localhost',
      user : 'root',
      password : 'kec123!',
      database : 'selfstudydb'
    },
    useNullAsDefault: true
  });

const app = express();
app.use(cors());

app.use(bodyParser.json());

db.select('*').from('result_old').then(data=> {
    console.log(data[0])
});



app.listen(3001,()=>{
    console.log('App is running on port 3001')
})


//creates a new study for a user
app.post('/createuserStudy',(req,res)=>{
    const data = req.body
    console.log(req.body)
    const {studyID,userID,studyPeriodinDays} = req.body;
    const user_id = data.userid
    const observed_input = data.studyinput
    const observed_output = data.studyoutput
    const studyPeriodInDays = data.studyPeriodinDays
    const start_date = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())       
    let schedule =[]
    //let s = [{userStudy_id: 1, date: new Date()}]

    // db.transaction(trx => {
    //     trx.insert({
    //         user_id: user_id,
    //         observed_input: observed_input,
    //         observed_output: observed_output,
    //         studyPeriodInDays: studyPeriodInDays,
    //         start_date: start_date
    //     })
    //     .into('userstudies')
    //     .returning('study_id')
    //     .then(result => {userstudyID = result[0]                  
    //            schedule = generateStudyPlan(userstudyID,studyPeriodInDays)                
    //              updateSchedule(schedule)
    //              res.json(schedule)
    //      })  
    //     .then(trx.commit)
    //     .catch(trx.rollback)
        
    // })
    // res.json("success")


    db('userstudies')
    .returning('*')
    .insert({
        user_id: user_id,
          observed_input: observed_input,
          observed_output: observed_output,
          studyPeriodInDays: studyPeriodInDays,
            start_date: start_date        
    })
    .then(result => {userstudyID = result[0]                  
                schedule = generateStudyPlan(userstudyID,studyPeriodInDays,2)                
                updateMaxinputRecomendedDays(schedule)
                allDates = generateStudyPlan(userstudyID,studyPeriodInDays,1) 
                insertAllDatesForStudy(allDates)
                console.log('SCHEDULE: ',schedule)
                res.json(schedule)
    })    
    .catch(function(err){
        console.error(err);
    })
        
    
})

//for a given period returns of the days on which user has to perform study
generateStudyPlan=(userstudyID,studyPeriod, datesDelta)=>{
    console.log("studyperiod: ", studyPeriod)
       let d = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
       let stdyPeriod = studyPeriod
       let schedule = []
       let count =0
       console.log("datesDelta: ", datesDelta===2)
       if(datesDelta === 2){
            count = stdyPeriod/2;
       }
       else{
            count = stdyPeriod;
       }
        let i=1
       for(i; i<count; i ++){
           let newEntry ={}
           newEntry.study_id = userstudyID;
           d.setDate(d.getDate()+datesDelta)
           newEntry.date = new Date(d) 
         schedule.push(newEntry)
       }       
       return schedule
    

}

updateMaxinputRecomendedDays = (s)=> {
    db('maxinputrecomendeddays')
    .returning('*')
    .insert(s)
    .then(result => console.log('UPDATED schedule: ', result))
}

insertAllDatesForStudy = (s)=> {
    db('studyobservation')
    .returning('*')
    .insert(s)
    .then(result => console.log('UPDATED all dates: ', result))
}



//Returns study data for a given studyid
app.get('/studyData/:id', (req,res)=>{
    const id = req.params.id
    console.log(id)
    db.select('*').from('studydatarecords_old').where({userStudy_id: id})
    .then(records =>{
        if(records.length){
            res.json(records)
        }else{
            res.status(400).json('not found')
        }
    })

    
})

app.get('/studyDataDates/:id',(req,res) => {
    console.log('studyDataDates called')
    const id = req.params.id
    db.select('*').from('studyobservation').where({study_id: id}).whereNull('input_data')
    .then(records => {
        if(records.length){
            console.log('IN DB: ', records)
            res.json(records)
        }else{
            res.status(400).json({})
        }
    })

})

//get studies for a given userid
app.get('/studies/:id',(req,res) => {

    const id = req.params.id
    db.select('*').from('userstudies').where({user_id: id})
    .then(records =>{
        if(records.length){
            return res.json(records)
        }else{
            return res.status(400).json('not found')
        }
    })

})

app.get('/loadResult/:id',(req,res) => {
    const id = req.params.id
    db.select('result').from('userstudies').where({study_id:id})
    .then(records=>{
        res.json(records[0].result)
    })
})

//updates the inputsample and outputSamle for a given day
app.put('/recordStudy',(req,res)=>{
   const {id,input_data, output_data} = req.body
  
   console.log("details: " + id)
   db('studyobservation')
   .where('id', '=',parseInt(id))
   .update({
        input_data: parseInt(input_data),
        output_data: parseInt(output_data)
   })
   .then(resp=> {   
    res.json(resp)
                })
    .catch(function(err){
                    console.error(err);
          })

})

//For a given user study id, checks if data is complete, if complete runs test if not returns
app.put('/Analysis/:id', (req, res)=>{
    console.log("REQ:", req)
    const id = req.params.id;
    let result =-1;
    console.log('STUDYID:',id)

    db.select('*')
        .from('studyobservation')
        .where({study_id:id, 'input_data': null})
        .orWhere({study_id:id, 'output_data': null})
        .then(response=>{
            if(!response.length){
                console.log("IN IF loop")
                console.log("studyID:", id)
                //GetRecordsAndRunTest(id)
                db.select('input_data', 'output_data')
            .from('studyobservation')
            .where({study_id:id})
            .then(response2=>{ 
                console.log('studyDATA:', response2)
                
            res.json( RunTest(id,response2))
            
            })
        }
        else{
            console.log("IN ELSE loop")
        }
            
        })
        .catch(function(err){
            console.error(err)
        })


})

//Gets data for given study ID and runs test
GetRecordsAndRunTest = (id) =>{   
    console.log(id)
        db.select('inputSample', 'outputSample')
        .from('studydatarecords')
        .where({userStudy_id:id})
        .then(response=>{ 
            return RunTest(response)
        })
}

//Runs mann-whitney-utest on given records
RunTest = (id,records) =>{
    let result
    console.log("REcords:", records)
    
    const treatmentHigh = records.filter(e => e.input_data===1)

    const treatmentHighArray = treatmentHigh.map((ele, i)=>{
            return ele.output_data
        })
    
    const treatmentLow = records.filter(e => e.input_data===0)
    
    const treatmentLowArray = treatmentLow.map((ele, i)=>{
        return ele.output_data
    })


    const finalArray = []
    finalArray.push(treatmentHighArray)
    finalArray.push(treatmentLowArray)
    console.log(finalArray)

    let u = mwu.test(finalArray);

    if (mwu.significant(u, finalArray)) {
            console.log('The data is significant!');            
            result= 1
            insertAnalysisResultinDB(id,result)
        } else {
            console.log('The data is not significant.');
            result = 2
            insertAnalysisResultinDB(id,result)
        }
    
        return result;
        
    // const inputArray = records.map((ele, i)=>{
    //     return ele.inputSample 
    // })
    // const outputArray = records.map(ele => {return ele.outputSample})
    // //Format of  samples for mwu test [ [30, 14, 6], [12, 15, 16] ];
    // const finalArray = []
    // finalArray.push(inputArray)
    // finalArray.push(outputArray)
    // let u = mwu.test(finalArray);
    // if (mwu.significant(u, finalArray)) {
    //     console.log('The data is significant!');
    //     result= 1
    // } else {
    //     console.log('The data is not significant.');
    //     restult = 2
    // }

    // return result;
}

insertAnalysisResultinDB = (id,result) =>{

    db('userstudies')
   .where('study_id', '=',parseInt(id))
   .update({
        isAnalysisComplete: 1,
        result: parseInt(result)
   })
   .then(resp=> {   
    console.log(resp)
                })
    .catch(function(err){
                    console.error(err);
          })
    
}


database={
    users: [
        {
            email:"john@gmail.com",
            password:"john"
            
        },
        {
            email:"mary@gmail.com",
            password:"mary"
            
        }
    ]
}

app.post('/signin', (req, res)=>{
    password=req.body.password;
    email = req.body.email;

    db.select('email','password').from('users')
        .where('email','=', email)
        .then(data=> {
            hash = data[0].password;
            bcrypt.compare(password, hash, function(err, resp) {
                console.log('bcrypt validation: ',resp)
                if(resp)
                {
                    
                    return db.select('*').from('users')
                    .where('email','=',req.body.email)
                    .then(user => {   
                                             
                        res.json(user[0])
                    })
                    .catch(e => res.status(400).json('unable to get user'))
                }
                else{
                    res.status(400).json('wrong credentials')
                }
            })
            
        })
        .catch(err =>res.status(400).json('wrong credentials') )

    
        
        
    
      
})

app.post('/register', (req, res) => {
    const {name , email, password} = req.body
    console.log("n:", name)
    console.log("email:", email)
    console.log("pw:",password)

    bcrypt.hash(password, saltRounds, function(err, hash) {
        console.log(hash)
        db.transaction(trx =>{
            trx.insert({
                //columns, data                
                name:name,
                email: email,
                password: hash
            })
            .into('users')
            .returning('*')
            .then(user => {
                res.json(user[0])
            
        })
        .then(trx.commit)
        .catch(trx.rollback)
        // Store hash in your password DB.
      })
    .catch(err => res.status(400).json('unable to register'))
    })    
})

app.get('/',(req, res)=>{
    res.json(database.users)
})


