# Office Queue Management Full API Specifications

This document lists all the expected behaviors for the APIs that compose the Office Queue Management application.
TODO: More complete description to be added here eventually.


## API List

For all constraints on request parameters and request body content, always assume a `422` error in case one constraint is not satisfied.
For all access constraints, always assume a `401` error in case the access rule is not satisfied.
For all success scenarios, always assume a `200` status code for the API response.
Specific error scenarios will have their corresponding error code.

### Access APIs

TODO: Add here the access APIs, to manage login, logout, and retrieving the logged in user.


### User APIs

TODO: Add here the user APIs, including those to manage registration of new users.


### Counter APIs

#### GET `officequeue/counters`

Retrieves all the counters in the database.

- Request Parameters: None
- Request Body Content: None
- Response Body Content: An array of **Counter** objects, each representing a counter, or an empty array if there are no counters in the database:
    - Example:
``` JSON
[
    {"counter_id": 1, "counter_name": "Counter1"}, 
    {"counter_id": 2, "counter_name": "Counter2"}
]
```

#### GET `officequeue/counters/:counter_id`

Retrieves the list of services that are configured to be served by the given counter.

- Request Parameters: 
    - `counter_id`: a number representing the id of the counter.
    - Example: `/officequeue/counters/3`
- Request Body Content: None
- Response Body Content: An array of **Service** objects, each representing a service, or an empty array if the given counter has no services configured:
    - Example:
``` JSON
[
    {"service_id": 1, "service_name": "Bill payment", "avg_service_time": 10},
    {"service_id": 2, "service_name": "Send / receive letter", "avg_service_time": 5}
]
```

#### POST `officequeue/counters`

Adds one or more service to a given counter, i.e. it performs the configuration of such counter.   

- Request Parameters: None
- Request Body Content: An object that contains the id of the given counter and an array of objects that represent the ids of the services to be added to the counter. The array contains 0 or more services. Each service has to be an object with the following parameters:
  - `service_id`: a number representing the id of the service.
  - Example:
``` JSON
{
    "counter_id": 1, 
    "services": [
        {"service_id": 1},
        {"service_id": 2}
    ]
}
```
- Response Body Content: None
- Access Constraints: Can only be called by a logged in user whose role is `Admin`.
- Additional Constraints:
  - It should return a `404` error if the given counter does not exist in the database
  - It should return a `404` error if any of the given services do not exist in the database


### Queue APIs

TODO: Add here the queue APIs.


### Service APIs

#### GET `officequeue/services`

Retrieves all the services in the database.

- Request Parameters: None
- Request Body Content: None
- Response Body Content: An array of **Service** objects, each representing a service:
    - Example:
``` JSON
[
    {"service_id": 1, "service_name": "Bill payment", "avg_service_time": 10},
    {"service_id": 2, "service_name": "Send / receive letter", "avg_service_time": 5}
]
```

#### POST `officequeue/services`

Registers a new service.

- Request Parameters: None
- Request Body Content: An object with the following parameters:
  - `service_name`: a string that must not be empty
  - `avg_service_time`: a number whose value is greater than 0. Represents the average time in minutes a service takes to be completed.
  - Example: 
``` JSON
{"service_name": "Bill payment", "avg_service_time": 10}
```
- Response Body Content: None
- Access Constraints: Can only be called by a logged in user whose role is `Admin`.
- Additional Constraints:
  - It should return a `409` error if `service_name` represents an already existing service in the database.


### Ticket APIs

TODO: Add here the ticket APIs.

