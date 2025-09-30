const express = require('express');
const router = express.Router();
const Parser = require('rss-parser');

const parser = new Parser();

// Define some RSS feeds for different interests
const rssFeeds = {
  HR: 'https://www.shrm.org/resourcesandtools/hr-topics/pages/rss.aspx',
  Technical: 'https://www.techmeme.com/feed.xml',
  Business: 'https://feeds.a.dj.com/rss/RSSMarketsMain.xml',
  Safety: 'https://www.osha.gov/rss/oshadaily.rss',
};

router.get('/', async (req, res) => {
  try {
    const { interests } = req.query;
    if (!interests)
      return res.status(400).json({ msg: 'No interests provided' });

    const topics = interests.split(',');
    let allArticles = [];

    for (let topic of topics) {
      const feedUrl = rssFeeds[topic];
      if (!feedUrl) continue;

      const feed = await parser.parseURL(feedUrl);
      const articles = feed.items.slice(0, 3).map((item) => ({
        title: item.title,
        link: item.link,
        pubDate: item.pubDate,
      }));

      allArticles = allArticles.concat(articles);
    }

    res.json(allArticles);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Error fetching RSS feeds' });
  }
});

module.exports = router;
