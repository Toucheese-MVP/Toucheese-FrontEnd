/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://toucheese.net",
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: "daily",
  priority: 0.7,
  exclude: ["/admin", "/admin/*", "/auth/kakao/callback", "/members/*"],
};
