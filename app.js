// Import required modules
const mongoose = require('mongoose');
require('dotenv').config(); // For loading environment variables from .env file

// Connect to MongoDB Atlas using the URI from .env
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.error('MongoDB connection error:', err));

// Define the Person schema
const personSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number },
    favoriteFoods: { type: [String] } // Array of strings
});

// Create the Person model
const Person = mongoose.model('Person', personSchema);

// Create and Save a Record of a Model
const person = new Person({
    name: 'Alice',
    age: 30,
    favoriteFoods: ['Pizza', 'Sushi']
});

person.save(function (err, data) {
    if (err) return console.error(err);
    console.log('Person saved:', data);
});

// Create Many Records with model.create()
const arrayOfPeople = [
    { name: 'Bob', age: 25, favoriteFoods: ['Tacos'] },
    { name: 'Mary', age: 28, favoriteFoods: ['Burgers', 'Pasta'] },
    { name: 'John', age: 22, favoriteFoods: ['Burritos', 'Steak'] }
];

Person.create(arrayOfPeople, function (err, data) {
    if (err) return console.error(err);
    console.log('People created:', data);
});

// Use model.find() to Search Your Database
Person.find({ name: 'Alice' }, function (err, data) {
    if (err) return console.error(err);
    console.log('Found people:', data);
});

// Use model.findOne() to Return a Single Matching Document
const food = 'Burritos';
Person.findOne({ favoriteFoods: food }, function (err, data) {
    if (err) return console.error(err);
    console.log('Found one person with favorite food:', data);
});

// Use model.findById() to Search Your Database By _id
const personId = 'YOUR_PERSON_ID_HERE'; // replace with an actual ID
Person.findById(personId, function (err, data) {
    if (err) return console.error(err);
    console.log('Found person by ID:', data);
});

// Perform Classic Updates by Running Find, Edit, then Save
Person.findById(personId, function (err, person) {
    if (err) return console.error(err);
    person.favoriteFoods.push('Hamburger');
    person.save(function (err, updatedPerson) {
        if (err) return console.error(err);
        console.log('Updated person:', updatedPerson);
    });
});

// Perform New Updates on a Document Using model.findOneAndUpdate()
const personName = 'Bob'; // Example name
Person.findOneAndUpdate({ name: personName }, { age: 20 }, { new: true }, function (err, updatedPerson) {
    if (err) return console.error(err);
    console.log('Updated person age:', updatedPerson);
});

// Delete One Document Using model.findByIdAndRemove
Person.findByIdAndRemove(personId, function (err, removedPerson) {
    if (err) return console.error(err);
    console.log('Removed person:', removedPerson);
});

// Delete Many Documents with model.remove()
Person.remove({ name: 'Mary' }, function (err, result) {
    if (err) return console.error(err);
    console.log('Deleted documents:', result);
});

// Chain Search Query Helpers
Person.find({ favoriteFoods: 'Burritos' })
    .sort({ name: 1 })
    .limit(2)
    .select('-age') // Exclude the age field
    .exec(function (err, data) {
        if (err) return console.error(err);
        console.log('Chained search results:', data);
    });
