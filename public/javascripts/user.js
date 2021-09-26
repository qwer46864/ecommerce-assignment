$(document).ready(function(){
    $('#changepassword').on('click', function(e){
        var parameters = {email:$('#email').val(),password:$('#password').val(),newpassword:$('#newpassword').val()};
        var oldpassword = $('#password').val()
        var typepassword = document.getElementById("oldpassword").value
        if(oldpassword != typepassword){
            console.log("incorrect password")
        }
        else{
            $.get('/main/user/changepassword',parameters,function(result){
                if(result == 'error')
                alert('Incorrect Passward!');
                else if(result == 'empty')
                alert('Input box can not be empty')
                else{
                alert("Successfully changed password")
                location.href = '/main'
                }
    
                }
            )
        }
        
    });
});

