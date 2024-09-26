const express = require('express'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    sanitizer = require('sanitizer'),
    app = express(),
    port = 8000;

app.use(bodyParser.urlencoded({ extended: false }));

app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        let method = req.body._method;
        delete req.body._method;
        return method;
    }
}));

let todolist = [];

// Display the todo list
app.get('/todo', function (req, res) {
    res.render('todo.ejs', {
        todolist,
        clickHandler: "func1();"
    });
});

// Add an item to the todo list
app.post('/todo/add/', function (req, res) {
    let newTodo = sanitizer.escape(req.body.newtodo);
    if (newTodo !== '') {
        todolist.push({ text: newTodo, completed: false });
    }
    res.redirect('/todo');
});

// Mark an item as completed
app.get('/todo/complete/:id', function (req, res) {
    let todoIdx = req.params.id;
    if (todolist[todoIdx]) {
        todolist[todoIdx].completed = !todolist[todoIdx].completed;
    }
    res.redirect('/todo');
});

// Delete an item from the todo list
app.get('/todo/delete/:id', function (req, res) {
    let todoIdx = req.params.id;
    if (todoIdx !== '') {
        todolist.splice(todoIdx, 1);
    }
    res.redirect('/todo');
});

// Get a single todo item and render edit page
app.get('/todo/:id', function (req, res) {
    let todoIdx = req.params.id;
    let todo = todolist[todoIdx];

    if (todo) {
        res.render('edititem.ejs', {
            todoIdx,
            todo: todo.text,
            clickHandler: "func1();"
        });
    } else {
        res.redirect('/todo');
    }
});

// Edit item in the todo list 
app.put('/todo/edit/:id', function (req, res) {
    let todoIdx = req.params.id;
    let editTodo = sanitizer.escape(req.body.editTodo);
    if (todoIdx !== '' && editTodo !== '') {
        todolist[todoIdx].text = editTodo;
    }
    res.redirect('/todo');
});

// Redirect to the todo list if the page requested is not found
app.use(function (req, res, next) {
    res.redirect('/todo');
});

app.listen(port, function () {
    console.log(`Todolist running on http://0.0.0.0:${port}`);
});

// Export app
module.exports = app;
