import axios from "axios";
import {
  NOTE_CREATE_FAIL,
  NOTE_CREATE_REQUEST,
  NOTE_CREATE_SUCCESS,
  NOTE_DELETE_REQUEST,
  NOTE_DELETE_SUCCESS,
  NOTE_LIST_FAIL,
  NOTE_LIST_REQUEST,
  NOTE_LIST_SUCCESS,
  NOTE_UPDATE_FAIL,
  NOTE_UPDATE_REQUEST,
  NOTE_UPDATE_SUCCESS,
} from "../constants/noteConstants";

// this func dispatches action for GETTING NOTES LIST
export const listNotesAction = () => async (dispatch, getState) => {
  try {
    // dispatching action when making request for notes list
    dispatch({
      type: NOTE_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    };

    const { data } = await axios.get(`/api/notes`, config);

    // dispatching action when recieved notes list sucessfully
    dispatch({
      type: NOTE_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    // dispatching action when error
    dispatch({
      type: NOTE_LIST_FAIL,
      payload: message,
    });
  }
};

export const createNoteAction =
  (title, content, category) => async (dispatch, getState) => {
    try {
      dispatch({
        type: NOTE_CREATE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      // setting headers for post request
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      // sending request
      const { data } = await axios.post(
        `api/notes/create`,
        {
          title,
          content,
          category,
        },
        config
      );

      // dispatching action when note created successfully
      dispatch({
        type: NOTE_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      // dispatching action when error
      dispatch({
        type: NOTE_CREATE_FAIL,
        payload: message,
      });
    }
  };

export const updateNoteAction =
  (id, title, content, category) => async (dispatch, getState) => {
    try {
      dispatch({
        type: NOTE_UPDATE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      // setting headers for put request
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      console.log("Sending Update Request");
      // sending request
      const { data } = await axios.put(
        `/api/notes/${id}`,
        { title, content, category },
        config
      );

      // dispatching action when note updated successfully
      dispatch({
        type: NOTE_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      console.log("Error in Update Note ", message);
      // dispatching action when error
      dispatch({
        type: NOTE_UPDATE_FAIL,
        payload: message,
      });
    }
  };

export const noteDeleteAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: NOTE_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    // setting headers for put request
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    console.log("Sending Delete Request");
    // sending request
    const { data } = await axios.delete(`/api/notes/${id}`, config);

    // dispatching action when note updated successfully
    dispatch({
      type: NOTE_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    console.log("Error in Delete Note ", message);
    // dispatching action when error
    dispatch({
      type: NOTE_UPDATE_FAIL,
      payload: message,
    });
  }
};
