export function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  return match ? decodeURIComponent(match[2]) : null;
}

export const setCookie = (
  name: string,
  value: string,
  options: {
    maxAge?: number;
    path?: string;
    secure?: boolean;
    sameSite?: "Strict" | "Lax" | "None";
  } = {}
): void => {
  const { maxAge, path = "/", secure = false, sameSite = "Strict" } = options;
  let cookie = `${name}=${value}; path=${path};`;

  if (maxAge) {
    cookie += ` max-age=${maxAge};`;
  }

  if (secure) {
    cookie += ` secure;`;
  }

  if (sameSite) {
    cookie += ` samesite=${sameSite};`;
  }

  document.cookie = cookie;
};
