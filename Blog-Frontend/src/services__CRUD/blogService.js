import axios from "../axios";

const getAll = () => {
  return axios.get("/api/posts");
};

const get = (id) => {
  return axios.get(`/api/posts${id}`);
};

const create = (data) => {
  return axios.post("/api/posts", data);
};

const update = (id, data) => {
  return axios.put(`/api/posts/${id}`, data);
};

const remove = (id) => {
  return axios.delete(`/api/posts/${id}`);
};

const removeAll = () => {
  return axios.delete(`/api/posts`);
};

const findByTitle = (title) => {
  return axios.get(`/api/posts?title=${title}`);
};

export default {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByTitle,
};
