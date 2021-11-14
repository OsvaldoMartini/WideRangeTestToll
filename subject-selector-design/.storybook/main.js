module.exports = {
  stories: ['../stories/**/*.stories.@(ts|tsx|js|jsx)'],
  addons: ['@storybook/addon-links', 
  '@storybook/addon-essentials', 
  '@storybook/addon-a11y', 
  'storybook-addon-designs',
  "storybook-zeplin/register"],
  // https://storybook.js.org/docs/react/configure/typescript#mainjs-configuration
  typescript: {
    check: true, // type-check stories during Storybook build
  }
};
