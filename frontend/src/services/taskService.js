import { request } from "./api";

// Fetches a list of tasks with optional filters and pagination
export const getTasks = ({ completed, limit = 10, offset = 0 } = {}) => {
  return request({
    method: "get",
    url: "/tasks",
    // Axios turns these into a query string: /tasks?completed=true&limit=10&offset=0
    params: { completed, limit, offset },
  });
};

// Create a new task (POST /tasks), returns it with a real id
export const createTask = (task) => {
  return request({
    method: "post",
    url: "/tasks",
    data: task, // { title, description, is_completed }
  });
};
