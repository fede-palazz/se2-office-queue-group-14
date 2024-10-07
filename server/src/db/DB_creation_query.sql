-- Table: Services
CREATE TABLE Services (
    service_id INTEGER PRIMARY KEY,
    service_name VARCHAR(100),
    avg_service_time DECIMAL(5,2)
);

-- Table: Counters
CREATE TABLE Counters (
    counter_id INTEGER PRIMARY KEY,
    counter_name VARCHAR(100),
    location VARCHAR(100)
);

-- Table: Counter_Services (Junction table for Counter and Service)
CREATE TABLE Counter_Services (
    counter_service_id INTEGER PRIMARY KEY,
    counter_id INTEGER,
    service_id INTEGER,
    FOREIGN KEY (counter_id) REFERENCES Counters(counter_id),
    FOREIGN KEY (service_id) REFERENCES Services(service_id)
);

-- Table: Tickets
CREATE TABLE Tickets (
    ticket_id INTEGER PRIMARY KEY,
    ticket_code VARCHAR(50),
    service_id INTEGER,
    issue_time DATETIME,
    status VARCHAR(50),
    counter_id INTEGER,
    FOREIGN KEY (service_id) REFERENCES Services(service_id),
    FOREIGN KEY (counter_id) REFERENCES Counters(counter_id)
);

-- Table: Queues
CREATE TABLE Queues (
    queue_id INTEGER PRIMARY KEY,
    service_id INTEGER,
    ticket_id INTEGER,
    position INTEGER,
    enqueue_time DATETIME,
    FOREIGN KEY (service_id) REFERENCES Services(service_id),
    FOREIGN KEY (ticket_id) REFERENCES Tickets(ticket_id)
);

-- Table: Managers
CREATE TABLE Managers (
    manager_id INTEGER PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100),
    password VARCHAR(100)
);
