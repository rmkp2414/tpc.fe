import {
    CREATE_USER,
    LOGIN_USER,
    RETRIEVE_USERS,
    UPDATE_USER,
    DELETE_USER,
    DELETE_ALL_USERS
  } from "./types";
  
  import UserDataService from "../services/user.service";
  
  export const createUser = (country,firstname, lastname, email, contactnumber, designation, gender, password, confirmpassword, companyname,
    companyemail, companyaddress1, companyaddress2, city, state, zip ) => async (dispatch) => {
    try {
      const res = await UserDataService.create({country,firstname, lastname, email, contactnumber, designation, gender, password, confirmpassword, companyname,
        companyemail, companyaddress1, companyaddress2, city, state, zip  });
  
      dispatch({
        type: CREATE_USER,
        payload: res.data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };


  export const loginUser = (email, password) => async (dispatch) => {
    try {
      const res = await UserDataService.login({email, password});
  
      dispatch({
        type: LOGIN_USER,
        payload: res.data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  
  export const retrieveUsers = () => async (dispatch) => {
    try {
      const res = await UserDataService.getAll();
  
      dispatch({
        type: RETRIEVE_USERS,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
  
  export const updateUser = (id, data) => async (dispatch) => {
    try {
      const res = await UserDataService.update(id, data);
  
      dispatch({
        type: UPDATE_USER,
        payload: data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  
  export const deleteUser = (id) => async (dispatch) => {
    try {
      await UserDataService.delete(id);
  
      dispatch({
        type: DELETE_USER,
        payload: { id },
      });
    } catch (err) {
      console.log(err);
    }
  };
  
  export const deleteAllUsers = () => async (dispatch) => {
    try {
      const res = await UserDataService.deleteAll();
  
      dispatch({
        type: DELETE_ALL_USERS,
        payload: res.data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  
  export const findUsersByTitle = (title) => async (dispatch) => {
    try {
      const res = await UserDataService.findByTitle(title);
  
      dispatch({
        type: RETRIEVE_USERS,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };