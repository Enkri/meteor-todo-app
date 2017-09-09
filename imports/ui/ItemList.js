import React from 'react';
import PropTypes from 'prop-types';
import TodoListEmptyItem from './TodoListEmptyItem';
import TodoListItem from './TodoListItem';
import FlipMove from 'react-flip-move';

import { Todos } from './../api/todo.js';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

export class ItemList extends React.Component {
    renderTodoItems() {
      return this.props.items.map(function(item) {
        return <TodoListItem key={item._id} item={item}/>;
      })
    }
    render() {
      return (
        <div>
          <div className="page-content">
            <FlipMove maintainContainerHeight={true}>
              {this.renderTodoItems()}
            </FlipMove>
          </div>
        </div>
      );
    }
}

ItemList.propTypes = {
  items: PropTypes.array.isRequired
}

export default TodoContainer = createContainer(() => {
  Meteor.subscribe('todos');
  return {
    items: Todos.find({}, {sort: {completed: 1, updatedAt: -1}}).fetch()
  };
}, ItemList);
