import React from 'react';
import PrivateHeader from './PrivateHeader.js';
import AddTodo from './AddTodo.js';
import ItemList from './ItemList.js';

export default () => {
  return (
    <div>
      <PrivateHeader title="Todo Items"/>
      <div className="page-content">
        <AddTodo/>
        <ItemList/>
      </div>
    </div>
  );
};
