import React, { useState, useCallback, useContext, useEffect } from 'react';
import Task from './components/Task';
import { Footer } from './components/Footer';
import Header from './components/Header';
import './styles/style.css';
import { useHttp } from '../../hooks/http.hook';
import { AuthContext } from '../../Context/AuthContext';

export default function TodoApp() {
  const { request } = useHttp();
  const [taskArray, setTaskArray] = useState([]);
  const [form, setForm] = useState('');
  const [filtration, setFiltration] = useState('all');
  const [actives, setActives] = useState(null);
  const [chrono, setChrono] = useState(false);
  const auth = useContext(AuthContext);

  const counter = useCallback(
    (array) => {
      const activeCount = array.filter((item) => !item.done).length;
      return setActives(activeCount);
    },
    [taskArray]
  );

  const fetchTasks = useCallback(async () => {
    console.log('@@@@@@@ userId:', auth.userId);
    const fetched = await request(`/api/list/?ownerId=${auth.userId}`, 'get');
    setTaskArray([...fetched]);
    return counter(fetched);
  }, [request]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const formHandler = (event) => {
    return setForm(event.target.value);
  };

  const changeFilter = async (filter) => {
    const data = await request(
      `api/list/?ownerId=${auth.userId}&chrono=${chrono}&filter=${filter}`,
      'get'
    );
    setFiltration(filter);

    setTaskArray(data);
  };

  const setEveryOneStatus = async () => {
    const oldTasks = [...taskArray];
    let newStatus = Boolean;
    oldTasks.filter((x) => !x.done).length > 0
      ? (newStatus = true)
      : (newStatus = false);
    oldTasks.map((item) => (item.done = newStatus));
    await request('/api/list', 'put', null, {
      target: { ownerId: auth.userId },
      newValue: { done: newStatus },
    });
    setTaskArray(oldTasks);
    counter(oldTasks);
  };

  const editTaskName = async (target, value) => {
    const tasks = taskArray.map((item) =>
      item.id === target ? (item.taskName = value) : null
    );
    await request('api/list', 'put', null, {
      target: { id: target },
      newValue: { taskName: value },
    });
  };

  const setChronology = async (chronoStatus) => {
    const data = await request(
      `api/list/?ownerId=${auth.userId}&chrono=${chronoStatus}&filter=${filtration}`,
      'get'
    );
    setChrono(chronoStatus);
    setTaskArray([...data]);
  };

  const toggleStatus = (index, status) => {
    const tasks = [...taskArray];
    tasks[taskArray.findIndex((el) => el.id === index)].done = status;
    counter(tasks);
    return setTaskArray([...tasks]);
  };

  const localItemRemover = async (item) => {
    const tasks = taskArray.filter((x) => x.id !== item);
    setTaskArray(tasks);
    counter(tasks);
  };

  const addingNewTask = async () => {
    if (!/[0-9a-zA-Zа-яёА-ЯЁ]/i.test(form)) {
      return null;
    }
    const data = await request('api/list', 'post', null, {
      taskName: form,
      ownerId: auth.userId,
    });
    const tasks = taskArray;
    tasks.push(data);
    setTaskArray(tasks);
    counter(tasks);
    return setForm('');
  };

  //const taskRender = () => {
  //   let tasks = [];
  //   if (filtration === 'all') {
  //     tasks = taskArray;
  //   } else if (filtration === 'active') {
  //     tasks = taskArray.filter((x) => !x.done);
  //   } else if (filtration === 'done') {
  //     tasks = taskArray.filter((x) => x.done);
  //   }
  //   return taskArray.map((item) => (
  //     <Task
  //       item={item}
  //       key={item.id}
  //       localItemRemover={localItemRemover}
  //       toggleStatus={toggleStatus}
  //       editTaskName={editTaskName}
  //     />
  //   ));
  // };

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
        <div className="section">
          {taskArray.map((item) => (
            <Task
              item={item}
              key={item.id}
              localItemRemover={localItemRemover}
              toggleStatus={toggleStatus}
              editTaskName={editTaskName}
            />
          ))}
        </div>
        <Footer
          filter={filtration}
          active={actives}
          setFilter={changeFilter}
          changeAll={setEveryOneStatus}
          setChronology={setChronology}
        />
      </div>
    </div>
  );
}
