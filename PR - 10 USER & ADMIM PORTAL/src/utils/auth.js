const USER_KEY = "authPortalUser";
const TOKEN_KEY = "authPortalToken";

export function getStoredUser() {
  const user = localStorage.getItem(USER_KEY);

  if (user) {
    try {
      return JSON.parse(user);
    } catch {
      localStorage.removeItem(USER_KEY);
    }
  }

  const legacyEmail = localStorage.getItem("registeredEmail");
  if (!legacyEmail) return null;

  return {
    name: localStorage.getItem("registeredName") || legacyEmail.split("@")[0],
    email: legacyEmail,
    password: localStorage.getItem("registeredPassword") || "",
    role: localStorage.getItem("registeredRole") || "user",
  };
}

export function saveUser(user) {
  const cleanUser = {
    name: user.name.trim(),
    email: user.email.trim().toLowerCase(),
    password: user.password,
    role: user.role || "user",
  };

  localStorage.setItem(USER_KEY, JSON.stringify(cleanUser));
  localStorage.setItem("registeredName", cleanUser.name);
  localStorage.setItem("registeredEmail", cleanUser.email);
  localStorage.setItem("registeredPassword", cleanUser.password);
  localStorage.setItem("registeredRole", cleanUser.role);

  return cleanUser;
}

export function signIn(user) {
  localStorage.setItem(TOKEN_KEY, "mock-session-token");
  localStorage.setItem("token", "mock-session-token");
  localStorage.setItem("role", user.role);
  localStorage.setItem("username", user.name);
}

export function signOut() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  localStorage.removeItem("username");
}

export function isAuthenticated() {
  return Boolean(localStorage.getItem(TOKEN_KEY) || localStorage.getItem("token"));
}

export function currentSession() {
  const user = getStoredUser();

  return {
    isLoggedIn: isAuthenticated(),
    role: localStorage.getItem("role") || user?.role || "user",
    name: localStorage.getItem("username") || user?.name || "Member",
    email: user?.email || "member@portal.dev",
  };
}

export function updatePassword(nextPassword) {
  const user = getStoredUser();
  if (!user) return null;

  return saveUser({ ...user, password: nextPassword });
}
