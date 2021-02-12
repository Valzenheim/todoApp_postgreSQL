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
  const { userId } = useContext(AuthContext);

  const counter = useCallback(
    (array) => {
      const activeCount = array.filter((item) => !item.done).length;
      return setActives(activeCount);
    },
    [taskArray]
  );

  const fetchTasks = useCallback(async () => {
    const fetched = await request(`/api/list/${1}`, 'get');
    console.log('@@@@@@@ fetched:', fetched);
    setTaskArray([...fetched]);
    return counter(fetched);
  }, [request]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const formHandler = (event) => {
    return setForm(event.target.value);
  };

  const changeFilter = (filter) => {
    return setFiltration(filter);
  };

  const setEveryOneStatus = async () => {
    const oldTasks = [...taskArray];
    let newStatus = Boolean;
    oldTasks.filter((x) => !x.checks).length > 0
      ? (newStatus = true)
      : (newStatus = false);
    oldTasks.map((item) => (item.checks = newStatus));
    await request('/app/todoApp/changeEveryOneStatus', 'PUT', {
      status: newStatus,
    });
    counter();
    return setTaskArray(oldTasks);
  };

  const toggleStatus = (index, status) => {
    const tasks = [...taskArray];
    tasks[taskArray.findIndex((el) => el.id === index)].done = status;
    counter(tasks);
    return setTaskArray([...tasks]);
  };

  const localItemRemover = async (item) => {
    const tasks = taskArray.filter((x) => x.id !== item);
    console.log('@@@@@@@ tasks:', tasks);
    setTaskArray(tasks);
    counter(tasks);
    console.log('@@@@@@@ taskArray:', taskArray);
  };

  const addingNewTask = async () => {
    if (!/[0-9a-zA-Zа-яёА-ЯЁ]/i.test(form)) {
      return null;
    }
    const data = await request('api/list', 'post', null, {
      taskName: form,
      ownerId: 1,
    });
    const tasks = taskArray;
    tasks.push(data);
    setTaskArray(tasks);
    counter(tasks);
    return setForm('');
  };

  const everyOneRemover = async () => {
    await request('app/todoApp/removeAllOfDone', 'DELETE');
    const tasks = taskArray.filter((x) => !x.checks);
    return setTaskArray(tasks);
  };

  const taskRender = () => {
    let tasks = [];
    if (filtration === 'all') {
      tasks = taskArray;
    } else if (filtration === 'active') {
      tasks = taskArray.filter((x) => !x.done);
    } else if (filtration === 'done') {
      tasks = taskArray.filter((x) => x.done);
    }
    return tasks.map((item) => (
      <Task
        item={item}
        key={item.id}
        localItemRemover={localItemRemover}
        toggleStatus={toggleStatus}
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
        <div className="section">{taskRender()}</div>
        <Footer
          filter={filtration}
          active={actives}
          setFilter={changeFilter}
          changeAll={setEveryOneStatus}
          everyRemove={everyOneRemover}
        />
      </div>
    </div>
  );
}
