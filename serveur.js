const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 5000;
const connectdb = require('./config/connect');
const User = require('./modele/user'); 
require('dotenv').config({path:'./config/.env'})
const arrayOfPeople = [
  {
    name: 'John Doe',
    age: 30,
    favoriteFoods: ['pizza', 'pasta', 'sushi']
  },
  {
    name: 'Jane Doe',
    age: 25,
    favoriteFoods: ['tacos', 'burritos', 'enchiladas']
  },
  {
    name: 'Peter Parker',
    age: 18,
    favoriteFoods: ['pizza', 'hamburgers', 'fries']
  }
];
//creation
const createPeople = async () => {
  try {
    const createdUsers = await User.create(arrayOfPeople);
    console.log("Created users:", createdUsers);
  } catch (error) {
    console.error("Error creating users:", error);
  }
};

// Call the connectdb function to establish the database connection
connectdb()
 
    // If the database connection is successful, create the people and start the server
   //createPeople();
   const findPeopleByName = async () => {
    try {
      const people = await User.find({ name:"Jane Doe" });
      console.log(people);
    } catch (error) {
      console.error("Error finding people:", error);
    }
  };
  const find = async () => {
    try {
      const people = await User.findOne({ name:"Jane Doe" });
      console.log(people);
    } catch (error) {
      console.error("Error finding people:", error);
    }
  };
  const findbyfavoritefood = async () => {
    try {
      const people = await User.findOne({ favoriteFoods:"tacos" });
      console.log(people);
    } catch (error) {
      console.error("Error finding people:", error);
    }
  };

  // Example: Find all people with the name 'John Doe'
  //find();
  //findPeopleByName();
  
  //findbyfavoritefood ();
  async function addFavoriteFoodToPerson(personId, favoriteFood) {
    try {
      const person = await User.findByIdAndUpdate(
        personId,
        { $push: { favoriteFoods: favoriteFood } },
        { new: true }
      );
  
   
      console.log('Favorite food "hamburger" added to the person:', person);
    } catch (error) {
      console.error('Error updating person:', error);
    }
  }
  //const personId = '651b028791b9497716872cea'; 
 // const favoriteFood = 'hamburger';
  const findbyid =async(id)=>{
    try{
      const people=await User.findById(id);
      console.log(people);
    } catch (error) {
      console.error("Error finding people:", error);
    }
    }
    //findbyid('651b028791b9497716872ce8');
    //addFavoriteFoodToPerson(personId ,favoriteFood)
    async function updatePersonAge(personName) {
      try {
        const updatedPerson = await User.findOneAndUpdate(
          { name: personName },
          { age: 20 },
          { new: true } // This option ensures that the updated document is returned
        );
    
        if (!updatedPerson) {
          console.log('Person not found.');
          return;
        }
    
        console.log('Updated person:', updatedPerson);
      } catch (error) {
        console.error('Error updating person:', error);
      }
    }
    //updatePersonAge("Jane Doe");
    async function deletePersonById(personId) {
      try {
        const deletedPerson = await User.findByIdAndRemove(personId);
    
        if (!deletedPerson) {
          console.log('Person not found.');
          return;
        }
    
        console.log('Deleted person:', deletedPerson);
      } catch (error) {
        console.error('Error deleting person:', error);
      }
    }
    //deletePersonById('651b028791b9497716872cea')
    async function deletePeopleByName(name) {
      try {
        const result = await User.deleteMany({ name: name });
    
        console.log('Deleted ${result.deletedCount} people named ${name}');
      } catch (error) {
        console.error('Error deleting people:', error);
      }
    }
   // deletePeopleByName('John Doe')
    async function searchPeopleWhoLikeBurritos() {
      try {
        const data = await User.find({ favoriteFoods: 'burritos' })
          .sort('name')
          .limit(2)
          .select('-age')
          .exec((err,user2)=>{
            if (err) return handleError(err);
            console.log(user2) 
          });
    
        console.log('Result:', data);
      } catch (err) {
        console.error('Error:', err);
      }
    }
    
  searchPeopleWhoLikeBurritos();
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  
  