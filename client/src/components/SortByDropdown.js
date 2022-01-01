import { Dropdown } from "semantic-ui-react";

/*
* SortByDropdown is the UI for the sort feature
* Posts can be sorted by relevant, recent, and top (although this is TBD)
* Thinking we will define sorting methods in the backend and call them when the dropdown value changes
*
* @author Grace Llewellyn
*/

const sortByOptions = [
  {
    key: 'Relevant',
    text: 'Relevant',
    value: 'Relevant',
  },
  {
    key: 'Recent',
    text: 'Recent',
    value: 'Recent',
  },
  {
    key: 'Top',
    text: 'Top',
    value: 'Top',
  },
]

function SortByDropdown() {
  return (
    <div style={{ paddingTop: 0, paddingRight: 50, paddingBottom: 15, textAlign: 'end' }}>
      <span>
        Sort by:{'  '}
        <Dropdown inline options={sortByOptions} defaultValue={sortByOptions[0].value} />
      </span>
    </div>
  )
}

export default SortByDropdown;