import type { Endpoint } from "./type/specificationType";

export function removeTrailingSlash(url: string) {
  return url.endsWith("/") ? url.slice(0, -1) : url;
}

export function getMethodColor(endpoint: Endpoint) {
  return {
    GET: "primary",
    POST: "success"
  }[endpoint.method];
}
