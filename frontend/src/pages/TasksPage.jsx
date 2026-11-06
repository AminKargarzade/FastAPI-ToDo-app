import { useState } from "react";
import { Plus } from "lucide-react";
import TaskItem from "@/components/tasks/TaskItem";
import NewTaskDialog from "@/components/tasks/NewTaskDialog";

const TasksPage = () => {
  // List of tasks shown on the page
  const [tasks, setTasks] = useState([]);

  // Controls whether the "New task" dialog is open
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      
      {/* Title row: heading + New Task button */}
      <div className="flex justify-between mb-8">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight">My Tasks</h2>
          <p className="mt-1 text-sm text-teal-800/60">3 remaining · 2 done</p>
        </div>
        
        {/* Opens the dialog */}
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-2 bg-teal-500 rounded-xl px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-teal-600/30 hover:bg-teal-600 transition duration-200"
        >
          <Plus size={16} /> New Task
        </button>
      </div>

      {/* Task list — renders a TaskItem for every task in the state */}
      <ul className="grid gap-4">
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} />
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
    </main>
  );
};

export default TasksPage;