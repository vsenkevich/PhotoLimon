console.log("All photoposts: ");
console.log(workingModule.getPhotoPosts(0, 20));

console.log("Filter: author: IscoOfficial");
let filterObject = {
    author: "IscoOfficial"
};
console.log(workingModule.getPhotoPosts(0, 20, filterObject));
console.log("Filter: author: IscoOfficial, hashtag: wisdom");
filterObject.hashTags = "wisdom";
console.log(workingModule.getPhotoPosts(0, 20, filterObject));
let fullFilterObject = {
    author: "BoyLime"
};
console.log("Filter: author: BoyLime, hashtag: lime, Date: '2018-02-01T08:22:00' - '2018-02-17T08:22:00'");
filterObject.author = "BoyLime";
filterObject.hashTags = "lime";
filterObject.up = new Date('2018-02-17T08:22:00');
filterObject.bottom= new Date('2018-02-01T08:22:00');
console.log(workingModule.getPhotoPosts(0, 20, filterObject));
console.log("Filter: hashtag lemon, 5 posts skipping 3");
let filterHashtag = {
    hashTags: "lemon"
};
console.log(workingModule.getPhotoPosts(3, 5, filterHashtag));

console.log("Get 13th photopost: ");
console.log(workingModule.getPhotoPost('13'));
console.log("Get 23th photopost:    (doesn't exist)");
console.log(workingModule.getPhotoPost('23'));

console.log("Validation. Valid post: ");
const valid = {
    id: "33",
    description: "Be with those who help your being.",
    createdAt: new Date("2018-02-14T13:27:19"),
    author: "someAuthor",
    photoLink: "http://kot-pes.com/wp-content/uploads/2016/08/image10-2-650x520.jpeg",
    hashTags: ["psychology", "wisdom", "neighbourhood"],
    likes: ["Vasya", "Petya", "Kolya"]
};
console.log(workingModule.validatePhotoPost(valid));
console.log("Validation. Non-valid post (id already exists) : ");
let nonValid = {
    id: "17",
    description: "Be with those who help your being.",
    createdAt: new Date("2018-02-14T13:27:19"),
    author: "wiseGuy",
    photoLink: "http://kot-pes.com/wp-content/uploads/2016/08/image10-2-650x520.jpeg",
    hashTags: ["psychology", "wisdom", "neighbourhood"],
    likes: ["Vasya", "Petya", "Kolya"]
};
console.log(workingModule.validatePhotoPost(nonValid));
console.log("Validation. Non-valid post (too large description) : ");
nonValid.description = "Here we have 24 symbols.Here we have 24 symbols.Here we have 24 symbols.Here we have 24 symbols.Here we have 24 symbols." +
    "Here we have 24 symbols.Here we have 24 symbols.Here we have 24 symbols.Here we have 24 symbols.Here we have 24 symbols.Here we have 24 symbols.";
console.log(workingModule.validatePhotoPost(nonValid));

console.log("Add correct photopost: ");
const niceToAdd = {
    id: "35",
    description: "Every day may not be good, but there is something good in every day.",
    createdAt: new Date("2018-02-19T22:18:38"),
    author: "kotpes",
    photoLink: "http://kot-pes.com/wp-content/uploads/2016/08/image10-2-650x520.jpeg",
    hashTags: ["wisdom"],
    likes: ["Wonder", "Zayn", "Lauv", "Sia", "Alt-J"]
};
console.log(workingModule.addPhotoPost(niceToAdd));
console.log("Add invalid photopost: (createAt is not Date) ");
const anotherInvalid = {
    id: "579",
    description: "Don't apologize for feeling something or a lot.",
    createdAt: "Today",
    author: "Wise user",
    photoLink: "http://kot-pes.com/wp-content/uploads/2016/08/image10-2-650x520.jpeg",
    hashTags: ["wisdom", "relationship"],
    likes: ["Vasya", "Petya", "Kolya"]
};
console.log(workingModule.addPhotoPost(anotherInvalid));

console.log("Change description and photolink of the 1st photopost correctly: ");
console.log("Before: ");
console.log(workingModule.getPhotoPost('1'));
const permittedChanges = {
        description: "Don't apologize for feeling something or a lot.",
        photoLink: "Let this be some link"                           //      !!!!!!!!!!!!!!!!!!!!!!!!!!!!!
};
console.log("Result of edit: ");
console.log(workingModule.editPhotoPost('1', permittedChanges));
console.log(workingModule.getPhotoPost('1'));
console.log("Change id of the 3rd photo ");
console.log("Before: ");
console.log(workingModule.getPhotoPost('3'));
const forbiddenChanges = {
    id: '567'
};
console.log("Result of edit: ");
console.log(workingModule.editPhotoPost('3', forbiddenChanges));
console.log(workingModule.getPhotoPost('3'));

console.log("Remove photopost with id 8: ");
console.log("Here getPhotoPost(8) will work: ");
console.log(workingModule.getPhotoPost('8'));
console.log("Here we remove the post: ");
console.log(workingModule.removePhotoPost('8'));
console.log("And now look at getPhotoPost(8) call: ");
console.log(workingModule.getPhotoPost('8'));

console.log("And now we'll try to remove photopost with id 100500: ");
console.log(workingModule.removePhotoPost('100500'));
console.log("That's it :) ");


