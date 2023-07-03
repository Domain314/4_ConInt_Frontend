export const createFeatureToggleRouter = (featureConfig, aBTestConfig) => {
  return {
    setFeature(featureName, isEnabled) {
      featureConfig[featureName] = isEnabled;
    },
    featureIsEnabled(featureName) {
      return featureConfig[featureName];
    },
    assignToGroup(experiment) {
      const groupSize = aBTestConfig[experiment].groupSize;
      // could be a more s
      const randomNumber = Math.floor(Math.random() * groupSize) + 1;

      // Could be a more sophisticated value based on userid and expiriment id
      const expirimentCookieValue = Buffer.from(`${experiment}:${randomNumber}`, 'utf-8').toString('base64');
      // res.addHeader('experiment:Id', expirimentCookieValue);
      return expirimentCookieValue;
    },
    checkGroup(expirimentCookieValue) {
      return Buffer.from(expirimentCookieValue, 'base64').toString('utf-8').split(':');
    }
  };
};

// module.exports = createFeatureToggleRouter;