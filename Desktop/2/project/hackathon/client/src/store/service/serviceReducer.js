import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const getAIResponse=createAsyncThunk('/service/chatbot',async(itemData)=>{
    const response=await axios.post('http://localhost:3000/service/analyze',itemData,{
        headers:[
            'Content-Type:Application/json'
        ]
    })
    console.log(response.data)
    return response.data
})

const serviceReducer=createSlice({
    name:"service",
    initialState:{},
    reducers:{},
    extraReducers:()=>{}
})