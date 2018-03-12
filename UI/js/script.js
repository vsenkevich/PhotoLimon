"use strict";

let workingModule = (function () {

    let photoPosts = [
        {
            id: '1',
            description: 'Очень вкусный чай - это чаёк с лимоном!\nПопробуйте сами',
            createdAt: new Date('2018-02-17T22:39:00'),
            author: 'BossLemon',
            photoLink: 'img/img1.jpg',
            hashTags: ['yellow', 'lemon', 'style'],
            likes: ['BossLemon', 'Vanya', 'DolceVita', 'MissLemoni', 'Vlados'],
        },

        {
            id: '2',
            description: 'Родиной лимонов считаютсятропики и субтропики Китая, Индии и Бирмы. В настоящее время культивируется в странах Средиземноморья, США, на Кавказе',
            createdAt: new Date('2018-02-16T18:12:00'),
            author: 'MissLemon',
            photoLink: 'img/img2.jpg',
            hashTags: ['interesting', 'facts', 'lemon', 'China', "India"],
            likes: ['Noone:)'],
        },

        {
            id: '3',
            description: 'А ты знаешь, откуда и кто привез лимон? Этот кислый фрукт родом из Индии попал к нам благодаря войнам Александра Македонского. Изначально лимон назывался индийское яблоко.',
            createdAt: new Date('2018-02-16T08:22:00'),
            author: 'BoyLime',
            photoLink: 'img/img3.jpg',
            hashTags: ['facts', 'Alexander', 'lime', 'India', 'lemon'],
            likes: ['Vanya', 'Helen', 'MissLemon'],
        },

        {
            id: '4',
            description: 'Лимон предохраняет организм от цинги. Британское Адмиралтейство даже наградило Дж. Кука золотой медалью Королевского общества за спасение жизней и здоровья моряков.',
            createdAt: new Date('2018-02-15T21:53:00'),
            author: 'GirlLime',
            photoLink: 'img/img4.jpg',
            hashTags: ['yellow', 'variety', 'lemon'],
            likes: ['Vlados'],
        },

        {
            id: '5',
            description: 'С помощью лимона можно даже сорвать концерт. Так концерт духового оркестра сорвали дети, которые сидели в первых рядах. От обильного слюноотделения музыканты не смогли играть на инструментах.',
            createdAt: new Date('2018-02-15T12:48:00'),
            author: 'DolceVita',
            photoLink: 'img/img5.jpg',
            hashTags: ['strange', 'facts', 'lemon', 'concert', 'Alt-J'],
            likes: ['Vladislav', 'DolceVita', 'MissLemoni', 'Lemonessa', 'Limonnino'],
        },

        {
            id: '6',
            description: 'Как известно, ветвь оливы является символом мира, лавр – символом славы, а терн – символом суровости и наказания. Лимон по наводке О.Ю. Шмидта стал символом дружбы 126 стран.',
            createdAt: new Date('2018-02-15T04:13:00'),
            author: 'ItsMamix',
            photoLink: 'img/img6.jpg',
            hashTags: [],
            likes: ['Branch', 'Vanya', 'Shmidt', 'Symbols', 'Victoria', 'anonymous', 'supporter'],
        },

        {
            id: '7',
            description: 'В испанском фольклоре лимон – это символ горькой, обманутой любви. Сладкую любовь символизирует апельсин.',
            createdAt: new Date('2018-02-14T22:02:00'),
            author: 'Colgate',
            photoLink: 'img/img7.jpg',
            hashTags: ['Spanish', 'lemon', 'lime', 'love', 'relationships', 'bitter', 'sweet'],
            likes: ['BossLemon', 'Orange', 'Heles', 'MissLemoni', 'Vlados'],
        },

        {
            id: '8',
            description: 'В XVII веке лимон был практически недоступен простому человеку. Богатые же выписывали лимоны из Голландии. Их им доставляли в соленом виде. Интересно, как они его потом ели?',
            createdAt: new Date('2018-02-15T09:35:00'),
            author: 'KateOnly',
            photoLink: 'img/img8.jpg',
            hashTags: ['yellow', 'rich', 'Holland'],
            likes: ['Just_user', 'Lemonnn'],
        },

        {
            id: '9',
            description: 'На званых вечерах или вообще не подают чернику, или подают ее с ломтиками лимона: черника окрашивает губы, а лимон снимает эту окраску.',
            createdAt: new Date('2018-02-13T23:23:00'),
            author: 'Brandt',
            photoLink: 'img/img9.jpg',
            hashTags: ['evening', 'berries', 'lips', 'colours', 'lemon'],
            likes: ['Princess', 'King', 'Queen', 'Prince', 'Worker', 'Assistant'],
        },

        {
            id: '10',
            description: '«Реал Мадрид» 4–0 «Алавес» \n1-0 Иско(Бензема) 44\n2-0 Бэйл (Бензема) 46\n3-0 Роналду (Иско) 61\n4-0 Бензема (пен.) 89',
            createdAt: new Date('2018-02-12T01:03:00'),
            author: 'IscoOfficial',
            photoLink: 'img/img10.jpg',
            hashTags: ['soccer', 'RM', 'Gareth', 'Bale', 'Karim', 'Benzema'],
            likes: ['Vladislav', 'Eugene', 'Victor', 'your_dad'],
        }
    ];

    function getPhotoPosts(skip = 0, top = 10, filterConfig) {
        let Array = [];
        photoPosts.sort(compareDate);
        let count = 0;

        if (filterConfig === undefined) {
            for (let i = skip; i < top + skip; i++) {
                if (i > photoPosts.length - 1) {
                    return Array;
                }
                Array.push(photoPosts[i]);
            }
        }
        else {
            if(filterConfig.author !== undefined && filterConfig.up !== undefined && filterConfig.bottom !== undefined && filterConfig.hashTags !== undefined){
                for(let i = 0; i < photoPosts.length; i++){
                    if(photoPosts[i].author === filterConfig.author && (photoPosts[i].createdAt).getTime() < (filterConfig.up).getTime() && (photoPosts[i].createdAt).getTime() > (filterConfig.bottom).getTime()  && check(i, filterConfig.hashTags)) {
                        count++;
                        if(count > skip)
                            Array.push(photoPosts[i]);
                        if(Array.length === top)
                            return Array;
                    }
                }
            }

            if(filterConfig.author === undefined && filterConfig.up !== undefined && filterConfig.bottom !== undefined && filterConfig.hashTags !== undefined){
                for(let i = 0; i < photoPosts.length; i++){
                    if(photoPosts[i].createdAt.getTime() < filterConfig.up.getTime() && photoPosts[i].createdAt.getTime() > filterConfig.bottom.getTime() && check(i, filterConfig.hashTags)) {
                        count++;
                        if(count > skip)
                            Array.push(photoPosts[i]);
                        if(Array.length === top)
                            return Array;
                    }
                }
            }

            if(filterConfig.author !== undefined && filterConfig.up === undefined && filterConfig.bottom === undefined && filterConfig.hashTags !== undefined){
                for(let i = 0; i < photoPosts.length; i++){
                    if(photoPosts[i].author === filterConfig.author && check(i, filterConfig.hashTags)) {
                        count++;
                        if(count > skip)
                            Array.push(photoPosts[i]);
                        if(Array.length === top)
                            return Array;
                    }
                }
            }

            if(filterConfig.author !== undefined && filterConfig.up !== undefined && filterConfig.bottom !== undefined && filterConfig.hashTags === undefined){
                for(let i = 0; i < photoPosts.length; i++){
                    if(photoPosts[i].author === filterConfig.author && photoPosts[i].createdAt.getTime() < filterConfig.up.getTime() && photoPosts[i].createdAt.getTime() > filterConfig.bottom.getTime()) {
                        count++;
                        if(count > skip)
                            Array.push(photoPosts[i]);
                        if(Array.length === top)
                            return Array;
                    }
                }
            }

            if(filterConfig.author === undefined && filterConfig.up === undefined && filterConfig.bottom === undefined && filterConfig.hashTags !== undefined){
                for(let i = 0; i < photoPosts.length; i++){
                    if(check(i, filterConfig.hashTags)) {
                        count++;
                        if(count > skip)
                            Array.push(photoPosts[i]);
                        if(Array.length === top)
                            return Array;
                    }
                }
            }

            if(filterConfig.author !== undefined && filterConfig.up === undefined && filterConfig.bottom === undefined && filterConfig.hashTags === undefined){
                for(let i = 0; i < photoPosts.length; i++){
                    if(photoPosts[i].author === filterConfig.author) {
                        count++;
                        if(count > skip)
                            Array.push(photoPosts[i]);
                        if(Array.length === top)
                            return Array;
                    }
                }
            }

            if(filterConfig.author === undefined && filterConfig.up !== undefined && filterConfig.bottom !== undefined && filterConfig.hashTags === undefined){
                for(let i = 0; i < photoPosts.length; i++){
                    if((photoPosts[i].createdAt).getTime() <= (filterConfig.up).getTime() && (photoPosts[i].createdAt).getTime() >= (filterConfig.bottom).getTime()) {
                        count++;
                        if(count > skip)
                            Array.push(photoPosts[i]);
                        if(Array.length === top)
                            return Array;
                    }
                }
            }

            if(filterConfig.author === undefined && filterConfig.up === undefined && filterConfig.bottom === undefined && filterConfig.hashTags === undefined){
                for (let i = skip; i < top + skip; i++) {
                    if (i > photoPosts.length - 1) {
                        if (Array.length === 0)
                            return null;
                        return Array;
                    }
                    Array.push(photoPosts[i]);
                }
            }
        }
        return Array;

    }
    
    function check(i, tag) {
        for(let j = 0; j < (photoPosts[i].hashTags).length; j++)
            if (photoPosts[i].hashTags[j] === tag)
                return true;
        return false;
    }

    function compareDate(a, b) {
        return (b.createdAt).getTime() - (a.createdAt).getTime();
    }

    function getPhotoPost(str) {
        for (let i = 0; i < photoPosts.length; i++) {
            if (photoPosts[i].id === str)
                return photoPosts[i]
        }
        return false;
    }

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
        if (Obj.createdAt === undefined || !(Obj.createdAt instanceof Date) )
            return false;
        return true;
    }

    function addPhotoPost(Obj) {
        if (validatePhotoPost(Obj) === false)
            return false;
        else {
            photoPosts.push(Obj);
            return true;
        }
    }

    function editPhotoPost(str, Obj) {
        if (getPhotoPost(str) !== false && Obj.id === undefined && Obj.author === undefined && Obj.createdAt === undefined && Obj !== undefined){
            if(Obj.description !== undefined && Obj.description.length < 200)
                getPhotoPost(str).description = Obj.description;
            if(Obj.hashTags !== undefined)
                getPhotoPost(str).hashTags = Obj.hashTags;
            if(Obj.photoLink != undefined)
                getPhotoPost(str).photoLink = Obj.photoLink;
            return true;
        }
        return false;
    }

    function removePhotoPost(str) {
        if (getPhotoPost(str) !== false) {
            photoPosts.splice(photoPosts.indexOf(getPhotoPost(str)), 1);
            return true;
        }
        else
            return false;
    }

    return {
        getPhotoPosts: getPhotoPosts,
        getPhotoPost: getPhotoPost,
        validatePhotoPost: validatePhotoPost,
        addPhotoPost: addPhotoPost,
        editPhotoPost: editPhotoPost,
        removePhotoPost: removePhotoPost
    }
})();


