
function getTitle(){
        var tb = document.getElementById('item');
        var rows = tb.rows;   
        var title =[]   
    
        for(var i = 1; i<rows.length; i++ ){ 
                title.push(rows[i].cells[0].innerHTML);
        }
        
        return title;
    }
 
$(document).ready(function(){
    var trs=$("table#item tr");
        $("button").click(function(){
        var title = getTitle();

        var index=trs.index($(this).closest("tr"));
        console.log(index);
        console.log(title[index-1]);
        var parameters = title[index-1];
        var httpRequest = new XMLHttpRequest();
        httpRequest.onreadystatechange = function () {
            if (httpRequest.readyState == 4 && httpRequest.status == 200) {
                console.log(httpRequest.responseText);
                document.getElementById("soldOutSoon").innerHTML = httpRequest.responseText
            }
        };
        httpRequest.open('GET', '/main/item?title='+parameters, true);
        httpRequest.send();
    });
})