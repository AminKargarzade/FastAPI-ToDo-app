import { useEffect, useState } from "react";
import { updateTask } from "@/services/taskService";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

// Reusable Tailwind classes for the input fields
const inputClass =
  "w-full rounded-xl border-2 border-teal-100 bg-teal-50/60 px-3 py-2 text-sm outline-none transition focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/20";

const EditTaskDialog = ({ task, open, onOpenChange, onUpdated }) => {
  // Form state for editing the task
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // UI state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fills the form with the selected task's data whenever a task is selected
  useEffect(() => {
    // Only run if a task exists (prevents errors when the dialog is closed)
    if (task) {
      setTitle(task.title);
      setDescription(task.description || ""); // Fallback to empty string
      setError("");
    }
  }, [task]);

  // Handles the form submission to update an existing task
  const handleUpdateTask = async (e) => {
    e.preventDefault();
    setError("");

    // Build the data package to send to the backend
    const payload = {
      title: title.trim(),
      description: description.trim() || null,
      is_completed: task.is_completed,
    };

    setLoading(true);

    try {
      // Send the update to the backend
      const updatedTask = await updateTask(task.id, payload);

      onUpdated(updatedTask); // Update the parent list with new data
      onOpenChange(false); // Close the dialog
    } catch (err) {
      setError(err.message); // Show error if API fails
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleUpdateTask} className="grid gap-4">
          {/* Title field (required, min 5 chars) */}
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Task title"
            required
            minLength={5}
            maxLength={150}
            className={inputClass}
          />

          {/* Description field (optional) */}
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description (optional)"
            maxLength={500}
            rows={4}
            className={inputClass}
          />

          {/* Display error message if it exists */}
          {error && <p className="text-sm font-medium text-red-600">{error}</p>}

          <div className="flex justify-end gap-2">
            {/* Cancel: closes without saving */}
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="border-teal-200 text-teal-700 hover:bg-teal-50 hover:text-teal-800"
            >
              Cancel
            </Button>
            {/* Save: submits form, disabled while loading */}
            <Button
              type="submit"
              variant="default"
              disabled={loading}
              className="bg-teal-600 text-white shadow-lg shadow-teal-600/20 hover:bg-teal-700"
            >
              Save changes
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditTaskDialog;
