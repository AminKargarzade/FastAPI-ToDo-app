import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import TaskItem from "@/components/tasks/TaskItem";
import NewTaskDialog from "@/components/tasks/NewTaskDialog";
import { getTasks, deleteTask } from "@/services/taskService";
import EditTaskDialog from "@/components/tasks/EditTaskDialog";

const TasksPage = () => {
  // List of tasks shown on the page
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  // Loading and error state for fetching the tasks
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Controls whether the "New task" dialog is open
  const [modalOpen, setModalOpen] = useState(false);

  // Runs once when the component loads to fetch the initial tasks
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const data = await getTasks({ limit: 50 });
        setTasks(data.reverse());
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadTasks();
  }, []);

  // Deletes a task from the backend and removes it from the local list
  const handleDeleteTask = async (id) => {
    setError("");
    try {
      await deleteTask(Number(id));
      // Remove the deleted task from the local state list
      setTasks((prev) => prev.filter((task) => task.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      {/* Title row: heading + New Task button */}
      <div className="flex justify-between mb-8 items-center">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight">My Tasks</h2>

          {/* Only show the task count when loading is done and there are no errors */}
          {!loading && !error && (
            <p className="mt-1 text-sm text-teal-800/60">
              {tasks.length} task{tasks.length !== 1 && "s"}
            </p>
          )}
        </div>

        {/* Opens the dialog */}
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-2 bg-teal-500 rounded-xl px-4 py-2 h-9 text-sm font-semibold text-white shadow-lg shadow-teal-600/30 hover:bg-teal-600 transition duration-200"
        >
          <Plus size={16} /> New Task
        </button>
      </div>

      {/* Show error message in red if an error exists */}
      {error && <p className="font-semibold text-red-600">{error}</p>}

      {/* Show empty state ONLY if there's no error, not loading, and the list is empty */}
      {!error && !loading && tasks.length === 0 && (
        <p className="text-teal-800/60">No tasks yet. Create your first one!</p>
      )}

      {/* Task list — renders a TaskItem for every task in the state */}
      <ul className="grid gap-4">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onDelete={handleDeleteTask}
            onEdit={setEditingTask}
          />
        ))}
      </ul>

      {/* 
        Dialog: 
        - open / onOpenChange: Controls if the popup is visible.
        - onCreated: When a new task is made, it adds it to the TOP of the list (prepends it).
      */}
      <NewTaskDialog
        open={modalOpen}
        onOpenChange={setModalOpen}
        onCreated={(task) => setTasks((prev) => [task, ...prev])}
      />

      {/* Edit Task Dialog */}
      <EditTaskDialog
        task={editingTask}
        open={!!editingTask} // Converts task to a boolean: true (opens modal) if a task exists, false (closes modal) if null
        onOpenChange={(open) => {
          if (!open) setEditingTask(null); // Closes the popup
        }}
        onUpdated={(updatedTask) => {
          setTasks((prev) =>
            prev.map((task) =>
              task.id === updatedTask.id ? updatedTask : task,
            ),
          );
          setEditingTask(null); // Closes the popup
        }}
      />
    </main>
  );
};

export default TasksPage;
