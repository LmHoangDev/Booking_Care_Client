import actionTypes from "./actionTypes";
import { getAllCodeService } from "../../services/userService";
// export const fetchGenderStart = () => ({
//   type: actionTypes.FETCH_GENDER_START,
// });

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
