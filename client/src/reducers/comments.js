import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_KEY, BASE_URL } from '../config';

/*
* Reducer for comments
* Fetches comments for a given post, adds new comments, and updates likes for a given comment
*
* Unfortunately does not support liking anything deeper than a subcomment
* Also cannot reply to anything deeper than a subcomment (e.g. can't have sub-subcomments)
*
* Note that stuff related to both users and comments is in the user reducer
* Refactoring efforts will move all comment-related actions from user.js into this file (e.g. saved comments)
*
* @author Alicia Steiman
*/

const initialState = {
    comments: [],
    likedByUser: [],
    status: 'idle',
    error: null,
}

axios.defaults.baseURL = BASE_URL;

const formatSubcomments = (subcomments) => {
    let ret = [];
    if (subcomments == null) {
        return;
    }
    subcomments.map((subcomment) => ret.push({
        id: subcomment.comment_id,
        parentId: subcomment.parent_id,
        postId: subcomment.post_id,
        authorName: subcomment.username,
        timestamp: subcomment.creation_time,
        body: subcomment.comment,
        subcomments: formatSubcomments(subcomment.subComments),
        likes: subcomment.points
    }));
    return ret;
}

const findParentComment = (comments, newComment, idxHistory) => {
    let idx = comments.findIndex(elm => elm.id === newComment.parentId);
    if (idx !== -1) {
        let ret = idxHistory.concat(idx);
        return ret;
    }
    for (let i = 0; i < comments.length; i++) {
        let ret = idxHistory.concat(i);
        return findParentComment(comments[i].subcomments, newComment, ret);
    }
}

// state = [{id: , body: ,}, commentB, commentC]
// commentA.subcomments = [commentD, commentE]
// commentD.subcomments = []

// want to reply to commentD -- commentF

// idxLst = [0, 0, 0, 0]
// state.comments[idx[0]].subcomments[idx[1]].subcomments = state.comments[idx[0]].subcomments[idx[1]].subcomments.concat(newComment)

export const fetchComments = createAsyncThunk('comments/fetchComments', async (postId) => {
    const response = await axios.get(`/Posts/${postId}/comments`, {
        headers: {
            Authorization: API_KEY
        }
    });
    return response.data;
});

export const addNewComment = createAsyncThunk('comments/addNewComment', async ({ author, body, parentId, postId, timestamp }) => {
    const response = await axios.post(`/Comments`, {
        username: author,
        comment: body,
        parent_id: parentId,
        post_id: postId,
        creation_time: timestamp,
    }, {
        headers: {
            Authorization: API_KEY
        }
    });
    return response.data;
});

export const updateCommentLikes = createAsyncThunk('comments/updateCommentLikes', async ({ commentId, isIncrement }) => {
    const response = await axios.put(`/Comments/${commentId}/points`, {
        increment: isIncrement
    }, {
        headers: {
            Authorization: API_KEY
        }
    });
    return { data: response.data, id: commentId };
});

export const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchComments.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchComments.fulfilled, (state, action) => {
                state.status = 'succeeded'
                let ret = [];
                action.payload.map((elm) => ret.push({
                    id: elm.comment_id,
                    parentId: elm.parent_id,
                    postId: elm.post_id,
                    authorName: elm.username,
                    timestamp: elm.creation_time,
                    body: elm.comment,
                    subcomments: formatSubcomments(elm.subComments),
                    likes: elm.points
                }));
                state.comments = ret
            })
            .addCase(fetchComments.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(addNewComment.fulfilled, (state, action) => {
                const newComment = {
                    id: action.payload.comment_id,
                    parentId: action.payload.parent_id,
                    postId: action.payload.post_id,
                    authorName: action.payload.username,
                    timestamp: action.payload.creation_time,
                    body: action.payload.comment,
                    subcomments: action.payload.subComments,
                    likes: action.payload.points
                }
                if (newComment.parentId == null) {
                    state.comments = state.comments.concat(newComment)
                } else {
                    // can only handle one level deep of subcomments, sub-subcomments have been disabled
                    const parentIdx = state.comments.findIndex(comment => comment.id === newComment.parentId);
                    if (parentIdx > -1) {
                        state.comments[parentIdx].subcomments = state.comments[parentIdx].subcomments.concat(newComment);
                    } else {
                        console.log('cannot add deeper than one level')
                    }
                }
            })
            .addCase(updateCommentLikes.fulfilled, (state, action) => {
                // only works for "top-level" comments (i.e. not subcomments or sub-subcomments, etc.)
                const commentIdx = state.comments.findIndex(comment => comment.id === action.payload.id);
                if (commentIdx > -1) {
                    state.comments[commentIdx].likes += 1;
                    state.likedByUser = state.likedByUser.concat(state.comments[commentIdx]);
                } else {
                    console.log('cannot like subcomments')
                }
            })
    }
});

export const comments = state => state.comments.comments;
export const commentsLikedByUser = state => state.comments.likedByUser;

export default commentsSlice.reducer;