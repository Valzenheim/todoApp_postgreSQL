import React, { useState } from 'react';
import trash from '../../../images/trash-alt-solid.svg';
import check from '../../../images/check-solid.svg';
import { useHttp } from '../../../hooks/http.hook';

export default function Task({
  localItemRemover,
  editTaskName,
  toggleStatus,
  item,
  setCountOfItems,
}) {
  const { request } = useHttp();
  const [formStatus, setFormStatus] = useState(false);
  const [formValue, setFormValue] = useState(item.taskName);
  const [done, setDone] = useState(item.done);

  const statusChanger = async () => {
    // toggleStatus(item.id, !item.done);
    setDone(!done);
    await request('api/list', 'put', {
      target: { id: item.id },
      newValue: { done: !done },
    });
    setCountOfItems();
  };

  const setEditValue = (event) => {
    return setFormValue(event.target.value);
  };

  const itemRemover = async () => {
    // localItemRemover(item.id);
    await request(`api/list/?id=${item.id}`, 'delete');
    setCountOfItems();
  };

  const setNewTaskValue = () => {
    editTaskName(item.id, formValue);
    setFormStatus(!formStatus);
  };

  return (
    <div className={done ? 'completed' : 'active'}>
      <div
        className="checkContainer"
        id={item.id}
        role="button"
        aria-hidden="true"
        onClick={statusChanger}
      >
        <img className="markIcon" src={check} alt={check} />
      </div>
      <div
        className="textArea"
        onDoubleClick={() => {
          setFormStatus(true);
        }}
      >
        {formStatus ? (
          <input
            onBlur={() => {
              setFormStatus(false);
              setFormValue(item.taskName);
            }}
            className="editTaskInput"
            onChange={setEditValue}
            value={formValue}
            autoFocus={true}
            onKeyPress={(event) => {
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
