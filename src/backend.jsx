const url = {
     // test 
    //BaseUrl:'http://localhost:8000',
    // deploy 
    BaseUrl:'https://nurdauletryspai.pythonanywhere.com',
    Auth:{
        login: '/api/v1/login/',
        register: '/api/v1/register/'
    },
    userAll:'/api/v1/user/all/',
    filterUserAmin:'/api/v1/filter/user/?is_superuser=',
    booksAll:'/api/v1/books/all/',
    userCheck:'/api/v1/user/check/',
    booksFilter:'/api/v1/filter/books/',
    booksUserAdd:'/api/v1/books/user/add',


    userDelete: '/api/v1/user/delete',
    userDetail:'/api/v1/user/detail/',
    passedAnaliyc: '/api/v1/user/books/analis/passed',
    BooksDetail:'/api/v1/user/books/detail',
    BooksSearchName:'/api/v1/user/books/search/',
    BooksAdd:'/api/v1/books/add/',
    BooksDelete:'/api/v1/books/detail/',
    userSearch:'/api/v1/user/search/',
    BooksPassed:'/api/v1/books/passed/',
    userBeLate:'/api/v1/user/be_late/',
    analistic:'/api/v1/user/books/analic/',
    BeLateBooks:'/api/v1/user/books/beLate/search/',
    WhoTookUrl:'/api/v1/book/WhoTook',
    analisticTook:'/api/v1/user/books/analic/who/took',
    WhoTookBooks:'/api/v1/user/books/whoTook/search',
    newsAll:'/api/v1/news/all/',
    
}

export default url;