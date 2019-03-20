const express = require('express');
const bodyParser = require('body-parser');
const mwu = require('mann-whitney-utest');
const knex = require('knex');

const db = knex({
    client: 'mysql',
    connection: {
      host : 'localhost',
      user : 'root',
      password : 'kec123!',
      database : 'selfstudydb'
    }
  });

const app = express();

app.use(bodyParser.json());

db.select('*').from('result').then(data=> {
    console.log(data[0])
});

app.get('/',(req, res)=>{
    res.send('this is working');
})

app.listen(3001,()=>{
    console.log('App is running on port 3001')
})

const studies=[{
    ID:1,
    Name: "HighFibre",
    Description:"Eat more Vetables"
}]
const user =
[{  ID:1,
    Name: "John"
}]

const userStudy=[{
    ID:1,
    StudyID:1,
    UserID:1,
    StudyStartDate:"2019/03/18",
    StudyPeriodinDays:15
}]

const studyData =[{
    ID:1,
    StudyID:1,
    RecordDate:"2019/03/20",
    inputSample:2,  //3:High Veggies, 2: Medium Veggies, 1: Low Veggies
    ouputSample:80 // range(0,100) 0:low quality of sleep, 100 High quality of sleep
},
{ID:2,
    StudyID:1,
    RecordDate:"2019/03/22",
    inputSample:3,  
    ouputSample:90 
},
{ID:3,
    StudyID:1,
    RecordDate:"2019/03/24",
    inputSample:1,  
    ouputSample:50 
},
{ID:4,
    StudyID:1,
    RecordDate:"2019/03/24",
    inputSample:3,  
    ouputSample:95 
}]

app.post('/createuserStudy',(req,res)=>{
    const {studyID,userID,studyPeriodinDays} = req.body;    
    db('userstudies')
    .returning('*')
    .insert({
        study_id:studyID,
        user_id: userID,
        start_date: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()),
        studyPeriodInDays: studyPeriodinDays
    }).then(s=>res.json(s[0]))  
    
})

app.post('/schedule',(req,res)=>{
    const {userStudyID, dates} = req.body
    const modiData = dates.map(d => {
        let temp = {}
        temp.userStudyID = userStudyID
        temp.date= d
        return temp
        })
    res.json(modiData)
})

app.put('/recordStudy',(req,res)=>{
    //{userstudyID:1, records:[{ID:1,  Date:"", input:"", output:""},{{ID:2, Date:"", input:"", output:""}}}

    const {studyID, records} = req.body
})

app.post('/runTest:userStudyId',(req,res)=>{
    //call DB to get input and output
    //records:[{input:"", output:""},{{input:"", output:""}}}
    let result;
    const records = [{input:1,output:50},{input:3,output:95},{input:2,output:80},{input:3,output:90}]
    const inputArray = records.map((ele, i)=>{
        return ele.input 
    })
    const outputArray = records.map(ele => {return ele.output})
    //Format of  samples for mwu test [ [30, 14, 6], [12, 15, 16] ];
   
    const finalArray = []
    finalArray.push(inputArray)
    finalArray.push(outputArray)    

    var u = mwu.test(finalArray);

    if (mwu.significant(u, finalArray)) {
        console.log('The data is significant!');
        result= 1
    } else {
        console.log('The data is not significant.');
        restult = 0
    }
    
    res.send('ran')

})

/*

/createStudy --> POST = success/fail

/record  --> POST = success/fail

/record --> GET = StudyData

/record --> PUT = success/fail

/RunStudy/:studyid --> GET = studyResult 
    //runs ManW u test, sends result and saves results copy DB 


*/