const { log } = require("console");
const posts = require("../data/post_array");

function index(req, res) {
  res.json(posts);
}

function show(req, res) {
  const postSlug = req.params.slug;
  const post = posts.find((post) => post.slug === postSlug);

  if (!post) {
    res.status(404);
    return res.json({
      error: "404 Not Found",
    });
  }
  res.json(post);
}

function store(req, res) {
  // res.send(`Create a new post`);

  const newPost = {
    slug: req.body.slug,
    title: req.body.title,
    image: req.body.image,
    content: req.body.content,
    tag: req.body.tags,
  };

  posts.push(newPost);
  console.log(posts);

  res.status(201);
  res.json(newPost);
}

function update(req, res) {
  // res.send(`Update post with id: ${req.params.id}`);
  const slug = req.params.slug;
  const post = posts.find((post) => post.slug === slug);
  if (!post) {
    res.status(404);
    return res.json({
      error: "Not Found",
    });
  }
  post.title = req.body.title;
  post.image = req.body.image;
  post.content = req.body.content;
  post.tags = req.body.tags;
  console.log(posts);
  res.json(post);
}

function modify(req, res) {
  res.send(`Modify post with id: ${req.params.id}`);
}

function destroy(req, res) {
  const postSlug = req.params.slug;
  const post = posts.find((post) => post.slug === postSlug);
  console.log(post);
  console.log("======================");

  if (!post) {
    res.status(404);
    return res.json({
      error: "404 Not Found",
    });
  }
  posts.splice(posts.indexOf(post), 1);
  console.log("Lista aggiornata:", posts);
  //   res.json({ message: `Post with slug ${postSlug} deleted` });
  res.status(204).send();
}

module.exports = {
  index,
  show,
  store,
  update,
  modify,
  destroy,
};
