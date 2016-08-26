/**
 * GET /
 * Home page.
 */
exports.index = (req, res) => {
  res.render('home', {
    title: 'Home',
    //href: 'https://' + req.get('host') + req.originalUrl
    href: req.protocol + '://' + req.get('host') + req.originalUrl
  });
};
