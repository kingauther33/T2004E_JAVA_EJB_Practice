export const API = {
  GET_STREETS: {
    url: "http://localhost:8080/api/v1/streets",
    method: "GET",
  },
  GET_DISTRICTS: {
    url: "http://localhost:8080/api/v1/districts",
    method: "GET",
  },
  POST_STREET: {
    url: "http://localhost:8080/api/v1/streets",
    method: "POST",
  },
};

export const CONFIG = {
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    "Content-Type": "application/json",
  },
};
