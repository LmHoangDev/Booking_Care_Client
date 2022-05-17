import actionTypes from "../actions/actionTypes";

const initialState = {
  genders: [],
  users: [],
  roles: [],
  positions: [],
  clinics: [],
  specialties: [],
  posts: [],
  isLoadingGender: false,
  topDoctors: [], //all-doctors-limit
  doctors: [], //all-doctors
  allDataTime: [], //all-times

  //get-all-required-doctor-information

  allRequiredDoctors: {},
  allExtraInforDoctor: {},
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
    case actionTypes.FETCH_ALL_REQUIRED_DOCTOR_INFOR_SUCCESS:
      return {
        ...state,
        allRequiredDoctors: action.data,
        isLoadingGender: false,
      };
    case actionTypes.FETCH_ALL_REQUIRED_DOCTOR_INFOR_FAILED:
      return {
        ...state,
        allRequiredDoctors: {},
        isLoadingGender: false,
      };
    case actionTypes.FETCH_EXTRA_DOCTOR_INFOR_SUCCESS:
      return {
        ...state,
        allExtraInforDoctor: action.data,
      };
    case actionTypes.FETCH_EXTRA_DOCTOR_INFOR_FAILED:
      return {
        ...state,
        allExtraInforDoctor: {},
      };
    case actionTypes.FETCH_ALL_CLINICS_START:
      return {
        ...state,
        isLoadingGender: true,
      };
    case actionTypes.FETCH_ALL_CLINICS_SUCCESS:
      return {
        ...state,
        isLoadingGender: false,
        clinics: action.data,
      };
    case actionTypes.FETCH_ALL_CLINICS_FAILED:
      return {
        ...state,
        clinics: [],
      };
    case actionTypes.FETCH_ALL_SPECIALTIES_START:
      return {
        ...state,
        isLoadingGender: true,
      };
    case actionTypes.FETCH_ALL_SPECIALTIES_SUCCESS:
      return {
        ...state,
        isLoadingGender: false,
        specialties: action.data,
      };
    case actionTypes.FETCH_ALL_SPECIALTIES_FAILED:
      return {
        ...state,
        specialties: [],
      };

    case actionTypes.FETCH_ALL_POSTS_START:
      return {
        ...state,
        isLoadingGender: true,
      };
    case actionTypes.FETCH_ALL_POSTS_SUCCESS:
      return {
        ...state,
        isLoadingGender: false,
        posts: action.data,
      };
    case actionTypes.FETCH_ALL_POSTS_FAILED:

    default:
      return state;
  }
};

export default adminReducer;
