import axios from "axios";

const instance = axios.create({
  baseURL: "https://ecommerce-project-ufro.herokuapp.com",
});

export default instance;
