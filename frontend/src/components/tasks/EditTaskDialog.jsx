import { useEffect, useState } from "react";
import { updateTask } from "@/services/taskService";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

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
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Task title"
            required
            minLength={5}
            maxLength={150}
          />

          {/* Description field (optional) */}
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description (optional)"
            maxLength={500}
            rows={4}
          />

          {/* Display error message if it exists */}
          {error && <p className="text-sm font-medium text-red-600">{error}</p>}

          <DialogFooter>
            {/* Cancel: closes without saving */}
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>

            {/* Save: submits form, disabled while loading */}
            <Button type="submit" disabled={loading}>
              Save changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditTaskDialog;
