$(document).ready(function(){
    if(localStorage.access_token){
        afterLogin()
    }
    else{
        beforeLogin()
    }
})

function afterLogin(){
    $(".afterLogin").show()
    $(".beforeLogin").hide()
    $(".register").hide()
}

function beforeLogin(){
    $(".afterLogin").hide()
    $(".register").hide()
    $(".beforeLogin").show()
}

function login(event){
    event.preventDefault()
    let email = $('#email').val()
    let password = $('#password').val()
    console.log(email, password)
}

function register(event){
    event.preventDefault()
    let name = $('#name').val()
    let email = $('#email').val()
    let password = $('#password').val()
    console.log(name, email, password)
}

function showRegisterForm(){
    $(".register").show()
    $(".beforeLogin").hide()
}

function showLoginForm(){
    $(".register").hide()
    $(".beforeLogin").show()
}

$("#logout").click(function(){
    localStorage.removeItem('access_token')
    beforeLogin()
})
