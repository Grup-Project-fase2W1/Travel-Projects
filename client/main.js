let Travels = []

$(document).ready(function () {
    if (localStorage.access_token) {
        afterLogin()
    }
    else {
        beforeLogin()
    }
})

function afterLogin() {
    $(".afterLogin").show()
    $(".beforeLogin").hide()
    $(".register").hide()
    fetchTravel()
}

function beforeLogin() {
    $(".afterLogin").hide()
    $(".register").hide()
    $(".beforeLogin").show()
}

function login(event) {
    event.preventDefault()
    let email = $('#input_email').val()
    let password = $('#input_password').val()
    // console.log(email, password)
    // afterLogin()
    $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/user/login',
        data: {
            email,
            password
        }
    })
        .done(result => {
            // console.log(result)
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

function fetchTravel() {
    $.ajax({
        method: 'GET',
        url: 'http://localhost:3000/travel',
        headers: {
            access_token: localStorage.access_token
        }
    })
        .done(result => {
            console.log(result)
            Travels = result
            $("#travel_list").empty()
            $.each(Travels, function(key, value){
                $("#travel_list").append(`
                <div class="col-4 mb-2">
                    <div class="card" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">${value.title}</h5>
                        <p class="card-text">Destination: ${value.destination}<p>
                        <p class="card-text">Departure date: ${value.date.toLocaleString("id")}<p>
                        <p class="card-text">Travel status: ${value.status}</p>
                        <button type="button" class="btn btn-primary">Delete</button>
                        <button type="button" class="btn btn-primary">Update</button>
                        </div>
                    </div>
                </div>
                `)
            })
        })
        .fail(() => {
            console.log('Error.')
        })

}

function register(event) {
    event.preventDefault()
    let name = $('#name').val()
    let email = $('#email').val()
    let password = $('#password').val()
    // console.log(name, email, password)
    $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/user/register',
        data: {
            name,
            email,
            password
        }
    })
        .done(() => {
            // console.log(result)
            beforeLogin()
        })
        .fail(() => {
            console.log('Error.')
        })
}

function showRegisterForm() {
    $(".register").show()
    $(".beforeLogin").hide()
}

function showLoginForm() {
    $(".register").hide()
    $(".beforeLogin").show()
}

$("#logout").click(function () {
    localStorage.removeItem('access_token')
    beforeLogin()
    signOut()
})


function onSignIn(googleUser) {
    // var profile = googleUser.getBasicProfile();
    // console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    // console.log('Name: ' + profile.getName());
    // console.log('Image URL: ' + profile.getImageUrl());
    // console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    var google_access_token = googleUser.getAuthResponse().id_token;
    // console.log(google_access_token)
    $.ajax({
        method: `POST`,
        url: `http://localhost:3000/googleLogin`,
        headers: {
            google_access_token
        }
    })
        .done(result => {
            console.log(result, "<<<<<<")
            localStorage.setItem("access_token", result.access_token)
            afterLogin()
        })
        .fail(err => {

        })
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
}
