import React from 'react';

export const Footer = (props) => {

  const setNewFilter = (event) => {
    return props.setFilter(event.target.name);
  };

  return (
    <div className="footer">
      <span className="selectAll" role="button" aria-hidden="true" onClick={props.changeAll}>
        {props.active}  tasks left
      </span>
      <button type="button" className={props.filter === 'all' ? 'activeBtn' : 'sleepBtn'} name="all" onClick={setNewFilter}>
        all
      </button>
      <button type="button" className={props.filter === 'active' ? 'activeBtn' : 'sleepBtn'} name="active" onClick={setNewFilter}>
        active
      </button>
      <button type="button" className={props.filter === 'done' ? 'activeBtn' : 'sleepBtn'} name="done" onClick={setNewFilter}>
        done
      </button>
      <button type="button" className="removeAll" onClick={props.everyRemove}>remove completed</button>
    </div>
  );
}
