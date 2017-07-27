import { SET_LIST, SAVE_SCROLL_DIS } from './actionType'
import utils from '../utils/ajax'

const initialState = {
    title: '音乐',
    listData: {},
    scrollDis: 0
}

export function getList(key, data) {
    return (dispatch, getState) => {
        let state = getState()
        if (!state.list.listData.playlist) {
            utils.post(key, data).then(res => {
                dispatch(setList(res))
            })
        }
    }
}

export function setList(data) {
    return {
        type: SET_LIST,
        data
    }
}
export function list(state = initialState, action) {
    switch (action.type) {
        case SET_LIST:
            return Object.assign({}, state, {
                listData: action.data
            })
        case SAVE_SCROLL_DIS:
            return Object.assign({}, state, {
                scrollDis: action.dis
            })
        default:
            return state
    }
}
