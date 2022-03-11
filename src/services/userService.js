import axios from "../axios";
const handleLoginApi = (email, password) => {
  return axios.post("/api/login", {
    email,
    password,
  });
};
const getAllUsers = (id) => {
  return axios.get(`/api/get-all-users?id=${id}`);
};
const createNewUserService = (data) => {
  return axios.post(`/api/create-new-user`, data);
};
const deleteUserService = (usedId) => {
  return axios.delete(`/api/delete-user`, {
    data: {
      id: usedId,
    },
  });
};
const updateUserService = (data) => {
  return axios.put(`/api/edit-user`, data);
};
export {
  handleLoginApi,
  getAllUsers,
  createNewUserService,
  deleteUserService,
  updateUserService,
};
