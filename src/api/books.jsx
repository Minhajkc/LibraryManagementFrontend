import axios from "axios";

const API_URL = "http://localhost:5000/api/books";

export const fetchBooks = async (page, search) => {
  try {
    const response = await axios.get(API_URL, { params: { page, search } });
    return response.data;
  } catch (error) {
    console.error("Error fetching books", error);
  }
};

export const addBook = async (bookData) => {
  try {
    const response = await axios.post(API_URL, bookData);
    return response.data;
  } catch (error) {
    console.error("Error adding book", error);
  }
};

export const deleteBook = async (bookId) => {
  try {
    const response = await axios.delete(`${API_URL}/${bookId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting book", error);
  }
};
