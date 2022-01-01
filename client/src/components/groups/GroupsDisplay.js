import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Card, Container, Loader } from "semantic-ui-react";
import { buildPath } from "../../helpers";
import { fetchGroups, groups, history } from "../../reducers/groups";
import { fetchPosts, filter } from "../../reducers/posts";

/*
* GroupsDisplay renders the carousel of BlueZone groups/subgroups/sub-subgroups/etc. You can navigate on this carousel by sliding
* Clicking on a Group (i.e. card) will navigate the user to that group's page
* Dispatch fetches the posts and groups from the backend
*
* @author Alicia Steiman
*/

function GroupsDisplay() {
    // if the current group has no subgroups, groupsList will be empty
    const groupsList = useSelector(groups);
    const currFilter = useSelector(filter);

    const status = useSelector(state => state.groups.status);
    const error = useSelector(state => state.groups.error);

    const groupsHistory = useSelector(history);
    const currGroupId = groupsHistory.length > 0 ? groupsHistory[groupsHistory.length - 1].id : 1;

    const dispatch = useDispatch();

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchGroups({ groupId: currGroupId, group: { id: 1 }, index: null }))
        }
    }, [status, dispatch, currGroupId])

    // when a user clicks on a group, we want to update the display to have that group's subgroups
    // we also want to add this group to the group history for navigational breadcrumbs
    const handleGroupClick = (group) => {
        dispatch(fetchGroups({ groupId: group.id, group: group, index: null }));
        dispatch(fetchPosts({ pageId: group.id, filter: currFilter }));
    };

    let content;
    if (status === 'loading') {
        content = <Loader content='Loading' />
    } else if (status === 'succeeded') {
        if (groupsList.length > 0) {
            content = groupsList.map((group, idx) =>
                <Card
                    key={group.id}
                    as={NavLink}
                    to={buildPath(group, groupsHistory)}
                    onClick={() => handleGroupClick(group)}
                    className="groupsDisplayCard"
                    style={{ marginLeft: idx === 0 && 20, marginRight: idx === groupsList.length - 1 ? 20 : 10 }}
                >
                    <Card.Content>
                        <Card.Header textAlign="center">
                            {group.name}
                        </Card.Header>
                    </Card.Content>
                </Card>
            )
        }
    } else if (status === 'error') {
        content = <div>{error}</div>
    }

    return groupsList != null && (
        <Container className="groupsDisplayContainer">
            {content != null && content}
        </Container>
    );
}

export default GroupsDisplay;