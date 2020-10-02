
Travel Plan App
```json
    RESTful endpoint for Travel plan app CRUD operation.
    JSON-formatted response.

 
RESTful Endpoints

## POST /register
## POST /login
## POST /googleLogin
## GET  /article
## GET  /weather
## GET  /holiday

## GET /travel 
## POST /travel
## GET /travel/:id
## PUT /travel/:id
## DELETE /travel/:id


##POST /register 

        Request Header

            Not Needed

        Request Body

        {
            "name": "Ridwan",
            "email": "ridwan@mail.com",
            "password": 123456, 
        }

        Response (200)

        {
            "id": 1,
            "name": "Ridwan",
            "email": "ridwan@mail.com",
        }

        Response (400 - Bad Request)

        {
        "message": "Invalid request."
        }

        Response (500 - Internal Server Error)

        {
        "message": "Internal Server Error."
        }

##POST /login 

        Request Header

            Not Needed

        Request Body

        {
            "email": "ridwan@mail.com",
            "password": 123456, 
        }

        Response (200)

        {
            "access_token"
        }

        Response (400 - Bad Request)

        {
        "message": "Invalid request."
        }

        Response (500 - Internal Server Error)

        {
        "message": "Internal Server Error."
        }


##POST /googleLogin

        Request Header

            Not Needed

        Request Body

            Not Needed

        Response (200)

        {
            "access_token"
        }
    
        Response (404 - Unauthorized)

        {
        "message": "you are not authorized"
        }

        Response (500 - Internal Server Error)

        {
        "message": "Internal Server Error."
        }

## GET  /article

        Request Header

            Not Needed

        Request Body

            Not Needed

        Response (200)

        {
            "name": "KFC",
            "alamat": "Jakarta",
            "phone": "90880989",
            "img": "img_url"
        }

        Response (404 - Not Found)

        {
        "message": "not found"
        }

        Response (500 - Internal Server Error)

        {
        "message": "Internal Server Error."
        }

## GET  /weather

        Request Header

            Not Needed

        Request Body

            Not Needed

        Response (200)

        {
            "city": "Jakarta",
            "temperature": 29,
            "description": "Raining",
        }

        Response (404 - Not Found)

        {
        "message": "not found"
        }

        Response (500 - Internal Server Error)

        {
        "message": "Internal Server Error."
        }

## GET  /holiday

        Request Header

            Not Needed

        Request Body

            Not Needed

        Response (200)

        {
        "name": "New Year",
        "date": "2019-01-01",
        }

        Response (404 - Not Found)

        {
        "message": "not found"
        }

        Response (500 - Internal Server Error)

        {
        "message": "Internal Server Error."
        }



##GET /travel


        Request Header

        {
        "access_token": "<access_token>"
        }

        Request Body

        not needed

        Response (200)

        [
            {
                "id": 1,
                "title": "Trip to bandung",
                "destination": "Bandung",
                "status": "Plan",
                "date": "2020-10-10",
            },
            {
                "id": 2,
                "title": "Trip to bali",
                "destination": "bali",
                "status": "Plan",
                "date": "2020-10-10"
            }
        ]

        Response (401)
        {
        "message": "Unauthorized"
        }
        Response (404 - not Found)
        {
        "message": "Not Found"
        }
        Response (500 - Internal Server Error)

        {
        "message": "Internal Server Error."
        }

##POST /travel


        Request Header

        {
        "access_token": "<your access token>"
        }

        Request Body

        {
            "title": "Trip to bandung",
            "destination": "Bandung",
            "status": "Plan",
            "date": "2020-10-10",
        }

        Response (201 - Created)

        {
            "id": <given by the system>,
            "title": "Trip to bandung",
            "destination": "Bandung",
            "status": "Plan",
            "date": "2020-10-10",
            "UserId": "given by access token.id"
        }

        Response (400)
        {
        "message": "Validation Error"
        }
        Response (401)
        {
        "message": "Unauthorized"
        }
        Response (500 - Internal Server Error)
        {
        "message": "Internal Server Error."
        }

## GET /travel/:id


        Request Header

        {
        "access_token": "<your access token>"
        }

        Request Params

        {
            "id": 1
        }

        Response (200)

        {
            "id": <given by the system>,
            "title": "Trip to bandung",
            "destination": "Bandung",
            "status": "Plan",
            "date": "2020-10-10",
            "UserId": "given by access token.id"
        }

        Response (401)
        {
        "message": "Unauthorized"
        }
        Response (404)
        {
        "message": "Error. Not found."
        }
        Response (500 - Internal Server Error)
        {
        "message": "Internal Server Error."
        }

##PUT /travel/:id

        Request Header

        {
        "access_token": "<your access token>"
        }

        Request Params

        {
            "id": 1
        }

        Request Body

        {
            "title": "Trip to bandung",
            "destination": "Bandung",
            "status": "On Vacation",
            "date": "2020-10-10",
        }

        Response (200)

        {
            "id": 1,
            "title": "Trip to bandung",
            "destination": "Bandung",
            "status": "On Vacation",
            "date": "2020-10-10",
            "UserId": "given by access token.id"
        }

        Response (400)
        {
        "message": "Validation Error"
        }

        Response (401)
        {
        "message": "Unauthorized"
        }

        Response (404)

        {
        "message": "Error. Not found."
        }

        Response (403)

        {
        "message": "You dont have access"
        }

        Response (500 - Internal Server Error)
        {
        "message": "Internal Server Error."
        }



##DELETE /travel/:id


        Request Header

        {
        "access_token": "<your access token>"
        }

        Request Params

        {
            "id": 1
        }

        Response (200)
        {
            "message": "Travel plan has been deleted successfully."
        }

        Response (400)
        {
        "message": "Validation Error"
        }

        Response (401)
        {
        "message": "Unauthorized"
        }

        Response (404)

        {
        "message": "Error. Not found."
        }

        Response (403)

        {
        "message": "You dont have access"
        }

        Response (500 - Internal Server Error)
        {
        "message": "Internal Server Error."
        }

