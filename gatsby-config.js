module.exports = {
  plugins: [
    {
      resolve: `gatsby-plugin-sass`,
      options: {},
    },
    {
      resolve: `gatsby-plugin-netlify-identity`,
      options: {
        url: 'https://ideacollector.netlify.com/'
      }
    }
  ]
};