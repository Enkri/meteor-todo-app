import React from 'react';

import { Todos } from './../api/todo.js';
import { Meteor } from 'meteor/meteor';

export default class AddTodo extends React.Component {
    handleSubmit(e) {
      let todo = e.target.todoItem.value;
      e.preventDefault();
      if (todo) {
        e.target.todoItem.value = '';
        Meteor.call('todos.insert', {
          text: todo,
          userId: Meteor.userId()
        }, (err, res) => {

        });
      }
    }

    render() {
      return (
        <div className="page-content">
          <form className="form" onSubmit={this.handleSubmit.bind(this)}>
            <input className="form__input" type="text" name="todoItem" placeholder="Enter your todo item here" autoComplete="off"/>
            <button className="button"> Create Todo </button>
          </form>
        </div>
      );
    }
}
