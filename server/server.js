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
    const isComplete = false    
    let schedule =[]
    //let s = [{userStudy_id: 1, date: new Date()}]

    // db.transaction(trx => {
    //     trx.insert({
    //         user_id: user_id,
    //         observed_input: observed_input,
    //         observed_output: observed_output,
    //         studyPeriodInDays: studyPeriodInDays,
    //         isComplete: isComplete,
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
            isComplete: isComplete,
            start_date: start_date        
    })
    .then(result => {userstudyID = result[0]                  
                schedule = generateStudyPlan(userstudyID,studyPeriodInDays)                
                updateSchedule(schedule)
                console.log('SCHEDULE: ',schedule)
                res.json(schedule)
    })    
    .catch(function(err){
        console.error(err);
    })
        
    
})

//for a given period returns of the days on which user has to perform study
generateStudyPlan=(userstudyID,studyPeriod)=>{
    console.log("studyperiod: ", studyPeriod)
       let d = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
       let stdyPeriod = studyPeriod
       let schedule = []
       let count = stdyPeriod/2;
        let i=1
       for(i; i<count; i ++){
           let newEntry ={}
           newEntry.study_id = userstudyID;
           d.setDate(d.getDate()+2)
           newEntry.date = new Date(d) 
         schedule.push(newEntry)
       }       
       return schedule
    

}

updateSchedule = (s)=> {
    db('studyobservation')
    .returning('*')
    .insert(s)
    .then(result => console.log('UPDATED schedule: ', result))
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

//updates the inputsample and outputSamle for a given day
app.put('/recordStudy',(req,res)=>{
   const {RecordID,inputSample, outputSample} = req.body
  
   console.log("details: " + RecordID)
   db('studydatarecords')
   .where('record_id', '=',parseInt(RecordID))
   .update({
       inputSample: parseInt(inputSample),
       outputSample: parseInt(outputSample)
   })
   .then(resp=> {   
    res.json(resp)
                })
    .catch(function(err){
                    console.error(err);
          })

})

//For a given user study id, checks if data is complete, if complete runs test if not returns
app.get('/Analysis/:id', (req, res)=>{
    const id = req.params.id;
    let result =-1;

    db.select('*')
        .from('studydatarecords')
        .where({userStudy_id:id, 'inputSample': null})
        .orWhere({userStudy_id:id, 'outputSample': null})
        .then(response=>{
            if(!response.length){
                //GetRecordsAndRunTest(id)
                db.select('inputSample', 'outputSample')
            .from('studydatarecords')
            .where({userStudy_id:id})
            .then(response=>{ 
            res.json( RunTest(response))
        })
        }
            
        })
        .catch(function(err){
            console.error(err)
        })


})

//Gets data for given study ID and runs test
GetRecordsAndRunTest = (id) =>{   
        db.select('inputSample', 'outputSample')
        .from('studydatarecords')
        .where({userStudy_id:id})
        .then(response=>{ 
            return RunTest(response)
        })
}

//Runs mann-whitney-utest on given records
RunTest = (records) =>{
    let result
    const inputArray = records.map((ele, i)=>{
        return ele.inputSample 
    })
    const outputArray = records.map(ele => {return ele.outputSample})
    //Format of  samples for mwu test [ [30, 14, 6], [12, 15, 16] ];
    const finalArray = []
    finalArray.push(inputArray)
    finalArray.push(outputArray)
    let u = mwu.test(finalArray);
    if (mwu.significant(u, finalArray)) {
        console.log('The data is significant!');
        result= 1
    } else {
        console.log('The data is not significant.');
        restult = 2
    }

    return result;
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

