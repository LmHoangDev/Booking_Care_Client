import actionTypes from "../actions/actionTypes";

const initialState = {
  genders: [],
  users: [],
  roles: [],
  positions: [],
  isLoadingGender: false,
  topDoctors: [], //all-doctors-limit
  doctors: [], //all-doctors
  allDataTime: [], //all-times
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_GENDER_START:
      return {
        ...state,
        isLoadingGender: true,
      };
    case actionTypes.FETCH_GENDER_SUCCESS:
      return {
        ...state,
        genders: action.data,
        isLoadingGender: false,
      };
    case actionTypes.FETCH_GENDER_FAILED:
      return {
        ...state,
        isLoadingGender: false,
      };
    case actionTypes.FETCH_POSITION_START:
      return {
        ...state,
        isLoadingGender: true,
      };
    case actionTypes.FETCH_POSITION_SUCCESS:
      return {
        ...state,
        positions: action.data,
        isLoadingGender: false,
      };
    case actionTypes.FETCH_POSITION_FAILED:
      return {
        ...state,
        isLoadingGender: false,
      };
    case actionTypes.FETCH_ROLE_START:
      return {
        ...state,
        isLoadingGender: true,
      };
    case actionTypes.FETCH_ROLE_SUCCESS:
      return {
        ...state,
        roles: action.data,
        isLoadingGender: false,
      };
    case actionTypes.FETCH_ROLE_FAILED:
      return {
        ...state,
        isLoadingGender: false,
      };
    case actionTypes.FETCH_ALL_USERS_START:
      return {
        ...state,
        isLoadingGender: true,
      };
    case actionTypes.FETCH_ALL_USERS_SUCCESS:
      return {
        ...state,
        isLoadingGender: false,
        users: action.data,
      };
    case actionTypes.FETCH_ALL_USERS_FAILED:
      return {
        ...state,
        isLoadingGender: false,
        users: [],
      };
    case actionTypes.FETCH_TOP_DOCTORS_SUCCESS:
      return {
        ...state,
        topDoctors: action.doctors,
      };
    case actionTypes.FETCH_TOP_DOCTORS_FAILED:
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_DOCTORS_SUCCESS:
      return {
        ...state,
        doctors: action.doctors,
      };
    case actionTypes.FETCH_ALL_DOCTORS_FAILED:
      return {
        ...state,
        doctors: [],
      };
    case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS:
      return {
        ...state,
        allDataTime: action.dateTimes,
      };
    case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED:
      return {
        ...state,
        allDataTime: [],
      };
    default:
      return state;
  }
};

export default adminReducer;
