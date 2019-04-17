const fs = require('fs');
const path = require('path');
const d3 = require('d3-dsv');
const asyncLib = require('async');
const canvas = require('canvas-api-wrapper');

const fileTypes = ['.csv', '.json'];

const fileTypeReadFunctions = {
    '.csv': readCSV,
    '.json': readJSON
};

function writeCSVReport(filepath, dataToWrite) {
    let csvString = d3.csvFormat(dataToWrite);
    fs.writeFileSync(filepath, csvString);
    console.log('CSV Report Sucessfully Written');
}

function writeJSONReport(filepath, dataToWrite) {
    let jsonString = JSON.stringify(dataToWrite);
    fs.writeFileSync(filepath, jsonString);
    console.log('JSON Report Successfully Written');
}

function writeReports(dataToWrite) {
    const now = Date.now();
    writeCSVReport(`./reports/csv/bad_user_sis_ids_report_${now}.csv`, dataToWrite);
    writeJSONReport(`./reports/json/bad_user_sis_ids_report_${now}.json`, dataToWrite);
    console.log('Finished Writing Reports');
}

function checkSisIds(users) {
    return users.filter(user => /\D+/.test(user.sis_user_id) || !user.sis_user_id);
}

async function getAllUsers() {
    return await canvas.get('/api/v1/accounts/1/users?per_page=100');
}

function getUser(canvasID, callback) {
    canvas.get(`/api/v1/users/${canvasID.canvas_id}`, (err, user) => {
        if (err) {
            throw err;
        } else {
            callback(null, user);
        }
    });
}

function getUsers(canvasIDs) {
    return new Promise((resolve, reject) => {
        asyncLib.mapLimit(canvasIDs, 30, getUser, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
}

function readCSV(filepath) {
    let csvString = fs.readFileSync(filepath);
    return d3.csvParse(csvString);
}

function readJSON(filepath) {
    return require(filepath);
}

function readFile(filepath) {
    if (fs.existsSync(filepath) && fileTypes.includes(path.extname(filepath))) {
        let extname = path.extname(filepath);
        return fileTypeReadFunctions[extname](filepath);
    } else {
        throw `Unsupported Filetype. Please use one of the following: ${fileTypes}`;
    }
}

async function main() {
    try {
        const filepath = process.argv[2];
        let users = [];
        if (filepath) {
            let canvasIDs = readFile(filepath);
            users = await getUsers(canvasIDs);
        } else {
            users = await getAllUsers();
        }
        if (users.length > 0) {
            console.log('Users Successfully Retrieved from Canvas');
            let badUsers = checkSisIds(users);
            writeReports(badUsers);
        } else {
            throw 'No Users To Check';
        }
        console.log('Process Complete');
    } catch (err) {
        console.error(err);
    }
}

main();