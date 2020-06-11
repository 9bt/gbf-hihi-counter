export default function useUserAgent() {
  const userAgent = navigator.userAgent.toLowerCase();

  const recommendedUserAgents = ['safari', 'chrome'];
  const isNotRecommendedUserAgent = recommendedUserAgents.filter(e => userAgent.includes(e)).length === 0;

  return {
    isNotRecommendedUserAgent,
  };
};
