import { useState } from "react";
import { Button } from "@/components/ui/button";
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
  // Form state for the new task
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleCreateTask = (e) => {
    e.preventDefault(); // Stop page refresh
    
    // Create the task object with a unique ID
    const newTask = { id: Date.now(), title, description };
    
    onCreated(newTask); // Send the new task up to the parent (TasksPage)
    
    // Clear the form and close the dialog
    setTitle("");
    setDescription("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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

          {/* Button row */}
          <div className="flex justify-between">
            {/* Cancel button: closes the dialog without saving */}
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="border-teal-200 text-teal-700 hover:bg-teal-50 hover:text-teal-800"
            >
              Cancel
            </Button>
            
            {/* Submit button: triggers handleCreateTask */}
            <Button
              type="submit"
              variant="default"
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