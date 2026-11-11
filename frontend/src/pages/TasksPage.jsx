import { useEffect, useState } from "react";
import { Plus, Trash2, Undo2 } from "lucide-react";
import TaskItem from "@/components/tasks/TaskItem";
import NewTaskDialog from "@/components/tasks/NewTaskDialog";
import { getTasks, deleteTask } from "@/services/taskService";
import EditTaskDialog from "@/components/tasks/EditTaskDialog";
import { toast } from "sonner";

const TasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  // Custom Tailwind styles for the toast notifications to match the app's theme
  const toastClassNames = {
    toast:
      "rounded-2xl! border! border-teal-200! bg-teal-50! px-4! py-3! text-teal-950! shadow-xl! shadow-teal-900/15!",
    content: "min-w-0! flex-1!", // lets long text shrink instead of breaking the layout
    actionButton:
      "flex! h-8! items-center! gap-1.5! rounded-full! border! border-teal-300! bg-white! px-3.5! text-sm! font-semibold! text-teal-700! shadow-sm! transition! duration-200! hover:border-teal-600! hover:bg-teal-600! hover:text-white! active:scale-95!",
  };

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

  // Removes the task instantly and delays the actual API call until the toast closes without Undo
  const handleDeleteTask = (id) => {
    // Find the task first to keep its data in case we need to restore it
    const taskToDelete = tasks.find((task) => task.id === id);
    if (!taskToDelete) return;

    // Optimistic Update: Remove from UI instantly for a snappy feel
    setTasks((prev) => prev.filter((task) => task.id !== id));

    // 2. Flag to ensure the real delete only happens once (Undo clicked OR API called)
    let settled = false;

    // 3. The real API call: Runs only when the toast closes WITHOUT Undo
    const commitDelete = async () => {
      if (settled) return;
      settled = true;

      try {
        await deleteTask(Number(id));
      } catch (err) {
        // If the API fails, restore the task to the UI and show an error
        toast.error("Failed to delete task permanently", {
          classNames: toastClassNames,
        });
        setTasks((prev) => [taskToDelete, ...prev]); // Restore if API fails
      }
    };

    // 4. Display the toast notification with a custom message
    toast(
      <div className="flex min-w-0 items-center gap-1.5">
        <span className="shrink-0 text-base font-bold">Task deleted!</span>
        <span
          title={taskToDelete.title}
          className="flex min-w-0 text-xs font-normal text-teal-800/70"
        >
          <span className="shrink-0">(</span>
          <span className="truncate">{taskToDelete.title}</span>
          <span className="shrink-0">)</span>
        </span>
      </div>,
      {
        icon: <Trash2 size={20} className="text-red-500" />,
        duration: 5000,
        classNames: toastClassNames,
        onAutoClose: commitDelete, // the toast timed out (the usual case)
        onDismiss: commitDelete, // the user swiped it away or clicked the X

        // The Undo button logic
        action: {
          label: (
            <>
              <Undo2 size={15} />
              Undo
            </>
          ),
          onClick: () => {
            settled = true; // cancels the real delete
            setTasks((prev) => [taskToDelete, ...prev]); // Restore the task to UI
          },
        },
      },
    );
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
