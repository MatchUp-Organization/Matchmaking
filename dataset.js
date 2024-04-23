const fs = require('fs');

// Lists of common first names for males and females
const maleNames = ["James", "John", "Robert", "Michael", "William", "David", "Richard", "Joseph", "Thomas", "Charles", "Daniel", "Matthew", "Anthony", "Mark", "Donald", "Steven", "Paul", "Andrew", "Kenneth", "Joshua", "Ralph", "Isaac", "Jake", "Travis", "Sean", "Hugo", "Wilson", "Terrie", "Robin", "Rufus", "Romeo", "Darwin", "Arthur"];
const femaleNames = ["Mary", "Patricia", "Jennifer", "Linda", "Elizabeth", "Barbara", "Susan", "Jessica", "Sarah", "Karen", "Nancy", "Lisa", "Betty", "Margaret", "Sandra", "Ashley", "Kimberly", "Emily", "Donna", "Michelle", "Sandy", "Amelia", "Katrina", "Jeannie", "Melissa", "Alison", "Martina", "Donna", "Carol", "Cathy", "Jeanne", "Katy", "Nina"];

const football_positions =["Goalkeeper", "Defender", "Midfielder", "Forward"]
const basketball_positions = ["Guard", "Forward", "Center"]
// Function to generate a random age between 15 and 25
function generateAge() {
    return Math.floor(Math.random() * 11) + 15;
}

// Function to randomly assign gender
function generateGender() {
    return Math.random() < 0.5 ? "male" : "female";
}

// Function to generate a random name based on gender
function generateName(gender) {
    const names = gender === "male" ? maleNames : femaleNames;
    return names[Math.floor(Math.random() * names.length)];
}

// Function to randomly assign sport
function generateSport() {
    return Math.random() < 0.5 ? "football" : "basketball";
}

function generateposition(sport) {
    const position = sport === "football" ? football_positions : basketball_positions;
        return position[Math.floor(Math.random() * position.length)];

}

// Function to randomly decide if they bring equipment or not
function generateEquipment() {
    return Math.random() < 0.5 ? "yes" : "no";
}

// Function to randomly assign play style
function generatePlayStyle() {
    return Math.random() < 0.5 ? "fun" : "tryhard";
}

// Function to randomly assign experience
function generateExperience() {
    return Math.random() < 0.5 ? "beginner" : "intermediate";
}

// Function to randomly assign warning flag
function generateWarning() {
    return Math.random() < 0.5 ? "flagged" : "not flagged";
}

// Generate dataset
const dataset = [];
for (let i = 0; i < 200; i++) {
    const gender = generateGender();
    const sport = generateSport();
    const person = {
        name: generateName(gender),
        age: generateAge(),
        gender: gender,
        sport: sport,
        position: generateposition(sport),
        equipment: generateEquipment(),
        play_style: generatePlayStyle(),
        experience: generateExperience(),
        warning: generateWarning()
    };
    dataset.push(person);
}
dataset.forEach(person => {
    console.log(person);
});

fs.writeFileSync('dataset.json', JSON.stringify(dataset, null, 4));
