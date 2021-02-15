import React, { useState } from 'react';
import up from '../../../images/view_sort_ascending_icon_181225 (1).svg';
import down from '../../../images/view_sort_descending_icon_181226.svg';

export const Footer = (props) => {
  const [chronoStatus, setChronoStatus] = useState(false);

  const setNewFilter = (event) => {
    return props.setFilter(event.target.name);
  };

  return (
    <div className="footer">
      <span
        className="selectAll"
        role="button"
        aria-hidden="true"
        onClick={props.changeAll}
      >
        {props.active} tasks left
      </span>
      <button
        type="button"
        className={props.filter === 'all' ? 'activeBtn' : 'sleepBtn'}
        name="all"
        onClick={setNewFilter}
      >
        all
      </button>
      <button
        type="button"
        className={props.filter === 'active' ? 'activeBtn' : 'sleepBtn'}
        name="active"
        onClick={setNewFilter}
      >
        active
      </button>
      <button
        type="button"
        className={props.filter === 'done' ? 'activeBtn' : 'sleepBtn'}
        name="done"
        onClick={setNewFilter}
      >
        done
      </button>
      <div
        role="button"
        aria-hidden="true"
        className={chronoStatus ? 'chronology_true' : 'chronology_false'}
        onClick={() => {
          setChronoStatus(!chronoStatus);
          props.setChronology(chronoStatus);
        }}
      >
        <img className="upIcon" src={up} alt={up} />
        <img className="downIcon" src={down} alt={down} />
      </div>
    </div>
  );
};
