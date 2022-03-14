import actionTypes from "./actionTypes";
import {
  getAllCodeService,
  createNewUserService,
  getAllUsers,
  deleteUserService,
  updateUserService,
} from "../../services/userService";
// export const fetchGenderStart = () => ({
//   type: actionTypes.FETCH_GENDER_START,
// });
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
