import React from 'react';
import PropTypes from 'prop-types';

import { createContainer } from 'meteor/react-meteor-data';
import { Todos } from './../api/todo.js';
import { Session } from 'meteor/session';
import { Meteor } from 'meteor/meteor';

export default class TodoListItem extends React.Component {
  constructor(props) {
    super(props);
  }
  handleClick() {
    Meteor.call('todos.update', this.props.item._id, {
      completed: !this.props.item.completed
    });

  }
  handleDelete() {
    Meteor.call('todos.delete', this.props.item._id);
  }
  componentDidMount() {
    this.refs.checkBox.checked = this.props.item.completed;
  }
  render() {
    return (
      <div className="item">
        <input className="item__checkbox" id='checkbox' type='checkbox' ref="checkBox" onClick={this.handleClick.bind(this)}/>
        <h2 className="item__text" style={{textDecoration: this.props.item.completed ? "line-through" : "none"}}>{this.props.item.text}</h2>
        <button className="button" onClick={this.handleDelete.bind(this)}> delete item </button>
      </div>
    );
  }

}

TodoListItem.propTypes = {
  item: PropTypes.object,
}
