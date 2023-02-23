import {  UserOutlined,LockOutlined,LoadingOutlined } from '@ant-design/icons';
import { Card,Button, Row,Form, Input,notification, Steps} from 'antd';
import axios from 'axios';
import url from '../../backend'
import {
  useNavigate,
} from 'react-router-dom';
import './index.css'



const UserRegister = () => {
  const navigate = useNavigate();


    const [api, contextHolder] = notification.useNotification();
    const onFinish = ({iin, password,first_name,last_name,email}) => {
        axios.post(url.BaseUrl + url.Auth.register,{password:password,iin:iin,first_name:first_name,last_name:last_name,email:email}).then((response )=>{

            api.success({
                message: `ЖСН ${iin} жүйеге тіркелінді`,
                description: `ЖСН ${iin}, Email${email}, Аты${first_name} жүйеге қателіксіз енгізілді`,
      
              });
           
        }


        ).catch((error)=>{
            if(error.response.status === 400){            
                if (error.response?.data?.email){
                api.error({
                    message: `Тіркелу кезінде қателік`,
                    description: `Email ${email} жүйеде тіркелген: ${error}`,
          
                  });
                  console.log(error)
                
            }
            if (error.response?.data?.iin){
                api.error({
                    message: `Тіркелу кезінде қателік`,
                    description: `ЖСН ${iin} жүйеде тіркелген: ${error}`,
          
                  });
                
            }
            
        }

              else console.log(error)
            
        })


    };

  return (
  
             
    <div className='auth-container'>
    {contextHolder}
      
        <Row justify='center' align='middle' className='w-30'>
        
       <Card  style = {{borderRadius:'10px', width:'500px', background: 'transparent',border: '1px solid rgb(69, 151, 46)'}} >
        
                <div className='auth-container__logo'>Ebook register</div>
                <Form
                    name='normal_login'
                    className='login-form '
                    initialValues={{remember: true}}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name='iin'
                        rules={[{required: true, message: 'ЖСН ді еңгізініз'}]}
                        help="021109441471"
                    >
                        <Input
                            shape='round'
                            className='auth-container__input'
                            pattern="[0-9]*"
                            style = {{borderRadius:'10px',width: '100%', background: 'transparent',borderColor:'green'}}
                            prefix={<UserOutlined className='site-form-item-icon'/>}
                            suffix="ЖСН"
                            placeholder='ЖСН'
                        
                        />
                    </Form.Item>
                    <Form.Item
                        name='first_name'
                        rules={[{required: true, message: 'Атыңзды енгізіңіз'}]}
                        help="Нұрдәулет"
                    >
                        <Input
                            className='auth-container__input'
                            style = {{borderRadius:'10px',borderColor:'green'}}
                            prefix={<LockOutlined className='site-form-item-icon'/>}
                            placeholder='Аты'
                            
                            
                        />
                    </Form.Item>
                    <Form.Item
                        name='last_name'
                        rules={[{required: true, message: 'Тегінізді енгізіңіз'}]}
                        help="Рыспай"
                    >
                        <Input
                            className='auth-container__input'
                            style = {{borderRadius:'10px',borderColor:'green'}}
                            prefix={<LockOutlined className='site-form-item-icon'/>}
                            placeholder='Тегі'
                            
                        />
                    </Form.Item>
                    <Form.Item
                        name='email'
                        rules={[ {
                            type: 'email',
                            message: 'The input is not valid E-mail!',
                          },{required: true, message: 'поштаны енгізіңіз'}]}
                        help="nuraulet@maill.ru"
                    >
                        <Input
                            className='auth-container__input'
                            style = {{borderRadius:'10px',borderColor:'green'}}
                            prefix={<LockOutlined className='site-form-item-icon'/>}
                            placeholder='Электронды пошта'
                            
                        />
                    
                    </Form.Item>
                    <Form.Item
                        name='password'
                        rules={[{required: true, message: 'Құпия сөзді енгізіңіз'}]}
                    >
                        <Input
                            className='auth-container__input'
                            style = {{borderRadius:'10px',borderColor:'green'}}
                            prefix={<LockOutlined className='site-form-item-icon'/>}
                            type='password'
                            placeholder='Құпия сөз'
                            help="8 символды құпия сөзді еңгізініз "
                            
                        />
                    </Form.Item>
                    
                    <Form.Item>
                        <Button
                            htmlType='submit'
                            block
                            style = {{borderRadius:'10px',fontFamily:'sans-serif'}}
                            className='login-form-button light-green'
                        >
                            Тіркелу
                        </Button>
                    </Form.Item>
                </Form>
               <h4  className="text"  ><Button ghost onClick={ ()=>  navigate("/Login", { replace: true })}>жүйеге кіру?</Button></h4>
               <Steps
    current={1}
    items={[
      {
        title: 'Жүйеге тіркелу',
        description:'Ebook register',
        status: 'process',
        icon: <LoadingOutlined />,
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
        

  );
};
export default UserRegister;


