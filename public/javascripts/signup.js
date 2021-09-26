$(document).ready(function(){
    $('#register').on('click', function(e){
        var parameters = {firstname: $('#firstname').val(),lastname:$('#lastname').val(),email:$('#email').val(),password:$('#password').val() };
        $.get('/main/signup/register', parameters, function(result) {
            if(result == 'sccuess')
            location.href = "/main/sign"
            else
            alert('Please check your input again!')
        });
    });
});
