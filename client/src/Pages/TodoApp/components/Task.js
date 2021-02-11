import React from 'react';
import trash from '../../../images/trash-alt-solid.svg';
import check from '../../../images/check-solid.svg';
import { useHttp } from '../../../hooks/http.hook';

export default function Task({ localItemRemover, toggleStatus, item }) {
  const { request } = useHttp();

  const statusChanger = async () => {
    toggleStatus(item.id, !item.done);

    return await request('app/todoApp/setTaskStatus', 'PUT', {
      id: item.id,
      value: item.done,
    });
  };

  const itemRemover = async () => {
    localItemRemover(item.id);

    return await request('app/todoApp/removeOne', 'DELETE', { id: item.id });
  };

  return (
    <div className={item.done ? 'completed' : 'active'}>
      <div
        className="checkContainer"
        id={item.id}
        role="button"
        aria-hidden="true"
        onClick={statusChanger}
      >
        <img className="markIcon" src={check} alt={check} />
      </div>
      <span className="textArea">{item.taskName}</span>
      <span
        className="remSpan"
        role="button"
        aria-hidden="true"
        onClick={itemRemover}
      >
        <img className="trashIcon" src={trash} alt={trash} />
      </span>
    </div>
  );
}
