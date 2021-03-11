



window.onload = validateToken()






async function validateToken() {

  var validatingToken 
  const json = localStorage.getItem('__user')
  const userData = JSON.parse(json)
  console.log(userData)

 if(!userData) {
    console.log('utilizador nao existe')
      validatingToken  = false
      window.location.replace("/login")
      return
  }
  const res = await axios.post(`http://localhost:3000/validateToken`, userData)
  if (res.data == true) {
  
      console.log(res.data)
      validatingToken = true

      
      
      
  } else {
    console.log('token expirado')
      validatingToken = false
      localStorage.removeItem('__user')
      window.location.replace("/login")
       return
  }
  
}


var count = 0
var countDropDown = 0
var checkElement = false
var PropostaIDMoreDetail
var elementFather  
var controlUpdate = 0
var countDataFim = 0

var  insertTR = 1
var controlInsert = 0



function addFilter(e) {

  countDropDown++

    var filterMenu = [
        `<div class="filtrarPor input-group mb-3">
        <div class="input-group-prepend">
          <label class="input-group-text" for="inputGroupSelect01">Filtrar Por</label>
        </div>
        <select id="drop-down${countDropDown}" onchange="val_0${countDropDown}()" class="custom-select" id="inputGroupSelect01">
          <option value="Nome" selected>Nome</option>
          <option value="Nif">Nif</option>
          <option value="Data">Data</option>
          <option value="Stand">Stand</option>
        </select>
    
        
      </div>
      <div id="input_area${countDropDown}">
                          
      <input id="input${countDropDown}" type="text" class="form-control" placeholder="Insira o valor" aria-label="Username" aria-describedby="basic-addon1">

    </div>`
    ].join('');
    
    var div = document.createElement('div');
        div.setAttribute('id', `filterchild${count}`)
        div.innerHTML = filterMenu;
        document.getElementById('filtros').appendChild(div);


        count++

        /* remove AddButton */  
        if (count == 2) 
        {

        document.getElementById("addFilterButton").style.display = "none";
        }

         
        /* Adicinar Botao de Remover Filtro*/

        if (count == 1){
                           
                var removeButtonTag = document.createElement(`a`)
                removeButtonTag.innerHTML = (`Remover Filtro`)
                removeButtonTag.setAttribute('id', 'removeButton')
                removeButtonTag.setAttribute("class", "badge badge-secondary")
                removeButtonTag.setAttribute('onclick', "removeFilter()")
                removeButtonTag.setAttribute("href", "#")
                
                document.getElementById("removeButtonDiv").appendChild(removeButtonTag)

        }


}

function removeFilter(e) {

  countDropDown--
  
    

    if (count == 1) {


        var divMenu0 = document.getElementById('filterchild0')
        divMenu0.remove()

        

      

        }
    else if (count == 2) {
        var divMenu1 = document.getElementById('filterchild1')
        divMenu1.remove()
        document.getElementById("addFilterButton").style.display = "inline";
    }


    count--

    if (count == 0)
    {
        var deteleRemoveButton = document.getElementById('removeButton')
        deteleRemoveButton.remove()

        document.getElementById("addFilterButton").style.display = "inline-block";



    }

}

function val() {
  
    var dropDownValue = document.getElementById("drop-down").value;
    var x = document.getElementById('input0');
    var dropDown = document.getElementById("drop-down");
    var inputArea = document.getElementById('input_area')

    try {
      var selectCar = document.getElementById('select-stands0')
      var select = document.getElementById('select-financeiras0')
      var estado = document.getElementById('dropDownEstado')
    }
    finally {
  
        if(inputArea.contains(select))
        {
          select.style.display = 'none'
        }
        if(inputArea.contains(estado)) {
          estado.style.display = 'none'
        }
        if(inputArea.contains(selectCar)){
          selectCar.style.display = 'none'
        }
  
  
    }



    switch(dropDownValue) {
      case 'Nif':
        x.style.display = 'block'
        x.value = ''
        x.removeAttribute('type')
        x.setAttribute('type', 'number')

        if(document.getElementById('inputDataFim1'))  {
          document.getElementById('inputDataFim1').style.display = 'none'
        }
          




        function addEventListenerMaxLengthNif() {
          if (x.value.length > 9) 
          {
            x.value = x.value.slice(0,9); 
          } 
      }
        x.addEventListener('input', addEventListenerMaxLengthNif)
        dropDown.addEventListener('change', function removeaddEventListenerMaxLengthNif (event) {   
          console.log(inputArea)
          x.removeEventListener('input', addEventListenerMaxLengthNif)

          dropDown.removeEventListener('change', removeaddEventListenerMaxLengthNif )  
        });
        break;





      case 'Data':
        
        x.style.display = 'block'
        x.removeAttribute('type')

       
        x.value = dataAtualFormatada()
        if(!document.getElementById('inputDataFim1')){
        inputDataFim = document.createElement('input')
        inputDataFim.setAttribute("class","form-control")
        inputDataFim.setAttribute("ID",`inputDataFim1`)


        inputDataFim.value = dataAtualFormatada()
        inputArea.appendChild(inputDataFim)
        }
        else {
          document.getElementById('inputDataFim1').style.display = 'block'
        }

  











        
        break;
      case 'Nome':



        if(document.getElementById('inputDataFim1'))  {
          document.getElementById('inputDataFim1').style.display = 'none'
        }

        x.style.display = 'block'
        x.value = ''
        x.removeAttribute('type')
        x.setAttribute('type', 'text')
        break;


      case 'Stand':

        if(document.getElementById('inputDataFim1'))  {
          document.getElementById('inputDataFim1').style.display = 'none'
        }

        x.style.display = 'none'
        x.value = ''
        x.removeAttribute('type')
        x.setAttribute('type', 'text')
        if(!inputArea.contains(selectCar)) {
          getStands(inputArea, 0)
        }
        else {
          selectCar.style.display = 'block'
        }
        


        break;
          
          

    }
    
}


function val_01() {

  console.log(count)
  var dropDownValue = document.getElementById("drop-down1").value;
  var x = document.getElementById('input1');
  var dropDown = document.getElementById("drop-down1");
  var inputArea = document.getElementById('input_area1')
  
  try {
    var selectCar = document.getElementById('select-stands1')
    var select = document.getElementById('select-financeiras1')
    var estado = document.getElementById('dropDownEstado1')
  }
  finally {

      if(inputArea.contains(select))
      {
        select.style.display = 'none'
      }
      if(inputArea.contains(estado)) {
        estado.style.display = 'none'
      }
      if(inputArea.contains(selectCar)){
        selectCar.style.display = 'none'
      }


  }


  switch(dropDownValue) {
    case 'Nif':

      if(document.getElementById('inputDataFim2'))  {
        document.getElementById('inputDataFim2').style.display = 'none'
      }

      x.style.display = 'block'
      x.value = ''
      x.removeAttribute('type')
      x.setAttribute('type', 'number')
        




      function addEventListenerMaxLengthNif() {
        if (x.value.length > 9) 
        {
          x.value = x.value.slice(0,9); 
        } 
    }
      x.addEventListener('input', addEventListenerMaxLengthNif)
      dropDown.addEventListener('change', function removeaddEventListenerMaxLengthNif (event) {   
        console.log(inputArea)
        x.removeEventListener('input', addEventListenerMaxLengthNif)

        dropDown.removeEventListener('change', removeaddEventListenerMaxLengthNif )  
      });
      break;





    case 'Data':

      x.style.display = 'block'
      x.removeAttribute('type')



      x.value = dataAtualFormatada()

      if(!document.getElementById('inputDataFim2')){
        inputDataFim = document.createElement('input')
        inputDataFim.setAttribute("class","form-control")
        inputDataFim.setAttribute("ID",`inputDataFim2`)


        inputDataFim.value = dataAtualFormatada()
        inputArea.appendChild(inputDataFim)
        }
        else {
          document.getElementById('inputDataFim2').style.display = 'block'
        }


      break;
    case 'Nome':

      if(document.getElementById('inputDataFim2'))  {
        document.getElementById('inputDataFim2').style.display = 'none'
      }

      x.style.display = 'block'
      x.value = ''
      x.removeAttribute('type')
      x.setAttribute('type', 'text')
      break;

    case 'Stand':

      if(document.getElementById('inputDataFim2'))  {
        document.getElementById('inputDataFim2').style.display = 'none'
      }
      x.style.display = 'none'
      x.value = ''
      x.removeAttribute('type')
      x.setAttribute('type', 'text')
      if(!inputArea.contains(selectCar)) {
        getStands(inputArea, 1)
      }
      else {
        selectCar.style.display = 'block'
      }
      break;
    

  }
  
}


function val_02() {
  var dropDownValue = document.getElementById("drop-down2").value;
  var x = document.getElementById('input2');
  var dropDown = document.getElementById("drop-down2");
  var inputArea = document.getElementById('input_area2')

  try {
    var selectCar = document.getElementById('select-stands2')
    var select = document.getElementById(`select-financeiras2`)
    var estado = document.getElementById('dropDownEstado2')
  }
  finally {

      if(inputArea.contains(select))
      {
        select.style.display = 'none'
      }
      if(inputArea.contains(estado)) {
        estado.style.display = 'none'
      }
      if(inputArea.contains(selectCar)){
        selectCar.style.display = 'none'
      }


  }



  switch(dropDownValue) {
    case 'Nif':

    
      if(document.getElementById('inputDataFim3'))  {
        document.getElementById('inputDataFim3').style.display = 'none'
      }

      x.style.display = 'block'
      x.value = ''
      x.removeAttribute('type')
      x.setAttribute('type', 'number')
        




      function addEventListenerMaxLengthNif() {
        if (x.value.length > 9) 
        {
          x.value = x.value.slice(0,9); 
        } 
    }
      x.addEventListener('input', addEventListenerMaxLengthNif)
      dropDown.addEventListener('change', function removeaddEventListenerMaxLengthNif (event) {   
        console.log(inputArea)
        x.removeEventListener('input', addEventListenerMaxLengthNif)

        dropDown.removeEventListener('change', removeaddEventListenerMaxLengthNif )  
      });
      break;





    case 'Data':

      x.style.display = 'block'
      x.removeAttribute('type')



      x.value = dataAtualFormatada()
      if(!document.getElementById('inputDataFim3')){
        inputDataFim = document.createElement('input')
        inputDataFim.setAttribute("class","form-control")
        inputDataFim.setAttribute("ID",`inputDataFim3`)


        inputDataFim.value = dataAtualFormatada()
        inputArea.appendChild(inputDataFim)
        }
        else {
          document.getElementById('inputDataFim3').style.display = 'block'
        }



      
      break;
    case 'Nome':

      if(document.getElementById('inputDataFim3'))  {
        document.getElementById('inputDataFim3').style.display = 'none'
      }

      x.style.display = 'block'
      x.value = ''
      x.removeAttribute('type')
      x.setAttribute('type', 'text')
      break;



    case 'Stand':

      if(document.getElementById('inputDataFim3'))  {
        document.getElementById('inputDataFim3').style.display = 'none'
      }

      x.style.display = 'none'
      x.value = ''
      x.removeAttribute('type')
      x.setAttribute('type', 'text')
      if(!inputArea.contains(selectCar)) {
        getStands(inputArea, 2)
      }
      else {
        selectCar.style.display = 'block'
      }
      break;

  }
  
}

function dataAtualFormatada(){
  var data = new Date(),
      dia  = data.getDate().toString(),
      diaF = (dia.length == 1) ? '0'+ dia : dia,
      mes  = (data.getMonth()+1).toString(), //+1 pois no getMonth Janeiro começa com zero.
      mesF = (mes.length == 1) ? '0'+ mes : mes,
      anoF = data.getFullYear();
  return diaF+"/"+mesF+"/"+anoF;
}
function dataVerification() {



var regex = new RegExp ("^(3[01]|[12][0-9]|0[1-9])/(1[0-2]|0[1-9])/[0-9]{4}$")

  var dropDown01 = document.getElementById('drop-down')

  
    if(dropDown01.value == 'Data')  {

    x1 = document.getElementById('input0')
    x2 = document.getElementById('inputDataFim1')
   

  

  
      if (!x1.value.match(regex) || !x2.value.match(regex)) {

       alert('Insira uma data válida no seguinte formato: dia/mês/ano')
      x1.value = dataAtualFormatada()
      x2.value = dataAtualFormatada()
      
      return false
      }

    
      
    
    }


    if(countDropDown == 1) {
      var dropDown02 = document.getElementById('drop-down1')
      if(dropDown02.value == 'Data') {
      x3 = document.getElementById('input1')
      x4 = document.getElementById('inputDataFim2')

      if (!x3.value.match(regex) || !x4.value.match(regex)) {

        alert('Insira uma data válida no seguinte formato: dia/mês/ano')
       x3.value = dataAtualFormatada()
       x4.value = dataAtualFormatada()
       
       return false
       }




      }



    }

    if(countDropDown == 2) {
      var dropDown03 = document.getElementById('drop-down2')
      if(dropDown03.value == 'Data') {
      x5 = document.getElementById('input2')
      x6 = document.getElementById('inputDataFim3')

      if (!x5.value.match(regex) || !x6.value.match(regex)) {

        alert('Insira uma data válida no seguinte formato: dia/mês/ano')
       x5.value = dataAtualFormatada()
       x6.value = dataAtualFormatada()
       
       return false
       }




      }



    }
   
return true


}

function getData() {





if(dataVerification()) {


try{

  c = document.getElementById('content')
  c.innerHTML = ''



}
finally {


}
controlInsert = 0
console.log(filterParams())
    const url = 'http://localhost:3000/filters'
    axios.post(url, filterParams())
    .then(resp => {




      
      


          var table = document.createElement('table')
          table.setAttribute("class", "table table-striped")
          var thead = document.createElement("thead")
          var trColumns = document.createElement("tr")
          trColumns.setAttribute('id', 'trcolumns')
          thead.appendChild(trColumns)
          var columns = ["Proposta", "Data", "Nome Cliente", "NIF", "Stand","","",""]
          columns.forEach( element => {
            var td = document.createElement("td")
            td.innerHTML = element
            trColumns.appendChild(td)
          }
            )
           
            table.appendChild(thead)
            var x = document.getElementById("content")
           
            x.appendChild(table)
            var tbody = document.createElement("tbody")
            tbody.setAttribute('class', 'tbody')
            for(i = 0; i < resp.data[0].length; i++) {
                
                var tr = document.createElement("tr")
                tr.setAttribute('id', `tr${i}`)
  
                
               


                var td1 = document.createElement("td")
                var td2 = document.createElement("td")
                var td3 = document.createElement("td")
                var td4 = document.createElement("td")
                var td5 = document.createElement("td")
                var td6 = document.createElement("td")
                var td7 = document.createElement("td")
                var td8 = document.createElement("td")
                td1.innerHTML = resp.data[0][i].Proposta
                td2.innerHTML = resp.data[0][i].Data
                td3.innerHTML = resp.data[0][i].NomeCliente
                td4.innerHTML = resp.data[0][i].NIF
                td5.innerHTML = resp.data[0][i].Stand
                td6.innerHTML = '<button  onclick="editProp(this)" class="button">   <i class="fas fa-edit">       </i></button>'
                td7.innerHTML = '<button onclick="deleteProp(this)" class = "button">  <i class="fas fa-trash-alt">   </i></button>'  
               


                var buttonDetails = document.createElement('button')
                buttonDetails.setAttribute('onclick', `moreInfo(getElementById('tr${i}'))`) 
                buttonDetails.setAttribute('class', 'button')
                var iButtonDetails = document.createElement('i')
                iButtonDetails.setAttribute('class', 'far fa-caret-square-right')
                buttonDetails.appendChild(iButtonDetails)
                td8.appendChild(buttonDetails)
                


                tr.appendChild(td1)
                tr.appendChild(td2)
                tr.appendChild(td3)
                tr.appendChild(td4)
                tr.appendChild(td5)
                tr.appendChild(td6)
                tr.appendChild(td7)
                tr.appendChild(td8)

                tbody.appendChild(tr)
                table.appendChild(tbody)
  

              


            }
          



       
        
    })}
}


function getStands(inputArea, number) {
  const url = 'http://localhost:3000/stands'
  axios(url).then(resp => {

    var select = document.createElement('select')
    select.setAttribute('class', 'custom-select')
    select.setAttribute('id', `select-stands${number}`)

    for (i = 0; i < resp.data.length; i++)
    {
      var option = document.createElement('option')
      option.innerHTML = resp.data[i].StandNome
      option.value = resp.data[i].StandNome
   
      select.appendChild(option)


    }
    for (i = 0; i < select.length; i++) {
  
      
      if(select.options[i].innerHTML == inputArea.innerHTML) {
        inputArea.innerHTML = ""
        select.options[i].selected = true
  
        
      }
    }
    inputArea.appendChild(select)



  })

  
}

function filterParams() {
  
  var filterData = []

  try{
    var dropDown1 = document.getElementById('drop-down1')
    var dropDown2 = document.getElementById('drop-down2')
    var inputValue1 = document.getElementById('input1')
    var inputValue2 = document.getElementById('input2')
    var inputDataFim1 = document.getElementById('inputDataFim1')
    var inputDataFim2 = document.getElementById('inputDataFim2')
    var inputDataFim3 = document.getElementById('inputDataFim3')
  }
  finally {
    var dropDown = document.getElementById('drop-down')
    var inputValue = document.getElementById('input0')
  }


 

  



  
  switch(dropDown.value){
    case 'Nome':
    filterData.push({filter_01: {
      Value: 'Nome',
      Filter: `${inputValue.value}`
    }})

    break;
    case 'Nif':
    filterData.push({filter_01: {
        Value: 'Nif',
        Filter: `${inputValue.value}`
      }})

    break;



    case 'Stand':
      var dropDownStandValue  = document.getElementById('select-stands0').value

      filterData.push( {filter_01: {
        Value: 'Stand',
        Filter: `${dropDownStandValue}`
      }})

    break;
    case 'Data':

      filterData.push( {filter_01: {
        Value: "Data",
        Filter: [
          {Value: 'DataInicio', Filter: `${inputValue.value}`},
          {Value: 'DataFim', Filter: `${inputDataFim1.value}`}
        ]}})




    break;

    default:
      filterData.push( {filter_01: {
        Value: Null,
        Filter: Null
      }})


  
  }
  if(dropDown1) {
  switch(dropDown1.value){
    case 'Nome':
    filterData.push({filter_02: {
      Value: 'Nome',
      Filter: `${inputValue1.value}`
    }})

    break;
    case 'Nif':
    filterData.push({filter_02: {
        Value: 'Nif',
        Filter: `${inputValue1.value}`
      }})

    break;

    
    case 'Stand':
      var dropDownStandValue  = document.getElementById('select-stands1').value

      filterData.push( {filter_02: {
        Value: 'Stand',
        Filter: `${dropDownStandValue}`
      }})

    break;
    case 'Data':

      filterData.push( {filter_02: {
        Value: 'Data',
        Filter: [
          {Value: 'DataInicio', Filter: `${inputValue1.value}`},
          {Value: 'DataFim', Filter: `${inputDataFim2.value}`}
        ]}})



    break;

    default:
      filterData.push( {filter_02: {
        Value: Null,
        Filter: Null
      }})


  
  }
}
  if(dropDown2){

  switch(dropDown2.value){
    case 'Nome':
    filterData.push({filter_03: {
      Value: 'Nome',
      Filter: `${inputValue2.value}`
    }})

    break;
    case 'Nif':
    filterData.push({filter_03: {
        Value: 'Nif',
        Filter: `${inputValue2.value}`
      }})

    break;


    case 'Stand':
      var dropDownStandValue  = document.getElementById('select-stands2').value

      filterData.push( {filter_03: {
        Value: 'Stand',
        Filter: `${dropDownStandValue}`
      }})

    break;
    case 'Data':

      filterData.push( {filter_03: {
        Value: 'Data',
        Filter: [
          {Value: 'DataInicio', Filter: `${inputValue2.value}`},
          {Value: 'DataFim', Filter: `${inputDataFim3.value}`}
        ]}})

    break;

    default:
      filterData.push( {filter_03: {
        Value: Null,
        Filter: Null
      }})


  
  }
}






  return filterData




}


function moreInfo (element){
console.log(element)
  if(controlInsert > 0){
    return  alert('Deve terminar ou anular a edição em curso')
  }
  elementFather = element
  PropostaIDMoreDetail = element.children[0].innerHTML
  axios.post('http://localhost:3000/PropFin', propFinParams(element))
  .then(resp => {


  
    
    document.getElementById("content").className += " modal-open"
    document.getElementById("myModal").className += " modal-open"
    


    
    var data = resp.data
    console.log(data)
   
      

      
    
    var modalDiv = document.getElementById('content-propdetail')
    

    var columns01 = ['NrProposta', 'Financeira' , 'Funcionário', 'Valor', 'Prazo', 'Rent.' , 'Estado' , 'Observações', '','','']
    var table = document.createElement('table')
          table.setAttribute("class", "table table-striped")
          table.setAttribute("id", "table-modal")
          var thead = document.createElement("thead")
          thead.setAttribute('id', 'theadMoreDetail')
          var trColumns = document.createElement("tr")
          thead.appendChild(trColumns)
      columns01.forEach(element => {
        var td = document.createElement("td")
        td.innerHTML = element
        trColumns.appendChild(td)

        
      })
      table.appendChild(thead)
      var tbody = document.createElement('tbody')
      tbody.setAttribute('class', 'tbody')
    
      data[0].forEach(element => {
        console.log(element)

      var tr = document.createElement("tr")


      var td1 = document.createElement("td")   
      var td2 = document.createElement("td")
      var td3 = document.createElement("td")
      var td4 = document.createElement("td")
      var td5 = document.createElement("td")
      var td6 = document.createElement("td")
      var td7 = document.createElement("td")
      var td8 = document.createElement("td")
      var td9 = document.createElement("td")
      var td10 = document.createElement("td")
      var td11 = document.createElement("td")
      td1.innerHTML = element.NrProposta
      td2.innerHTML = element.FinanceiraNome
      td3.innerHTML = element.NomeFuncionario
      td4.innerHTML = element.Valor
      td5.innerHTML = element.Prazo
      td6.innerHTML = element.TaxaRentabilidade
      td7.innerHTML = element.Estado
      td8.innerHTML = element.Observacoes
      td9.innerHTML = '<button  onclick="edit(this)" class="button">            <i class="fas fa-edit">       </i></button>'
      td10.innerHTML = '<button onclick="deleteRecord(this)" class = "button">  <i class="fas fa-trash-alt">   </i></button>'  
      td11.innerHTML = '<button onclick="getHistory(this)" class = "button">  <i class="fas fa-history"></i>   </i></button>'  

      
      
 

      tr.appendChild(td1)
      tr.appendChild(td2)
      tr.appendChild(td3)
      tr.appendChild(td4)
      tr.appendChild(td5)
      tr.appendChild(td6)
      tr.appendChild(td7)
      tr.appendChild(td8)
      tr.appendChild(td9)
      tr.appendChild(td10)
      tr.appendChild(td11)
      tbody.appendChild(tr)
     
      



    
    
    });

    table.appendChild(tbody)

    modalDiv.appendChild(table)
    addButtonRecord()
   
      
      
  

  })



var modal = document.getElementById("myModal");

modal.style.display = "block";


}

function addButtonRecord() {

  getDivContentPropDetail = document.getElementById('modal-content');
  createDivForButton = document.createElement('div');
  buttonAddRecord = document.createElement('button');
  createDivForButton.setAttribute('id', 'divButtonAddRecord');
  buttonAddRecord.setAttribute('class', 'btn btn-primary');
  buttonAddRecord.setAttribute('onclick', 'addRecord()');
  createDivForButton.appendChild(buttonAddRecord);
  buttonAddRecord.innerHTML = 'Adicionar Registo';
  getDivContentPropDetail.appendChild(createDivForButton);

}

function propFinParams(element) {
  params = {}
  console.log(element.children[0].innerHTML)
  var propostaID = PropostaIDMoreDetail
  params = {propostaID: propostaID}
  return params
}

function edit(element) {

  

  if(controlUpdate == 0){
    controlUpdate = 1

  tr = element.parentElement.parentElement
  
  
  var td0 = tr.children[0]
  var td1 = tr.children[1]
  var td2 = tr.children[2]
  var td6 = tr.children[6]
  
  

  tr.setAttribute("contenteditable", 'true')
  td0.setAttribute("contenteditable", 'false')
  td1.setAttribute("contenteditable", 'false')
  td2.setAttribute("contenteditable", 'false')
  td6.setAttribute("contenteditable", 'false')
  
  element.parentElement.style.display = 'none'
  element.parentElement.nextSibling.style.display = 'none'
  element.parentElement.nextSibling.nextSibling.style.display = 'none'

  checkTd = document.createElement("td")
  cancelTd = document.createElement("td")
  cancelTd.setAttribute('id', 'cancelbutton')
  checkTd.setAttribute('id', 'updatebutton')
  checkTd.innerHTML = '<button href="" onclick="update(this.parentElement.parentElement)" class="button"><i class="fas fa-check-square"></i></button>'
  cancelTd.innerHTML = '<button href="" onclick="cancelUpdate(this.parentElement.parentElement)" class="button"><i class="fas fa-times"></i></button>'
  tr.appendChild(checkTd)
  tr.appendChild(cancelTd)
  
  getFinanceiras(td1)

  var tdEstado = tr.children[6]

    var listaEstados = ['Financiado', 'Aprovado', 'Analise', 'Recusado', 'Martelo']
    var tdEstadoDropDown = document.createElement('select')
    tdEstadoDropDown.setAttribute('class', 'custom-select')
    tdEstadoDropDown.setAttribute('id', `change-estado`)
   
    for (i = 0; i < listaEstados.length; i++)
    {
      var option = document.createElement('option')
      option.innerHTML = listaEstados[i]
      option.value = listaEstados[i]
      if (tdEstado.innerHTML == listaEstados[i]){
        option.selected = true
      }
      tdEstadoDropDown.appendChild(option)


    }


    tdEstado.innerHTML = ""
    tdEstado.appendChild(tdEstadoDropDown)


        
      
        userLS = JSON.parse(localStorage.__user)
        tr.children[2].innerHTML = userLS.name





    
    


    
      // Funcionario MaxLenght
    tr.addEventListener('input', inputverification)
      
    tr.addEventListener('paste', inputverification)
     

      
    
    


    



 

  
  

  return tr


  }
  else {
    alert('Deve terminar ou anular a edição em curso')
  }
}

function inputverification(e) {
      


  // Input NrPrposta lenght verification
  if (tr.children[0].innerHTML.length > 10) {
    tr.children[0].innerHTML = tr.children[0].innerHTML.slice(-9)
  }  
       // Input NrProposta number verification
  if (isNaN(tr.children[0].innerHTML)) {
    var inputOriginalNr = tr.children[0].innerHTML
    var inputCorrigidoNr = ""
      for(i=0; i < inputOriginalNr.length; i++) {
      
      if(isNaN(inputOriginalNr[i])) {

      }
      else {
        inputCorrigidoNr += inputOriginalNr[i]
      }
      tr.children[0].innerHTML = inputCorrigidoNr
      
     
   
  }  
  }



// Input valor lenght verification
if (tr.children[3].innerHTML.length > 9) {
  tr.children[3].innerHTML = tr.children[3].innerHTML.slice(-9)
}  


// Input valor number verification
if (isNaN(tr.children[3].innerHTML)) {
  var inputOriginalValor = tr.children[3].innerHTML
  var inputCorrigidoValor = ""
    for(i=0; i < inputOriginalValor.length; i++) {
    
    if(isNaN(inputOriginalValor[i])) {

    }
    else {
      inputCorrigidoValor += inputOriginalValor[i]
    }
    tr.children[3].innerHTML = inputCorrigidoValor
    
   
 
}  
}

//Input Prazo lenght verification
if (tr.children[4].innerHTML.length > 4) {
  tr.children[4].innerHTML = tr.children[4].innerHTML.slice(-4)
}  
//Input Prazo number verification
if (isNaN(tr.children[4].innerHTML)) {
  var inputOriginalPrazo = tr.children[4].innerHTML
  var inputCorrigidoPrazo = ""
    for(i=0; i < inputOriginalPrazo.length; i++) {
    
    if(isNaN(inputOriginalPrazo[i])) {

    }
    else {
      inputCorrigidoPrazo += inputOriginalPrazo[i]
    }
    tr.children[4].innerHTML = inputCorrigidoPrazo
    
   
 
}}  


  //Input Rent lenght verification
  
  if (tr.children[5].innerHTML.length > 10) {
    tr.children[5].innerHTML = tr.children[5].innerHTML.slice(-10)
  }  

//Input Rent number/dot verification
  var rgx = new RegExp (/^[0-9]*\.?[0-9]*$/)
  var result = rgx.test(tr.children[5].innerHTML)
  if(result == true) {
  
  }
 
  else {

  var inputOriginalRent = tr.children[5].innerHTML
  var inputCorrigidoRent = ""
    for(i=0; i < inputOriginalRent.length; i++) {
    
    if(isNaN(inputOriginalRent[i])) {

    }
    else {
      inputCorrigidoRent += inputOriginalRent[i]
    }
    tr.children[5].innerHTML = inputCorrigidoRent
    }

 

 }

 if (tr.children[7].innerHTML.length > 200) {
  tr.children[7].innerHTML = tr.children[7].innerHTML.slice(-200)
}  










}

function getFuncionario(inputArea) {
  const url = 'http://localhost:3000/funcionarios'
  axios(url).then(resp => {

    

    
    var select = document.createElement('select')
    select.setAttribute('class', 'custom-select')
    select.setAttribute('id', `select-funcionario`)

    for (i = 0; i < resp.data.length; i++)
    {
      var option = document.createElement('option')
      option.innerHTML = resp.data[i].NomeFuncionario
      option.value = resp.data[i].NomeFuncionario
      select.appendChild(option)



    }
    for (i = 0; i < select.length; i++) {
  
      
      if(select.options[i].innerHTML == inputArea.innerHTML) {
        inputArea.innerHTML = ""
        select.options[i].selected = true
  
        
      }
    }
    inputArea.appendChild(select)
    


  })

  
}

//Update
function updateParams(element) {
  
  source = element.children
  params = {}
  params = {
            NrProposta : source[0].innerHTML,
            Financeira : source[1].children[0].value,
            Funcionario : source[2].innerHTML,
            Valor : source[3].innerHTML,
            Prazo : source[4].innerHTML,
            Rent : source[5].innerHTML,
            Estado : source[6].children[0].value,
            Obs : source[7].innerHTML

              
  
  
  }
  return(params)
 

  

}

function confirmUpdate() {
  var answer = confirm("Tem a certeza que deseja fazer estas alterações?")

  console.log("anda")

  return answer

}

function update(element) {
 



if (confirmUpdate() == true) {
    NrProposta =  element.children[0].innerHTML
    params = {
      NrProposta : NrProposta
    }
  axios.post('http://localhost:3000/getPropfin',params)
  .then(resp => {  
    element_1 = updateParams(element)
    data = resp.data[0][0]
    console.log(data)
    console.log(element_1)

    console.log(data.FinanceiraNome)
    console.log( element_1.Financeira)

    console.log(data.Valor)
    console.log( parseInt(element_1.Valor))

    console.log(data.Prazo)
    console.log(  parseInt(element_1.Prazo))



    console.log(data.Estado)
    console.log( element_1.Estado)

    console.log(data.TaxaRentabilidade)
    console.log(  parseFloat(element_1.Rent).toFixed(2))

    console.log(data.Observacoes)
    console.log( element_1.Obs)

      if(
        data.FinanceiraNome != element_1.Financeira
        ||
        data.Valor  != parseInt(element_1.Valor)
        ||
        data.Prazo != parseInt(element_1.Prazo)
        ||
        data.TaxaRentabilidade  != parseFloat(element_1.Rent).toFixed(2)
        ||
        data.Estado != element_1.Estado
        ||
        data.Observacoes != element_1.Obs
      ){
      
        axios.post('http://localhost:3000/update', updateParams(element))
        .then(resp => {
          axios.post('http://localhost:3000/afterupdate', updateParams(element))
          .then(resp => {
            
            data = resp.data[0][0]
        
            element.children[0].innerHTML = data.NrProposta
            element.children[1].innerHTML = data.FinanceiraNome
            element.children[2].innerHTML = data.NomeFuncionario
            element.children[3].innerHTML = data.Valor
            element.children[4].innerHTML = data.Prazo
            element.children[5].innerHTML = data.TaxaRentabilidade
            element.children[6].innerHTML = data.Estado
            element.children[7].innerHTML = data.Observacoes
            element.children[8].style.display = "table-cell"
            element.children[9].style.display = "table-cell"
            element.children[10].style.display = "table-cell"
            document.getElementById('updatebutton').remove()
            document.getElementById('cancelbutton').remove()
    
            element.setAttribute("contenteditable", 'false')
    
     
            controlUpdate = 0
    
            
            
    
    
          }
        )
    
        })

      }else {
        cancelUpdate(element)
      }

})
} 


   
  else {
    
  }
  
  



  
}



function deleteParams(element) {
  var source = element.parentElement.parentElement
  
  params = {NrProposta : source.children[0].innerHTML

  }
  return (params)
  
}


function deleteRecord(element) {

if(controlUpdate == 0){
  var answer = window.confirm('Tem a certeza que pretende eliminar? Esta ação é irreversivel')
  if(answer) {

  
axios.post('http://localhost:3000/deleteRecord', deleteParams(element))
.then(a => {
  axios.post('http://localhost:3000/PropFin', propFinParams(element))
  .then(resp => {
    source = resp.data
    console.log(source)
    resetMoreInfo(source)

  })



  

})}}
else{
  alert('Deve terminar ou anular a edição em curso')
}
}


function resetMoreInfo(data) {
  document.getElementById('content-propdetail').innerHTML = " "
 
  
  console.log('1')

  var columns01 = ['NrProposta', 'Financeira' , 'Funcionário', 'Valor', 'Prazo', 'Rent.' , 'Estado' , 'Observações', '','', '']
    var table = document.createElement('table')
          table.setAttribute("class", "table table-striped")
          table.setAttribute("id", "table-modal")
          var thead = document.createElement("thead")
          thead.setAttribute('id', 'theadMoreDetail')
          var trColumns = document.createElement("tr")
          thead.appendChild(trColumns)
      columns01.forEach(element => {
        var td = document.createElement("td")
        td.innerHTML = element
        trColumns.appendChild(td)

        console.log('2')
      })
      table.appendChild(thead)
      var tbody = document.createElement('tbody')
      tbody.setAttribute('class', 'tbody')
      console.log('3')
  data[0].forEach(element => {
    console.log(element)
    console.log('4')
  var tr = document.createElement("tr")

  var td1 = document.createElement("td")   
  var td2 = document.createElement("td")
  var td3 = document.createElement("td")
  var td4 = document.createElement("td")
  var td5 = document.createElement("td")
  var td6 = document.createElement("td")
  var td7 = document.createElement("td")
  var td8 = document.createElement("td")
  var td9 = document.createElement("td")
  var td10 = document.createElement("td")
  var td11 = document.createElement("td")
  td1.innerHTML = element.NrProposta
  td2.innerHTML = element.FinanceiraNome
  td3.innerHTML = element.NomeFuncionario
  td4.innerHTML = element.Valor
  td5.innerHTML = element.Prazo
  td6.innerHTML = element.TaxaRentabilidade
  td7.innerHTML = element.Estado
  td8.innerHTML = element.Observacoes
  td9.innerHTML = '<button  onclick="edit(this)" class="button">            <i class="fas fa-edit">       </i></button>'
  td10.innerHTML = '<button onclick="deleteRecord(this)" class = "button">  <i class="fas fa-trash-alt">   </i></button>'  
  td11.innerHTML =  '<button onclick="getHistory(this)" class = "button"> <i class="fas fa-history"></i>   </i></button>'
  
  


  tr.appendChild(td1)
  tr.appendChild(td2)
  tr.appendChild(td3)
  tr.appendChild(td4)
  tr.appendChild(td5)
  tr.appendChild(td6)
  tr.appendChild(td7)
  tr.appendChild(td8)
  tr.appendChild(td9)
  tr.appendChild(td10)
  tr.appendChild(td11)
  tbody.appendChild(tr)




  
})


table.appendChild(tbody)
modalDiv = document.getElementById('content-propdetail')
console.log(modalDiv)
modalDiv.appendChild(table)
console.log(modalDiv)
 }


function closeModal() {
  console.log('FECHAR MODAL')
  
  if(  document.getElementById('backToMoreDetail')){
    document.getElementById('backToMoreDetail').remove()
  }
  var modal = document.getElementById("myModal");
  modal.style.display = "none";
  document.getElementById('content-propdetail').innerHTML = " "
  document.getElementById('divButtonAddRecord').remove()
  controlUpdate = 0
  document.getElementById("content").classList.remove("modal-open")
  document.getElementById("myModal").classList.remove("modal-open")
  
}


function cancelUpdate(element) {

  axios.post('http://localhost:3000/afterupdate', updateParams(element))
      .then(resp => {
  
        data = resp.data[0][0]
   
        element.children[0].innerHTML = data.NrProposta
        element.children[1].innerHTML = data.FinanceiraNome
        element.children[2].innerHTML = data.NomeFuncionario
        element.children[3].innerHTML = data.Valor
        element.children[4].innerHTML = data.Prazo
        element.children[5].innerHTML = data.TaxaRentabilidade
        element.children[6].innerHTML = data.Estado
        element.children[7].innerHTML = data.Observacoes
        element.children[8].style.display = "table-cell"
        element.children[9].style.display = "table-cell"
        element.children[10].style.display = "table-cell"
        document.getElementById('updatebutton').remove()
        document.getElementById('cancelbutton').remove()

        element.setAttribute("contenteditable", 'false')

 
        controlUpdate = 0
        


  
}) 
}


function addRecord() { 

  if(controlUpdate == 0) {

  
 controlUpdate = 1
 tableModal = document.getElementById('table-modal')

 tr = document.createElement('tr')
 thead = document.getElementById('theadMoreDetail')
 theadTd = thead.children[0]
 tr.setAttribute("contenteditable", 'true')
 

 
  for(i = 0; i < theadTd.children.length; i++){
    console.log(i)

    td = document.createElement('td')
    tr.appendChild(td)
    
    if(tr.children.length == 3) {
 

      //getFuncionario(tr.children[2]) 
      userLS = JSON.parse(localStorage.__user)
      tr.children[2].innerHTML = userLS.name
      tr.children[2].setAttribute("contenteditable", 'false')
 

      

    }
    if((tr.children.length == 7) ){

        var listaEstados = ['Financiado', 'Aprovado', 'Analise', 'Recusado', 'Martelo']
        var tdEstadoDropDown = document.createElement('select')
        tdEstadoDropDown.setAttribute('class', 'custom-select')
      
        for (x = 0; x < listaEstados.length; x++)
        {
                var option = document.createElement('option')
                option.innerHTML = listaEstados[x]
                option.value = listaEstados[x]
                tdEstadoDropDown.appendChild(option)

        }
        tr.children[6].appendChild(tdEstadoDropDown)
        tr.children[6].setAttribute("contenteditable", 'false')
 
    
  }
  tableModal.children[1].appendChild(tr)
}





getFinanceiras(tr.children[1])



tr.children[8].innerHTML = '<button href="" onclick="insert(this.parentElement.parentElement)" id="insertButton" class="button"><i class="far fa-plus-square"></i></button>'
tr.children[9].innerHTML = '<button href="" onclick="cancelInsert(this.parentElement.parentElement)" id="cancelInsertButton" class="button"><i class="fas fa-times"></i></button>'

tr.addEventListener('input', inputverification)
      
tr.addEventListener('paste', inputverification)
 

 

gotoBottom(tableModal.parentElement)

}
else {
  alert('Deve terminar ou anular a edição em curso')
}}


function getFinanceiras(element) {
  const url = 'http://localhost:3000/financeiras'
  axios(url)
  .then(resp => {

 
    
    var selectt = document.createElement('select')
    selectt.setAttribute('class', 'custom-select')
    selectt.setAttribute('id', `select-financeira`)

    data = resp.data
    for(y = 0; y < data.length; y++){

     

 
      var option = document.createElement('option')
      option.innerHTML = resp.data[y].FinanceiraNome
      option.value = resp.data[y].FinanceiraNome
      try {
        valorDefenido = element.innerHTML
        if (valorDefenido == resp.data[y].FinanceiraNome){
          option.selected = true
        

        }
      }
      catch {
  
      }




      selectt.appendChild(option)



    

    }

    element.innerHTML = ""
    element.appendChild(selectt)
    element.setAttribute("contenteditable", 'false')

})



}


function gotoBottom(element){
  
  element.scrollTop = element.scrollHeight - element.clientHeight;
}

function insertParams(element) {
  userLS = JSON.parse(localStorage.__user)
 console.log(userLS.name)
  source = element.children
  params = { PropostaID : PropostaIDMoreDetail,
            NrProposta : source[0].innerHTML,
            Financeira : source[1].children[0].value,
            Funcionario : userLS.name, 
            Valor : source[3].innerHTML,
            Prazo : source[4].innerHTML,
            Rent : source[5].innerHTML,
            Estado : source[6].children[0].value,
            Obs : source[7].innerHTML

              
  
  
  }

  return params


}

function insert(element) {
 

  console.log(element)

  try {
    axios.post('http://localhost:3000/insert', insertParams(element))
    .then(resp => {
      console.log(resp.data)

     if(resp.data[0] != undefined ){

        return window.alert('Este numero de proposta já existe')
     }
     
  
     controlUpdate = 0

  
  
  
      axios.post('http://localhost:3000/PropFin', propFinParams(element))
      .then(resp => {
        source = resp.data
        resetMoreInfo(source)
    
      })
  
    }) 

  }catch(e){
    console.log(resp.data)
  }

  








}

function cancelInsert(element)  {
  
  console.log(controlUpdate)
  controlUpdate = 0
  console.log(controlUpdate)
  element.remove()

  

}


function getHistory(element){

params = {
  NrProposta : element.parentElement.parentElement.children[0].innerHTML
}
console.log(params)

 var modalDiv = document.getElementById('content-propdetail')
 var modalDivParent =  document.getElementById('modal-content')
 var buttonBack = document.createElement('button')
 buttonBack.setAttribute('onclick', 'backToMoreDetail(this)')
 buttonBack.setAttribute('id', 'backToMoreDetail')
 buttonBack.setAttribute('class', 'button')
 buttonBack.innerHTML = '<i class="fas fa-arrow-left"></i>'
 buttonBack.style.display = 'inline-block'
 modalDivParent.insertBefore( buttonBack, modalDiv)





 modalDiv.innerHTML = ""

 axios.post('http://localhost:3000/getLastAddPropfin', params)
 .then(resp => { 
 
  data = resp.data
  console.log(data)
  var columns01 = [ 'Financeira' , 'Funcionário', 'Valor', 'Prazo', 'Rent.' , 'Estado' , 'Observações', 'Data de Inicio','Data de Fim']
  var table = document.createElement('table')
        table.setAttribute("class", "table table-striped history")
        table.setAttribute("id", "table-modal")
        var thead = document.createElement("thead")
        thead.setAttribute('id', 'theadMoreDetail')
        var trColumns = document.createElement("tr")
        thead.appendChild(trColumns)
    columns01.forEach(element => {
      var td = document.createElement("td")
      td.innerHTML = element
      trColumns.appendChild(td)

      
    })
    table.appendChild(thead)
    var tbody = document.createElement('tbody')
    tbody.setAttribute('class', 'tbody')
  
    data[0].forEach(element => {
      console.log(element)

    var tr = document.createElement("tr")



    var td2 = document.createElement("td")
    var td3 = document.createElement("td")
    var td4 = document.createElement("td")
    var td5 = document.createElement("td")
    var td6 = document.createElement("td")
    var td7 = document.createElement("td")
    var td8 = document.createElement("td")
    var td9 = document.createElement("td")
    var td10 = document.createElement("td")

    
    td2.innerHTML = element.FinanceiraNome
    td3.innerHTML = element.NomeFuncionario
    td4.innerHTML = element.Valor
    td5.innerHTML = element.Prazo
    td6.innerHTML = element.TaxaRentabilidade
    td7.innerHTML = element.Estado
    td8.innerHTML = element.Observacoes
    td9.innerHTML = element.startDate
    td10.innerHTML = element.finishDate

    
    



    tr.appendChild(td2)
    tr.appendChild(td3)
    tr.appendChild(td4)
    tr.appendChild(td5)
    tr.appendChild(td6)
    tr.appendChild(td7)
    tr.appendChild(td8)
    tr.appendChild(td9)
    tr.appendChild(td10)

    tbody.appendChild(tr)
   
    



  
  
  });

  table.appendChild(tbody)

  modalDiv.appendChild(table)




 })





  



}

function backToMoreDetail(element){

  var modalDiv = document.getElementById('content-propdetail')
  var buttonBack = document.getElementById('backToMoreDetail')
  buttonBack.remove()


  
  axios.post('http://localhost:3000/PropFin', propFinParams(element))
  .then(resp => {

      data = resp.data
    modalDiv.innerHTML = " "
 
  
    console.log('1')
  
    var columns01 = ['NrProposta', 'Financeira' , 'Funcionário', 'Valor', 'Prazo', 'Rent.' , 'Estado' , 'Observações', '','', '']
      var table = document.createElement('table')
            table.setAttribute("class", "table table-striped")
            table.setAttribute("id", "table-modal")
            var thead = document.createElement("thead")
            thead.setAttribute('id', 'theadMoreDetail')
            var trColumns = document.createElement("tr")
            thead.appendChild(trColumns)
        columns01.forEach(element => {
          var td = document.createElement("td")
          td.innerHTML = element
          trColumns.appendChild(td)
  
          console.log('2')
        })
        table.appendChild(thead)
        var tbody = document.createElement('tbody')
        tbody.setAttribute('class', 'tbody')
        console.log('3')
    data[0].forEach(element => {
      console.log(element)
      console.log('4')
    var tr = document.createElement("tr")
  
    var td1 = document.createElement("td")   
    var td2 = document.createElement("td")
    var td3 = document.createElement("td")
    var td4 = document.createElement("td")
    var td5 = document.createElement("td")
    var td6 = document.createElement("td")
    var td7 = document.createElement("td")
    var td8 = document.createElement("td")
    var td9 = document.createElement("td")
    var td10 = document.createElement("td")
    var td11 = document.createElement("td")
    td1.innerHTML = element.NrProposta
    td2.innerHTML = element.FinanceiraNome
    td3.innerHTML = element.NomeFuncionario
    td4.innerHTML = element.Valor
    td5.innerHTML = element.Prazo
    td6.innerHTML = element.TaxaRentabilidade
    td7.innerHTML = element.Estado
    td8.innerHTML = element.Observacoes
    td9.innerHTML = '<button  onclick="edit(this)" class="button">            <i class="fas fa-edit">       </i></button>'
    td10.innerHTML = '<button onclick="deleteRecord(this)" class = "button">  <i class="fas fa-trash-alt">   </i></button>'  
    td11.innerHTML =  '<button onclick="getHistory(this)" class = "button"> <i class="fas fa-history"></i>   </i></button>'
    
    
  
  
    tr.appendChild(td1)
    tr.appendChild(td2)
    tr.appendChild(td3)
    tr.appendChild(td4)
    tr.appendChild(td5)
    tr.appendChild(td6)
    tr.appendChild(td7)
    tr.appendChild(td8)
    tr.appendChild(td9)
    tr.appendChild(td10)
    tr.appendChild(td11)
    tbody.appendChild(tr)
  
  
  
  
    
  })
  
  
  table.appendChild(tbody)
  modalDiv = document.getElementById('content-propdetail')
  console.log(modalDiv)
  modalDiv.appendChild(table)
  console.log(modalDiv)

  })

}







function addPropRecord(element){
  if(controlInsert > 0) {

    return alert('Deve terminar ou anular a edição em curso')
  }




  else {
    controlInsert = 1
    try{

      c = document.getElementById('content')
      c.innerHTML = ''
    
    
    
    }finally {
  
    }
  
    var table = document.createElement('table')
    table.setAttribute("class", "table table-striped")
    table.setAttribute("id", "insertPropTable")
    var thead = document.createElement("thead")
    thead.setAttribute('id', 'thead')
    var trColumns = document.createElement("tr")
    trColumns.setAttribute('id', 'trcolumns')
    thead.appendChild(trColumns)
    var columns = ["Proposta", "Data", "Nome Cliente", "NIF", "Stand", "", ""]
    columns.forEach( element => {
      var td = document.createElement("td")
      td.innerHTML = element
      trColumns.appendChild(td)
    }
      )
     
      table.appendChild(thead)
      var x = document.getElementById("content")
     
      x.appendChild(table)
      var tbody = document.createElement("tbody")
      tbody.setAttribute('class', 'tbody')
      tbody.setAttribute('id', 'tbody')
   
          
          var tr = document.createElement("tr")
          tr.setAttribute('id', `tr${insertTR}`)
          insertTR++
       
          
         
  
  
          var td1 = document.createElement("td")
          var td2 = document.createElement("td")
          var td3 = document.createElement("td")
          var td4 = document.createElement("td")
          var td5 = document.createElement("td")
    
          var today = new Date();
          var dd = String(today.getDate()).padStart(2, '0');
          var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
          var yyyy = today.getFullYear();
          td1.innerHTML = "Numero Automatico"
          td2.innerHTML = dd + "/" + mm + "/" + yyyy
          td3.innerHTML = ""
  
          td4.innerHTML = ""
          getStands(td5, 0)
  
       
          td2.contentEditable = true
          td3.contentEditable = true
          td4.contentEditable = true
  
          
          tr.appendChild(td1)
          tr.appendChild(td2)
          tr.appendChild(td3)
          tr.appendChild(td4)
          tr.appendChild(td5)
  
    
   checkTd = document.createElement("td")
    cancelTd = document.createElement("td")
    cancelTd.setAttribute('id', 'cancelbButtonProp')
    checkTd.setAttribute('id', 'updateButtonProp')
    checkTd.innerHTML = '<button href="" onclick="insertProp(this.parentElement.parentElement)" class="button"><i class="far fa-plus-square"></i></button>'
    cancelTd.innerHTML = '<button href="" onclick="cancelInsertProp(this.parentElement.parentElement)" class="button"><i class="fas fa-times"></i></button>'
    tr.appendChild(checkTd)
    tr.appendChild(cancelTd)
    tr.addEventListener('keyup', function() {
      eventListenerInsertProp(this)
    
    })
    tbody.appendChild(tr)
         
  
      
    table.appendChild(tbody)


    trButton = document.createElement('tr')
    tdButton = document.createElement('td')
    tdButton.setAttribute('colspan', '7')

    buttonAdd = document.createElement('button')
    buttonAdd.innerHTML = "Adicionar Proposta"
    buttonAdd.setAttribute("class", "btn btn-primary")
    buttonAdd.setAttribute("id", "buttonAddProp")
    buttonAdd.setAttribute('onclick', `addRecordButtonProp(this.parentElement.parentElement.parentElement)`) 

    tdButton.appendChild(buttonAdd)
    trButton.appendChild(tdButton)
     
    table.appendChild(trButton)
  

  }
 
     
}


function addRecordButtonProp(element){
  if(controlInsert > 0) {

    return alert('Deve terminar ou anular a edição em curso')
  }
  controlInsert = 1

  var tr = document.createElement("tr")
  tr.setAttribute('id', `tr${insertTR}`)
  insertTR++

  
 


  var td1 = document.createElement("td")
  var td2 = document.createElement("td")
  var td3 = document.createElement("td")
  var td4 = document.createElement("td")
  var td5 = document.createElement("td")

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();
  td1.innerHTML = "Numero Automatico"
  td2.innerHTML = dd + "/" + mm + "/" + yyyy
  td3.innerHTML = ""

  td4.innerHTML = ""
  getStands(td5, 0)


  td2.contentEditable = true
  td3.contentEditable = true
  td4.contentEditable = true

  
  tr.appendChild(td1)
  tr.appendChild(td2)
  tr.appendChild(td3)
  tr.appendChild(td4)
  tr.appendChild(td5)

    checkTd = document.createElement("td")
    cancelTd = document.createElement("td")
    cancelTd.setAttribute('id', 'cancelbButtonProp')
    checkTd.setAttribute('id', 'updateButtonProp')
    checkTd.innerHTML = '<button href="" onclick="insertProp(this.parentElement.parentElement)" class="button"><i class="far fa-plus-square"></i></button>'
    cancelTd.innerHTML = '<button href="" onclick="cancelInsertProp(this.parentElement.parentElement)" class="button"><i class="fas fa-times"></i></button>'
    tr.appendChild(checkTd)
    tr.appendChild(cancelTd)
    element.children[1].appendChild(tr)


}
function insertPropParams (element){

  params = {
    Data:  element.children[1].innerHTML,
    NomeCliente: element.children[2].innerHTML,
    Nif: element.children[3].innerHTML,
    Stand: element.children[4].children[0].value
    
    
  }

  return params


  
}

function insertProp(element){
  if(insertPropInputVerification(element)){
    controlInsert = 0
    axios.post('http://localhost:3000/insertProp',insertPropParams(element))
    .then(resp => {
      console.log(resp.data)
      
      params =  {
        NrProposta : resp.data[0][0].lastInsertedID
      }
  
      axios.post('http://localhost:3000/getProp', params)
      .then(respo => {
        insertPropChangeState(element, respo)
  
       
      })
  
      })
  }
  else {

  }

  }


 function insertPropChangeState(element, respo){
     
     dataa = respo.data[0][0]
     console.log(dataa)


      
      element.children[0].innerHTML =   dataa.PropostaID,
      element.children[1].innerHTML =   dataa.Data
      element.children[2].innerHTML =   dataa.NomeCliente
      element.children[3].innerHTML =   dataa.NIF
      element.children[4].innerHTML =   dataa.StandNome


     element.children[5].innerHTML = '<button  onclick="editProp(this)" class="button">   <i class="fas fa-edit">       </i></button>'

      element.children[6].innerHTML = '<button onclick="deleteProp(this)" class = "button">  <i class="fas fa-trash-alt">   </i></button>'  

     try{
       console.log( element.children[7])
      element.children[7].style.display = 'block'

     }catch {
      var buttonDetails = document.createElement('button')
      insertTR--
      buttonDetails.setAttribute('onclick', `moreInfo(getElementById('tr${insertTR}'))`)
      insertTR++
      buttonDetails.setAttribute('class', 'button')
      var iButtonDetails = document.createElement('i')
      iButtonDetails.setAttribute('class', 'far fa-caret-square-right')
      buttonDetails.appendChild(iButtonDetails)
      var newTButtonDetails = document.createElement('td')
      newTButtonDetails.appendChild(buttonDetails)
      element.appendChild(newTButtonDetails)

     }

      element.children[0].contentEditable = false
      element.children[1].contentEditable = false
      element.children[2].contentEditable = false
      element.children[3].contentEditable = false
      element.children[4].contentEditable = false
      element.children[5].contentEditable = false
      element.children[6].contentEditable = false
      element.children[7].contentEditable = false
    
     
      if(document.getElementById('trcolumns').children.length < 8){
        tdThead = document.createElement('td')
        document.getElementById('trcolumns').appendChild(tdThead)
      }


   

  
   

   



}

function insertPropInputVerification(element){


  var regex = new RegExp ("^(3[01]|[12][0-9]|0[1-9])/(1[0-2]|0[1-9])/[0-9]{4}$")

  if(!element.children[1].innerHTML.match(regex)){
    return alert('Insira uma data válida no seguinte formato: dia/mês/ano (Ex. 10/10/2020)')
  
  }else if (element.children[2].innerHTML.length > 40 || element.children[2].innerHTML.length == "" ) {
    return alert('Nome vazio ou maior do que permitido')
  }else if (element.children[3].innerHTML.length > 9 ||element.children[3].innerHTML.length < 9 ) {
    return alert('O NIF deve ser composto por 9 algarismos')
  }else {
    return true 
  

  }






}

function eventListenerInsertProp(tr){
console.log(tr)
  if (isNaN(tr.children[3].innerHTML)) {
    var inputOriginalValor = tr.children[3].innerHTML
    var inputCorrigidoValor = ""
      for(i=0; i < inputOriginalValor.length; i++) {
      
      if(isNaN(inputOriginalValor[i])) {
  
      }
      else {
        inputCorrigidoValor += inputOriginalValor[i]
      }
      tr.children[3].innerHTML = inputCorrigidoValor
      
     
   
  }  
  }

  if (tr.children[3].innerHTML.length > 9) {
    tr.children[3].innerHTML = tr.children[3].innerHTML.substr(0, 9)
  }  
  
  if (tr.children[2].innerHTML.length > 45) {
    tr.children[2].innerHTML = tr.children[2].innerHTML.substr(0, 45)
  } 

}


function cancelInsertProp(element) {

  element.remove()
  controlInsert = 0
}
function editProp(element){

  if(controlInsert > 0){
    return  alert('Deve terminar ou anular a edição em curso')
  }
  controlInsert = 1
  tr = element.parentElement.parentElement
  tr.children[1].contentEditable = true
  tr.children[2].contentEditable = true
  tr.children[3].contentEditable = true
  getStands(tr.children[4], 0)
  tr.children[5].innerHTML =  '<button href="" onclick="editPropSend(this.parentElement.parentElement)" class="button"><i class="fas fa-check-square"></i></button>'
  tr.children[6].innerHTML =  '<button href="" onclick="cancelEdit(this.parentElement.parentElement)" class="button"><i class="fas fa-times"></i></button>'
  tr.children[7].style.display = 'none'


  
  
}


function editPropParams(element) {
  params = {
    NrProposta: element.children[0].innerHTML,
    Data: element.children[1].innerHTML,
    NomeCliente: element.children[2].innerHTML,
    Nif: element.children[3].innerHTML,
    StandNome: element.children[4].children[0].value
  }
  return params

}
function editPropSend(element){
 if(insertPropInputVerification(element)) {
  controlInsert = 0

  axios.post('http://localhost:3000/editProp', editPropParams(element))
  .then(resp => {
    dataa = resp.data[0][0]
    
      insertPropChangeState(element, resp)



})
   
 }else{

 }

   
}


function cancelEdit(element){

  controlInsert = 0
 console.log(element.children[0].innerHTML)


  
  params =  {
    NrProposta : element.children[0].innerHTML
  }

  axios.post('http://localhost:3000/getProp', params)
  .then(respo => {
    insertPropChangeState(element, respo)

   
  })

}

function deleteProp(element){



  if(controlInsert > 0){
    return  alert('Deve terminar ou anular a edição em curso')
  }
  controlInsert = 0
  el = element.parentElement.parentElement
  params = {
    NrProposta : el.children[0].innerHTML
  }
  axios.post('http://localhost:3000/countPropFin',params)
  .then(resp => {
    var NrPropFins = resp.data[0][0].NrPropFins 
    if(NrPropFins == 0){
      axios.post('http://localhost:3000/deleteProp',params)
      .then(respo => {
        el.remove()

      })


    }else{
        alert(`Esta proposta contém ${NrPropFins} dependência(s). Para eliminar esta proposta, deve eliminar a(s) dependência(s) `)
    }
    
  
})}

async function  addStand (){

  if(controlInsert > 0) {

    return alert('Deve terminar ou anular a edição em curso')
  }
  else {
    controlInsert = 1
 
    try{

      c = document.getElementById('content')
      c.innerHTML = ''
    
    
    
    }finally {
  
    }
  
    var table = document.createElement('table')
    table.setAttribute("class", "table table-striped")
    table.setAttribute("id", "insertStandTable")
    var thead = document.createElement("thead")
    thead.setAttribute('id', 'thead')
    var trColumns = document.createElement("tr")
    trColumns.setAttribute('id', 'trcolumns')
    thead.appendChild(trColumns)
    var columns = ["Nome Stand", "", ""]
    columns.forEach( element => {
      var td = document.createElement("td")
      td.innerHTML = element
      trColumns.appendChild(td)
    })
    table.appendChild(thead)
    var x = document.getElementById("content")
    x.appendChild(table)
    var tbody = document.createElement("tbody")
    tbody.setAttribute('class', 'tbody')
    tbody.setAttribute('id', 'tbody')

    const result = await getStandInsert()
    console.log(result)
    result.forEach(element => {
      tr = document.createElement('tr')
      td0 = document.createElement('td')
      td1 = document.createElement('td')
      td2 = document.createElement('td')
      td2.innerHTML = '<button  onclick="ChangeStatetoEdit(this.parentElement.parentElement)" class="button">   <i class="fas fa-edit">       </i></button>'
      td3 = document.createElement('td')
      td3.innerHTML = '<button onclick="DeleteStand(this.parentElement.parentElement)" class = "button">  <i class="fas fa-trash-alt">   </i></button>'  
      td1.innerHTML = element.StandNome
      td0.innerHTML = element.StandID
      td0.style.display = "none"
      tr.appendChild(td0)
  
      tr.appendChild(td1)
      tr.appendChild(td2)
      tr.appendChild(td3)
  
      tr.setAttribute('id', `tr${insertTR}`)
      insertTR++
      tbody.appendChild(tr)
      
    });
   var tr = document.createElement("tr")
    tr.setAttribute('id', `tr${insertTR}`)
    insertTR++

    var td1 = document.createElement("td")
    td1.contentEditable = true
    tr.appendChild(td1)
    checkTd = document.createElement("td")
    cancelTd = document.createElement("td")
    cancelTd.setAttribute('id', 'cancelbButtonProp')
    checkTd.setAttribute('id', 'updateButtonProp')
    checkTd.innerHTML = '<button href="" onclick="insertStand(this.parentElement.parentElement)" class="button"><i class="far fa-plus-square"></i></button>'
    cancelTd.innerHTML = '<button href="" onclick="cancelInsertStand(this.parentElement.parentElement)" class="button"><i class="fas fa-times"></i></button>'
    tr.appendChild(checkTd)
    tr.appendChild(cancelTd)
 
    tbody.appendChild(tr)
         
  
      
    table.appendChild(tbody)



    trButton = document.createElement('tr')
    tdButton = document.createElement('td')
    tdButton.setAttribute('colspan', '3')

    buttonAdd = document.createElement('button')
    buttonAdd.innerHTML = "Adicionar Stand"
    buttonAdd.setAttribute("class", "btn btn-primary")
    buttonAdd.setAttribute("id", "buttonAddSF")
    buttonAdd.setAttribute('onclick', `addRecordButtonSF(this.parentElement.parentElement.parentElement)`) 

    tdButton.appendChild(buttonAdd)
    trButton.appendChild(tdButton)
     
    table.appendChild(trButton)

  
}}

function insertStand(element){

  if(element.children[0].innerHTML.length == 0){
    return alert('Preencha o nome do stand')
  }
  params = {
  
    standNome : element.children[0].innerHTML
  }


axios.post('http://localhost:3000/addStand', params)
.then(resp => {

  controlInsert = 0

addStand()




})}
function cancelInsertStand(element){
  element.remove()
  controlInsert = 0
}


function getStandInsert(){


  return new Promise(resolve => {

    axios.post('http://localhost:3000/getStandsInsert')
    .then(resp => {
      resolve(resp.data[0])
    

})

})}

function ChangeStatetoEdit(element){

  if(controlInsert > 0) {

    return alert('Deve terminar ou anular a edição em curso')
  }

  controlInsert = 1
  console.log(element)

  element.children[1].contentEditable = true
  element.children[2].innerHTML = '<button href="" onclick="updateStand(this.parentElement.parentElement)" class="button"><i class="fas fa-check-square"></i></button>'
  element.children[3].innerHTML = '<button href="" onclick="cancelUpdateStand(this.parentElement.parentElement)" class="button"><i class="fas fa-times"></i></button>'
  

}


function updateStand(element){
  controlInsert = 0
console.log(element)
  params = {
    standID : element.children[0].innerHTML,
    standNome : element.children[1].innerHTML
  }

  axios.post('http://localhost:3000/updateStand', params) 
  .then(resp => {
  cancelUpdateStand(element)

  })

}
 function cancelUpdateStand (element){
  controlInsert = 0
  params = {
    standID : element.children[0].innerHTML
  }

  axios.post('http://localhost:3000/cancelUpdateStand', params)
  .then(resp => {


    source = resp.data[0][0]

console.log(resp.data)
    element.children[1].innerHTML = source.standNome
    element.children[1].contentEditable = false
    element.children[2].innerHTML = '<button  onclick="ChangeStatetoEdit(this.parentElement.parentElement)" class="button">   <i class="fas fa-edit">       </i></button>'
    element.children[3].innerHTML = '<button onclick="DeleteStand(this.parentElement.parentElement)" class = "button">  <i class="fas fa-trash-alt">   </i></button>'  

    

  })


 }


function DeleteStand(element){
  if(controlInsert > 0) {

    return alert('Deve terminar ou anular a edição em curso')
  }

    params = {
      standID : element.children[0].innerHTML
    }
    axios.post('http://localhost:3000/getDependeciesStand', params) 
    .then(resp => { 

          
     const nrDependencies = resp.data[0][0].Dependencies
     if(nrDependencies > 0){
      return alert(`Este stand contém ${nrDependencies} dependência(s). Para eliminar esta proposta, deve eliminar a(s) dependência(s) `)
     }
     else {
      var answer = window.confirm('Tem a certeza que pretende eliminar? Esta ação é irreversivel')
      if(answer) {
        axios.post('http://localhost:3000/deleteStand', params) 
        .then(resp => { 
          element.remove()
  
        })


         }



     }


    })



  
  




}






async function  addFinanceira (){

  if(controlInsert > 0) {

    return alert('Deve terminar ou anular a edição em curso')
  }
  else {
    controlInsert = 1
 
    try{

      c = document.getElementById('content')
      c.innerHTML = ''
    
    
    
    }finally {
  
    }
  
    var table = document.createElement('table')
    table.setAttribute("class", "table table-striped")
    table.setAttribute("id", "insertFinanceiraTable")
    var thead = document.createElement("thead")
    thead.setAttribute('id', 'thead')
    var trColumns = document.createElement("tr")
    trColumns.setAttribute('id', 'trcolumns')
    thead.appendChild(trColumns)
    var columns = ["Nome Financeira", "", ""]
    columns.forEach( element => {
      var td = document.createElement("td")
      td.innerHTML = element
      trColumns.appendChild(td)
    })
    table.appendChild(thead)
    var x = document.getElementById("content")
    x.appendChild(table)
    var tbody = document.createElement("tbody")
    tbody.setAttribute('class', 'tbody')
    tbody.setAttribute('id', 'tbody')

    const result = await getFinanceiraInsert()
    console.log(result)
    result.forEach(element => {
      tr = document.createElement('tr')
      td0 = document.createElement('td')
      td1 = document.createElement('td')
      td2 = document.createElement('td')
      td2.innerHTML = '<button  onclick="ChangeStatetoEditFinanceira(this.parentElement.parentElement)" class="button">   <i class="fas fa-edit">       </i></button>'
      td3 = document.createElement('td')
      td3.innerHTML = '<button onclick="DeleteFinanceira(this.parentElement.parentElement)" class = "button">  <i class="fas fa-trash-alt">   </i></button>'  
      td1.innerHTML = element.FinanceiraNome
      td0.innerHTML = element.FinanceiraID
      td0.style.display = "none"
      tr.appendChild(td0)
  
      tr.appendChild(td1)
      tr.appendChild(td2)
      tr.appendChild(td3)
  
      tr.setAttribute('id', `tr${insertTR}`)
      insertTR++
      tbody.appendChild(tr)
      
    });
   var tr = document.createElement("tr")
    tr.setAttribute('id', `tr${insertTR}`)
    insertTR++

    var td1 = document.createElement("td")
    td1.contentEditable = true
    tr.appendChild(td1)
    checkTd = document.createElement("td")
    cancelTd = document.createElement("td")
    cancelTd.setAttribute('id', 'cancelbButtonProp')
    checkTd.setAttribute('id', 'updateButtonProp')
    checkTd.innerHTML = '<button href="" onclick="insertFinanceira(this.parentElement.parentElement)" class="button"><i class="far fa-plus-square"></i></button>'
    cancelTd.innerHTML = '<button href="" onclick="cancelInsertFinanceira(this.parentElement.parentElement)" class="button"><i class="fas fa-times"></i></button>'
    tr.appendChild(checkTd)
    tr.appendChild(cancelTd)
 
    tbody.appendChild(tr)
         
  
      
    table.appendChild(tbody)
    trButton = document.createElement('tr')
    tdButton = document.createElement('td')
    tdButton.setAttribute('colspan', '3')

    buttonAdd = document.createElement('button')
    buttonAdd.innerHTML = "Adicionar Stand"
    buttonAdd.setAttribute("class", "btn btn-primary")
    buttonAdd.setAttribute("id", "buttonAddSF")
    buttonAdd.setAttribute('onclick', `addRecordButtonSF(this.parentElement.parentElement.parentElement)`) 

    tdButton.appendChild(buttonAdd)
    trButton.appendChild(tdButton)
     
    table.appendChild(trButton)



     







    
    
  
}}


function getFinanceiraInsert(){


  return new Promise(resolve => {

    axios.post('http://localhost:3000/getFinanceirasInsert')
    .then(resp => {
      resolve(resp.data[0])
    

})

})}

function insertFinanceira(element){

if(element.children[0].innerHTML.length == 0){
  return alert('Preencha o nome Financeira')
}
  params = {
  
    financeiraNome : element.children[0].innerHTML
  }


axios.post('http://localhost:3000/addFinanceira', params)
.then(resp => {

  controlInsert = 0

addFinanceira()




})}

function cancelInsertFinanceira(element){
  element.remove()
  controlInsert = 0
}

function ChangeStatetoEditFinanceira(element){

  if(controlInsert > 0) {

    return alert('Deve terminar ou anular a edição em curso')
  }

  controlInsert = 1
  console.log(element)

  element.children[1].contentEditable = true
  element.children[2].innerHTML = '<button href="" onclick="updateFinanceira(this.parentElement.parentElement)" class="button"><i class="fas fa-check-square"></i></button>'
  element.children[3].innerHTML = '<button href="" onclick="cancelUpdateFinanceira(this.parentElement.parentElement)" class="button"><i class="fas fa-times"></i></button>'
  

}
function updateFinanceira(element){
  controlInsert = 0
console.log(element)
  params = {
    financeiraID : element.children[0].innerHTML,
    financeiraNome : element.children[1].innerHTML
  }

  axios.post('http://localhost:3000/updateFinanceira', params) 
  .then(resp => {
  cancelUpdateFinanceira(element)

  })

}

function DeleteFinanceira(element){
  if(controlInsert > 0) {

    return alert('Deve terminar ou anular a edição em curso')
  }

    params = {
      financeiraID : element.children[0].innerHTML
    }
    axios.post('http://localhost:3000/getDependeciesFinanceira', params) 
    .then(resp => { 

          
     const nrDependencies = resp.data[0][0].Dependencies
     if(nrDependencies > 0){
      return alert(`Esta financeira contém ${nrDependencies} dependência(s). Para eliminar esta proposta, deve eliminar a(s) dependência(s) `)
     }
     else {
      var answer = window.confirm('Tem a certeza que pretende eliminar? Esta ação é irreversivel')
      if(answer) {
        axios.post('http://localhost:3000/deleteFinanceira', params) 
        .then(resp => { 
          element.remove()
  
        })


         }



     }


    })



  
  




}
function cancelUpdateFinanceira (element){
  controlInsert = 0
  params = {
    financeiraID : element.children[0].innerHTML
  }

  axios.post('http://localhost:3000/cancelUpdateFinanceira', params)
  .then(resp => {


    source = resp.data[0][0]

console.log(resp.data)
    element.children[1].innerHTML = source.FinanceiraNome
    element.children[1].contentEditable = false
    element.children[2].innerHTML = '<button  onclick="ChangeStatetoEditFinanceira(this.parentElement.parentElement)" class="button">   <i class="fas fa-edit">       </i></button>'
    element.children[3].innerHTML = '<button onclick="DeleteFinanceira(this.parentElement.parentElement)" class = "button">  <i class="fas fa-trash-alt">   </i></button>'  

    

  })


 }

function addRecordButtonSF(element ){

  if(controlInsert > 0) {

    return alert('Deve terminar ou anular a edição em curso')
  }
  controlInsert = 1

    var tr = document.createElement("tr")
    tr.setAttribute('id', `tr${insertTR}`)
    insertTR++

    var td1 = document.createElement("td")
    td1.contentEditable = true
    tr.appendChild(td1)
    checkTd = document.createElement("td")
    cancelTd = document.createElement("td")
    cancelTd.setAttribute('id', 'cancelbButtonProp')
    checkTd.setAttribute('id', 'updateButtonProp')
    checkTd.innerHTML = '<button href="" onclick="insertFinanceira(this.parentElement.parentElement)" class="button"><i class="far fa-plus-square"></i></button>'
    cancelTd.innerHTML = '<button href="" onclick="cancelInsertFinanceira(this.parentElement.parentElement)" class="button"><i class="fas fa-times"></i></button>'
    tr.appendChild(checkTd)
    tr.appendChild(cancelTd)
    element.children[1].appendChild(tr)

}
/* Pagina de consultas aparacer so proposta , depois sub-menu com propostas desse cliente */
/* Pagina de relatorios valor total por range de data e stand ou/e financeira  ou/e estados */  
/* sem data para expirar */ 
/* backup todas as semanas */ 
/* master para adicionar utilizadores */






  




    
  