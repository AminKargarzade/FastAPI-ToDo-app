const TaskItem = () => {
  return (
    <li className="rounded-2xl border border-teal-900/5 bg-white/80 backdrop-blur p-5 shadow-sm transition-all hover:shadow-lg hover:shadow-teal-900/5">
      <p className="font-bold text-base wrap-break-word">Design new landing page</p>

      <p className="mt-1 text-sm text-teal-800/60 leading-relaxed wrap-break-word">
        Create wireframes and high-fidelity mockups for the marketing site.
      </p>
    </li>
  );
};

export default TaskItem;
