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
    $("#contenTravel").show()
    $("#beforeLogin").hide()
    $("#register").hide()
    $("#HomeNav").show()
    $("#ArticlesNav").show()
    $("#NewTravelPlanNav").show()
    $("#logout").show()
    $("#jumbotron_travel_form").hide()
    $("#jumbotron_edit_form").hide()
    fetchTravel()
    $("#article").hide()
    $("#holiday").hide()
    $("#weather").hide()
    fetchWeather()
    fetchHoliday()
    $("#WeatherNav").show()
    $("#CalendarHoliday").show()

}


function beforeLogin() {
    $("#contenTravel").hide()
    $("#beforeLogin").show()
    $("#register").hide()
    $("#HomeNav").hide()
    $("#ArticlesNav").hide()
    $("#NewTravelPlanNav").hide()
    $("#logout").hide()
    $("#jumbotron_travel_form").hide()
    $("#jumbotron_edit_form").hide()
    $("#holiday").hide()
    $("#weather").hide()
    $("#article").hide()
    $("#WeatherNav").hide()
    $("#CalendarHoliday").hide()

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
            // console.log(result)
            Travels = result
            $("#travel_list").empty()
            $.each(Travels, function (key, value) {
                $("#travel_list").append(`
                <div class="col-4 mb-2">
                    <div class="card border-primary" style="width: 18rem;">
                    <img src="http://www.diegomallien.com/wp-content/uploads/2017/03/Meaning-of-travelling-300x167.jpg"></img>
                    <div class="card-body">
                        <h5 class="card-title">${value.title}</h5>
                        <p class="card-text">Destination: ${value.destination}<p>
                        <p class="card-text">Departure date: ${new Date(value.date).toLocaleDateString("id")}<p>
                        <p class="card-text">Travel status: ${value.status}</p>
                        <button type="button" class="btn btn-primary" onclick="updateTravel(${value.id}, event)">Edit</button>
                        <button type="button" class="btn btn-danger" onclick="if (confirm('Are you sure?')) { return removeTravel(${value.id}, event) }">Delete</button>
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

function fetchWeather() {
    $.ajax({
        method: 'GET',
        url: 'http://localhost:3000/weather',
        headers: {
            access_token: localStorage.access_token
        }
    })
        .done(result => {
            console.log(result)
            Travels = result
            $("#article_weather").empty()
            $.each(Travels, function (key, value) {
                $("#article_weather").append(`
                <div class="col-4 mb-2">
                    <div class="card" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">${value.city}</h5>
                        <p class="card-text">Temperature: <h1>${value.temperature}</h1><p>
                        <p class="card-text">Description: ${value.description}<p>
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

const fetchHoliday = () => {
    $.ajax({
        method: 'GET',
        url: 'http://localhost:3000/holiday',
        headers: {
            access_token: localStorage.access_token
        }
    })
        .done(result => {
            $("#holiday-list").empty()
            $.each(result, (key, value) => {
                $("#holiday-list").append(`
            <tr>
            <th scope="row">${value.name}</th>
            <td>${value.date}</td>
          </tr>
          `
                )
            })
        })
        .fail(err => {
            alert(err.responseJSON.message)
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


function addTravel(event) {
    event.preventDefault()
    let title = $('#title').val()
    let destination = $('#destination').val()
    let date = $('#date').val()
    let status = $('#status').val()
    $.ajax({
        method: 'POST',
        url: ' http://localhost:3000/travel',
        data: {
            title,
            destination,
            date,
            status
        },
        headers: {
            access_token: localStorage.access_token
        }
    })
        .done(() => {
            afterLogin()
        })
        .fail(() => {
            console.log('Error.')
        })
        .always(() => {
            $('#addTravelForm').trigger("reset")
        })
}

function removeTravel(id, event) {
    event.preventDefault()
    $.ajax({
        method: 'DELETE',
        url: `http://localhost:3000/travel/${id}`,
        headers: {
            access_token: localStorage.access_token
        }
    })
        .done(() => {
            // console.log(result)
            afterLogin()
        })
        .fail(() => {
            console.log('Error.')
        })
        .always(() => {
            $('#registerForm').trigger("reset")
        })
}

function updateTravel(id, event) {
    event.preventDefault()
    $("#contenTravel").hide()
    $("#jumbotron_edit_form").show()
    $.ajax({
        method: 'GET',
        url: `http://localhost:3000/travel/${id}`,
        headers: {
            access_token: localStorage.access_token
        }
    })
        .done(result => {
            // afterLogin()
            let data = result
            // console.log(data.date.substring(0,10))
            $("#editTravelForm").empty()
            $("#editTravelForm").append(`<form>
            <h3>Edit your travel plan</h3>
            <div class="form-group">
                <label for="edit-title">Title</label>
                <input type="text" class="form-control" id="edit-title" value ="${data.title}">
            </div>
            <div class="form-group">
                <label for="edit-destination">Destination</label>
                <input type="text" class="form-control" id="edit-destination" value ="${data.destination}">
            </div>
            <div class="form-group">
                <label for="edit-date">Departure Date (Planned)</label>
                <input type="date" class="form-control" id="edit-date" value ="${data.date.substring(0, 10)}">
            </div>
            <div class="form-group">
              <label for="edit-status">Travel Status</label>
              <select class="form-control" id="edit-status">
                <option>Please select one</option>
                <option value="Plan" ${data.status === "Plan" ? "selected" : ""}>Plan</option>
                <option value="On Vacation" ${data.status === "On Vacation" ? "selected" : ""}>On Vacation</option>
                <option value="Cancel" ${data.status === "Cancel" ? "selected" : ""}>Cancel</option>
                <option value="Done" ${data.status === "Done" ? "selected" : ""}>Done</option>
              </select>
            </div>
            <button type="submit" class="btn btn-primary" onclick="putTravel(${data.id}, event)">Update</button>
            <button type="button" class="btn btn-danger" onclick="afterLogin()">Cancel</button>
        </form>`)
        })
        .fail(() => {
            console.log('Error.')
        })
}

function putTravel(id, event) {
    event.preventDefault()
    let title = $('#edit-title').val()
    let destination = $('#edit-destination').val()
    let date = $('#edit-date').val()
    let status = $('#edit-status').val()
    $.ajax({
        method: 'PUT',
        url: `http://localhost:3000/travel/${id}`,
        headers: {
            access_token: localStorage.access_token
        },
        data: {
            title,
            destination,
            date,
            status
        }
    })
        .done(() => {
            afterLogin()
        })
        .fail(() => {
            console.log("Error.")
        })
}


function fetchArticle() {
    $.ajax({
        method: "GET",
        url: `http://localhost:3000/article`,

    })
        .done(data => {
            $.each(data, (key, value) => {
                $("#ABS").append(` 
                <div class="col-sm-3 mb-3 ">
    <div class="card bg-transparent text-dark mb-3 border" style="max-width: 18rem;">
        <div class="card-header"><h3>${value.name}</h3></div>
                <img src="${value.img}" class="card-img-top" alt="...">
                <div class="card-body">
                     <p class="card-text">${value.alamat}</p>
                     <p class="card-text">${value.phone}</p>
                     <a href="${value.url}" class="btn btn-outline-danger">Zomato Resto</a>
                </div>
            </div>
         </div>
     </div>
                `)
            })

        })
        .fail((err) => {
            console.log(err)
        })
}


function showRegisterForm() {
    $("#register").show()
    $("#beforeLogin").hide()
}

function showLoginForm() {
    $("#register").hide()
    $("#beforeLogin").show()
}

function showAddForm() {
    afterLogin()
    $("#jumbotron_travel_form").show()
    $("#contenTravel").hide()


}


$("#logout").click(function () {
    localStorage.removeItem('access_token')
    beforeLogin()
    signOut()
})

function showCalendar() {
    $("#holiday").show()
    $("#contenTravel").hide()
    $("#beforeLogin").hide()
    $("#register").hide()
    $("#HomeNav").show()
    $("#ArticlesNav").show()
    $("#NewTravelPlanNav").show()
    $("#logout").show()
    $("#jumbotron_travel_form").hide()
    $("#jumbotron_edit_form").hide()
    $("#article").hide()
    $("#weather").hide()
    fetchHoliday()

}

function showweather() {
    $("#weather").show()
    $("#contenTravel").hide()
    $("#beforeLogin").hide()
    $("#register").hide()
    $("#HomeNav").show()
    $("#ArticlesNav").show()
    $("#NewTravelPlanNav").show()
    $("#logout").show()
    $("#jumbotron_travel_form").hide()
    $("#jumbotron_edit_form").hide()
    $("#article").hide()
    $("#holiday").hide()

    fetchWeather()
}

function showArticle() {
    fetchArticle()
    $("#contenTravel").hide()
    $("#beforeLogin").hide()
    $("#register").hide()
    $("#HomeNav").show()
    $("#ArticlesNav").show()
    $("#NewTravelPlanNav").show()
    $("#logout").show()
    $("#jumbotron_travel_form").hide()
    $("#jumbotron_edit_form").hide()
    $("#article").show()
    $("#holiday").hide()
    $("#weather").hide()
}


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
