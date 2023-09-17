const fs = require('fs-extra');
const path = require('path');
const { createCanvas, loadImage } = require("canvas");

global.__basedir = __dirname;

let mapId = 0;
let mapResolution = 'Low';
let splitCount = 3;
let imageCanvasSize = 1024;

let imagePath = path.join(__basedir, '/Sprite_Map_' + mapId + '_' + mapResolution + '.png');
const imageDimensions = splitCount * imageCanvasSize;

const imageCanvas = createCanvas(imageCanvasSize, imageCanvasSize);
const imageContext = imageCanvas.getContext("2d");

splitImage();

async function splitImage() {
    await loadImage(imagePath).then((image) => {
        imageContext.imageSmoothingEnabled = true;
        let outputImageIndex = 0;

        let x = 0;
        let y = imageDimensions - imageCanvasSize;

        while(y >= 0) {
            while(x <= imageDimensions - imageCanvasSize) {
                imageContext.drawImage(image, x, y, imageCanvasSize, imageCanvasSize, 0, 0, imageCanvasSize, imageCanvasSize);

                let outputImagePath = path.join(__basedir, './output/Sprite_Map_' + mapId + '_Chunk_' + outputImageIndex + '_' + mapResolution + '.png');
                fs.writeFileSync(outputImagePath, imageCanvas.toBuffer("image/png"));

                console.log('Map Chunk ' + outputImageIndex + ' generated.');

                outputImageIndex++;

                x += imageCanvasSize;
            }

            y -= imageCanvasSize;
            x = 0;
        }

    });
}