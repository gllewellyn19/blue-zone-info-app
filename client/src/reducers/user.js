import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_KEY, BASE_URL } from '../config';

/*
* Reducer for a user
* Contains the user object (which has id, email, username) as well as profile-related information
* Fetches a user's saved posts, reported posts, and saved comments
* Allows users to save/unsave posts and comments as well as report posts
* Also handles authentication (e.g. create account and login flow)
*
* Note that future work will refactor this file so that it only contains user-specific actions
* Anything related to posts or comments will be in their respective reducers
*
* @author Grace Llewellyn, Alicia Steiman
*/


const initialState = {
    user: null,
    status: 'idle',
    error: null,
    userPosts: [],
    userGroups: [],
    // userImage: '',
    isDarkMode: false,
    savedPosts: [],
    savedComments: [],
    reportedPosts: [],
    posts: {
        saved: [],
        status: 'idle',
    },
    login: {
        status: 'idle',
    }
};

axios.defaults.baseURL = BASE_URL;

export const fetchUserPosts = createAsyncThunk('user/fetchUserPosts', async (username) => {
    const response = await axios.get(`/User/${username}`, {
        headers: {
            Authorization: API_KEY,
        }
    });
    for (let idx in response.data) {
        const groupResponse = await axios.get(`/Pages/all/${response.data[idx].page_id}`, {
            headers: {
                Authorization: API_KEY
            }
        });
        const groupName = groupResponse.data[0].page_title;
        response.data[idx].pageName = groupName;
    }
    return response.data;
});


// might need to have fetchRandomImage if using API

export const addSavedPost = createAsyncThunk('user/addSavedPost', async ({ userId, post }) => {
    const response = await axios.post(`/User/${userId}/save?type=1`, {
        post_id: post.id
    }, {
        headers: {
            Authorization: API_KEY
        }
    });
    return { data: response.data, post: post };
});


export const fetchSavedPosts = createAsyncThunk('user/fetchSavedPosts', async (userId) => {
    const response = await axios.get(`/User/${userId}/save?type=1`, {
        headers: {
            Authorization: API_KEY
        }
    });
    for (let idx in response.data) {
        const groupResponse = await axios.get(`/Pages/all/${response.data[idx].page_id}`, {
            headers: {
                Authorization: API_KEY
            }
        });
        const groupName = groupResponse.data[0].page_title;
        response.data[idx].pageName = groupName;
    }
    return response.data;
});

export const unsavePost = createAsyncThunk('user/unsavePost', async ({ post, userId, saveId }) => {
    const response = await axios.delete(`/User/${userId}/save?type=1`, {
        data: {
            save_id: saveId
        }
        ,
        headers: {
            Authorization: API_KEY
        }
    });
    return { data: response.data, post: post };
});

export const fetchSavedComments = createAsyncThunk('user/fetchSavedComments', async (userId) => {
    const response = await axios.get(`/User/${userId}/save?type=2`, {
        headers: {
            Authorization: API_KEY
        }
    });
    return response.data;
});

export const addSavedComment = createAsyncThunk('user/addSavedComment', async ({ comment, userId }) => {
    const response = await axios.post(`/User/${userId}/save?type=2`, {
        comment_id: comment.id
    }, {
        headers: {
            Authorization: API_KEY
        }
    });
    return { data: response.data, comment: comment };
});
// might need to have fetchRandomImage if using API



export const unsaveComment = createAsyncThunk('user/unsaveComment', async ({ comment, userId, saveId }) => {
    const response = await axios.delete(`/User/${userId}/save?type=2`, {
        data: {
            save_id: saveId //TODO fix this
        }
        ,
        headers: {
            Authorization: API_KEY
        }
    });
    return { data: response.data, comment: comment };
});


export const reportPost = createAsyncThunk('user/reportPost', async (post) => {
    const response = await axios.post(`/Posts/${post.id}/reported`, {
        reported: true
    }, {
        headers: {
            Authorization: API_KEY
        }
    });
    return { data: response.data, post: post };
});

export const unreportPost = createAsyncThunk('user/unreportPost', async (post) => {
    const response = await axios.post(`/Posts/${post.id}/reported`, {
        reported: false
    }, {
        headers: {
            Authorization: API_KEY
        }
    });
    return { data: response.data, post: post };
});

// eventually this file will probably also handle login flow
// and i think it could save preferences/settings

export const login = createAsyncThunk('user/login', async ({ email, password }) => {
    const response = await axios.post(`/User/login`, {
        user_email: email,
        password: password
    }, {
        headers: {
            Authorization: API_KEY
        }
    });
    return { data: response.data, email: email };
});

export const createAccount = createAsyncThunk('user/createAccount', async ({ email, password, username }) => {
    const response = await axios.post(`/User`, {
        user_email: email,
        password: password
    }, {
        headers: {
            Authorization: API_KEY
        }
    });
    return { data: response.data, username: username };
});

export const setUsername = createAsyncThunk('user/setUsername', async ({ userId, username }) => {
    const response = await axios.post(`/User/${userId}`, {
        username: username
    }, {
        headers: {
            Authorization: API_KEY
        }
    });
    return response.data;
});

export const getUsername = createAsyncThunk('user/getUsername', async (userId) => {
    const response = await axios.put(`/User/${userId}`, {}, {
        headers: {
            Authorization: API_KEY
        }
    });
    return response.data;
});

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setDarkMode: (state) => {
            state.isDarkMode = true
        }
        // unless we use an API we can define a reducer here for changing the profile image (assuming we are storing the images and randomly selecting them)
    },
    extraReducers(builder) {
        builder
            .addCase(fetchUserPosts.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchUserPosts.fulfilled, (state, action) => {
                state.status = 'succeeded'
                let ret = [];
                action.payload.map((elm) => ret.push({
                    id: elm.post_id,
                    title: elm.post_title,
                    author: elm.username,
                    timestamp: elm.creation_time,
                    body: elm.post_body,
                    commentCount: elm.comment_count,
                    likes: elm.points,
                    pageId: elm.page_id,
                    pageName: elm.pageName
                }));
                state.userPosts = ret;
            })
            .addCase(fetchUserPosts.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(fetchSavedPosts.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchSavedPosts.fulfilled, (state, action) => {
                state.status = 'succeeded'
                let ret = [];
                action.payload.map((elm) => ret.push({
                    id: elm.post_id,
                    title: elm.post_title,
                    author: elm.username,
                    timestamp: elm.creation_time,
                    body: elm.post_body,
                    commentCount: elm.comment_count,
                    likes: elm.points,
                    pageId: elm.page_id,
                    saveId: elm.save_id,
                    pageName: elm.pageName
                }));
                state.savedPosts = ret;
            })
            .addCase(fetchSavedPosts.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(fetchSavedComments.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchSavedComments.fulfilled, (state, action) => {
                state.status = 'succeeded'
                let ret = [];
                action.payload.map((elm) => ret.push({
                    id: elm.comment_id,
                    authorName: elm.username,
                    body: elm.comment,
                    parent_id: elm.parent_id,
                    postId: elm.post_id,
                    timestamp: elm.creation_time,
                    likes: elm.points,
                    saveId: elm.save_id
                }));
                state.savedComments = ret;
            })
            .addCase(fetchSavedComments.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(addSavedPost.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(addSavedPost.fulfilled, (state, action) => {
                const newSavedPost = {
                    id: action.payload.post.id,
                    title: action.payload.post.title,
                    author: action.payload.post.author,
                    timestamp: action.payload.post.timestamp,
                    body: action.payload.post.body,
                    commentCount: action.payload.post.commentCount,
                    likes: action.payload.post.likes,
                    pageId: action.payload.post.pageId,
                    saveId: action.payload.data.save_id
                }
                state.savedPosts = state.savedPosts.concat(newSavedPost);
            })
            .addCase(addSavedPost.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(unsavePost.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(unsavePost.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(unsavePost.fulfilled, (state, action) => {
                let spotDelete = state.savedPosts.findIndex(post => post.id === action.payload.post.id);
                if (spotDelete > -1) {
                    state.savedPosts.splice(spotDelete, 1);
                }
            })
            .addCase(unsaveComment.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(unsaveComment.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(unsaveComment.fulfilled, (state, action) => {
                let spotDelete = state.savedComments.findIndex(comment => comment.id === action.payload.comment.id);
                if (spotDelete > -1) {
                    state.savedComments.splice(spotDelete, 1);
                }
            })
            .addCase(addSavedComment.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(addSavedComment.fulfilled, (state, action) => {
                const newSavedComment = {
                    id: action.payload.comment.id,
                    parentId: action.payload.comment.parentId,
                    postId: action.payload.comment.postId,
                    authorName: action.payload.comment.authorName,
                    timestamp: action.payload.comment.timestamp,
                    body: action.payload.comment.body,
                    likes: action.payload.comment.likes,
                    subcomments: action.payload.comment.subcomments,
                    saveId: action.payload.data.save_id
                }
                state.savedComments = state.savedComments.concat(newSavedComment);
            })
            .addCase(addSavedComment.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(reportPost.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(reportPost.fulfilled, (state, action) => {
                state.reportedPosts = state.reportedPosts.concat(action.payload.post);
            })
            .addCase(reportPost.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(unreportPost.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(unreportPost.fulfilled, (state, action) => {
                let spotDelete = state.reportedPosts.findIndex(post => post.id === action.payload.post.id);
                if (spotDelete > -1) {
                    state.reportedPosts = state.reportedPosts.splice(spotDelete, 1);
                }
            })
            .addCase(unreportPost.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(login.rejected, (state, action) => {
                state.login.status = 'failed'
            })
            .addCase(login.fulfilled, (state, action) => {
                state.login.status = 'succeeded';
                const user = {
                    id: action.payload.data.user_id,
                    email: action.payload.email,
                    // needed for the useEffect in Home.js, indicates that the user was pushed from Login
                    username: null,
                }
                state.user = user
            })
            .addCase(createAccount.fulfilled, (state, action) => {
                const user = {
                    id: action.payload.data.id,
                    email: action.payload.data.user_email,
                    username: action.payload.username,
                    // needed for the useEffect in Home.js, indicates that the user was pushed from CreateAccount
                    createAccount: true,
                }
                state.user = user
            })
            .addCase(getUsername.fulfilled, (state, action) => {
                state.user.username = action.payload[0].username
            })
    }
});

export const userPosts = state => state.user.userPosts;
export const userSavedPosts = state => state.user.savedPosts;
export const userSavedComments = state => state.user.savedComments;
export const isDarkMode = state => state.user.isDarkMode;
export const currentUsername = state => state.user.username;
export const currentUserEmail = state => state.user.email;

export const currUser = state => state.user.user;
export const loginStatus = state => state.user.login.status;

export const { setDarkMode } = userSlice.actions;

export default userSlice.reducer;