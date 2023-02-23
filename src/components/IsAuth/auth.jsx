import axiosApiInstance from '../../components/IsAuth/auth-header'
import url from '../../backend'

import {useNavigate} from 'react-router-dom';

const IsAuth=({  children })=>{

    const navigate = useNavigate();
    axiosApiInstance.post(url.BaseUrl + url.userCheck).then((response)=>{
       console.log(response)
       return children;
    }).catch((error)=>{
        console.log(error.response.status )
        if (error.response.status === 401){
            return navigate("/login", { replace: true });
        }

    })

    return children;
}


export default IsAuth;

