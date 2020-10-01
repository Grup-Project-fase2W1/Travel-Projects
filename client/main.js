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
    fetchTravel()
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
    // afterLogin()
    $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/login',
        data: {
            email,
            password
        }
    })
        .done(result => {
            console.log(result)
            localStorage.access_token = result.access_token
            afterLogin()
        })
        .fail(() => {
            console.log('Error.')
        })
        .always(() => {
            console.log('Complete')
        })
}

function fetchTravel(){
    $.ajax({
        method: 'GET',
        url: 'http://localhost:3000/travel',
        headers: {
            access_token: localStorage.access_token
        }
    })
        .done(result => {
            console.log(result)
        })
        .fail(() => {
            console.log('Error.')
        })

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

