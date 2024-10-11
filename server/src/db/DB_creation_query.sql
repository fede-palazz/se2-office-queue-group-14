-- Table: Service
CREATE TABLE Service (
    service_id INTEGER PRIMARY KEY AUTOINCREMENT,
    service_name VARCHAR(100),
    avg_service_time DECIMAL(5,2)
);

-- Table: Counter
CREATE TABLE Counter (
    counter_id INTEGER PRIMARY KEY AUTOINCREMENT,
    counter_name VARCHAR(100)
);

-- Table: Counter_Services (Junction table for Counter and Service)
CREATE TABLE Counter_Service (
    counter_id INTEGER ,
    service_id INTEGER ,
	PRIMARY kEY (counter_id,service_id)
    FOREIGN KEY (counter_id) REFERENCES Counter(counter_id),
    FOREIGN KEY (service_id) REFERENCES Service(service_id)
);

-- Table: Ticket
CREATE TABLE Ticket (
    ticket_id INTEGER PRIMARY KEY AUTOINCREMENT,
    ticket_code VARCHAR(50),
    service_id INTEGER,
    issue_time DATETIME,
    status VARCHAR(50),
    counter_id INTEGER,
    FOREIGN KEY (service_id) REFERENCES Service(service_id),
    FOREIGN KEY (counter_id) REFERENCES Counter(counter_id)
);

-- Table: Queues
CREATE TABLE Queue (
    queue_id INTEGER PRIMARY KEY AUTOINCREMENT,
    service_id INTEGER,
    ticket_id INTEGER,
    FOREIGN KEY (service_id) REFERENCES Service(service_id),
    FOREIGN KEY (ticket_id) REFERENCES Ticket(ticket_id)
);

-- Table: Managers
CREATE TABLE User (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(100),
    email VARCHAR(100),
    password VARCHAR(100),
    salt VARCHAR(100),
    role VARCHAR(50)
);
