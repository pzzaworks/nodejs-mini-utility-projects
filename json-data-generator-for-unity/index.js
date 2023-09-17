'use strict';
const fs = require('fs');

let buildingChunks = [];
let currentBuildingChunksIndex = 1;
let buildingChunksCountRow = 10;
let buildingChunksCountColumn = 10;

for(let i = 1; i <= buildingChunksCountRow * buildingChunksCountColumn; i++) {
    let newBuildingChunk = { 
        id: currentBuildingChunksIndex,
        buildings: []
    };

    let currentBuildingID = 1;

    for(let j = 1; j <= 15; j++) {
        let newBuilding = { 
            id: currentBuildingID,
            locationX: 0,
            locationY: 0,
            chunkLocationX: 0,
            chunkLocationY: 0,
            chunkRotation: 0,
            buildingTypeIndex: 0
        };

        newBuildingChunk.buildings.push(newBuilding);

        currentBuildingID++;
    }

    buildingChunks.push(newBuildingChunk);

    currentBuildingChunksIndex++;
}

let jsonData = {
    "buildingChunksData": buildingChunks 
}

let data = JSON.stringify(jsonData);
let updatedData = data.replaceAll('"', '<Q>');

let resultData = '';
while (updatedData.length > 0) {
    resultData += '\"' + updatedData.substring(0, 120) + '\" ' + ' \+' + '\n';
    updatedData = updatedData.substring(120);
}

fs.writeFileSync('export.json', JSON.stringify(jsonData, null, "\t"));
fs.writeFileSync('export.txt', resultData);

/********* CONVERT FROM EDITABLE JSON TO CSHARP DATA *********/

//fs.writeFileSync('exportEditable.json', JSON.stringify(jsonData, null, "\t"));

// let exportEditable = JSON.stringify(JSON.parse(fs.readFileSync('exportEditable.json')));
// let updatedExportEditableData = exportEditable.replaceAll('"', '<Q>');

// let resultExportEditableData = '';
// while (updatedExportEditableData.length > 0) {
//     resultExportEditableData += '\"' + updatedExportEditableData.substring(0, 120) + '\" ' + ' \+' + '\n';
//     updatedExportEditableData = updatedExportEditableData.substring(120);
// }

// fs.writeFileSync('exportConverted.txt', resultExportEditableData);