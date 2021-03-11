


function getLastAddPropFins(){
 
    axios.post('http://localhost:3000/getLastAddPropFins')
    .then(resp => {
        data = resp.data

        ChangeDivStateLastAddPropFins(data)
        //setInterval(getLastAddPropFins, 5000)
        
        
})
}

function ChangeDivStateLastAddPropFins(data){

   divContentProps =  document.getElementById('divContentProps')
   divContentProps.innerHTML = ""


   var columns01 = ['NrProposta', 'Financeira' , 'Funcionário', 'Valor', 'Prazo', 'Rent.' , 'Estado' , 'Observações','','NrProposta', 'Financeira' , 'Funcionário', 'Valor', 'Prazo', 'Rent.' , 'Estado' , 'Observações', 'Data da Alteração']
   var table = document.createElement('table')
         table.setAttribute("class", "table table-striped")
         table.setAttribute("id", "table-modal")
         var thead = document.createElement("thead")
         thead.setAttribute('id', 'thead')
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
     var td12 = document.createElement("td")
     var td13 = document.createElement("td")
     var td14 = document.createElement("td")
     var td15 = document.createElement("td")
     var td16 = document.createElement("td")
     var td17 = document.createElement("td")
     var td18 = document.createElement("td")
     td1.innerHTML = element.AntigaNrProposta
     td2.innerHTML = element.AntigaFinanceira
     td3.innerHTML = element.AntigaFuncionario
     td4.innerHTML = element.AntigoValor
     td5.innerHTML = element.AntigoPrazo
     td6.innerHTML = element.AntigaTaxa
     td7.innerHTML = element.AntigaEstado
     td8.innerHTML = element.AntigaObservacoes
     td9.innerHTML = '<i class="fas fa-arrow-right"></i>'
     td10.innerHTML = element.NovaNrProposta
     td11.innerHTML = element.NovaFinanceira
     td12.innerHTML = element.NovaFuncionario
     td13.innerHTML = element.NovaValor
     td14.innerHTML = element.NovaPrazo
     td15.innerHTML = element.NovaTaxa
     td16.innerHTML = element.NovaEstado
     td17.innerHTML = element.NovaObservacoes
     td18.innerHTML = element.DataAlteração


     
     


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
     tr.appendChild(td12)
     tr.appendChild(td13)
     tr.appendChild(td14)
     tr.appendChild(td15)
     tr.appendChild(td16)
     tr.appendChild(td17)
     tr.appendChild(td18)

     tbody.appendChild(tr)
    
     



   
   
   });

   table.appendChild(tbody)

  divContentProps.appendChild(table)

  
     
     
 



}