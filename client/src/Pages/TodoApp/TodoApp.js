import React, {useState, useCallback, useEffect} from 'react';
import Task from './components/Task';
import {Footer} from './components/Footer';
import Header from './components/Header';
import './styles/style.css';
import {useHttp} from '../../hooks/http.hook';

export default function TodoApp() {
  const {request} = useHttp();
  const [taskArray, setTaskArray] = useState([]);
  const [form, setForm] = useState('');
  const [filtration, setFiltration] = useState('all');
  const [actives, setActives] = useState(null)

  const fetchTasks = useCallback(async () => {
    const fetched = await request('/app/todoApp/getList', 'GET');

    setTaskArray([...fetched]);

    const activeCount = fetched.filter((item) => !item.checks).length;

    return setActives(activeCount);
  }, [request]);

  const counter = useCallback(() => {
    const tasks = taskArray.filter((item) => !item.checks).length;

    return setActives(tasks)
  },[taskArray])

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
      ? newStatus = true
      : newStatus = false;

    oldTasks.map((item) => item.checks = newStatus);

    await request('/app/todoApp/changeEveryOneStatus', 'PUT', {status: newStatus});

    counter()

    return setTaskArray(oldTasks);
  };

  const toggleStatus = (index, status) => {
    const tasks = [...taskArray];

    const indexArr = taskArray.findIndex(el => el._id === index)

    tasks[indexArr].checks = status;

    counter()

    return setTaskArray([...tasks])
  }

  const localItemRemover = (item) => {
    const tasks = taskArray.filter((x) => x._id !== item);

    setTaskArray(tasks);

    counter()
  };

  const addingNewTask = async () => {
    if (!/[0-9a-zA-Zа-яёА-ЯЁ]/i.test(form)) {
      return null;
    }

    const data = await request('app/todoApp/newTask', 'POST', {value: form});

    const tasks = taskArray;

    tasks.push(data);

    setTaskArray(tasks);

    counter()

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
      tasks = taskArray.filter((x) => !x.checks);
    } else if (filtration === 'done') {
      tasks = taskArray.filter((x) => x.checks);
    }

    return tasks.map((item) => (
      <Task
        item={item}
        key={item._id}
        localItemRemover={localItemRemover}
        toggleStatus={toggleStatus}
      />
    ));
  };

  return (
    <div>
      <Header/>
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
            <input type="text" className="formInput" placeholder="Enter your task name here" value={form} onChange={formHandler}/>
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
