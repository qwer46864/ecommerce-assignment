$(document).ready(function(){
    $('#SignUp').on('click', function(e){
        location.href = "/main/signup"
    });
    $('#login').on('click',function(e){
        var parameters = {email:$('#email').val(),password:$('#password').val()};
        $.get('/main/sign/login',parameters,function(result){
            if(result == 'error')
            alert('Incorrect Username and Passward! Please Enter Again');
            else if(result == 'empty')
            alert('Input box can not be empty')
            else{
            location.href = '/main'

            }

            }
        
        )
    });
});