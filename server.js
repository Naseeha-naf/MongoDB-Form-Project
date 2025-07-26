const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const port = 5000; 
app.use(express.static(__dirname));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
mongoose.connect('mongodb://localhost:27017/formDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));
const formSchema = new mongoose.Schema({
    reg_no: String,
    name: String,
    email: String,
    branch: String
});
const Form = mongoose.model('Form', formSchema);
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'form.html'));
});

app.post('/submit', (req, res) => {
    const formData = new Form({
        reg_no: req.body.reg_no,
        name: req.body.name,
        email: req.body.email,
        branch: req.body.branch
    });

    formData.save()
        .then(() => res.send("Data saved to MongoDB"))
        .catch(err => res.status(400).send("Error saving data"));
});
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
