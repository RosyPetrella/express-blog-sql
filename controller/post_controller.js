const connection = require("../data/db");
const { log } = require("console");
const posts = require("../data/post_array");

function index(req, res) {
  const sql = "SELECT * FROM posts";
  connection.query(sql, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result);
  });
}

// function show(req, res) {
//   const postSlug = req.params.slug;
//   const post = posts.find((post) => post.slug === postSlug);

//   if (!post) {
//     res.status(404);
//     return res.json({
//       error: "404 Not Found",
//     });
//   }
//   res.json(post);
// }

function show(req, res) {
  //console.log(req);

  const postId = Number(req.params.id);

  const sql = "SELECT * FROM posts WHERE id = ?";

  const sqlJoin = `
  SELECT tags.*
  FROM post_tag
  JOIN tags ON post_tag.tag_id = tags.id
  WHERE post_tag.post_id = ?
`;

  connection.query(sql, [postId], (err, postResults) => {
    if (err) return res.status(500).json({ message: "Query Failed" });
    if (postResults.length === 0)
      return res.status(404).json({ message: "Post not found" });

    // Get the post from the results
    const post = postResults[0];
    //console.log(post);

    /* TODO: get the data from the retationship */
    connection.query(sqlJoin, [postId], (err, postResults) => {
      if (err) return res.status(500).json({ message: "Query Failed" });
      console.log(postResults);

      post.tags = postResults;

      // return the response
      res.json(post);
    });
  });
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

// function destroy(req, res) {
//   const postSlug = req.params.slug;
//   const post = posts.find((post) => post.slug === postSlug);
//   console.log(post);
//   console.log("======================");

//   if (!post) {
//     res.status(404);
//     return res.json({
//       error: "404 Not Found",
//     });
//   }
//   posts.splice(posts.indexOf(post), 1);
//   console.log("Lista aggiornata:", posts);
//   //   res.json({ message: `Post with slug ${postSlug} deleted` });
//   res.status(204).send();
// }

function destroy(req, res) {
  const postId = Number(req.params.id);
  const sql = "DELETE FROM posts WHERE id = ?";
  //accetta 3 parametri: la stringa che rappresenta la query da eseguire, il valore da sostituire nel placeholder ? della query e la callback (la funzione che viene eseguita quando la query è completata -con successo o con errore-)
  connection.query(sql, [postId], (err) => {
    if (err) return res.status(500).json({ error: "Query failed" });
    //se va tutto bene, restituisce lo stato 204
    res.sendStatus(204);
  });
}

module.exports = {
  index,
  show,
  store,
  update,
  modify,
  destroy,
};
