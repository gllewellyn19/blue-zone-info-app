import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_KEY, BASE_URL } from '../config';

/*
* Reducer for posts
* Handles fetching posts for a given group, fetching all posts for the home page
* Can also add new posts and update the likes for a given post
*
* Note that stuff related to both users and posts is in the user reducer
* Refactoring efforts will move all post-related actions from user.js into this file (e.g. saved posts)
*
* @author Alicia Steiman
*/

export const filterOptions = { NEW: 'new', TOP: 'top' };

const initialState = {
    posts: [],
    likedByUser: [],
    status: 'idle',
    error: null,
    currPost: null,
    filter: filterOptions.NEW,
};

axios.defaults.baseURL = BASE_URL;

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async ({ pageId, filter }) => {
    const response = await axios.get(`/Pages/${pageId}/posts?filter=${filter}`, {
        headers: {
            Authorization: API_KEY,
        }
    });
    const groupResponse = await axios.get(`/Pages/all/${pageId}`, {
        headers: {
            Authorization: API_KEY
        }
    });
    return { data: response.data, group: groupResponse.data };
});

export const addNewPost = createAsyncThunk('posts/addNewPost', async ({ title, body, author, timestamp, pageId }) => {
    const response = await axios.post(`/Posts`, {
        post_title: title,
        post_body: body,
        page_id: pageId,
        creation_time: timestamp,
        username: author
    }, {
        headers: {
            Authorization: API_KEY
        }
    });
    const groupResponse = await axios.get(`/Pages/all/${pageId}`, {
        headers: {
            Authorization: API_KEY
        }
    });
    return { data: response.data, group: groupResponse.data };
});

export const updatePostLikes = createAsyncThunk('posts/updatePostLikes', async ({ postId, isIncrement }) => {
    const response = await axios.put(`/Posts/${postId}/points`, {
        increment: isIncrement
    }, {
        headers: {
            Authorization: API_KEY
        }
    });
    return { data: response.data, id: postId };
});

export const fetchAllPosts = createAsyncThunk('posts/fetchAllPosts', async () => {
    const response = await axios.get(`/Posts/all`, {
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

export const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        setCurrentPost: (state, action) => {
            state.currPost = action.payload
        },
        updateFilter: (state, action) => {
            state.filter = action.payload
        },
        increaseCommentCount: (state, action) => {
            const idx = state.posts.findIndex(post => post.id === action.payload.postId);
            state.posts[idx].commentCount += 1;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchPosts.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = 'succeeded'
                let ret = [];
                action.payload.data.map((elm) => ret.push({
                    id: elm.post_id,
                    title: elm.post_title,
                    author: elm.username,
                    timestamp: elm.creation_time,
                    body: elm.post_body,
                    commentCount: elm.comment_count,
                    likes: elm.points,
                    pageId: elm.page_id,
                    pageName: action.payload.group[0].page_title,
                }));
                state.posts = ret
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(addNewPost.fulfilled, (state, action) => {
                const newPost = {
                    id: action.payload.data.post_id,
                    title: action.payload.data.post_title,
                    author: action.payload.data.username,
                    timestamp: action.payload.data.creation_time,
                    body: action.payload.data.post_body,
                    commentCount: action.payload.data.comment_count,
                    likes: action.payload.data.points,
                    pageId: action.payload.data.page_id,
                    pageName: action.payload.group[0].page_title
                }
                state.posts.push(newPost)
            })
            .addCase(updatePostLikes.fulfilled, (state, action) => {
                const postIdx = state.posts.findIndex(post => post.id === action.payload.id);
                state.posts[postIdx].likes += 1;
                state.likedByUser = state.likedByUser.concat(state.posts[postIdx]);
            })
            .addCase(fetchAllPosts.fulfilled, (state, action) => {
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
                    pageName: elm.pageName,
                }));
                state.posts = ret
            })
    }
});

export const posts = state => state.posts.posts;
export const currPost = state => state.posts.currPost;
export const filter = state => state.posts.filter;
export const postsLikedByUser = state => state.posts.likedByUser;

export const { setCurrentPost, updateFilter, increaseCommentCount } = postsSlice.actions;

export default postsSlice.reducer;