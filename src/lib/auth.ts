export const ADMIN_SESSION_COOKIE = "ritz_admin_session";

export function getAdminSessionToken(): string {
  return (
    process.env.ADMIN_SESSION_SECRET?.trim() ||
    process.env.ADMIN_PASSWORD?.trim() ||
    "change-me-in-production"
  );
}

export function validateAdminCredentials(
  username: string,
  password: string
): boolean {
  const expectedUser = process.env.ADMIN_USERNAME?.trim() || "admin";
  const expectedPass = process.env.ADMIN_PASSWORD?.trim();
  if (!expectedPass) {
    return false;
  }
  return username === expectedUser && password === expectedPass;
}

export function isValidAdminSession(sessionValue: string | undefined): boolean {
  if (!sessionValue) {
    return false;
  }
  return sessionValue === getAdminSessionToken();
}
