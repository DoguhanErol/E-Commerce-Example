export default function AuthHeader() {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    return { Authorization: `Bearer ${accessToken}` };
  }
  return {};
}
