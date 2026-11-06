import { useState } from "react";
import { Plus } from "lucide-react";
import TaskItem from "@/components/tasks/TaskItem";
import TaskFormModal from "@/components/tasks/TaskFormModal";

const TasksPage = () => {
  const [modalOpen, setModalOpen] = useState(true); // 👈 starts open

  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <div className="flex justify-between mb-8">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight">My Tasks</h2>
          <p className="mt-1 text-sm text-teal-800/60">3 remaining · 2 done</p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-2 bg-teal-500 rounded-xl px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-teal-600/30 hover:bg-teal-600 transition duration-200"
        >
          <Plus size={16} /> New Task
        </button>
      </div>

      <ul className="grid gap-4">
        <TaskItem />
      </ul>

      <TaskFormModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        onSubmit={async () => {}}   // 👈 dummy so it doesn't crash
      />
    </main>
  );
};

export default TasksPage;