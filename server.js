const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 5000;

const readUsers = () => {
    const data = fs.readFileSync('./users.json', 'utf-8');
    return JSON.parse(data);
};

app.get('/users', (req, res) => {
    try {
        const users = readUsers();
        res.json(users);
    } catch (error) {
        console.error('Error reading user data:', error.message);
        res.status(500).send('Error reading user data');
    }
});

app.get('/users/:id', (req, res) => {
    try {
        const users = readUsers();
        const user = Object.values(users).find(u => u.id === parseInt(req.params.id));
        if (user) {
            res.json(user);
        } else {
            res.status(404).send('User not found.');
        }
    } catch (error) {
        console.error('Error processing request:', error.message);
        res.status(500).send('Error processing request');
    }
});


app.get('/users/profession/:profession', (req, res) => {
    try {
        const users = readUsers();
        const matchingUsers = Object.values(users).filter(
            u => u.profession.toLowerCase() === req.params.profession.toLowerCase()
        );
        if (matchingUsers.length) {
            res.json(matchingUsers);
        } else {
            res.status(404).send('No users found with the given profession.');
        }
    } catch (error) {
        console.error('Error processing request:', error.message);
        res.status(500).send('Error processing request.');
    }
});


app.get('/users/name/:name', (req, res) => {
    try {
        const users = readUsers();
        const user = Object.values(users).find(
            u => u.name.toLowerCase() === req.params.name.toLowerCase()
        );
        if (user) {
            res.json(user);
        } else {
            res.status(404).send('User not found.');
        }
    } catch (error) {
        console.error('Error processing request:', error.message);
        res.status(500).send('Error processing request.');
    }
});


app.listen(PORT, () => {
    console.log(`This server is running at http://localhost:${PORT}`);
});





