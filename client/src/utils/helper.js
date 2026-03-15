import axios from "axios";

export const addItemToServer = async (task, date, priority, backendUrl) => {
  try {
    const response = await axios.post(`${backendUrl}/api/todos`, {
      task,
      date,
      priority,
    });
    // Axios wraps the response in a 'data' object
    return response.data;
  } catch (error) {
    console.error("Error adding todo:", error.response?.data || error.message);
    return null;
  }
};