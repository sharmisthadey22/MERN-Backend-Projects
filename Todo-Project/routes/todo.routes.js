import express from 'express';
import { createTodo, getTodos, getTodoById, updateTodo, toggleTodo, deleteTodo } from '../controllers/todo.controller.js';

const route = express.Router();

//Create TODO
route.post('/add', createTodo);

// Get all TODOs
route.get('/', getTodos);

//Get all TODO by Id
route.get('/:id', getTodoById);

//Update TODO by ID
route.put('/:id', updateTodo);

//Toggle TODO by ID
route.patch('/:id/toggle', toggleTodo);

//Delete TODO by ID
route.delete('/:id', deleteTodo);

export default route;