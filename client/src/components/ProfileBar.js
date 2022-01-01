import { Tab } from 'semantic-ui-react';
import UsersPosts from "./profile/UsersPosts";
import UsersSavedPosts from "./profile/UsersSavedPosts";
import UsersSavedComments from "./profile/UsersSavedComments";
import Overview from "./profile/Overview";
import { fetchUserPosts, fetchSavedPosts, fetchSavedComments, userPosts, userSavedPosts, userSavedComments, currentUsername, currUser } from '.././reducers/user';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

/*
* Profile bar renders all the user posts, saved posts, and saved comments. It is done in the ProfileBar because when
* they are done in their separate components they are not always rendered correctly. 
* The profile bar dispatches to the backend to get the most up to date user posts, and saved posts/ comments
*
* @author Grace Llewellyn
*/

function ProfileBar() {
  const dispatch = useDispatch();

  const userPostList = useSelector(userPosts);
  const userSavedPostList = useSelector(userSavedPosts);
  const userSavedCommentList = useSelector(userSavedComments);
  const user = useSelector(currUser);
  const status = useSelector(state => state.user.status);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUserPosts(user.username))
      dispatch(fetchSavedPosts(user.id))
      dispatch(fetchSavedComments(user.id))
    }
  }, [status, dispatch])


  const panes = [
    {
      menuItem: 'Overview',
      render: () => <Overview />,
    },
    {
      menuItem: 'Posts',
      render: () => <UsersPosts userPosts={userPostList} />,
    },
    {
      menuItem: 'Saved Posts',
      render: () => <UsersSavedPosts userSavedPosts={userSavedPostList} />,
    },
    {
      menuItem: 'Saved Comments',
      render: () => <UsersSavedComments userSavedComments={userSavedCommentList} />,
    },
  ]

  // Will probably need to change the label for the groups/subgroups menu items
  // Unless we think the pathname will be the name of the group/subgroup
  // Otherwise we can probably do some sort of id lookup based on what's in the URL
  return (
    <div>
      <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
    </div>
  );
}

export default ProfileBar;