import { useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const [isEditing, setIsEditing] = useState(null);
  const [editInput, setEditInput] = useState('');

  const addTask = () => {
    if (!taskInput.trim()) return;

    setTasks([...tasks, { id: Date.now(), text: taskInput }]);
    setTaskInput('');
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const startEdit = (task) => {
    setIsEditing(task.id);
    setEditInput(task.text);
  };

  const saveEdit = (id) => {
    setTasks(tasks.map((task) =>
      task.id === id ? { ...task, text: editInput } : task
    ));
    setIsEditing(null);
  };

  return (
    <div className="container">
      <h2>Task Manager</h2>

      <div className="input-area">
        <input
          type="text"
          placeholder="Enter a new task"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
        />
        <button onClick={addTask}>Add Task</button>
      </div>

      <div className="task-list">
        {tasks.map((task) => (
          <div key={task.id} className="task">
            {isEditing === task.id ? (
              <>
                <input
                  type="text"
                  value={editInput}
                  onChange={(e) => setEditInput(e.target.value)}
                />
                <button onClick={() => saveEdit(task.id)}>Done</button>
              </>
            ) : (
              <>
                <span>{task.text}</span>
                <button onClick={() => startEdit(task)}>Edit</button>
              </>
            )}
            <button className="delete" onClick={() => deleteTask(task.id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;