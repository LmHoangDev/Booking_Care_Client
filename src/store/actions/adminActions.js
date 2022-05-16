import actionTypes from "./actionTypes";
import {
  getAllCodeService,
  createNewUserService,
  getAllUsers,
  deleteUserService,
  updateUserService,
  getTopDoctorHomeService,
  getAllDoctorsService,
  saveDetailDoctorsService,
  getExtraInforDoctorByIdService,
  postPatientBookingAppointmentService,
  getListSpecialtyService,
  getListClinicService,
  deleteClinicService,
  putChangeActiveAccountService,
  updateClinicService,
  updateSpecialtyService,
} from "../../services/userService";

import { toast } from "react-toastify";
//gender
export const fetchGenderStart = () => {
  return async (dispatch, getState) => {
    try {
      // dispatch(fetchGenderStart());
      let res = await getAllCodeService("gender");
      if (res && res.errCode === 0) {
        dispatch(fetchGenderSuccess(res.data));
      } else {
        dispatch(fetchGenderFailed());
      }
    } catch (error) {
      console.log(error);
    }
  };
};
export const fetchGenderSuccess = (data) => ({
  type: actionTypes.FETCH_GENDER_SUCCESS,
  data,
});

export const fetchGenderFailed = () => ({
  type: actionTypes.FETCH_GENDER_FAILED,
});
//position
export const fetchPositionStart = () => {
  return async (dispatch, getState) => {
    try {
      // dispatch(fetchGenderStart());
      let res = await getAllCodeService("position");
      if (res && res.errCode === 0) {
        dispatch(fetchPositionSuccess(res.data));
      } else {
        dispatch(fetchPositionFailed());
      }
    } catch (error) {
      console.log(error);
    }
  };
};
export const fetchPositionSuccess = (data) => ({
  type: actionTypes.FETCH_POSITION_SUCCESS,
  data,
});

export const fetchPositionFailed = () => ({
  type: actionTypes.FETCH_POSITION_FAILED,
});
//role
export const fetchRoleStart = () => {
  return async (dispatch, getState) => {
    try {
      // dispatch(fetchGenderStart());
      let res = await getAllCodeService("role");
      if (res && res.errCode === 0) {
        dispatch(fetchRoleSuccess(res.data));
      } else {
        dispatch(fetchRoleFailed());
      }
    } catch (error) {
      console.log(error);
    }
  };
};
export const fetchRoleSuccess = (data) => ({
  type: actionTypes.FETCH_ROLE_SUCCESS,
  data,
});

export const fetchRoleFailed = () => ({
  type: actionTypes.FETCH_ROLE_FAILED,
});

//user
//create
export const fetchCreateNewUser = (data) => {
  return async (dispatch, getState) => {
    try {
      // dispatch(fetchGenderStart());
      let res = await createNewUserService(data);
      if (res && res.errCode === 0) {
        toast.success("Thêm mới người dùng thành công!");
        await dispatch(saveUserSuccess());
        await dispatch(fetchAllUsersStart());
      } else {
        dispatch(saveUserFailed());
        toast.error("Thêm mới người dùng thất bại!");
      }
    } catch (error) {
      console.log(error);
    }
  };
};
export const saveUserSuccess = () => ({
  type: actionTypes.CREATE_USER_SUCCESS,
});
export const saveUserFailed = () => ({
  type: actionTypes.CREATE_USER_FAILED,
});
//get list
export const fetchAllUsersStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.FETCH_ALL_USERS_START });
      let res = await getAllUsers("ALL");
      // let res1 = await getTopDoctorHomeService(3);
      // console.log("getdoctor", res1);
      if (res && res.errCode === 0) {
        dispatch(fetchAllUsersSuccess(res.users.reverse()));
      } else {
        dispatch(fetchAllUsersFailed());
      }
    } catch (error) {
      console.log(error);
      dispatch(fetchAllUsersFailed());
    }
  };
};
export const fetchAllUsersSuccess = (data) => {
  return {
    type: actionTypes.FETCH_ALL_USERS_SUCCESS,
    data,
  };
};
export const fetchAllUsersFailed = (data) => {
  return {
    type: actionTypes.FETCH_ALL_USERS_FAILED,
    data,
  };
};
//delete
export const fetchDeleteUserStart = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await deleteUserService(data);
      if (res && res.errCode === 0) {
        toast.success("Xóa người dùng thành công!");
        dispatch(fetchAllUsersStart());
        dispatch(fetchDeleteUserSuccess());
      } else {
        toast.error("Xóa người dùng thất bại!");
        dispatch(fetchDeleteUserFailed());
      }
    } catch (error) {
      console.log(error);
      toast.error("Xóa người dùng thất bại!");
    }
  };
};
export const fetchDeleteUserSuccess = () => {
  return {
    type: actionTypes.DELETE_USER_SUCCESS,
  };
};
export const fetchDeleteUserFailed = () => {
  return {
    type: actionTypes.FETCH_ALL_USERS_FAILED,
  };
};
// update

export const fetchEditUserStart = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await updateUserService(data);
      console.log("response :", res);
      if (res && res.message.errCode === 0) {
        toast.success("Cập nhật người dùng thành công!");
        dispatch(fetchEditUserSuccess());
        dispatch(fetchAllUsersStart());
      } else {
        toast.error("Cập nhật người dùng thất bại!");
        dispatch(fetchEditUserFailed());
      }
    } catch (error) {
      console.log(error);
      toast.error("Cập nhật người dùng thất bại!");
    }
  };
};
export const fetchEditUserSuccess = () => {
  return {
    type: actionTypes.EDIT_USER_SUCCESS,
  };
};
export const fetchEditUserFailed = () => {
  return {
    type: actionTypes.EDIT_USER_FAILED,
  };
};

//doctor is
export const fetchTopDoctor = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getTopDoctorHomeService("");
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_TOP_DOCTORS_SUCCESS,
          doctors: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_TOP_DOCTORS_FAILED,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

//get-all-doctors//

export const fetchAllDoctorsStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllDoctorsService();
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
          doctors: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_ALL_DOCTORS_FAILED,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

//create-detail-doctor

export const fetchSaveInfoDoctorStart = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await saveDetailDoctorsService(data);
      console.log(res);
      if (res && res.errCode === 0) {
        toast.success("Save information successfully !");
        dispatch({
          type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,
        });
      } else {
        toast.error("Save information failded !");
        dispatch({
          type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED,
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Save information failded!");
    }
  };
};

//get-all-time-schedule

export const fetchAllTimeScheduleStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("TIME");
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS,
          dateTimes: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

// get--all-required-doctor-infor

export const fetchAllRequiredDoctorInforStart = () => {
  return async (dispatch, getState) => {
    try {
      let resPrice = await getAllCodeService("price");
      let resPayment = await getAllCodeService("payment");
      let resProvince = await getAllCodeService("province");
      let resSpecialty = await getListSpecialtyService();
      let resClinic = await getListClinicService();
      console.log("res Specialty", resSpecialty);
      if (
        resPrice &&
        resPrice.errCode === 0 &&
        resPayment &&
        resPayment.errCode === 0 &&
        resProvince &&
        resProvince.errCode === 0 &&
        resSpecialty &&
        resSpecialty.errCode === 0 &&
        resClinic &&
        resClinic.errCode === 0
      ) {
        let data = {
          prices: resPrice.data,
          payments: resPayment.data,
          provinces: resProvince.data,
          specialties: resSpecialty.data,
          clinics: resClinic.data,
        };
        dispatch(fetchAllRequiredDoctorInforSuccess(data));
      } else {
        dispatch(fetchAllRequiredDoctorInforFailed());
      }
    } catch (error) {
      console.log(error);
    }
  };
};
export const fetchAllRequiredDoctorInforSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_REQUIRED_DOCTOR_INFOR_SUCCESS,
  data,
});

export const fetchAllRequiredDoctorInforFailed = () => ({
  type: actionTypes.FETCH_ALL_REQUIRED_DOCTOR_INFOR_FAILED,
});

// get-extra-infor-doctor-by-id
export const fetchExtraDoctorInforStart = (id) => {
  return async (dispatch, getState) => {
    try {
      let res = await getExtraInforDoctorByIdService(id);

      if (res && res.errCode === 0) {
        dispatch(fetchExtraDoctorInforSuccess(res.data));
      } else {
        dispatch(fetchAllRequiredDoctorInforFailed());
      }
    } catch (error) {
      console.log(error);
    }
  };
};
export const fetchExtraDoctorInforSuccess = (data) => ({
  type: actionTypes.FETCH_EXTRA_DOCTOR_INFOR_SUCCESS,
  data,
});

export const fetchExtraDoctorInforFailed = () => ({
  type: actionTypes.FETCH_EXTRA_DOCTOR_INFOR_FAILED,
});

//save-patient-booking-appointment

export const savePatientBookingAppointment = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await postPatientBookingAppointmentService(data);
      console.log("res", res);
      if (res && res.infor.errCode === 0) {
        toast.success("Save booking appointment successfully");
        dispatch(savePatientBookingAppointmentSuccess());
      } else {
        toast.error("Save booking appointment failed");
        dispatch(savePatientBookingAppointmentFailed());
      }
    } catch (error) {
      console.log(error);
    }
  };
};
export const savePatientBookingAppointmentSuccess = () => ({
  type: actionTypes.SAVE_BOOKING_APPOINTMENT_SUCCESS,
});
export const savePatientBookingAppointmentFailed = () => ({
  type: actionTypes.SAVE_BOOKING_APPOINTMENT_FAILED,
});

//delete-clinic-by-id

export const deleteClinicById = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await deleteClinicService(data);
      console.log("res", res);
      if (res && res.errCode === 0) {
        toast.success("Delete Clinic successfully");
        await getListClinicService();
      } else {
        toast.error("Delete Clinic failed");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetchChangeActiveAccount = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await putChangeActiveAccountService(data);
      console.log("res", res);
      if (res && res.errCode === 0) {
        toast.success("Change active account successfully");
        await dispatch(fetchAllUsersStart());
        //dispatch(savePatientBookingAppointmentSuccess());
      } else {
        toast.error("Change active account failed");
        //dispatch(savePatientBookingAppointmentFailed());
      }
    } catch (error) {
      console.log(error);
    }
  };
};
export const fetchUpdateClinic = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await updateClinicService(data);
      console.log("res", res);
      if (res && res.message.errCode === 0) {
        toast.success("Cập nhật phòng khám thành công!");
        await dispatch(fetchAllClinicsStart());
        //dispatch(savePatientBookingAppointmentSuccess());
      } else {
        toast.error("Cập nhật phòng khám thất bại!");
        //dispatch(savePatientBookingAppointmentFailed());
      }
    } catch (error) {
      console.log(error);
    }
  };
};
//get list clinic
export const fetchAllClinicsStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.FETCH_ALL_CLINICS_START });
      let res = await getListClinicService();
      // let res1 = await getTopDoctorHomeService(3);
      console.log("getdoctor", res);
      if (res && res.errCode === 0) {
        dispatch(fetchAllClinicsSuccess(res.data));
      } else {
        dispatch(fetchAllClinicsFailed());
      }
    } catch (error) {
      console.log(error);
      dispatch(fetchAllClinicsFailed());
    }
  };
};
export const fetchAllClinicsSuccess = (data) => {
  return {
    type: actionTypes.FETCH_ALL_CLINICS_SUCCESS,
    data,
  };
};
export const fetchAllClinicsFailed = (data) => {
  return {
    type: actionTypes.FETCH_ALL_CLINICS_FAILED,
    data,
  };
};

//get list specialties
export const fetchAllSpecialtiesStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.FETCH_ALL_CLINICS_START });
      let res = await getListSpecialtyService("");

      if (res && res.errCode === 0) {
        dispatch(fetchAllSpecialtiesSuccess(res.data));
      } else {
        dispatch(fetchAllSpecialtiesFailed());
      }
    } catch (error) {
      console.log(error);
      dispatch(fetchAllSpecialtiesFailed());
    }
  };
};
export const fetchAllSpecialtiesSuccess = (data) => {
  return {
    type: actionTypes.FETCH_ALL_SPECIALTIES_SUCCESS,
    data,
  };
};
export const fetchAllSpecialtiesFailed = (data) => {
  return {
    type: actionTypes.FETCH_ALL_SPECIALTIES_FAILED,
    data,
  };
};

//update specialties for
export const fetchUpdateSpecialty = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await updateSpecialtyService(data);
      console.log("res", res);
      if (res && res.message.errCode === 0) {
        toast.success("Cập nhật chuyên khoa thành công!");
        await dispatch(fetchAllSpecialtiesStart());
        //dispatch(savePatientBookingAppointmentSuccess());
      } else {
        toast.error("Cập nhật chuyên khoa thất bại!");
        //dispatch(savePatientBookingAppointmentFailed());
      }
    } catch (error) {
      console.log(error);
    }
  };
};
