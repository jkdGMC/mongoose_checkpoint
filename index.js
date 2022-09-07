const dotenv = require("dotenv");
const { Model } = require("mongoose");
dotenv.config({path: "./.env"});
require("./config/db.config");

const Person = require("./models/Person.model");

const newPerson = new Person({
    name: "Jules Ko",
    age: 30,
    favoriteFoods: ["Banana", "Apple", "Mangoes"]
})

newPerson.save()
    .then((user) => {
        console.log(user)
    }).catch((error) => {
        console.log(error)
})

// Create Many Records with model.create()

Person.create(
    {
        name: 'boy python',
        age: 16,
        favoriteFoods: ['pizza', 'soupou-kandia']
    },
    {
        name: 'Maestro Cheikh',
        age: 99,
        favoriteFoods: ['burger', 'thiep bou wekh']
    },
    {
        name: 'Maestro Ousmane',
        age: 1,
        favoriteFoods: ['burger', 'thiep bou wekh']
    }
)
.then(addedPersons => console.log(addedPersons))
.catch(error => console.error(error))


// Use model.find() to Search Your Database
const findPersons = (searchedName) =>{
    Person.find({name: searchedName })
    .then(persons => console.log(persons))
    .catch(error => console.error(error))
}

findPersons('Maestro')

// Use model.findOne() to Return a Single Matching Document from Your Database

const findOneWithFavoriteFood = food => {
    Person.findOne({'favoriteFoods': food})
    .then(persons => console.log(persons))
    .catch(error => console.error(error))
}

findOneWithFavoriteFood('burger')

// Use model.findById() to Search Your Database By _id

Person.findById('631783382d4b30f9e0549015', (error, person) => {
    if(error) console.error(error)
    console.log(person)
})

// Perform Classic Updates by Running Find, Edit, then Save
const addingHamburger = personId => {
    let updatingPerson;
    Person.findById(personId, (error, person) => {
        if(error)  throw error
        person.favoriteFoods.push('hamburger')
        person.save();
        console.log(person)
    })
}

addingHamburger('631783382d4b30f9e0549015');
Person.findById('631783382d4b30f9e0549015', (error, person) => !error ? console.log(person) : console.error(error))


// Perform New Updates on a Document Using model.findOneAndUpdate()
const findAndChangeAge = personName => {
    Person.findOneAndUpdate({"name": personName}, {$set: {age: 20}}, {new: true})
    .then(response => console.log(response))
    .catch(error => console.error(error))
}

findAndChangeAge('boy python')

const findAndRemove = (personId) => {
    Person.findByIdAndRemove(personId, (error,doc) => {
        if(error) throw error
        console.log(doc, "The document is removed !")
    })
}

findAndRemove('631783382d4b30f9e0549016')

// MongoDB and Mongoose - Delete Many Documents with model.remove()
Person.remove({name: 'boy python'})
    .then(response => {
        console.log('Document(s) removed !!!')
    })
    .catch(error => {
        console.error(error)
    })

// Chain Search Query Helpers to Narrow Search Results
Person.find({'favoriteFoods' : 'hamburger'})
    .sort({name: 1})
    .limit(2)
    .select('name age')
    .exec((error,data) => {
        if(error) throw error
        console.log(data)
    })
