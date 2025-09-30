// You can run this once in a script or via Postman
const Video = require('./models/Video');

const videos = [
  {
    title: 'HR Basics',
    url: 'https://www.youtube.com/embed/abcd1234',
    interest: 'HR',
  },
  {
    title: 'Safety Training',
    url: 'https://www.youtube.com/embed/wxyz5678',
    interest: 'Safety',
  },
  {
    title: 'Business Strategy',
    url: 'https://www.youtube.com/embed/efgh9012',
    interest: 'Business',
  },
  {
    title: 'Technical Tutorial',
    url: 'https://www.youtube.com/embed/ijkl3456',
    interest: 'Technical',
  },
];

Video.insertMany(videos)
  .then(() => console.log('Videos added!'))
  .catch((err) => console.error(err));
