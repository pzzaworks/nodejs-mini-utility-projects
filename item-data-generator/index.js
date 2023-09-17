'use strict';
const fs = require('fs');

let itemCount = 10000;

let itemCategoryIdList = [
    1, // Items
    2, // Customs
    3 // Characters
];

let effectIdList = [
    1, // Fire
    2, // Earth
    3, // Electricity
    4 // Ice
];

let fightItemImageList = [
    "Sword",
    "Shield"
];

let customItemImageList = [
    "Skin",
    "Mask",
    "Torso",
    "Legs"
];

let generatedFightItemNameList = [];
let generatedFightItemImageList = [];
let generatedFightItemSlotImageList = [];

for(let i = 1; i <= 5; i++) {
    for(let j = 0; j < fightItemImageList.length; j++) {
        let itemImage = fightItemImageList[j] + "0" + i.toString();
        let itemName = fightItemImageList[j];
        let itemSlotImage = itemImage + "_Slot";

        generatedFightItemNameList.push(itemName);
        generatedFightItemImageList.push(itemImage);
        generatedFightItemSlotImageList.push(itemSlotImage);
    }
}

let generatedCustomItemNameList = [];
let generatedCustomItemImageList = [];
let generatedCustomItemSlotImageList = [];

for(let i = 1; i <= 5; i++) {
    for(let j = 0; j < customItemImageList.length; j++) {
        let itemImage = customItemImageList[j] + "0" + i.toString();
        let itemName = customItemImageList[j];
        let itemSlotImage = itemImage + "_Slot";

        generatedCustomItemNameList.push(itemName);
        generatedCustomItemImageList.push(itemImage);
        generatedCustomItemSlotImageList.push(itemSlotImage);
    }
}

let itemList = [];

for(let i = 1; i <= itemCount; i++) {
    let itemTypeId = Math.floor(Math.random() * 10);
    let imageId = itemTypeId > 5 ? Math.floor(Math.random() * (generatedFightItemImageList.length - 1)) : Math.floor(Math.random() * (generatedCustomItemImageList.length - 1));
    let randomNumber = Math.floor(Math.random() * 2500);

    let item = { 
        id: i,
        item_category_id: Math.floor(Math.random() * itemCategoryIdList.length),
        title: itemTypeId > 5 ? generatedCustomItemNameList[imageId] + randomNumber.toString() : generatedCustomItemNameList[imageId] + randomNumber.toString(),
        description: "",
        image: itemTypeId > 5 ? generatedFightItemImageList[imageId] : generatedCustomItemImageList[imageId],
        slot_image: itemTypeId > 5 ? generatedFightItemSlotImageList[imageId] : generatedCustomItemSlotImageList[imageId],
        attack: Math.floor(Math.random() * 1000),
        defence: Math.floor(Math.random() * 1000),
        effect_id: Math.floor(Math.random() * effectIdList.length),
        effect_power: Math.floor(Math.random() * 1000),
    };

    itemList.push(item);
}

let itemsData = { 
    "items": itemList 
}

fs.writeFileSync('items.json', JSON.stringify(itemsData, null, "\t"));