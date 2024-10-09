export const isRunningLocal = (): boolean => {
  return (
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1"
  );
};

export const getOpportunitiesRootPage = (): string => {
  return isRunningLocal() ? "./opportunities.html" : "/opportunities";
};
