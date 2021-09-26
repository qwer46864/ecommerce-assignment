function back(){
    history.back()
}
let shoppings = {}
function purchar(){
    if(JSON.stringify(shoppings)=="{}"){
        alert('No commodities can be purchased')
    }else{
        var httpRequest = new XMLHttpRequest();
        httpRequest.onreadystatechange = function () {
            if (httpRequest.readyState == 4 && httpRequest.status == 200) {
                alert(httpRequest.responseText);
                window.location.href="/main"
            }
        };
        httpRequest.open('POST', '/main/purchar', true);
        httpRequest.setRequestHeader('Content-Type','application/x-www-form-urlencoded')
        httpRequest.send('shoppings='+JSON.stringify(shoppings));
    }
}

function formatData(){
    var numbers = document.getElementsByClassName('number')
    shoppings = {}
    for(let i=0 ;i<numbers.length;i++){
       
        if(!isNaN(numbers[i].value * 1) && numbers[i].value * 1>=1) shoppings[numbers[i].id] = numbers[i].value * 1 
    }

    getTotal();
}
window.onload = function(){
    formatData()
}
function changNum(e){
    console.dir(e.target.parentElement)

    if(e.target.value>e.target.dataset.stock){
        e.target.value = 1
        alert('Out of stock')
        formatData()
        return;
    }
    var price = e.target.parentElement.previousElementSibling.innerText.replace("$", '')*1 || 0;
    // var total = price[]
        if(e.target.value>=1 && !isNaN(e.target.value) || e.target.value==''){
            e.target.parentElement.nextElementSibling.innerText = '$'+ price * (e.target.value || 0);
            
        }else if(e.target.value == 0 ){
            if( confirm('Select 0 will delete it, are you sure?')){
                e.target.parentElement.parentElement.remove();
                
            }else{
                e.target.value = 1
                
            }
           
        }else{
            alert('Input error')
            e.target.value = 1
        }
        formatData()
}


function getTotal(){

    var subtotals = document.getElementsByClassName('subtotal')
    var numbers = document.getElementsByClassName('number')
    console.log(numbers)
    var sum = 0;
    var amount = 0;
    for(var i = 0 ;i<subtotals.length;i++){
        console.log(i,subtotals[i].innerText*1)
        sum += subtotals[i].innerText*1;
    }
    
    for(var i = 0 ;i<numbers.length;i++){

        amount += numbers[i].value*1 || 0;
        console.log(numbers[i], 3333)
    }

    document.getElementById('total').innerText = sum
    document.getElementById('amount').innerText = amount
    console.log(amount)

}
function deleteFun(e){
    console.log(e.target,e.target.parentElement.parentElement,7777)
    if(confirm('Are you sure to delete it?')){
        e.target.parentElement.parentElement.remove();
        formatData()
    }
}