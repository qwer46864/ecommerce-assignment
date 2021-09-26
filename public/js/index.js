function Search(){
    
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function () {
        if (httpRequest.readyState == 4 && httpRequest.status == 200) {
            console.log(httpRequest.responseText);
            document.getElementById("soldOutSoon").innerHTML = httpRequest.responseText
        }
    };
    var str = 'keyword=' +  document.getElementById("searchArea").value
    var brand = document.getElementById("selbrand").value
    if(brand) str += '&brand=' +  brand
    var showprice = document.getElementById("showprice").value
    
    if(showprice!=8000 ) str += '&price=' +  showprice
    httpRequest.open('GET', '/main/search?'+str, true);
    httpRequest.send();
        
}

function checkout(){
    var str = 'keyword=' +  document.getElementById("searchArea").value
    var brand = document.getElementById("selbrand").value
    if(brand) str += '&brand=' +  brand
    var showprice = document.getElementById("showprice").value
    
    if(showprice!=8000 ) str += '&price=' +  showprice
    window.location.href = '/main/checkout?'+str
}
function changPrice(e){
    let str = ''
    if(e.target.value==8000){
        str = 'Unlimited'
    }else{
        str = '$0 - $' + e.target.value
    }
    document.getElementById("showpricetext").innerText = str
    Search();
    // console.log(e.target.value,999)
}

$(document).ready(function(){
    $('#user').on('click', function(e){
        window.location.href = "/main/user"
    });
    });



