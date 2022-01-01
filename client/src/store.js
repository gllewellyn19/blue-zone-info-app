import { configureStore } from '@reduxjs/toolkit';
import groupsReducer from './reducers/groups';
import postsReducer from './reducers/posts';
import commentsReducer from './reducers/comments';
import userReducer from './reducers/user';

/*
* Configures the Redux store with the reducers
* Any new reducers will need to be added to the store
*/

export default configureStore({
    reducer: {
        groups: groupsReducer,
        posts: postsReducer,
        comments: commentsReducer,
        user: userReducer,
    },
});