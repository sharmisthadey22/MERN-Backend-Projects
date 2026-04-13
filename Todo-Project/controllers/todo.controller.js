import Todo from "../models/todo.model.js";
import mongoose from "mongoose";
import { asyncHandler } from "../middlewares/asyncHandler.js";

//Create Todo - POST API
export const createTodo = asyncHandler(async(req, res)=>{
        const { title, description } = req.body;

        //vallidation
        if ( !title || title.trim() ==="") {
            return res.status(400).json({
                success: false,
                message: "Title is required",
            });
        }

        const todo = await Todo.create({
            title,
            description,
        })

        return res.status(201).json({
            success: true,
            message: "Todo created successfully",
            todo,

        });

    }); 
    


//Get  all TODO_ GET API

export const getTodos = asyncHandler(async (req, res) =>{
        //Query Param
        const {search, sort, page=1, limit=10} =req.query;

        //Base query
        let query ={};

        //Search by title
        if(search){
            query.title = { $regex: search, $options: "i"}; //i for case insensitive
        }

        //Sorting
        let sortOption = {};
        if(sort ==="asc") sortOption.createdAt = 1; //1 for ascending order
        else sortOption.createdAt = -1; //-1 fordescending order defaulf

        //pagination
        const skip = (page -1) * limit;

        const todos = await Todo.find(query)
             .sort(sortOption)
             .skip(skip)
             .limit(parseInt(limit));

        const totalTodos = await Todo.countDocuments(query);
        
        return res.status(200).json({
            success: true,
            message: "Todos fetched successfully",
            total: totalTodos,
            page: Number(page),
            limit: Number(limit),
            data: todos,
        });
    });

//Get Todo by ID - GET API
export const getTodoById = asyncHandler(async (req, res) => {
    const { id } = req.params;

        //Validate ID based in mongoose

        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({
                success: false,
                message: "Invalid Todo ID",
            });
        }

        const todo = await Todo.findById(id);
        
        //If todo not found 
        if(!todo){
            return res.status(400).json({
                success: false,
                message: "Todo not found",
            });
        }

        //If todo  found

        return res.status(200).json({
            success: true,
            message: "Todo fetched successfully",
            data: todo,
        });

    });
    

//Update Todo by ID - PUT API
export const updateTodo = asyncHandler(async (req, res) => {
        const { id } = req.params; // URL se ID lega
        const { title, description } = req.body; // Body se naya data lega

        // ID validate
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ 
                success: false, 
                message: "Invalid Todo ID" });
        }

        // Database mein update 
        const updatedTodo = await Todo.findByIdAndUpdate(
            id, 
            { title, description }, 
            { new: true } // Isse update hone ke baad naya data dikhega
        );

        if (!updatedTodo) {
            return res.status(404).json({ success: false, message: "Todo not found" });
        }

        // Success message!
        return res.status(200).json({
            success: true,
            message: "Todo updated successfully",
            data: updatedTodo
        });

    });


//TOGGLE TODO by ID - PATCH API
export const toggleTodo = asyncHandler(async (req, res) => {
        const { id } = req.params;

        // Validate ID        
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ 
                success: false,
                 message: "Invalid Todo ID" });
        }

        //GET current TODO
        const todo = await Todo.findById(id);

        if (!todo) {
            return res.status(404).json({ 
                success: false, 
                message: "Todo not found" });
        }

        // Flip the completed field
        todo.isCompleted = !todo.isCompleted;

        
        await todo.save();
        //If todo found and updated
        return res.status(200).json({
            success: true,
            message: "Todo toggled successfully",
            data: todo
        });

    });

//Delete TODO by ID - DELETE API
export const deleteTodo = asyncHandler(async (req, res) => {
    const { id } = req.params;

        // Validate ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ 
                success: false, 
                message: "Invalid Todo ID" });
        }
        const deletedTodo = await Todo.findByIdAndDelete(id);
        
        //If todo not found
        if (!deletedTodo) {
            return res.status(404).json({ 
                success: false, 
                message: "Todo not found" });
        }

        //If todo found and deleted successfully
        return res.status(200).json({
            success: true,
            message: "Todo deleted successfully",
            data: deletedTodo
        });

    });