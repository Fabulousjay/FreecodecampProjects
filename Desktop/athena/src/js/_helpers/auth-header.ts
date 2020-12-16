export function authHeader() {
  const userCookie = localStorage.getItem("user");

  const user = userCookie ? JSON.parse(userCookie) : null;

  if (user) {
    return {
      Authorization: `Bearer ${user.token}`,
    };
  }

  return {};
}
