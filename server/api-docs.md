
---
### POST /register

> Register new user

_Request Body_
```
{
    "email": "admin2@mail.com",
    "password": "admins"
}
```

_Response (201 - Created)_
```
{
    "user": {
        "id": 4,
        "email": "admin2@mail.com",
        "password": "$2a$10$TknIYnk9NJCACwzlQKfVDO3kCdEPmeHrwa7v5QrdzacwvGa2dC6B6",
        "updatedAt": "2020-08-11T11:12:37.616Z",
        "createdAt": "2020-08-11T11:12:37.616Z",
        "organization": "Hacktiv8"
    }
}
```

_Response (400 - Bad Request)_
```
{
    "msg": [
        "Password must be 6 to 12 characters"
    ]
}

{
    "msg": [
        "Invalid email format"
    ]
}
{
    "msg": [
        "Email cannot be empty"
    ]
}
{
    "msg": [
        "Please enter your email"
    ]
}
{
    "msg": [
        "Please enter your password"
    ]
}
{
    "msg": [
        "email must be unique"
    ]
}
```



---
### POST /login

> Login user

_Request Body_
```
{
    "email": "admin2@mail.com",
    "password": "admins"
}
```

_Response (200 - Ok)_
```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJhZG1pbjJAbWFpbC5jb20iLCJpYXQiOjE1OTcxNDQ1MDJ9.9EN8z9XvB5t3M6DPXKqUPX5jcZZssZUOndpQtCk56BY"
}
```

_Response (400 - Bad Request)_
```
{
    "msg": [
        "Invalid email or password"
    ]
}
```



---
### POST /tasks

> Create new task

_Request Header_
```
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJhZG1pbjJAbWFpbC5jb20iLCJpYXQiOjE1OTcxNTQzMDB9.IHcyAxLKx4tiI_qnWqarF_gjLDaazaXt2BHrGPxbP5I"
}
```

_Request Body_
```
{
    "title": "test postman 1",
    "description": "No Description"
}
```

_Response (201 - Created)_
```
{
    "task": {
        "id": 1,
        "title": "test postman 1",
        "description": "No Description",
        "category": "Backlog",
        "UserId": 4,
        "updatedAt": "2020-08-11T11:32:09.015Z",
        "createdAt": "2020-08-11T11:32:09.015Z"
    }
}
```

_Response (400 - Bad Request)_
```
{
    "msg": [
        "Title is required"
    ]
}
{
    "msg": [
        "Title cannot be empty"
    ]
}
{
    "msg": [
        "Category cannot be empty"
    ]
}
```

_Response (401 - Unauthorized)_
```
{
    "msg": [
        "Unauthorized access"
    ]
}
```



### GET /tasks

> Get all tasks of current user

_Request Header_
```
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJhZG1pbjJAbWFpbC5jb20iLCJpYXQiOjE1OTcxNTQzMDB9.IHcyAxLKx4tiI_qnWqarF_gjLDaazaXt2BHrGPxbP5I"
}
```

_Request Body_
```
not needed
```

_Response (200 - Ok)_
```
{
    "tasks": [
        {
            "id": 1,
            "title": "test postman 1",
            "description": "No Description",
            "category": null,
            "UserId": 4,
            "createdAt": "2020-08-11T11:32:09.015Z",
            "updatedAt": "2020-08-11T11:32:09.015Z"
        }
    ]
}
```

_Response (401 - Unauthorized)_
```
{
    "msg": [
        "Unauthorized access"
    ]
}
```



---
### PUT /tasks/:id

> Updating certain task

_Request Header_
```
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJhZG1pbjJAbWFpbC5jb20iLCJpYXQiOjE1OTcxNTQzMDB9.IHcyAxLKx4tiI_qnWqarF_gjLDaazaXt2BHrGPxbP5I"
}
```

_Request Params_
```
id=[integer]
```

_Request Body_
```
{
    "title": "test postman 2",
    "description": "edited",
    "category": "Done"
}
```

_Response (200 - Ok)_
```
{
    "task": [
        1,
        [
            {
                "id": 1,
                "title": "test postman 2",
                "description": "edited",
                "category": "Done",
                "UserId": 4,
                "createdAt": "2020-08-11T11:32:09.015Z",
                "updatedAt": "2020-08-11T11:36:52.101Z"
            }
        ]
    ]
}
```

_Response (400 - Bad Request)_
```
{
    "msg": [
        "Title cannot be empty"
    ]
}
{
    "msg": [
        "Category cannot be empty"
    ]
}
```

_Response (401 - Unauthorized)_
```
{
    "msg": [
        "Unauthorized access"
    ]
}
```



---
### DELETE /tasks/:id

> Delete certain task

_Request Header_
```
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJhZG1pbjJAbWFpbC5jb20iLCJpYXQiOjE1OTcxNTQzMDB9.IHcyAxLKx4tiI_qnWqarF_gjLDaazaXt2BHrGPxbP5I"
}
```

_Request Params_
```
id=[integer]
```

_Request Body_
```
not needed
```

_Response (200 - Ok)_
```
{
    "msg": "task deleted"
}
```

_Response (401 - Unauthorized)_
```
{
    "msg": [
        "Unauthorized access"
    ]
}
```