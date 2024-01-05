import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

let posts = [];


//home page
app.get('/', (req, res) => {
  res.render('index', { posts });
});

// new post form
app.get('/new', (req, res) => {
  res.render('edit', { post: null });
});

// create new post
app.post('/new', (req, res) => {
  const { title, content } = req.body;
  const newPost = { title, content };
  posts.push(newPost);
  res.redirect('/');
});

// edit Post Form
app.get('/edit/:id', (req, res) => {
  const postId = parseInt(req.params.id, 10);
  const post = posts[postId];
  res.render('edit', { post, postId });
});

// update post
app.post('/edit/:id', (req, res) => {
  const postId = req.params.id;
  const { title, content } = req.body;
  posts[postId] = { title, content };
  res.redirect('/');
});

// Delete Post
app.get('/delete/:id', (req, res) => {
  const postId = req.params.id;
  posts.splice(postId, 1);
  res.redirect('/');
});




app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
