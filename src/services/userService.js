const API_URL = "http://localhost:8000/api";

export const userService = {
  // Get Users
  async getUsers(token) {
    const response = await fetch(`${API_URL}/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }

    const result = await response.json();

    return result.data;
  },

  // Create User
  async createUser(data, token) {
    const response = await fetch(`${API_URL}/users`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw result;
    }

    return result.data;
  },
};
