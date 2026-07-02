const API_URL = "http://localhost:8000/api";

export const userService = {
  // Get Users
  async getUsers(token, page, search, sort, order) {
    // if (search) {
    //   url += `&search=${search}`;
    // }

    const urlParams = new URLSearchParams({
      page,
      ...(search && { search }),
      ...(sort && { sort }),
      ...(sort && order && { order }),
    });

    const url = `${API_URL}/users?${urlParams.toString()}`;

    // console.log(urlParams.toString());

    const response = await fetch(url, {
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

  // Get User
  async getUser(id, token) {
    const response = await fetch(`${API_URL}/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user");
    }

    const result = await response.json();

    return result.data;
  },

  // Update User
  async updateUser(id, data, token) {
    const response = await fetch(`${API_URL}/users/${id}`, {
      method: "PUT",
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

    return result;
  },

  // Delete User
  async deleteUser(id, token) {
    const response = await fetch(`${API_URL}/users/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        accept: "application/json",
      },
    });

    const result = await response.json();

    if (!response.ok) {
      throw result;
    }

    return result;
  },
};
