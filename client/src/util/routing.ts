export const isRunningLocal = (): boolean => {
  return (
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1"
  );
};

export const getOpportunitiesRootPage = (): string => {
  return isRunningLocal() ? "./opportunities.html" : "/opportunities";
};

export const getRootOpportunityFetchUrl = (): string => {
  return isRunningLocal()
    ? "http://127.0.0.1:8000"
    : "https://portal.compscihi.com";
};
