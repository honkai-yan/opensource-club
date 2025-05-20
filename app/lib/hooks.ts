export function useRouteFinished() {
  window.dispatchEvent(new Event("route-finished"));
}

export const useMediaQuery = (query: string) => {
  return window.matchMedia(query).matches;
};
