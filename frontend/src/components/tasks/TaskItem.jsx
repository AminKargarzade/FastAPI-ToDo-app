import { Trash2 } from "lucide-react";

const TaskItem = ({ task, onDelete }) => {
  return (
    // The list item card
    <li className="flex items-start justify-between gap-4 rounded-2xl border border-teal-900/5 bg-white/80 backdrop-blur p-5 shadow-sm transition-all hover:shadow-lg hover:shadow-teal-900/5">
      {/* Title + description  */}
      <div>
        {/* Task Title*/}
        <p className="font-bold text-base wrap-anywhere">{task.title}</p>

        {/* Task Description*/}
        {task.description && (
          <p className="mt-1 text-sm text-teal-800/60 leading-relaxed wrap-anywhere">
            {task.description}
          </p>
        )}
      </div>

      {/* Delete icon */}
      <button
        onClick={() => onDelete(task.id)}
        className="shrink-0 rounded-lg p-2 text-teal-800/40 transition hover:bg-red-50 hover:text-red-500"
      >
        <Trash2 size={18} />
      </button>
    </li>
  );
};

export default TaskItem;
