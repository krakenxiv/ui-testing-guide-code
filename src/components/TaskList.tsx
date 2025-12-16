
import type { TaskData } from '../types';

import { useDispatch, useSelector } from 'react-redux';

import {updateTaskState, RootState, AppDispatch} from '../lib/store';


import Task from './Task';

type TaskListProps = {
  /** Checks if it's in loading state */
  loading?: boolean;
  /** The list of tasks */
  tasks: TaskData[];
  /** Event to change the task to pinned */
  onPinTask: (id: string) => void;
  /** Event to change the task to archived */
  onArchiveTask: (id: string) => void;
};

export default function TaskList() {

  const tasks = useSelector((state: RootState) => {
    const tasksInOrder = [
      ...state.taskbox.tasks.filter((t) => t.state === 'TASK_PINNED'),
      ...state.taskbox.tasks.filter((t) => t.state !== 'TASK_PINNED')
    ]
    const filteredTasks = tasksInOrder.filter((t) => t.id !== 'TASK_INBOX')
    return filteredTasks
  })

  const {status} = useSelector((state: RootState) => state.taskbox);
const dispatch  = useDispatch<AppDispatch>();

const archiveTask = (value: string) => {
  dispatch(updateTaskState({id: value, newTaskState: 'TASK_PINNED'}))
}

  const LoadingRow = (
    <div className='loading-item'>
      <span className='glow-checkbox' />
      <span className='glow-text'>
        <span>Loading</span> <span>cool</span> <span>state</span>
      </span>
    </div>
  )

  if (loading) {
    return (
      <div className='list-items' key={'loading'}>
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
      </div>
    )
  }

  if (tasks.length === 0) {
    return (
      <div className='list-items'>
        <div className='wrapper-message'>
          <span className='icon-check' />
          <p className='title-message'>You have no tasks</p>
          <p className='subtitle-message'>Chill, yo</p>
        </div>
      </div>
    )
  }

  const tasksInOrder = [
    ...tasks.filter((t) => t.state === 'TASK_PINNED'),
    ...tasks.filter((t) => t.state !== 'TASK_PINNED')
  ]

  return (
    <div className="list-items">
      {tasksInOrder.map((task) => (
        <Task key={task.id} task={task} {...events} />
      ))}
    </div>
  );
}