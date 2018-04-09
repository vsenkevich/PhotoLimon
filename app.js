let express = require('express');
const actions = require('./server/actions.js');


let app = express();
app.use(express.static(__dirname + '/public/'));

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


app.get('/getPhotoPost', (req, res) => {
    console.log(actions.getPhotoPost(req.query.id));
    res.end(JSON.stringify(actions.getPhotoPost(req.query.id)));
});

app.post('/getPhotoPosts', (req, res) => {
    if (!req.body.author && !req.body.hashTags && !req.body.up && !req.body.bottom) {
        res.end(JSON.stringify(actions.getPhotoPosts(req.query.skip, req.query.top)));
    }
    else {
        res.end(JSON.stringify(actions.getPhotoPosts(req.query.skip, req.query.top, req.body)));
    }
});

app.post('/addPhotoPost', (req, res) => {
    console.log(actions.addPhotoPost(req.body));
    res.end(actions.addPhotoPost(req.body));
});

app.delete('/removePhotoPost', (req, res) => {
    console.log(actions.removePhotoPost(req.query.id));
    res.end(actions.addPhotoPost(req.query.id));
});

app.put('/editPhotoPost', (req, res) => {
    console.log(actions.editPhotoPost(req.query.id, req.body));
    res.end(req.method + '-request processed');
});

app.listen(3000, () => {
    console.log('Server is running');
});