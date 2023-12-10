import axios from 'axios';
import {Component} from 'react';

const API = axios.create({baseURL: "http://localhost:8080/api/v1"});

export const getAllBooks = () => {
    return API.get("/books");
}

export const createNewBook = (data) => {
    return API.post("/books", data);
}

export const editBook = (data, id) => {
    return API.patch(`/book/${id}`, data);
}