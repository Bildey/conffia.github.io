


function loginParams(username, password) {

    params = {
        "username" : username,
        "password" : password
    }
   
return params

}

document.addEventListener('DOMContentLoaded', () => {
   

   
form = document.forms["loginForm"]

    form.addEventListener('submit', event => {



      event.preventDefault()
      var username = document.forms["loginForm"]["username"].value
      var passowrd = document.forms["loginForm"]["password"].value
      if (username == "" || passowrd == "") {
        alert("Deve preencher o nome de utilizador e palavra-passe");
        return false;
  
  
  
      }
      

  axios.post('http://localhost:3000/signin', loginParams(username, passowrd))
      .then(resp => {

         if( resp.status == 200) {
           localStorage.setItem('__user', JSON.stringify(resp.data))
          window.location.replace("/search")
           
         }
         

})
.catch(error => {
  try {

    document.getElementById('invalidP').remove()
  }catch{


  }

  p = document.createElement('p')
  p.setAttribute('id', 'invalidP')
  p.innerHTML = 'Nome de utilizador/Palavra passe inválido(s)'

  setTimeout(function(){

    form.insertBefore(p, document.getElementById('button'))


   }, 100);


  
  
})


      

             
   
          
         }
      )

     
    })
   
 




