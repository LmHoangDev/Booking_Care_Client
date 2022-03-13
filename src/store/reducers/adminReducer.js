import actionTypes from "../actions/actionTypes";

const initialState = {
  genders: [],
  roles: [],
  positions: [],
  isLoadingGender: false,
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
    default:
      return state;
  }
};

export default adminReducer;
