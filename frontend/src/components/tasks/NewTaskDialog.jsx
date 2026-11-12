import { useState } from "react";
import { Button } from "@/components/ui/button";
import { createTask } from "@/services/taskService";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Reusable Tailwind classes for the input fields
const inputClass =
  "w-full rounded-xl border-2 border-teal-100 bg-teal-50/60 px-3 py-2 text-sm outline-none transition focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/20";

const NewTaskDialog = ({ open, onOpenChange, onCreated }) => {
  // Form state (stores what the user types)
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // UI state (controls visual feedback)
  const [loading, setLoading] = useState(false); // Disables button while sending data
  const [error, setError] = useState(""); // Stores error message if submission fails

  // Handles opening and closing the dialog (fires for Cancel button, clicking outside, or Escape key)
  const handleOpenChange = (isOpen) => {
    // If the dialog is closing (isOpen is false), clear the form for next time
    if (!isOpen) {
      setTitle("");
      setDescription("");
      setError("");
    }
    // Tell the parent component to actually open or close the modal
    onOpenChange(isOpen);
  };

  // Submits the new task to the backend and resets the UI on success
  const handleCreateTask = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Send task data to the backend
      const newTask = await createTask({
        title: title.trim(),
        description: description.trim(),
        is_completed: false,
      });

      // Add new task to parent list
      onCreated(newTask);

      // Close modal & reset form
      handleOpenChange(false);
    } catch (err) {
      // Show error message on failure
      setError(err.message);
    } finally {
      // Stop loading (success or failure)
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      {/* The modal popup box */}
      <DialogContent className="rounded-3xl">
        {/* Header: Title and description text */}
        <DialogHeader>
          <DialogTitle className="text-xl font-extrabold text-teal-700">
            New task
          </DialogTitle>
          <DialogDescription>
            Add a title and a short description.
          </DialogDescription>
        </DialogHeader>

        {/* Form: handles submit */}
        <form onSubmit={handleCreateTask} className="grid gap-4">
          {/* Title field - required */}
          <div className="grid gap-2">
            <label htmlFor="task-title" className="text-sm font-bold">
              Title
            </label>
            <input
              id="task-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What needs to be done?"
              maxLength={150}
              required
              className={inputClass}
            />
          </div>

          {/* Description field - optional */}
          <div className="grid gap-2">
            <label htmlFor="task-description" className="text-sm font-bold">
              Description
            </label>
            <textarea
              id="task-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              placeholder="Add some details (optional)"
              className={inputClass}
            />
          </div>
          {/* Shows the error message in red if one exists */}
          {error && (
            <p className="text-sm font-semibold text-red-600">{error}</p>
          )}

          {/* Button row */}
          <div className="flex justify-end gap-2">
            {/* Cancel button: closes the dialog without saving */}
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
              className="border-teal-200 text-teal-700 hover:bg-teal-50 hover:text-teal-800"
            >
              Cancel
            </Button>

            {/* Submit button: triggers handleCreateTask */}
            <Button
              type="submit"
              variant="default"
              disabled={loading}
              className="bg-teal-600 text-white shadow-lg shadow-teal-600/20 hover:bg-teal-700"
            >
              Create task
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewTaskDialog;
