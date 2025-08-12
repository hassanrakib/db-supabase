import { useState } from "react";

function App() {
  const [task, setTask] = useState({ title: "", description: "" });

  const handleSubmit = (e) => {
    
  }

  return (
    <div>
      <h3>Task Manager CRUD</h3>
      <form>
        <input
          placeholder="Task Title"
          onChange={(e) => {
            setTask((prev) => ({ ...prev, title: e.target.value }));
          }}
        />
        <input
          placeholder="Task Description"
          onChange={(e) => {
            setTask((prev) => ({ ...prev, description: e.target.value }));
          }}
        />
        <button>Add Task</button>
      </form>

      <div>
        <div>Title</div>
        <div>Description</div>
        <div>
          <button>Edit</button>
          <button>Delete</button>
        </div>
      </div>
    </div>
  );
}

export default App;
