import React, { useState, useCallback, useContext, useEffect } from 'react';
import Task from './components/Task';
import Header from './components/Header';
import './styles/style.css';
import { useHttp } from '../../hooks/http.hook';
import { AuthContext } from '../../Context/AuthContext';
import up from '../../images/view_sort_ascending_icon_181225 (1).svg';
import down from '../../images/view_sort_descending_icon_181226.svg';

export default function TodoApp() {
  const { request } = useHttp();
  const [taskArray, setTaskArray] = useState([
    { taskName: '12321', done: true },
  ]);
  const [form, setForm] = useState('');
  const [filter, setFilter] = useState('all');
  const [chrono, setChrono] = useState(false);
  const auth = useContext(AuthContext);

  const fetchTasks = useCallback(async () => {
    const fetched = await request(`/api/list/`, 'get');
    return setTaskArray([...fetched]);
  }, [request]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const formHandler = (event) => {
    return setForm(event.target.value);
  };

  const changeFilter = async (event) => {
    const newFilter = event.target.name;
    const data = await request(
      `api/list/?chrono=${chrono}&filter=${newFilter}`,
      'get'
    );
    setFilter(newFilter);
    setTaskArray(data);
  };

  const setEveryOneStatus = async () => {
    const oldTasks = [...taskArray];
    let newStatus = Boolean;
    oldTasks.filter((x) => !x.done).length > 0
      ? (newStatus = true)
      : (newStatus = false);
    oldTasks.map((item) => (item.done = newStatus));
    await request('/api/list', 'put', {
      target: { ownerId: auth.userId },
      newValue: { done: newStatus },
    });
    setTaskArray(oldTasks);
  };

  const editTaskName = async (target, value) => {
    const tasks = taskArray.map((item) =>
      item.id === target ? (item.taskName = value) : null
    );
    await request('api/list', 'put', {
      target: { id: target },
      newValue: { taskName: value },
    });
  };

  const setChronology = async () => {
    const data = await request(
      `api/list/?chrono=${chrono}&filter=${filter}`,
      'get'
    );
    setTaskArray([...data]);
  };

  const toggleStatus = (index, status) => {
    const tasks = [...taskArray];
    tasks[taskArray.findIndex((el) => el.id === index)].done = status;
    return setTaskArray([...tasks]);
  };

  const localItemRemover = async (item) => {
    const tasks = taskArray.filter((x) => x.id !== item);
    setTaskArray(tasks);
  };

  const addingNewTask = async () => {
    if (!/[0-9a-zA-Zа-яёА-ЯЁ]/i.test(form)) {
      return null;
    }
    const data = await request('api/list', 'post', {
      taskName: form,
    });
    const tasks = taskArray;
    tasks.push(data);
    setTaskArray(tasks);
    return setForm('');
  };

  const taskRender = () => {
    let tasks = [];
    if (filter === 'all') {
      tasks = taskArray;
    } else if (filter === 'active') {
      tasks = taskArray.filter((x) => !x.done);
    } else if (filter === 'done') {
      tasks = taskArray.filter((x) => x.done);
    }
    return tasks.map((item) => (
      <Task
        item={item}
        key={item.id}
        localItemRemover={localItemRemover}
        toggleStatus={toggleStatus}
        editTaskName={editTaskName}
      />
    ));
  };

  return (
    <div>
      <Header />
      <div className="App">
        <div className="formContainer">
          <div className="todoHeader">todo</div>
          <div
            className="appForm"
            role="button"
            aria-hidden="true"
            onKeyPress={(event) => {
              if (event.key === 'Enter') {
                addingNewTask();
              }
            }}
          >
            <input
              type="text"
              className="formInput"
              placeholder="Enter your task name here"
              value={form}
              onChange={formHandler}
            />
          </div>
        </div>
        <div className="footer">
          <div
            role="button"
            aria-hidden="true"
            className={chrono ? 'chronology_true' : 'chronology_false'}
            onClick={() => {
              setChrono(!chrono);
              setChronology(chrono);
            }}
          >
            <img className="upIcon" src={up} alt={up} />
            <img className="downIcon" src={down} alt={down} />
          </div>
          <div className="filterButtons">
            <button
              type="button"
              className={filter === 'all' ? 'activeBtn' : 'sleepBtn'}
              name="all"
              onClick={changeFilter}
            >
              all
            </button>
            <button
              type="button"
              className={filter === 'active' ? 'activeBtn' : 'sleepBtn'}
              name="active"
              onClick={changeFilter}
            >
              active
            </button>
            <button
              type="button"
              className={filter === 'done' ? 'activeBtn' : 'sleepBtn'}
              name="done"
              onClick={changeFilter}
            >
              done
            </button>
          </div>
        </div>
        <div className="section">{taskRender()}</div>
        {/* <Footer
          filter={filter}
          active={actives}
          setFilter={changeFilter}
          changeAll={setEveryOneStatus}
          setChronology={setChronology}
        /> */}
      </div>
    </div>
  );
}
