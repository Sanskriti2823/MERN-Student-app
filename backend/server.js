const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('API Working');
});

app.listen(5000, () => { 
     console.log('Server running on port 5000');
});

const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/studentDB')

.then(() => console.log('MongoDB Connected'))

.catch(err => console.log(err));

const studentSchema = new mongoose.Schema({
name: String,
age: Number,
course: String
});
const Student = mongoose.model('Student', studentSchema);

// GET
app.get('/students', async (req, res) => {
   const data = await Student.find();
   res.json(data);
});

// POST
app.post('/students', async (req, res) => {
const newStudent = new Student(req.body);
await newStudent.save();
res.json(newStudent);
});