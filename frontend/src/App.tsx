import { useEffect, useState } from 'react'
import './App.css'

type Task = {
  id: number
  title: string
  done: boolean
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTitle, setNewTitle] = useState('')

  useEffect(() => {
    loadTasks()
  }, [])

  function loadTasks() {
    fetch('http://localhost:3000/api/tasks')
      .then(res => res.json())
      .then(data => setTasks(data))
      .catch(err => console.error('Error loading tasks:', err))
  }

  function onAddTask(ev: React.FormEvent) {
    ev.preventDefault()

    fetch('http://localhost:3000/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newTitle })
    })
      .then(res => res.json())
      .then(addedTask => {
        setTasks(prev => [...prev, addedTask])
        setNewTitle('')
      })
      .catch(err => console.error('Error adding task:', err))
  }

  return (
    <div className="App">
      <h1>🕒 Fix My Time</h1>

      <form onSubmit={onAddTask}>
        <input
          type="text"
          placeholder="הוסף משימה..."
          value={newTitle}
          onChange={ev => setNewTitle(ev.target.value)}
        />
        <button>➕ הוסף</button>
      </form>

      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <span>{task.title}</span> – <strong>{task.done ? '✔️' : '❌'}</strong>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
