const express = require('express')
const {client}=require('./shared/dbConnection')
const app=express()
app.use(express.json())

