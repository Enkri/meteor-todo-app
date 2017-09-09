import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import moment from 'moment';
import SimpleSchema from 'simpl-schema';

export const Todos = new Mongo.Collection('todos');

if (Meteor.isServer) {
  Meteor.publish('todos', function() {
    return Todos.find({ userId: this.userId });
  });
}

Meteor.methods({
  'todos.insert'( todo ) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    new SimpleSchema({
      text: {
        type: String,
        min: 1,
        trim: true
      },
      completed: {
        type: Boolean,
        defaultValue: false,
        optional: true
      },
      userId: {
        type: String,
        min: 1
      }
    }).validate({

      ...todo
    });
    return Todos.insert({
      ...todo,
      completed: false,
      updatedAt: moment().valueOf(),
    });
  },
  'todos.update'(_id, updates) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    new SimpleSchema({
      _id: {
        type: String,
        min: 1
      },
      completed: {
        type: Boolean
      },
      text: {
        type: String,
        min: 1,
        trim: true,
        optional: true
      }
    }).validate({
      _id: _id,
      ...updates
    });
    Todos.update({
      _id: _id,
      userId: this.userId
    },{
      $set: {
        updatedAt: moment().valueOf(),
        ...updates
      }
    });
  },
  'todos.delete'(_id) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    new SimpleSchema({
      _id: {
        min: 1,
        type: String
      }
    }).validate({ _id });
    return Todos.remove({
      userId: this.userId,
      _id: _id
    });
  },

});
