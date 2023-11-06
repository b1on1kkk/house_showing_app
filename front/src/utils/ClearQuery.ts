export function ClearQuery() {
  const newUrl =
    window.location.protocol +
    "//" +
    window.location.host +
    window.location.pathname;

  window.history.pushState({ path: newUrl }, "", newUrl);
  window.history.replaceState;

  return newUrl;
}
