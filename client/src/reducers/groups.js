import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_KEY, BASE_URL } from '../config';

/*
* Reducer for groups
* Fetches groups for a given page (home page gets top level groups, anything below gets its subgroups)
* Also allows for creation of new groups 
* 
* This file also handles "group history" which is used to build navigational breadcrumbs in AppBar
* Group history tracks the subgroups that a user clicks into (can be many levels deep)
*
* Future work to this reducer will include being able to join a group and edit a group (such as its description)
*
* @author Alicia Steiman
*/

const initialState = {
    history: [],
    groups: [],
    status: 'idle',
    error: null,
    currGroup: null,
}

axios.defaults.baseURL = BASE_URL;

export const fetchGroups = createAsyncThunk('groups/fetchGroups', async ({ groupId, group, index }) => {
    const response = await axios.get(`/Pages/${groupId}`, {
        headers: {
            Authorization: API_KEY
        }
    });
    return { responseData: response.data, group: group, index: index };
});

export const addNewGroup = createAsyncThunk('groups/addNewGroup', async ({ name, parentId, description }) => {
    const response = await axios.post(`/Pages`, {
        page_title: name,
        page_parent_id: parentId,
        page_description: description
    }, {
        headers: {
            Authorization: API_KEY
        }
    });
    return response.data;
});

export const getGroupById = createAsyncThunk('groups/getGroupById', async (pageId) => {
    const response = await axios.get(`/Pages/all/${pageId}`, {
        headers: {
            Authorization: API_KEY
        }
    });
    return response.data;
});

export const groupsSlice = createSlice({
    name: 'groups',
    initialState,
    reducers: {
        addHistory: (state, action) => {
            state.history.push(action.payload)
        },
        removeHistory: (state, action) => {
            state.history = state.history.slice(0, action.payload + 1)
        },
        clearHistory: (state) => {
            state.history = state.history.splice(0, 0);
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchGroups.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchGroups.fulfilled, (state, action) => {
                state.status = 'succeeded'
                let ret = [];
                action.payload.responseData.map((elm) => ret.push({
                    id: elm.page_id,
                    name: elm.page_title,
                    parentId: elm.page_parent_id,
                    postCount: elm.post_count,
                    description: elm.page_description,
                }));
                if (action.payload.index != null) {
                    if (state.history.length === 1 || action.payload.group.id === 1) {
                        state.history = [];
                    } else {
                        state.history = state.history.slice(0, action.payload.index + 1)
                    }
                } else if (action.payload.group.id !== 1) {
                    state.history.push(action.payload.group);
                }
                state.groups = ret;
            })
            .addCase(fetchGroups.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(addNewGroup.fulfilled, (state, action) => {
                const newGroup = {
                    id: action.payload.page_id,
                    name: action.payload.page_title,
                    parentId: action.payload.page_parent_id,
                    postCount: action.payload.post_count,
                    description: action.payload.page_description,
                }
                state.groups.push(newGroup)
            })
            .addCase(getGroupById.fulfilled, (state, action) => {
                const group = {
                    id: action.payload[0].page_id,
                    name: action.payload[0].page_title,
                    parentId: action.payload[0].page_parent_id,
                    postCount: action.payload[0].post_count,
                    description: action.payload[0].description
                }
                state.currGroup = group;
            })
    }
});

export const groups = state => state.groups.groups;
export const history = state => state.groups.history;
export const currGroup = state => state.groups.currGroup;

export const { addHistory, removeHistory, clearHistory } = groupsSlice.actions;

export default groupsSlice.reducer;