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
const getAllCodeService = (data) => {
  return axios.get(`/api/allcode?type=${data}`);
};

const getTopDoctorHomeService = (limit) => {
  return axios.get(`/api/top-doctor-home?limit=${limit}`);
};

const getAllDoctorsService = () => {
  return axios.get(`/api/get-all-doctors`);
};
const saveDetailDoctorsService = (data) => {
  return axios.post(`/api/save-infor-doctors`, data);
};

const getDetailDoctorById = (id) => {
  return axios.get(`/api/get-detail-doctor-by-id?id=${id}`);
};

const saveBulkCreateSchedule = (data) => {
  return axios.post(`/api/bulk-create-schedule`, data);
};

const getScheduleDoctorByDateService = (doctorId, date) => {
  return axios.get(
    `/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`
  );
};

const getExtraInforDoctorByIdService = (doctorId) => {
  return axios.get(`/api/get-extra-infor-doctor-by-id?doctorId=${doctorId}`);
};

export {
  handleLoginApi,
  getAllUsers,
  createNewUserService,
  deleteUserService,
  updateUserService,
  getAllCodeService,
  getTopDoctorHomeService,
  getAllDoctorsService,
  saveDetailDoctorsService,
  getDetailDoctorById,
  saveBulkCreateSchedule,
  getScheduleDoctorByDateService,
  getExtraInforDoctorByIdService,
};
