const baseURL = "http://localhost:3001/officequeue/";

/** ------------------- Access APIs ------------------------ */

async function login(username, password) {
  let response = await fetch(baseURL + "sessions", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username: username, password: password }),
  });
  if (response.ok) {
    const user = await response.json();
    return user;
  } else {
    const errDetail = await response.json();
    if (errDetail.error) throw errDetail.error;
    if (errDetail.message) throw errDetail.message;

    throw new Error("Something went wrong");
  }
}

async function logOut() {
  await fetch(baseURL + "sessions/current", {
    method: "DELETE",
    credentials: "include",
  });
}

async function getUserInfo() {
  const response = await fetch(baseURL + "sessions/current", {
    credentials: "include",
  });
  if (response.ok) {
    const user = await response.json();
    return user;
  } else {
    const errDetail = await response.json();
    if (errDetail.error) throw errDetail.error;
    if (errDetail.message) throw errDetail.message;
    throw new Error("Error. Please reload the page");
  }
}

async function getServices() {
  const response = await fetch(baseURL + "services", {
    credentials: "include",
  });
  if (response.ok) {
    const services = await response.json();
    return services;
  } else {
    const errDetail = await response.json();
    if (errDetail.error) throw errDetail.error;
    if (errDetail.message) throw errDetail.message;
    throw new Error("Error. Please reload the page");
  }
}

/** ------------------- Counters APIs ------------------------ */
async function getCountersServices() {
  const response = await fetch(baseURL + "api/counters/all", {
    credentials: "include",
  });
  if (response.ok) {
    const counters = await response.json();
    return counters;
  } else {
    const errDetail = await response.json();
    if (errDetail.error) throw errDetail.error;
    if (errDetail.message) throw errDetail.message;
    throw new Error("Error. Please reload the page");
  }
}

async function createTicket(service_id) {
  const response = await fetch(baseURL + "tickets", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ service_id: service_id }),
  });
  if (response.ok) {
    const ticket = await response.json();
    return ticket;
  } else {
    const errDetail = await response.json();
    if (errDetail.error) throw errDetail.error;
    if (errDetail.message) throw errDetail.message;
    throw new Error("Error. Please reload the page");
  }
}

const API = { login, logOut, getUserInfo, getServices, getCountersServices, createTicket };

export default API;
