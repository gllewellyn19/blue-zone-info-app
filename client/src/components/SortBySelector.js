import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "semantic-ui-react";
import { history } from "../reducers/groups";
import { fetchPosts, filter, filterOptions, updateFilter } from "../reducers/posts";

/*
* This function allows a user to filter the posts they are see on their page. The options are new and top
* New shows the posts that were created more recently and top shows the most liked posts
* 
* @author Alicia Steiman
*/

function SortBySelector() {
    const dispatch = useDispatch();

    const currFilter = useSelector(filter);
    const groupsHistory = useSelector(history);
    const currGroupId = groupsHistory.length > 0 ? groupsHistory[groupsHistory.length - 1].id : 1;

    const [selectedButton, setSelectedButton] = useState(currFilter);

    function onFilterButtonClick(value) {
        dispatch(updateFilter(value));
        dispatch(fetchPosts({ pageId: currGroupId, filter: value }));
        setSelectedButton(value);
    }

    return (
        <Button.Group>
            <Button
                active={selectedButton === filterOptions.NEW}
                onClick={() => onFilterButtonClick(filterOptions.NEW)}
                color={selectedButton === filterOptions.NEW ? "blue" : null}
                content="New"
            />
            <Button
                active={selectedButton === filterOptions.TOP}
                onClick={() => onFilterButtonClick(filterOptions.TOP)}
                color={selectedButton === filterOptions.TOP ? "blue" : null}
                content="Top"
            />
        </Button.Group >
    );
}

export default SortBySelector;