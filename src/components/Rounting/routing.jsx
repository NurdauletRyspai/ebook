import Login from '../../pages/login/login'
import NotfoundPage from '../../pages/notFound/notFound'
import {useRoutes} from "react-router-dom";
import Register from '../../pages/register/register'
import Main from '../../pages/main/main'
import Books from '../../pages/Books/Books'
import IsAuth from '../../components/IsAuth/auth'
import UserRegister from '../../pages/registerUser/registerUser'
import Heder from '../Header/header'
import Profile from '../../pages/profile/profile'
import UserDetailPage from '../../pages/userDetail/userDetail'
import BeLateUsers from '../../pages/BeLate/beLate' 
import UsersWhoTook from '../../pages/WhoTook/UsersWhoTook'
import News from '../../pages/NewsEbook/NewsEbook'

const Routings = () => {

    let routes = useRoutes([
      { path: "/", element:<IsAuth> <Heder content={<Main/>} /> </IsAuth>},
      { path: "*" , element: <NotfoundPage/>},
      { path: "/register", element: <Register />},
      { path: "/userRegister", element: <IsAuth><Heder content={<UserRegister/>} navi={'Қолданушы тіркеу'} /></IsAuth>},
      { path: "/books", element: <IsAuth><Heder content={<Books/>} navi={'Кітаптар'} /></IsAuth>},
      { path: "/login", element: <Login/>},
      { path: "/profile", element: <IsAuth><Heder content={<Profile/>} navi={'Профиль'} /></IsAuth>},
      { path: "/user/detail/:userId", element: <IsAuth><Heder content={<UserDetailPage/>} navi={'Пайдаланушы жөнінде толығырақ'} /></IsAuth>},
      { path: "/beLate", element: <IsAuth><Heder content={<BeLateUsers/>} navi={'Кітап беруді кешігушілер тізімі'} /></IsAuth>},
      { path: "/usersWhoTook", element: <IsAuth><Heder content={<UsersWhoTook/>} navi={'Кітаптарды алғандар тізімі'} /></IsAuth>},
      { path: "/ebook_news", element: <IsAuth><Heder content={<News/>} navi={'Еbook жүйесіндегі жаңалықтар'} /></IsAuth>},
      

      
      
      
 
      
      
     
    ]);
    return routes;

}
export default Routings