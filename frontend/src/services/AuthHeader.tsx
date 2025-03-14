export default function AuthHeader() {
  const user = JSON.parse(localStorage.getItem("user") || "null");

  if (user?.accessToken) {
    return { Authorization: `Bearer ${user.accessToken}` }; // Django Rest Framework backend için
  }
  return {};
}
