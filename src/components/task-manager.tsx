import { useEffect, useState } from "react";
import { supabase } from "../supabase-client";
import type { Session } from "@supabase/supabase-js";

interface Task {
  id: number;
  title: string;
  description: string;
  created_at: string;
}

export default function TaskManager({session} : {session: Session}) {
  const [task, setTask] = useState({ title: "", description: "" });
  const [tasks, setTasks] = useState<Task[]>([]);
  const [description, setDescription] = useState("");

  const fetchTasks = async () => {
    const { error, data } = await supabase
      .from("tasks")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) {
      console.log("Error reading task:", error.message);
      return;
    }

    setTasks(data);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // insert a new task to supabase
    const { error, data } = await supabase.from("tasks").insert({...task, email: session.user.email}).select().single();

    if (error) {
      console.log("Error adding task:", error.message);
      return;
    }

    setTasks((prev) => [...prev, data]);

    // reset the form
    setTask({ title: "", description: "" });
  };

  const deleteTask = async (id: number) => {

    const {error} = await supabase.from("tasks").delete().eq("id", id);

    if (error) {
      console.log("Error deleting task:", error.message);
      return;
    }
  }

  const updateTask = async (id: number) => {
    const {error} = await supabase.from("tasks").update({description}).eq("id", id);

    if (error) {
      console.log("Error updating task:", error.message);
      return;
    }
  }

  useEffect(() => {
    fetchTasks();
  }, []);

//   supabase realtime capabalities
  useEffect(() => {
    supabase.channel("tasks_channel")
        .on("postgres_changes", {event: 'INSERT', schema: 'public', table: 'tasks'}, (payload) => {
            setTasks((prev) => [...prev, payload.new as Task]);
        })
        .subscribe((status) => {
            console.log('Subscription: ', status);
        })
  }, []);

  return (
    <div>
      <h3>Task Manager CRUD</h3>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Task Title"
          value={task.title}
          onChange={(e) => {
            setTask((prev) => ({ ...prev, title: e.target.value }));
          }}
        />
        <input
          placeholder="Task Description"
          value={task.description}
          onChange={(e) => {
            setTask((prev) => ({ ...prev, description: e.target.value }));
          }}
        />
        <button type="submit">Add Task</button>
      </form>

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <div>
              <div>{task.title}</div>
              <div>{task.description}</div>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
              <div>
                <button onClick={() => updateTask(task.id)}>Edit</button>
                <button onClick={() => deleteTask(task.id)}>Delete</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
