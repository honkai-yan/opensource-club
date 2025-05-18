export function useRouteFinished() {
  window.dispatchEvent(new Event("route-finished"));
}
