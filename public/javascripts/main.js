$(document).ready(function(){
    $('#sign').on('click', function(e){
        location.href = "/main/sign"
    });
    $('#signout').on('click', function(e){
        $.get('/main/signout',function(result){
            a = confirm('Do you want to Sign Out?')
            if(a)
            location.reload()
        })
    });
    
    $('#user').on('click', function(e){
        location.href = "/main/user"
    });
});