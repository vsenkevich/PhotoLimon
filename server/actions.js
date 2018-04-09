const fs = require('fs');

let rawdata = fs.readFileSync('./server/data/posts.json');
let photoPosts = JSON.parse(rawdata);

function containsHashTag(arr, hashTag) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].indexOf(hashTag) === 0)
            return true;
    }
    return false;
};

function validatePhotoPost(Obj) {
    for (let i = 0; i < photoPosts.length; i++) {
        if (photoPosts[i].id === Obj.id)
            return false;
    }
    if (Obj.description === undefined || (Obj.description).length > 200)
        return false;
    if (Obj.photoLink === undefined)
        return false;
    if (Obj.author === undefined)
        return false;
    if (Obj.hashTags === undefined)
        return false;
    if (Obj.createdAt === undefined)
        return false;
    return true;
};

function getPost(str) {
    for (let i = 0; i < photoPosts.length; i++) {
        if (photoPosts[i].id === str)
            return photoPosts[i]
    }
    return false;
};

let actionModule = {

    getPhotoPosts: function(skip = 0, top = 10, filterConfig) {
        const array = [];
        photoPosts.sort((a, b) => {return b.createdAt - a.createdAt;});
        if (!filterConfig) {
            for (let i = skip; i < top + skip; i++) {
                array.push(photoPosts[i]);
            }
            if (skip !== 0) {
                return array.slice(skip, skip + top)
            }
            return array.slice(0, top);
        }
        if (filterConfig.author !== undefined && filterConfig.author !== '') {
            for (let i = 0; i < photoPosts.length; i++) {
                if (photoPosts[i].author.indexOf(filterConfig.author) === 0) {
                    array.push(photoPosts[i]);
                }
            }
        }
        if (filterConfig.up) {
            for (let i = 0; i < photoPosts.length; i++) {
                if (photoPosts[i].createdAt.getTime() < filterConfig.up.getTime()) {
                    array.push(photoPosts[i]);
                }
            }
        }

        if (filterConfig.bottom) {
            for (let i = 0; i < photoPosts.length; i++) {
                if (typeof photoPosts[i].createdAt === 'string') {
                    photoPosts[i].createdAt = new Date(photoPosts[i].createdAt);
                }
            }

            for (let i = 0; i < photoPosts.length; i++) {
                if (photoPosts[i].createdAt.getTime() > filterConfig.bottom.getTime()) {
                    array.push(photoPosts[i]);
                }
            }
        }

        if (filterConfig.hashTags) {
            for (let i = 0; i < photoPosts.length; i++) {
                if (containsHashTag(photoPosts[i].hashTags, filterConfig.hashTags)) {
                    array.push(photoPosts[i]);
                }
            }
        }

        for (let i = 0; i < array.length; i++) {
            if (((filterConfig.author !== undefined && filterConfig.author !== ' ') && (array[i].author.indexOf(filterConfig.author)) !== 0) ||
                (filterConfig.bottom && array[i].createdAt.getTime() < filterConfig.bottom.getTime()) ||
                (filterConfig.up && array[i].createdAt.getTime() > filterConfig.up.getTime()) ||
                (filterConfig.hashTags && !containsHashTag(array[i].hashTags, filterConfig.hashTags))) {
                array.splice(i, 1);
                i--;
            }
        }
        for (let i = 0; i < array.length; i++) {
            for (let j = i; j < array.length; j++) {
                if (i === j) continue;
                if (array[i].id === array[j].id) {
                    array.splice(j, 1);
                    j--;
                }
            }
        }
        if (skip !== 0) {
            return array.slice(skip, skip + top)
        }
        return array.slice(0, top);
    },

    getPhotoPost: function (str) {
        for (let i = 0; i < photoPosts.length; i++) {
            if (photoPosts[i].id === str)
                return photoPosts[i]
        }
        return false;
    },

    addPhotoPost: function (Obj) {
        if (validatePhotoPost(Obj) === false)
            return false;
        else {
            photoPosts.push(Obj);
            let data = JSON.stringify(photoPosts, null, 2);
            fs.writeFile('./server/data/posts.json', data, (err) => {
                if (err) throw err;
            });
            return true;
        }
    },

    editPhotoPost: function (str, Obj) {
        if (getPost(str) !== false && Obj.id === undefined && Obj.author === undefined && Obj.createdAt === undefined && Obj !== undefined) {
            if (Obj.description !== undefined && Obj.description.length < 200)
                getPost(str).description = Obj.description;
            if (Obj.hashTags !== undefined)
                getPost(str).hashTags = Obj.hashTags;
            if (Obj.photoLink != undefined)
                getPost(str).photoLink = Obj.photoLink;
            let data = JSON.stringify(photoPosts, null, 2);
            fs.writeFile('./server/data/posts.json', data, (err) => {
                if (err) throw err;
            });
            return true;
        }
        return false;
    },

    removePhotoPost: function (str) {
        if (getPost(str) !== false) {
            photoPosts.splice(photoPosts.indexOf(getPost(str)), 1);
            let data = JSON.stringify(photoPosts, null, 2);
            fs.writeFile('./server/data/posts.json', data, (err) => {
                if (err) throw err;
            });
            return true;
        }
        else
            return false;
    }
};

module.exports = actionModule;


