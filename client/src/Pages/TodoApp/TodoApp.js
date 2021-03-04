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
  const [taskArray, setTaskArray] = useState([]);
  const [form, setForm] = useState('');
  const [filter, setFilter] = useState('all');
  const [chrono, setChrono] = useState(true);
  const [tasksLimit, setTasksLimit] = useState(2);
  const [currentPage, setCurrentPage] = useState(1);
  const [taskCount, setTaskCount] = useState(0);
  const auth = useContext(AuthContext);

  const fetchTasks = useCallback(async () => {
    const fetched = await request(
      `/api/list/?chrono=${chrono}&filter=${filter}&count=${tasksLimit}&page=${currentPage}`,
      'get'
    );
    setTaskArray([...fetched.rows]);
    setTaskCount(fetched.count);
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
      `api/list/?chrono=${chrono}&filter=${newFilter}&count=${tasksLimit}&page=${currentPage}`,
      'get'
    );
    setFilter(newFilter);
    setTaskArray(data.rows);
  };

  const editTaskName = async (target, value) => {
    const tasks = taskArray.map((item) =>
      item.id === target ? (item.taskName = value) : null
    );
    await request(`api/list/`, 'put', {
      target: { id: target },
      newValue: { taskName: value },
    });
  };

  const setChronology = async () => {
    let newChrono = !chrono;
    const data = await request(
      `api/list/?chrono=${newChrono}&filter=${filter}&count=${tasksLimit}&page=${currentPage}`,
      'get'
    );
    setChrono(newChrono);
    setTaskArray([...data.rows]);
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

  const pagination = () => {
    const totalPages = Math.ceil(taskCount / tasksLimit);
    const pages = [];
    for (let i = 0; i < totalPages; i++) {
      pages.push(<button className="pageNumber">{i + 1}</button>);
    }
    return pages;
  };

  const setCountOfItems = async (event) => {
    const count = event.target.value;
    const data = await request(
      `api/list/?chrono=${chrono}&filter=${filter}&count=${count}&page=${currentPage}`,
      'get'
    );
    setTaskArray(data.rows);
    setTasksLimit(count);
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
              setChronology();
            }}
          >
            <img className="upIcon" src={up} alt={up} />
            <img className="downIcon" src={down} alt={down} />
          </div>
          <select value={tasksLimit} onChange={setCountOfItems}>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value={taskCount}>all</option>
          </select>
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
        <div className="paginationList">{pagination()}</div>
      </div>
    </div>
  );
}
