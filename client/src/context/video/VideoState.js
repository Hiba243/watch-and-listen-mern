import React, { useReducer } from 'react';
import axios from 'axios';
import VideoContext from './videoContext';
import videoReducer from './videoReducer';
import {
    GET_VIDEOS,
    ADD_VIDEO,
    DELETE_VIDEO,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_VIDEO,
    FILTER_VIDEOS,
    CLEAR_VIDEOS,
    CLEAR_FILTER,
    VIDEO_ERROR
} from '../types';

const VideoState = props => {
    const initialState = {
        videos: null,
        current: null,
        filtered: null,
        error: null
    };

    const [state, dispatch] = useReducer(videoReducer, initialState);

    // Get Videos
    const getVideos = async () => {
        try {
            const res = await axios.get('/api/video');

            dispatch({
                type: GET_VIDEOS,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: VIDEO_ERROR,
                payload: err.response.msg
            });
        }
    };

    // Add Video
    const addVideo = async video => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        try {
            const res = await axios.post('/api/video', video, config);

            dispatch({
                type: ADD_VIDEO,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: VIDEO_ERROR,
                payload: err.response.msg
            });
        }
    };

    // Delete Video
    const deleteVideo = async id => {
        try {
            await axios.delete(`/api/video/${id}`);

            dispatch({
                type: DELETE_VIDEO,
                payload: id
            });
        } catch (err) {
            dispatch({
                type: VIDEO_ERROR,
                payload: err.response.msg
            });
        }
    };

    // Update Video
    const updateVideo = async video => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        try {
            const res = await axios.put(
                `/api/video/${video._id}`,
                video,
                config
            );

            dispatch({
                type: UPDATE_VIDEO,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: VIDEO_ERROR,
                payload: err.response.msg
            });
        }
    };

    // Clear Videos
    const clearVideos = () => {
        dispatch({ type: CLEAR_VIDEOS });
    };

    // Set Current Video
    const setCurrent = video => {
        dispatch({ type: SET_CURRENT, payload: video });
    };

    // Clear Current Video
    const clearCurrent = () => {
        dispatch({ type: CLEAR_CURRENT });
    };

    // Filter Videos
    const filterVideos = text => {
        dispatch({ type: FILTER_VIDEOS, payload: text });
    };

    // Clear Filter
    const clearFilter = () => {
        dispatch({ type: CLEAR_FILTER });
    };

    return (
        <VideoContext.Provider
            value={{
                videos: state.videos,
                current: state.current,
                filtered: state.filtered,
                error: state.error,
                addVideo,
                deleteVideo,
                setCurrent,
                clearCurrent,
                updateVideo,
                filterVideos,
                clearFilter,
                getVideos,
                clearVideos
            }}
        >
            {props.children}
        </VideoContext.Provider>
    );
};

export default VideoState;