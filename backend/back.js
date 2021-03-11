var mysql = require('mysql');
var cors = require("cors");

const { authSecret } = require('./.env')
const jwt = require('jwt-simple')
const bcrypt = require('bcrypt-nodejs')
const passport = require('passport')
const passportJwt = require('passport-jwt')
const util = require('util');

const express = require('express');
const app = express();         
const bodyParser = require('body-parser');
const { request } = require('express');
const { UniqueIdentifier } = require('mssql');

const port = 3000; 


app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//definindo as rotas
const router = express.Router();
router.get('/', (req, res) => res.json({ message: 'Funcionando!' }));
app.use('/', router);


//inicia o servidor
app.listen(port);
console.log('API funcionando!');


function execSQLQuery(sqlQry, res){
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "csbildey",
  database: "conffia"
});

con.query(sqlQry, function(error, results, fields){
  if(error) 
    res.json(error);
    
  else
    res.json(results);
    console.log('ta a dar')
    
  con.end();
  console.log('executou!');
});
}







  var conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "csbildey",
    database: "conffia"
  })




  

async function getinfo(sql) {
  
    
   
        

  

       let results = await new Promise((resolve, reject) => conn.query(sql, (err, results) => {
        if (err) {
          
          reject(err)
          
        } else {
          resolve(results)
         }

         
      }))  
      let res = await results
     
      return await res[0][0]
  
     

}





router.get('/financeiras', (req, res) =>{

  execSQLQuery('SELECT FinanceiraNome FROM Financeira', res)
})

router.get('/stands', (req, res) =>{

  execSQLQuery('SELECT StandNome FROM Stand', res)
})

router.get('/funcionarios', (req, res) =>{

  execSQLQuery('SELECT NomeFuncionario FROM Funcionario', res)
})

router.post('/filters', (req,res) => {

  let data = req.body

  
 

 console.log(filterCheck(data))
 execSQLQuery(filterCheck(data), res)

  
 
  

  
  

})


router.post('/PropFin', (req,res) =>{
  
  data = req.body

  console.log(data)
  
  execSQLQuery(`Call PropFin(${parseInt(data.propostaID)})`, res)

 
})


function filterCheck(object) {
  

  var nome = null
  var stand = null
  var dataInicio = null
  var dataFim = null
  var nif = null




  switch(object[0].filter_01.Value){
    case 'Nome':
      console.log(object[0].filter_01.Filter)
    nome = `'${object[0].filter_01.Filter}'`
    break;
  
    case 'Nif':
    nif = `'${object[0].filter_01.Filter}'`
    break;
  
    case 'Data':
      var Inicio = object[0].filter_01.Filter[0].Filter
      var Fim = object[0].filter_01.Filter[1].Filter
      var newDateInicio = Inicio.split("/").reverse().join("-")
      var newDateFim = Fim.split("/").reverse().join("-")
 
  
    dataInicio = `'${newDateInicio}'`
    dataFim = `'${newDateFim}'`

    break;
  
    case 'Stand':
    stand = `'${object[0].filter_01.Filter}'`
    break;



  
  }

if(object[1]){

  switch(object[1].filter_02.Value){
    case 'Nome':
    nome = `'${object[1].filter_02.Filter}'`
    break;
  
    case 'Nif':
    nif = `'${object[1].filter_02.Filter}'`
    break;
  
    case 'Data':

    var Inicio = object[1].filter_02.Filter[0].Filter;
    var Fim = object[1].filter_02.Filter[1].Filter;
    var newDateInicio = Inicio.split("/").reverse().join("-")
    var newDateFim = Fim.split("/").reverse().join("-")


  dataInicio = `'${newDateInicio}'`
  dataFim = `'${newDateFim}'`
    break;
  
  
    case 'Stand':
    stand = `'${object[1].filter_02.Filter}'`
    break;
  

  
  
  }
}
if(object[2]){
  switch(object[2].filter_03.Value){
    case 'Nome':
    nome = `'${object[2].filter_03.Filter}'`
    break;
  
    case 'Nif':
    nif = `'${object[2].filter_03.Filter}'`
    break;
  
    case 'Data':




    var Inicio = object[2].filter_03.Filter[0].Filter;
    var Fim = object[2].filter_03.Filter[1].Filter;
    var newDateInicio = Inicio.split("/").reverse().join("-")
    var newDateFim = Fim.split("/").reverse().join("-")


  dataInicio = `'${newDateInicio}'`
  dataFim = `'${newDateFim}'`
    break;
  

    case 'Stand':
    stand = `'${object[2].filter_03.Filter}'`
    break;
  
  
  }
}




return `CALL CONFFIA.DataProp(${stand} , ${nome},  ${dataInicio}, ${dataFim}, ${nif})`

}


router.post('/update', (req,res) =>{
  
  data = req.body




  execSQLQuery('call CONFFIA. `Update` ' + `(
  '${data.Financeira}', 
  '${data.Funcionario}', 
    ${parseInt(data.Valor)}, 
    ${parseInt(data.Prazo)},
    ${Number(data.Rent)}, 
    '${data.Estado}', 
    '${data.Obs}', 
    ${parseInt(data.NrProposta)})`, res)
  
})

router.post('/afterupdate', (req, res) => {
data = req.body

  execSQLQuery('call CONFFIA. `AfterUpdate` ' + `(${parseInt(data.NrProposta)})` , res)
})


router.post('/deleteRecord', (req, res) => {
  data = req.body
  console.log(data)
  
    execSQLQuery('call CONFFIA. `deleteRecord` ' + `(${parseInt(data.NrProposta)})` , res)
  })

router.post('/insert', (req, res) => {
    data = req.body

    console.log(data)
     try{
      execSQLQuery('call CONFFIA.insertPropFin ' + `(
        ${parseInt(data.PropostaID)},
        '${data.Financeira}', 
        '${data.Funcionario}', 
          ${parseInt(data.Valor)}, 
          ${parseInt(data.Prazo)},
          ${Number(data.Rent)}, 
          '${data.Estado}', 
          '${data.Obs}', 
          ${parseInt(data.NrProposta)})`, res)

     }catch(error){
 
       res.error
      
     }

    })

router.post('/signin', (req, res) => {

  console.log(req.body)
  signin(req, res)





 

})
router.post('/validateToken', (req, res) => {
data  = req.body
validateToken(data, res)
})






const signin = async (req, res) => {


  if (!req.body.username || !req.body.password) {

    return res.status(400).send('Informe usuário e senha!')
}

sql = 'call  conffia. findUser ' + `('${req.body.username}')`

const user  = await getinfo(sql)

console.log(user)

if (!user) return res.status(400).send('Usuário não encontrado!')


if (req.body.password != user.Password) return res.status(401).send('Email/Senha inválidos!')

const now = Math.floor(Date.now() / 1000)

const payload = {
    id: user.FuncionarioID,
    name: user.NomeFuncionario,
    iat: now,
    exp: now + (60 * 60 * 24 * 3) //seg * min * hor * dias , 3 dias token valido
}

res.json({
    ...payload,
    token: jwt.encode(payload, authSecret)
})



} 

const validateToken = async  (req, res) => {
  console.log(req)
  const userData = req || null


  try {
      if(userData) {
        
          const token = jwt.decode(userData.token, authSecret)
          if(new Date(token.exp * 1000) > new Date()) {
            console.log('true')
             res.send(true)
       
      }
      else{
        res.send(false)
      }
    }else {
      res.send(false)
    }
  } catch(e) {
    res.send(false)
  }
  
 
}

const passportStrategy = () => {
  const params = {
      secretOrKey: authSecret,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
  }

  const strategy = new Strategy(params, (payload, done) => {
      app.db('users')
          .where({ id: payload.id })
          .first()
          .then(user => done(null, user ? { ...payload } : false))
          .catch(err => done(err, false))
  })

  passport.use(strategy)

  return {
      authenticate: () => passport.authenticate('jwt', { session: false })
  }
}






router.post('/insertProp', (req,res) =>{
  
  data = req.body
  date = data.Data
  var newDate = date.split("/").reverse().join("-")
 
  console.log(`Call conffia.addProp('${data.NomeCliente}', '${data.Nif}','${data.Stand}', '${newDate}'  )`)
  execSQLQuery(`Call conffia.addProp('${data.NomeCliente}', '${data.Nif}','${data.Stand}', '${newDate}'  )`, res)

 
})
router.post('/getProp', (req, res) => {
  data = req.body
  console.log(data.NrProposta)
    execSQLQuery('call CONFFIA. `getProp` ' + `(${parseInt(data.NrProposta)})` , res)
  })



  router.post('/editProp', (req, res) => {
    data = req.body
    console.log(data)

    
    var newDate = data.Data.split("/").reverse().join("-")
    console.log('call CONFFIA. `editProp` ' + `(${parseInt(data.NrProposta)}, '${newDate}', '${data.NomeCliente}', '${data.Nif}', '${data.StandNome}')`)
      execSQLQuery('call CONFFIA. `editProp` ' + `(${parseInt(data.NrProposta)}, '${newDate}', '${data.NomeCliente}', '${data.Nif}', '${data.StandNome}')` , res)
    })


    router.post('/countPropFin', (req, res) => {
      data = req.body
      console.log(data.NrProposta)
        execSQLQuery('call CONFFIA. `countPropFin` ' + `(${parseInt(data.NrProposta)})` , res)
      })
    

      router.post('/deleteProp', (req, res) => {
        data = req.body
        console.log(data.NrProposta)
          execSQLQuery('call CONFFIA. `deleteProp` ' + `(${parseInt(data.NrProposta)})` , res)
        })


        router.post('/getLastAddPropfin', (req, res) => {
          data  =  req.body 
           
            execSQLQuery('call CONFFIA. getLastAddPropfin '+ `(${parseInt(data.NrProposta)})` , res)
          })
      

          router.post('/addStand', (req, res) => {
            data = req.body

            execSQLQuery('call CONFFIA. `addStand` ' + `('${data.standNome}')` , res)
      
          })
          
          
          
          router.post('/getStandsInsert', (req, res) => {
            data = req.body

            execSQLQuery('call CONFFIA. `getStands` ' , res)
      
          })

          router.post('/updateStand', (req, res) => {
            data = req.body
            console.log(data)

            execSQLQuery('call CONFFIA. `editStand` ' + `('${data.standNome}'` + `, ${parseInt(data.standID)}) ` , res)
      
          })
          
          router.post('/cancelUpdateStand', (req, res) => {
       
            data = req.body

            execSQLQuery('call CONFFIA. `cancelUpdateStand` ' + `(${data.standID})`  , res)
      
          })
          

          router.post('/getDependeciesStand', (req, res) => {
       
            data = req.body

            execSQLQuery('call CONFFIA. `getDependeciesStand` ' + `(${data.standID})`  , res)
      
          })

          router.post('/deleteStand', (req, res) => {
       
            data = req.body

            execSQLQuery('call CONFFIA. `deleteStand` ' + `(${data.standID})`  , res)
      
          })




          router.post('/addFinanceira', (req, res) => {
            data = req.body

            execSQLQuery('call CONFFIA. `addFinanceira` ' + `('${data.financeiraNome}')` , res)
      
          })
          
          
          
          router.post('/getFinanceirasInsert', (req, res) => {
            data = req.body

            execSQLQuery('call CONFFIA. `getFinanceiras` ' , res)
      
          })

          router.post('/updateFinanceira', (req, res) => {
            data = req.body
            console.log(data)

            execSQLQuery('call CONFFIA. `editFinanceira` ' + `('${data.financeiraNome}'` + `, ${parseInt(data.financeiraID)}) ` , res)
      
          })
          
          router.post('/cancelUpdateFinanceira', (req, res) => {
       
            data = req.body

            execSQLQuery('call CONFFIA. `cancelUpdateFinanceira` ' + `(${data.financeiraID})`  , res)
      
          })
          

          router.post('/getDependeciesFinanceira', (req, res) => {
       
            data = req.body

            execSQLQuery('call CONFFIA. `getDependeciesFinanceira` ' + `(${data.financeiraID})`  , res)
      
          })

          router.post('/deleteFinanceira', (req, res) => {
       
            data = req.body

            execSQLQuery('call CONFFIA. `deleteFinanceira` ' + `(${data.financeiraID})`  , res)
      
          })
          router.post('/getPropfin', (req, res) => {
       
            data = req.body

            execSQLQuery('call CONFFIA. `getPropfin` ' + `(${data.NrProposta})`  , res)
      
          })