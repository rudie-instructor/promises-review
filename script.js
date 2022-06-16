const inquirer = require("inquirer");
const path = require('path');
const fs = require('fs');

function generateHTML(answers) {
    return `<!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Bridge of Death Results</title>
        </head>
        <body>
            <h1>Your first results:</h1>
            <ul>
                <li>Your name: ${answers.yourName}</li>
                <li>Your quest: ${answers.yourQuest}</li>
                <li>The airspeed velocity of an unladen swallow: ${answers.swallowASV}</li>
                <li>Your result: ${answers.result}</li>
            </ul>
        </body>
</html>
    `
}

function addToHTML(answers) {
    return `
    <h1>More results:</h1>
        <ul>
            <li>Your name: ${answers.yourName}</li>
            <li>Your quest: ${answers.yourQuest}</li>
            <li>The airspeed velocity of an unladen swallow: ${answers.swallowASV}</li>
            <li>Your result: ${answers.result}</li>
        </ul>
    `
}







// const ourFirstPromise = new Promise((resolve) => {
//     setTimeout(() => {
//         resolve("resolved");
//     }, 1000)
// })


// ourFirstPromise
//     .then(value => value + " and again")
//     .then(valueToo => valueToo + " and again")
//     .then(valueFinal => console.log(valueFinal))
//     .catch(err => console.log(err));




    


// const ourSecondPromise = new Promise((resolve) => {
//     resolve(promiseResponse = {
//         data: {
//             stocks: [
//                 {
//                     name: "AAPL",
//                     amt: 3
//                 },
//                 {
//                     name: "AIP",
//                     amt: 50
//                 },
//                 {
//                     name: "CCF",
//                     amt: 100
//                 }
//             ]
//         }
//     });
// });



// function positionPrompt(data) {
//     inquirer.prompt({
//         type: "input",
//         name: "userInput",
//         message: "Please enter the ticker and amount, separated by a comma and space (AAPL, 30"
//     }).then(res => {
//         userInputArr = res.userInput.split(", ");
//         data.addToPosition(userInputArr[0], parseInt(userInputArr[1]));
//         console.log(data);
//         return data
//     }).then(data => {
//         inquirer.prompt({
//             type: "confirm",
//             name: "addAgain",
//             message: "Would you like to add again?"
//         }).then(userInput => {
//             if (userInput.addAgain) {
//                 positionPrompt(data);
//             }
//         })
//     })
// }


ourSecondPromise
    .then(res => {
        data = res.data;
        data.addToPosition = function (name, amount) {
            let index = this.stocks.findIndex(stock => stock.name === name);
            if (index >= 0) {
                this.stocks[index].amt += amount;
                console.log(`${name} increased by ${amount}`)
            } else {
                this.stocks.push({
                    name: name,
                    amt: amount
                })
                console.log(`${name} added to portfolio at ${amount}`);
            }
        }
        return data;
    }
    )
    .then(data => {
        inquirer.prompt({
            type: "input",
            name: "userInput",
            message: "Please enter the ticker and amount, separated by a comma and space (AAPL, 30"
        }).then(res => {
            userInputArr = res.userInput.split(", ");
            data.addToPosition(userInputArr[0], parseInt(userInputArr[1]));
            console.log(data);
        })
        positionPrompt(data);
    })
    .catch(error => console.error(error));













function bridgeOfDeath(again) {
    inquirer.prompt([
        {
            type: 'input',
            name: 'yourName',
            message: "What is your name?",
            validate: (answer) => {
                if (answer !== '') {
                    return true;
                }
                return 'Speak!';
            },
        },
        {
            type: 'input',
            name: 'yourQuest',
            message: "What is your quest?",
            validate: (answer) => {
                if (answer !== '') {
                    return true;
                }
                return 'Speak!';
            },
        },
        {
            type: 'input',
            name: 'swallowASV',
            message: "What is the airspeed velocity of an unladen swallow?",
            validate: (answer) => {
                if (answer !== '') {
                    return true;
                }
                return 'Speak!';
            },
        },
    ]).then(answers => {
        if (answers.swallowASV === "African or European?") {
            console.log("I don't know that!");
            answers.result = "You defeated the Bridgemaster";
        } else if (answers.swallowASV === "20 mph" || answers.swallowASV === "20mph" || answers.swallowASV === "9 mps" || answers.swallowASV === "9 m/s") {
            console.log("Oh, that's actually correct. Well done.");
            answers.result = "You defeated the Bridgemaster"
        } else {
            console.log("You have been flung from the Bridge of Death");
            answers.result = "You were flung from the Bridge of Death";
        }
        return answers
    }).then(answers => {
        if (!again) {
            fs.writeFileSync('./bridgeofdeath.html', generateHTML(answers), 'utf-8')
        } else {
            fs.readFileSync('./bridgeofdeath.html');
            fs.appendFileSync('./bridgeofdeath.html', addToHTML(answers), 'utf-8');
        }
    }).then(() => {
        inquirer.prompt({
            type: 'confirm',
            name: 'playAgain',
            message: 'Would you like to play again?'
        }).then(answer => {
            if (answer.playAgain) {
                bridgeOfDeath(true);
            }
        })
    }).catch(err => console.log(err));
}

bridgeOfDeath(false);
