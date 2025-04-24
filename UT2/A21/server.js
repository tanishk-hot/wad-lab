const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

mongoose.connect('mongodb://localhost:27017/bookstore', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    isbn: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    stock: { type: Number, required: true },
    description: String,
    publishedDate: Date
});

const Book = mongoose.model('Book', bookSchema);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/', async (req, res) => {
    try {
        const books = await Book.find();
        res.render('index', { books });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.post('/books', async (req, res) => {
    try {
        const book = new Book(req.body);
        await book.save();
        res.redirect('/');
    } catch (err) {
        res.status(400).send(err.message);
    }
});

app.get('/books/:isbn', async (req, res) => {
    try {
        const book = await Book.findOne({ isbn: req.params.isbn });
        if (!book) {
            return res.status(404).send('Book not found');
        }
        res.render('book', { book });
    } catch (err) {
        res.status(500).send(err.message);
    }
});


app.post('/books/:isbn/update', async (req, res) => {
    try {
        await Book.findOneAndUpdate({ isbn: req.params.isbn }, req.body);
        res.redirect('/');
    } catch (err) {
        res.status(400).send(err.message);
    }
});


app.get('/books/:isbn/delete', async (req, res) => {
    try {
        await Book.findOneAndDelete({ isbn: req.params.isbn });
        res.redirect('/');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.get('/search', async (req, res) => {
    try {
        const query = {};
        if (req.query.title) query.title = new RegExp(req.query.title, 'i');
        if (req.query.author) query.author = new RegExp(req.query.author, 'i');
        if (req.query.category) query.category = req.query.category;

        const books = await Book.find(query);
        res.render('index', { books });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});