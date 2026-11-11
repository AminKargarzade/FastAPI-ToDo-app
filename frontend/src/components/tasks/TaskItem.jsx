import { Trash2, Pencil } from "lucide-react";

const TaskItem = ({ task, onDelete, onEdit }) => {
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

      {/* Container for action buttons */}
      <div className="flex shrink-0 items-center gap-1">
        {/* Edit button: passes the full task object so the form can be populated */}
        <button
          onClick={() => onEdit(task)}
          className="rounded-lg p-2 text-teal-800/40 transition hover:bg-teal-50 hover:text-teal-600"
          aria-label="Edit task"
        >
          <Pencil size={18} />
        </button>

        {/* Delete button: passes only the task ID to the delete handler */}
        <button
          onClick={() => onDelete(task.id)}
          className="rounded-lg p-2 text-teal-800/40 transition hover:bg-red-50 hover:text-red-500"
          aria-label="Delete task"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </li>
  );
};

export default TaskItem;
