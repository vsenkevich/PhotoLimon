const Dom = (function () {
    let userName = null;
    let posts = document.querySelector('.posts');


    function buildPost(obj) {
        let post = document.createElement('section');
        let postContent = document.createElement('div');
        postContent.className = 'post';
        let user = document.createElement('a1');
        user.innerHTML = obj.author;
        postContent.appendChild(user); // 0 - ой

        let str1, str2, str3;
        let date = document.createElement('a2');
        str1 = '' + obj.createdAt.getDate();
        str2 = '' + (obj.createdAt.getMonth() + 1);
        str3 = '' + obj.createdAt.getFullYear();
        if (str1.length == 1)
            str1 = '0' + str1;
        if (str2.length == 1)
            str2 = '0' + str2;
        date.innerHTML = str1 + '.' + str2 + '.' + str3;

        let time = document.createElement('a3');
        str1 = '' + obj.createdAt.getHours();
        str2 = '' + obj.createdAt.getMinutes();
        if (str1.length == 1)
            str1 = '0' + str1;
        if (str2.length == 1)
            str2 = '0' + str2;
        time.innerHTML = str1 + ':' + str2;
        postContent.appendChild(time); // 1 - ый
        postContent.appendChild(date); // 2 - ой

        let img_conteiner = document.createElement('div');
        let img = document.createElement('img');
        img.src = obj.photoLink;
        img.alt = 'PhotoLemon image';
        img.className = 'photo';
        img_conteiner.appendChild(img);
        postContent.appendChild(img_conteiner); // 3 - ий

        let count = 0;
        obj.likes.forEach( (el) => {
                if (el === userName && userName !== null) {
                    let like = document.createElement('img');
                    like.src = 'img/likedone.png';
                    like.alt = 'PhotoLemon like';
                    like.className = 'like';
                    postContent.appendChild(like);
                    let likeText = document.createElement('a4');
                    likeText.innerHTML = "You Lime it!";
                    postContent.appendChild(likeText);
                    count = 1;
                }
            });

        if (count === 0) {
            let like = document.createElement('img');
            like.src = 'img/like.png';
            like.alt = 'PhotoLemon like';
            like.className = 'like';
            postContent.appendChild(like);
            let likeText = document.createElement('a4');
            likeText.innerHTML = "Lime it!";
            postContent.appendChild(likeText);
        }

        if (userName === obj.author) {
            let userArea = document.createElement('ul');
            let change = document.createElement('li');
            change.innerHTML = 'Изменить';
            let deletePost = document.createElement('li');
            deletePost.className = 'delete';
            deletePost.innerHTML = 'Удалить';
            userArea.appendChild(change);
            userArea.appendChild(deletePost);
            postContent.appendChild(userArea); // 7 - ый
        }

        let tags = document.createElement('div');
        tags.className = 'tags';
        let tagsHeader = document.createElement('a');
        tagsHeader.innerHTML = '#Tags:';
        tags.appendChild(tagsHeader);
        postContent.appendChild(tags); // 8 - ой

        let tagsArea = document.createElement('div');
        tagsArea.className = 'tagsArea';
        let tagsText = document.createElement('a');
        for(let i = 0; i < obj.hashTags.length; i++) {
            tagsText.textContent += " #" + obj.hashTags[i];
        }
        tagsArea.appendChild(tagsText);
        postContent.appendChild(tagsArea); // 9 - ой

        let description = document.createElement('div');
        description.className = 'tags';
        let descriptionHeader = document.createElement('a');
        descriptionHeader.innerHTML = 'Описание:';
        description.appendChild(descriptionHeader);
        postContent.appendChild(description); // 10  - ой

        let descriptionArea = document.createElement('div');
        descriptionArea.className = 'tagsArea';
        let descriptionText = document.createElement('a');
        descriptionText.innerHTML = obj.description;
        descriptionArea.appendChild(descriptionText);
        postContent.appendChild(descriptionArea); // 11 - ый

        post.appendChild(postContent);
        post.id = obj.id;
        return post;
    }

    function displayPhotoPosts(photoPosts) {
        photoPosts.forEach((el) => {
            posts.appendChild(buildPost(el));
        })
    }

    function addPhotoPost (photoPost) {
        posts.insertBefore(buildPost(photoPost), posts.firstChild);
    }

    function editPhotoPost(id, photoPost) {
        if (document.getElementById(id)) {
            let obj = workingModule.getPhotoPost(id);
            let section = document.getElementById(id);
            let post = section.childNodes[0];
            let imgConteiner = post.childNodes[3];

            let img = document.createElement('img');

            img.src = obj.photoLink;
            img.alt = 'PhotoLemon image';
            img.className = 'photo';
            imgConteiner.removeChild(imgConteiner.firstChild);
            imgConteiner.appendChild(img);

            let description = post.childNodes[9];
            let descriptionText = description.childNodes[0];
            descriptionText.innerHTML = obj.description;

            let hashTags = post.childNodes[7];
            let hashTagsText = hashTags.childNodes[0];
            hashTagsText.textContent = "";
            for(let i = 0; i < obj.hashTags.length; i++){
                hashTagsText.textContent += " #" + obj.hashTags[i];
            }
        }
    }

    function removePhotoPost(id) {
        if (document.getElementById(id))
            posts.removeChild(document.getElementById(id));
    }

    function signIn(str) {
        let sign = document.querySelector('.enter');
        userName = str;
        sign.innerHTML = userName;

        let buttonAdd = document.querySelector('.contaiter');
        let img = document.createElement('img');
        img.src = 'img/add.png';
        img.className = 'add';
        img.alt = 'PhotoLemon photo';
        buttonAdd.appendChild(img);


    }

    return {
        displayPhotoPosts : displayPhotoPosts,
        addPhotoPost : addPhotoPost,
        removePhotoPost : removePhotoPost,
        editPhotoPost : editPhotoPost,
        signIn : signIn,
    }
})();

function displayPhotoPosts(skip, top, filterConfig) {
    let photoPosts = workingModule.getPhotoPosts(skip, top, filterConfig);
    Dom.displayPhotoPosts(photoPosts);
}

function addPhotoPost(photoPost) {
    if (workingModule.addPhotoPost(photoPost)) {
        if (workingModule.getPhotoPosts()[0].id === photoPost.id) {
            Dom.addPhotoPost(photoPost);
        }
        else {
            let posts = document.querySelector(".posts");
            while (posts.firstChild)
                posts.removeChild(posts.firstChild);
            displayPhotoPosts();
            return true;
        }
    }
}

function removePhotoPost(id) {
    if (workingModule.removePhotoPost(id)) {
        Dom.removePhotoPost(id);
    }
}

function editPhotoPost(id, photoPost) {
    if (workingModule.editPhotoPost(id, photoPost)) {
        Dom.editPhotoPost(id, photoPost);
    }
}

function signIn (userName) {
    Dom.signIn(userName);
    let posts = document.querySelector(".posts");
    while (posts.firstChild)
        posts.removeChild(posts.firstChild);
    displayPhotoPosts(0, 5);
}



