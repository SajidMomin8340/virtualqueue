import express from "express";
import{PORT} from "./config.js";
const app=express();
app.listen(PORT,()=>
{
    console.log(`App is Listening On :${PORT}`);
    console.log("Sajid Hero")
});