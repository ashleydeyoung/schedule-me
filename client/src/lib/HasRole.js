export default function (title, roles) {
    if (!title || !roles) return false;
    return roles.some(role => role.title.toLowerCase() === title.toLowerCase());
  }