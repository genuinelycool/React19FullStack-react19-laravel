export const getInitials = (name = "") => {
  if (!name) return "";

  // ex: John Doe

  const parts = name.trim().split(" ");

  // ex: alex (if firstName only)
  if (parts.length === 1) {
    return parts[0][0].toUpperCase();
  }

  // ex: John Doe (if firstName & lastName)
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};
