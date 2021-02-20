import React, { useState } from 'react';
import trash from '../../../images/trash-alt-solid.svg';
import check from '../../../images/check-solid.svg';
import { useHttp } from '../../../hooks/http.hook';

export default function Task({
  localItemRemover,
  editTaskName,
  toggleStatus,
  item,
}) {
  const { request } = useHttp();
  const [formStatus, setFormStatus] = useState(false);
  const [formValue, setFormValue] = useState(item.taskName);

  const statusChanger = async () => {
    toggleStatus(item.id, !item.done);
    await request('api/list', 'put', null, {
      target: { id: item.id },
      newValue: { done: item.done },
    });
  };

  const setEditValue = (event) => {
    return setFormValue(event.target.value);
  };

  const itemRemover = async () => {
    localItemRemover(item.id);
    await request(`api/list/?id=${item.id}`, 'delete');
  };

  const setNewTaskValue = () => {
    editTaskName(item.id, formValue);
    setFormStatus(!formStatus);
  };

  return (
    <div
      className={item.done ? 'completed' : 'active'}
      onDoubleClick={() => {
        setFormStatus(true);
      }}
    >
      <div
        className="checkContainer"
        id={item.id}
        role="button"
        aria-hidden="true"
        onClick={statusChanger}
      >
        <img className="markIcon" src={check} alt={check} />
      </div>
      <div className="textArea">
        {formStatus ? (
          <input
            onBlur={() => {
              setFormStatus(false);
            }}
            className="editTaskInput"
            onChange={setEditValue}
            value={formValue}
            autoFocus={true}
            onKeyPress={(event) => {
              console.log('@@@@@@@ formStatus:', formStatus);
              if (event.key === 'Enter') {
                setNewTaskValue();
              }
            }}
          />
        ) : (
          item.taskName
        )}
      </div>
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
