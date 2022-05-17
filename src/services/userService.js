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

const getProfileDoctorByIdService = (doctorId) => {
  return axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`);
};

const postPatientBookingAppointmentService = (data) => {
  return axios.post(`/api/patient-book-appointment`, data);
};
const postVerifyBookingAppointmentService = (data) => {
  return axios.post(`/api/verify-book-appointment`, data);
};

const postCreateNewSpecialtyService = (data) => {
  return axios.post(`/api/create-new-specialty`, data);
};

const getListSpecialtyService = (data) => {
  return axios.get(`api/get-list-specialty?limit=${data}`);
};
const getDetailSpecialtyByIdLocationService = (data) => {
  return axios.get(
    `/api/get-detail-specialty-by-id-location?id=${data.id}&location=${data.location}`
  );
};

const postCreateNewClinicService = (data) => {
  return axios.post(`/api/create-new-clinic`, data);
};

const getListClinicService = () => {
  return axios.get(`/api/get-all-clinic`);
};
const getDetailClinicByIdService = (data) => {
  return axios.get(`/api/get-details-clinic-by-id?id=${data}`);
};

const getAllPatientForDoctorService = (data) => {
  return axios.get(
    `/api/get-list-patient-for-doctor?doctorId=${data.doctorId}&date=${data.date}`
  );
};
const sendRemedyService = (data) => {
  return axios.post(`/api/send-remedy`, data);
};
const deleteClinicService = (id) => {
  return axios.post(`/api/delete-clinic-by-id`, id);
};

// 15-05-2022
const putChangeActiveAccountService = (data) => {
  return axios.post(`/api/auth/activeAccount`, data);
};
const updateClinicService = (data) => {
  return axios.post(`/api/edit-clinic`, data);
};
const updateSpecialtyService = (data) => {
  return axios.post(`/api/edit-specialty`, data);
};
const updatePostService = (data) => {
  return axios.post(`/api/update-post`, data);
};
const deleteSpecialtyService = (id) => {
  return axios.post(`/api/delete-specialty-by-id`, id);
};

//17-05-2022
const getListPostService = () => {
  return axios.get(`/api/get-all-post`);
};
const postCreateNewPostService = (data) => {
  return axios.post(`/api/create-new-post`, data);
};
const deletePostService = (id) => {
  return axios.post(`/api/delete-post-by-id`, id);
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
  getProfileDoctorByIdService,
  postPatientBookingAppointmentService,
  postVerifyBookingAppointmentService,
  postCreateNewSpecialtyService,
  getListSpecialtyService,
  getDetailSpecialtyByIdLocationService,
  postCreateNewClinicService,
  getListClinicService,
  getDetailClinicByIdService,
  getAllPatientForDoctorService,
  sendRemedyService,
  deleteClinicService,
  putChangeActiveAccountService,
  updateClinicService,
  updateSpecialtyService,
  deleteSpecialtyService,
  getListPostService,
  postCreateNewPostService,
  updatePostService,
  deletePostService,
};
