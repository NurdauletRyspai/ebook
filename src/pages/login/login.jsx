import React from 'react';
import {Form, Input, Button, Row, Card,notification, Steps} from 'antd';
import {UserOutlined, LockOutlined} from '@ant-design/icons';
import './index.css';
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import url from '../../backend'

const Login=()=>{
    let navigate = useNavigate();
    const [api, contextHolder] = notification.useNotification();
    const onFinish = ({iin, password}) => {
        axios.post(url.BaseUrl + url.Auth.login,{password:password,iin:iin}).then((response )=>{

       
            localStorage.setItem('refresh',response.data.refresh)
            localStorage.setItem('access',response.data.access)
            localStorage.setItem('user',JSON.stringify(response.data.user))
            navigate("/", { replace: true });
        }


        ).catch((error)=>{
            if(error.response.status === 401)
            api.error({
                message: `Кірердегі қате`,
                description: `ЖСН ${iin} жүйеде табылмады: ${error}`,
      
              });

              else console.log(error)
            
        })


    };

    

    return(
     
       
      
    <div className='auth-container'>
    {contextHolder}
        <div className='overlay'></div>
        <Row justify='center' align='middle' className='w-30'>
        
       <Card  style = {{borderRadius:'10px', width:'500px', background: 'transparent',border: '1px solid rgb(69, 151, 46)'}} >
        
                <div className='auth-container__logo'>Ebook login</div>
                <Form
                    name='normal_login'
                    className='login-form '
                    initialValues={{remember: true}}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name='iin'
                        rules={[{required: true, message: 'иин ді еңгізініз'}]}
                        help="021109441471"
                    >
                        <Input
                            shape='round'
                            className='auth-container__input'
                            pattern="[0-9]*"
                            style = {{borderRadius:'10px',width: '100%', background: 'transparent',borderColor:'green'}}
                            prefix={<UserOutlined className='site-form-item-icon'/>}
                            suffix="ИИН"
                            placeholder='ИИН'
                        />
                    </Form.Item>
                    <Form.Item
                        name='password'
                        rules={[{required: true, message: 'Құпия сөзді енгізіңіз'}]}
                        help="8 символды құпия сөзді еңгізініз "
                    >
                        <Input
                            className='auth-container__input'
                            style = {{borderRadius:'10px',borderColor:'green'}}
                            prefix={<LockOutlined className='site-form-item-icon'/>}
                            type='password'
                            placeholder='Құпия сөз'
                            
                            
                        />
                    </Form.Item>
                
           
                    <Form.Item>
                        <Button
                            htmlType='submit'
                            block
                            style = {{borderRadius:'10px',fontFamily:'sans-serif'}}
                            className='login-form-button light-green'
                        >
                            Кіру
                        </Button>
                    </Form.Item>
                </Form>
               <h4  className="text"  ><Button ghost onClick={ ()=>  navigate("/register", { replace: true })}>жүйеге тіркелу?</Button></h4>
               <Steps
    current={1}
    items={[
      {
        title: 'Жүйеге тіркелу',
        description:'Ebook register',
      },
      {
        title: 'Жүйеге кіру',
        description:'Ebook login',
      
      },

    ]}
  />
                </Card>


      
        </Row>

    </div >


    )
}

export default Login;