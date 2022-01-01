import { Input, Form, Dropdown, Button } from "semantic-ui-react";
import React, { useState } from 'react';

/*
* Builds the search bar and will later define methods for search functionality
* 
* Different things that a user should be able to search in are: post titles, post content, group names, group descriptions, 
* usernames, comments
* Note that this feature did not have time to be implemented
*
* @author Grace Llewellyn
*/

function SearchBar() {

    const defaultDropdown = "post_titles";
    const [searchContent, setSearchContent] = useState("");
    const [dropdownContent, setDropdownContent] = useState(defaultDropdown);

    const options = [
        { key: 'post_titles', text: 'Post titles', value: 'post_titles' },
        { key: 'post_content', text: 'Post content', value: 'post_content' },
        { key: 'group_names', text: 'Group names', value: 'group_names' },
        { key: 'group_descriptions', text: 'Group descriptions', value: 'group_descriptions' },
        { key: 'usernames', text: 'Usernames', value: 'usernames' },
        { key: 'comments', text: 'Comments', value: 'Comments' },
    ]

    function handleChange(e, { name, value }) {
        setSearchContent(searchContent => value);
    }

    function handleDropdownChange(e, { name, value }) {
        setDropdownContent(dropdownContent => value);
    }

    const onSubmit = (event) => {
        // pass searchContent or dropdownContent
    }

    return (
        <div>
            <Form onSubmit={onSubmit}>
                <Input icon="search" placeholder="Search..." style={{ width: "600px" }} onChange={handleChange}
                    action={
                        <Dropdown button basic floating options={options} defaultValue={defaultDropdown} onChange={handleDropdownChange} />
                    }
                />
            </Form>
        </div>


    );
}

export default SearchBar;