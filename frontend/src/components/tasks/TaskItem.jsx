const TaskItem = ({ task }) => {
  return (
    // The list item card
    <li className="rounded-2xl border border-teal-900/5 bg-white/80 backdrop-blur p-5 shadow-sm transition-all hover:shadow-lg hover:shadow-teal-900/5">
      
      {/* Task Title*/}
      <p className="font-bold text-base wrap-break-word">{task.title}</p>

      {/* Task Description*/}
      {task.description && (
        <p className="mt-1 text-sm text-teal-800/60 leading-relaxed wrap-break-word">
          {task.description}
        </p>
      )}
      
    </li>
  );
};

export default TaskItem;