import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";
const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNGU4ODk0Y2NiZGQ5NzI4OWE2ZTkzMiIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2NjYwOTEyMjcsImV4cCI6MTY2NjM1MDQyN30.pCzKuXDDxwzQV5FOjHMS-MM9NC1ZFxW4lndaOwAbV54";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  header: { token: `Bearer ${TOKEN}` },
});