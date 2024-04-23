const fs = require('fs');

function readJsonFile() {
    try {
        // Read JSON file synchronously
        const data = fs.readFileSync("dataset.json", 'utf8');
        // Parse JSON data
        const jsonObject = JSON.parse(data);
        return jsonObject;
    } catch (error) {
        console.error('Error reading JSON file:', error);
        return null;
    }
}

// Function to filter players by sport and gender
function filterBySportAndGender(dataset, sport, gender) {
    return dataset.filter(person => person.sport === sport && person.gender === gender);
}

// Function to create age groups with a 5-year range
function createAgeGroups(dataset, ageRange) {
    const ageGroups = dataset.reduce((acc, person) => {
        const ageGroup = Math.floor(person.age / ageRange) * ageRange;
        if (!acc[ageGroup]) {
            acc[ageGroup] = [];
        }
        acc[ageGroup].push(person);
        return acc;
    }, {});

    // Return the desired age group
    return ageGroups[ageRange * Math.floor(dataset[0].age / ageRange)];
}

// Function to ensure at least 1 player for each position
function ensurePositions(dataset, sport) {
    const football_positions =["Goalkeeper", "Defender", "Midfielder", "Forward"]
    const basketball_positions = ["Guard", "Forward", "Center"]

    const positions = sport === "football" ? football_positions : basketball_positions;
    const positionCounts = {};

    positions.forEach(position => {
        positionCounts[position] = 0;
    });

    return dataset.filter(person => {
        positionCounts[person.position]++;
        return Object.values(positionCounts).every(count=> count > 0);
    });
}

// Function to ensure at least 1 player with equipment
function ensureEquipment(dataset) {
    return dataset.filter(person => person.equipment === "yes");
}

// Function to prioritize players with similar play styles and experience levels
function prioritizePlayers(dataset) {
    const playStyles = ['fun', 'tryhard'];
    const experienceLevels = ['beginner', 'intermediate'];

    return dataset.sort((a, b) => {
        const playStyleDiff = playStyles.indexOf(a.play_style) - playStyles.indexOf(b.play_style);
        const experienceDiff = experienceLevels.indexOf(a.experience) - experienceLevels.indexOf(b.experience);
        return (
            playStyleDiff ||
            experienceDiff
        );
    });
}

function findPlayerWithEquipment(dataset) {
    return dataset.find(player => player.equipment === 'yes');
}



function findPlayerByPosition(dataset, positions) {
    for (const player of dataset) {
        if (positions.includes(player.position)) {
            return player;
        }
    }
    return null;
}

function divideIntoTeams(dataset) {
    const teams = [];

    for (let i = 0; i < 2; i++) {
        const currentTeam = [];
        const positions = ['Goalkeeper', 'Defender', 'Midfielder', 'Forward'];
        let hasEquipment = false;

        for (let j = 0; j < 5; j++) {
            let selectedPlayer = null;

            if (positions.length > 0) {
                // Select a player that satisfies the position requirement
                selectedPlayer = findPlayerByPosition(dataset, positions);
                if (selectedPlayer) {
                    positions.splice(positions.indexOf(selectedPlayer.position), 1);
                    if (selectedPlayer.equipment) {
                        hasEquipment = true;
                    }
                }
            } else {
                // Select any player if no position is available
                selectedPlayer = dataset.shift();
            }

            currentTeam.push(selectedPlayer);        
        }

        // If no player with equipment has been selected, select one from the remaining dataset
        if (!hasEquipment) {
            for (const player of dataset) {
                if (player.equipment) {
                    currentTeam[Math.floor(Math.random() * currentTeam.length)] = player;
                    break;
                }
            }
        }

        teams.push(currentTeam);
    }

    return teams;
}



// Matchmaking
const sport = "football";
const gender = "male";
const ageRange = 10;
const size = 5
const dataset = readJsonFile();
// dataset.forEach(person => {
//     console.log(person);
// });
const filteredDataset = filterBySportAndGender(dataset, sport, gender);
// filteredDataset.forEach(person => {
//     console.log(person);
// });
const ageGroups = createAgeGroups(filteredDataset, ageRange);
// ageGroups.forEach(person => {
//     console.log(person);
// });
const groupedByPosition = ensurePositions(ageGroups, sport);
// groupedByPosition.forEach(person => {
//     console.log(person);
// });

// const equippedPlayers = ensureEquipment(groupedByPosition);
// equippedPlayers.forEach(person => {
//     console.log(person);
// });
const prioritizedPlayers = prioritizePlayers(groupedByPosition);
// prioritizedPlayers.forEach(person => {
//     console.log(person);
// });
const teams = divideIntoTeams(prioritizedPlayers, size);

teams.forEach(team => {
    console.log("Team:");
    team.forEach(person => {
        console.log(person);
    });
});

// fs.writeFileSync('teams.json', JSON.stringify(teams, null, 4));