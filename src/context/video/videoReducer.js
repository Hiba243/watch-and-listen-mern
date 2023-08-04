import {
    GET_VIDEOS,
    ADD_VIDEO,
    DELETE_VIDEO,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_VIDEO,
    FILTER_VIDEOS,
    CLEAR_FILTER,
    VIDEO_ERROR,
    CLEAR_VIDEOS,
    SET_CURRENT_VIDEO
} from '../types';

export default (state, action) => {
    switch (action.type) {
        case GET_VIDEOS:
            
            return {
                ...state,
                total: action.payload,
                videos: action.payload.filter(
                    video => video.category == "video"
                ),
                images: action.payload.filter(
                    video => video.category == "image"
                ),
                loading: false
            };
        case ADD_VIDEO:
            return {
                ...state,
                total: [action.payload, ...state.total],
                loading: false
            };
        case UPDATE_VIDEO:
            return {
                ...state,
                total: state.total.map(video =>
                    video._id === action.payload._id ? action.payload : video
                ),
                loading: false
            };
        case DELETE_VIDEO:
            localStorage.removeItem('Video');
            return {
                ...state,
                total: state.total.filter(
                    video => video._id !== action.payload
                ),
                loading: false
            };
        case CLEAR_VIDEOS:
            return {
                ...state,
                videos: null,
                filtered: null,
                error: null,
                current: null
            };
        case SET_CURRENT:
            return {
                ...state,
                current: action.payload
            };
            case SET_CURRENT_VIDEO:
            return {
                ...state,
                currentVideo: action.payload.videoId
            };
        case CLEAR_CURRENT:
            return {
                ...state,
                current: null
            };
        case FILTER_VIDEOS:
            return {
                ...state,
                filtered: state.total.filter(video => {
                    const regex = new RegExp(`${action.payload}`, 'gi');
                    return video.name.match(regex) 
                })
            };
        case CLEAR_FILTER:
            return {
                ...state,
                filtered: null
            };
        case VIDEO_ERROR:
            return {
                ...state,
                error: action.payload
            };
        default:
            return state;
    }
};