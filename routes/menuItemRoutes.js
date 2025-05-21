const express = require('express');
const router = express();
const MenuItem = require('./../models/MenuItem');

// Get method to get the menu
router.get('/',async(req,res)=>{
  try{
      const data=await MenuItem.find();
      console.log("Data fetched");
      res.status(200).json(data);
  }catch(err){
      console.log(err);
      res.status(500).json({error:'Internal Server Error'});
  }
})

// Post method to post the menu
router.post('/',async(req,res)=>{
    try{
        const data=req.body;
        const newMenu=new MenuItem(data);
        
        const response=await newMenu.save();
        console.log("Data Saved");
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error'});
    }
})


// Homework
router.get('/:taste',async(req,res)=>{
  try{
    const taste = req.params.taste;
    if(taste=='sweet' || taste=='sour' || taste=='spicy'){
        const response = await MenuItem.find({taste:taste});
        console.log("Taste Fetched");
        res.status(200).json(response);
    }
    else{
        console.log("Data Not Found");
        res.status(404).json({Error:'Data Not Found'});
    }
    console.log("Data Found");
    res.status(200).json({message:"Taste Found Successfully"});
  }catch(err){
    console.log(err);
    res.status(500).json({error:'Internal Server Error'});
  }
})

module.exports = router;