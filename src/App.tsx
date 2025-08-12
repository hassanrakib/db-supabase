import { useState } from "react";
import { supabase } from "./supabase-client";

function App() {
  const [task, setTask] = useState({ title: "", description: "" });
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const { error, data } = await supabase
      .from("tasks")
      .select("*")
      .order("created_at", { ascending: true });

    
    if (error) {
      console.log("Error adding task:", error);
      return;
    }
    
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // insert a new task to supabase
    const { error } = await supabase.from("tasks").insert(task).single();

    if (error) {
      console.log("Error adding task:", error);
      return;
    }

    // reset the form
    setTask({ title: "", description: "" });
  };

  return (
    <div>
      <h3>Task Manager CRUD</h3>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Add Task</button>
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
