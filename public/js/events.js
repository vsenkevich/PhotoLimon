/*Header*/
let header = document.createElement('header');
let headerDiv = document.createElement('div');
headerDiv.className = 'head';
let headerContainer = document.createElement('div');
headerContainer.className = 'container';
let headerLogo = document.createElement('img');
headerLogo.src = 'img/logo.png';
headerLogo.alt = 'PhotoLemon';
headerLogo.className = 'logo';
let signInTxt = document.createElement('a');
signInTxt.className = 'enter';
signInTxt.innerHTML = 'Войти';
let signPng = document.createElement('img');
signPng.src = 'img/enter.png';
signPng.alt = 'PhotoLemon';
signPng.className = 'pic';
let buttonAdd = document.createElement('img');
buttonAdd.src = 'img/add.png';
buttonAdd.className = 'add';
buttonAdd.alt = 'PhotoLemon photo';

/*Фильтр*/
let filter = document.createElement('div');
filter.className = 'filter';
let choice = document.createElement('div');
choice.className = 'choice';
let form = document.createElement('form');
let inputDateBottom = document.createElement('input');
inputDateBottom.type = 'text';
inputDateBottom.size = '10';
inputDateBottom.placeholder = 'от дд.мм.гггг';
let inputDateUp = document.createElement('input');
inputDateUp.type = 'text';
inputDateUp.size = '10';
inputDateUp.placeholder = 'до дд.мм.гггг';
let inputUserName = document.createElement('input');
inputUserName.type = 'text';
inputUserName.size = '10';
inputUserName.placeholder = 'Пользователь';
let inputHashTag = document.createElement('input');
inputHashTag.type = 'text';
inputHashTag.size = '10';
inputHashTag.placeholder = '#HashTag';
let postsDiv  = document.createElement('div');
postsDiv.className = 'posts';

/*Форма входа*/
let signPage = document.createElement('div');
signPage.className = 'body';
let logoSection = document.createElement('section');
logoSection.className = 'logoIn';
let logotip = document.createElement('img');
logotip.src = 'img/logo.png';
logotip.alt = 'PhotoLemon img';
logotip.className = 'logotip';
let signContainer = document.createElement('div');
signContainer.className = 'signForm';
let enter = document.createElement('div');
enter.className = 'enterText';
enter.innerHTML = 'Вход';
let inputSignUserName = document.createElement('div');
inputSignUserName.className = 'signFormInput';
let inputTextName = document.createElement('input');
inputTextName.size = '29';
inputTextName.placeholder = 'Имя пользователя';
let inputPassword = document.createElement('div');
inputPassword.className = 'signFormInput';
let inputTextPassword = document.createElement('input');
inputTextPassword.type = 'password';
inputTextPassword.size = '29';
inputTextPassword.placeholder = 'Пароль';
let enterButton = document.createElement('img');
enterButton.src = 'img/enterbutton.png';
enterButton.alt = 'PhotoLemon';
enterButton.className = 'enterButton';
let mainPg = document.createElement('div');
mainPg.className = 'mainPg';
mainPg.innerHTML = '- Главная страница -';

/*Форма добавления-редактирования*/
let addPost = document.createElement('div');
addPost.className = 'addPost';
let addHead = document.createElement('div');
addHead.className = 'addHead';
let addUserName = document.createElement('a');
addUserName.className = 'addUser';
let closeIcon = document.createElement('img');
closeIcon.src = 'img/close.png';
closeIcon.alt = 'PhotoLemon';
closeIcon.className = 'close';
let addPicture = document.createElement('div');
addPicture.className = 'addPicture';
let pickPhoto = document.createElement('p');
pickPhoto.innerHTML = 'Выберите фотографию';
let p = document.createElement('p');
let pick = document.createElement('input');
pick.type = 'file';
pick.name = 'photo';
pick.accept = 'image/x-png,image/gif,image/jpeg';
let send = document.createElement('input');
send.type = 'submit';
send.value = 'Загрузить';
let addition = document.createElement('div');
addition.className = 'addition';
let photoAdd = document.createElement('a');
photoAdd.className = 'photoAdd';
photoAdd.innerHTML = 'Фотография';
let descriptionForm = document.createElement('form');
descriptionForm.className = 'form';
let inputDescription = document.createElement('input');
inputDescription.type = 'text';
inputDescription.size = '65';
inputDescription.placeholder = 'Описание';
let inputHashTags = document.createElement('input');
inputHashTags.type = 'text';
inputHashTags.size = '65';
inputHashTags.placeholder = '#ХешТеги';
let buttonSave = document.createElement('img');
buttonSave.className = 'save';
buttonSave.src = 'img/save.png';
buttonSave.alt = 'PhotoLemon';
let additionNow = false;

let filterConfig = {};
let edition = false;
let object;

signInTxt.addEventListener('click', () => {
    drawSignForm();
});

mainPg.addEventListener('click', (e) => {
    drawPictureFeed();
});

enterButton.addEventListener('click', () => {
    sign();
});

buttonAdd.addEventListener('click', () => {
    if (returnUserName() !== null)
        drawAddForm();
    else
        drawSignForm();
});

closeIcon.addEventListener('click', () => {
    additionNow = false;
    let del = document.querySelector('.addition');
    while(del.firstChild){
        del.removeChild(del.firstChild);
    }
    drawPictureFeed();
    inputDescription.value = '';
    inputHashTags.value = '';
    pick.value = '';
});

send.addEventListener('click', () => {
    let img = document.createElement('img');

    let i = pick.value.search('fakepath');
    img.src = 'img/' + pick.value.slice(i + 9);
    img.className = 'addingPhoto';

    let del = document.querySelector('.addition');
    while(del.firstChild){
        del.removeChild(del.firstChild);
    }
    del.appendChild(img);

    del = document.querySelector('.addPicture');
    while(del.firstChild){
        del.removeChild(del.firstChild);
    }

})

buttonSave.addEventListener('click', () => {
    let src = document.createElement('img');
    let photoPost;

    let i = pick.value.search('fakepath');
    src = 'img/' + pick.value.slice(i + 9);

    console.log(workingModule.numberOfPosts());

    if (edition === true) {
        photoPost = {
            id: object.id,
            description: "" + inputDescription.value,
            createdAt: new Date(object.createdAt),
            author: '' + returnUserName(),
            photoLink: '' + src,
            hashTags: inputHashTags.value.split(' ').slice(0),
            likes: object.likes
        };
    }
    else {
        photoPost = {
            id: "" + (workingModule.numberOfPosts() + 1),
            description: "" + inputDescription.value,
            createdAt: new Date(),
            author: '' + returnUserName(),
            photoLink: '' + src,
            hashTags: inputHashTags.value.split(' ').slice(0),
            likes: []
        };
    }

    console.log(photoPost);
    let del = document.querySelector('.addition');
    while(del.firstChild){
        del.removeChild(del.firstChild);
    }

    drawPictureFeed();
    if (edition === true) {
        editPhotoPost(object.id, photoPost);
        edition = false;
        console.log(object.id);
    }
    else {
        addPhotoPost(photoPost);
    }
    additionNow = false;
    inputDescription.value = '';
    inputHashTags.value = '';
    pick.value = '';
});

inputUserName.addEventListener('input', (e) => {
    if (e.target.value === '') {
        delete filterConfig.author;
        if (filterConfig.length === undefined)
            displayPhotoPosts(0, 10);
        else {
            displayPhotoPosts(0, 5, filterConfig, true);
        }
    }
    else {
        filterConfig.author = e.target.value;
        displayPhotoPosts(0, 5, filterConfig, true);
    }
});

inputHashTag.addEventListener('input', (e) => {
    if (e.target.value === '') {
        delete filterConfig.hashTags;
        if (filterConfig.length === undefined) {
            displayPhotoPosts(0, 10);
        }
        else {
            displayPhotoPosts(0, 5, filterConfig, true);
        }
    }
    else {
        filterConfig.hashTags = e.target.value;
        displayPhotoPosts(0, 5, filterConfig, true);
    }
});

inputDateBottom.addEventListener('input', (e) => {
    let arr = e.target.value.split('.');
    if (arr.length >= 2 && arr[1].length === 2) {
        filterConfig.createdAt = new Date(arr[2] ? arr[2] : 0, arr[1] - 1, arr[0]);
        displayPhotoPosts(0, 5, filterConfig, true);
    }
    else {
        filterConfig.createdAt = 0;
        displayPhotoPosts(0, 5, 0, true);
    }
});

inputDateUp.addEventListener('input', (e) => {
    filterConfig.up = e.target.value;
    displayPhotoPosts(0, 5, filterConfig, true);
});



function drawPictureFeed() {
    let body = document.querySelector('.body');
    while (body.firstChild) {
        body.removeChild(body.firstChild);
    }

    headerContainer.appendChild(headerLogo);
    headerContainer.appendChild(signInTxt);
    headerContainer.appendChild(signPng);
    headerContainer.appendChild(buttonAdd);
    headerDiv.appendChild(headerContainer);
    header.appendChild(headerDiv);

    body.appendChild(header);

    form.appendChild(inputDateBottom);
    form.appendChild(inputDateUp);
    form.appendChild(inputUserName);
    form.appendChild(inputHashTag);
    choice.appendChild(form);
    filter.appendChild(choice);

    body.appendChild(filter);
    body.appendChild(postsDiv);

    displayPhotoPosts();
}

function sign() {
    let user = {};
    user.Username = inputTextName.value;
    user.Password = inputTextPassword.value;
    localStorage.user = JSON.stringify(user);
    drawPictureFeed();
    signIn(inputTextName.value);
}

function drawSignForm() {
    localStorage.user=JSON.stringify({Username:'',Password:''});
    let body = document.querySelector('.body');
    while (body.firstChild) {
        body.removeChild(body.firstChild);
    }

    logoSection.appendChild(logotip);
    signContainer.appendChild(enter);
    inputSignUserName.appendChild(inputTextName);
    signContainer.appendChild(inputSignUserName);
    inputPassword.appendChild(inputTextPassword);
    signContainer.appendChild(inputPassword);
    signContainer.appendChild(enterButton);
    signContainer.appendChild(mainPg);
    signPage.appendChild(logoSection);
    signPage.appendChild(signContainer);
    body.appendChild(signPage);
}

function drawAddForm(edit = false, obj) {
    if (additionNow === false) {
        let body = document.querySelector('.body');
        while (body.childNodes.length !== 1) {
            body.removeChild(body.lastChild);
        }
        addUserName.innerHTML = '' + returnUserName();

        if(edit === true) {
            inputDescription.value = obj.description;
            for (let i = 0; i < obj.hashTags.length; i++) {
                inputHashTags.value = inputHashTags.value + obj.hashTags[i] + ' ';
            }
        }

        descriptionForm.appendChild(inputDescription);
        descriptionForm.appendChild(inputHashTags);
        addition.appendChild(photoAdd);
        addHead.appendChild(addUserName);
        addHead.appendChild(closeIcon)
        addPicture.appendChild(pickPhoto);
        p.appendChild(pick);
        p.appendChild(send);
        addPicture.appendChild(p);
        addPost.appendChild(addHead);
        addPost.appendChild(addPicture);
        addPost.appendChild(addition);
        addPost.appendChild(descriptionForm);
        addPost.appendChild(buttonSave);
        body.appendChild(addPost);

        additionNow = true;

        changePosition(edit, obj);
    }
}

function changePosition(i, obj) {
    edition = i;
    object = obj;
}

drawPictureFeed();



