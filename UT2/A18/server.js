const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

mongoose.connect('mongodb://localhost:27017/music', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const songSchema = new mongoose.Schema({
    songname: String,
    film: String,
    music_director: String,
    singer: String,
    actor: String,
    actress: String
});

const Song = mongoose.model('Song', songSchema);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/', async (req, res) => {
    try {
        const songs = await Song.find();
        const count = await Song.countDocuments();
        res.render('index', { songs, count });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

const initialSongs = [
    {
        songname: "Tum Hi Ho",
        film: "Aashiqui 2",
        music_director: "Mithoon",
        singer: "Arijit Singh"
    },
    {
        songname: "Channa Mereya",
        film: "Ae Dil Hai Mushkil",
        music_director: "Pritam",
        singer: "Arijit Singh"
    },
    {
        songname: "Gerua",
        film: "Dilwale",
        music_director: "Pritam",
        singer: "Arijit Singh"
    },
    {
        songname: "Tere Sang Yaara",
        film: "Rustom",
        music_director: "Arko",
        singer: "Atif Aslam"
    },
    {
        songname: "Agar Tum Saath Ho",
        film: "Tamasha",
        music_director: "A.R. Rahman",
        singer: "Alka Yagnik"
    }
];

app.get('/init', async (req, res) => {
    try {
        await Song.deleteMany({});
        await Song.insertMany(initialSongs);
        res.redirect('/');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.get('/director/:name', async (req, res) => {
    try {
        const songs = await Song.find({ music_director: req.params.name });
        res.render('index', { songs, count: songs.length });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.get('/director/:director/singer/:singer', async (req, res) => {
    try {
        const songs = await Song.find({
            music_director: req.params.director,
            singer: req.params.singer
        });
        res.render('index', { songs, count: songs.length });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.get('/delete/:id', async (req, res) => {
    try {
        await Song.findByIdAndDelete(req.params.id);
        res.redirect('/');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.post('/add', async (req, res) => {
    try {
        const newSong = new Song(req.body);
        await newSong.save();
        res.redirect('/');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.get('/film/:film/singer/:singer', async (req, res) => {
    try {
        const songs = await Song.find({
            film: req.params.film,
            singer: req.params.singer
        });
        res.render('index', { songs, count: songs.length });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.post('/update/:id', async (req, res) => {
    try {
        await Song.findByIdAndUpdate(req.params.id, {
            actor: req.body.actor,
            actress: req.body.actress
        });
        res.redirect('/');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});