export default function (title) {
    if (!title || !this.Roles) return false;
    return this.Roles.some(role => role.title.toLowerCase() === title.toLowerCase());
  }