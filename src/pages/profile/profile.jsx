import { Badge, Card, Space,Avatar,QRCode, Button,Modal } from 'antd';
import { DownCircleOutlined, CloseOutlined ,PoweroffOutlined} from '@ant-design/icons';
import { useState } from 'react';
import {useNavigate,} from 'react-router-dom';
import './index.css'
const Profile = () => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
const handleOk = () => {
    localStorage.clear();
    navigate("/login", { replace: true });
    setOpen(false);
;
};
const handleCancel = () => {
  console.log('Clicked cancel button');
  setOpen(false);
};
    return(
        <>
        <div style={{justifyContent:'center',alignItems:'center',display:'flex'}}>

        <Badge dot={true} >
        <Avatar style={{width:100,height:100}} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
        </Badge>
        <br/>
        </div>
  
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        <Badge.Ribbon text="ЖСН" color="red">
      <Card title="ЖСН" size="small">
        {JSON.parse (localStorage.getItem('user')).iin}
      </Card>
    </Badge.Ribbon>
    <Badge.Ribbon text="Аты">
      <Card title="Аты" size="small">
      {JSON.parse (localStorage.getItem('user')).first_name}
      </Card>
    </Badge.Ribbon>

    <Badge.Ribbon text="Тегі" >
      <Card title="Тегі" size="small">
      {JSON.parse (localStorage.getItem('user')).last_name}
      </Card>
    </Badge.Ribbon>
    <Badge.Ribbon text="email">
      <Card title="email" size="small" >
       {JSON.parse (localStorage.getItem('user')).email}
      </Card>
    </Badge.Ribbon>
    <Badge.Ribbon text="Тіркелген уақыты" >
      <Card title="Тіркелген уақыты" size="small">
      {JSON.parse (localStorage.getItem('user')).date_register}
      </Card>
    </Badge.Ribbon>
    <Badge.Ribbon text="id" >
      <Card title="id" size="small">
      {JSON.parse (localStorage.getItem('user')).id}
      </Card>
    </Badge.Ribbon>
    <Badge.Ribbon text="Менеджер статусы" >
      <Card title="Менеджер статусы"  size="small">
      {JSON.parse (localStorage.getItem('user')).is_superuser
      ?
      <>
    <DownCircleOutlined style={{color:'green'}}/>
      </>
      :

    <CloseOutlined style={{color:'red'}} />
      
      }
      </Card>
    </Badge.Ribbon>
    <Badge.Ribbon text="eBook QR" >
      <Card title={<div style={{textAlign:'center'}}>eBook</div>} QR size="small" >
        <div style={{justifyContent:'center',alignItems:'center',display:'flex'}}>
      <QRCode
    errorLevel="H"
    value={`{eBook:${JSON.parse (localStorage.getItem('user')).iin},profile_email:${JSON.parse (localStorage.getItem('user')).email}}`}
    icon="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
  />
            </div> 
      </Card>
    </Badge.Ribbon>
    <div style={{justifyContent:'center',alignItems:'center',display:'flex'}}>

<Button className='buttonClose' danger  icon={<PoweroffOutlined />} onClick={()=>{ setOpen(true);}} > Шығу</Button>
</div> 
<Modal
        title="Жүйеден шығу"
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="иа"
        cancelText="жоқ"
      >
    Сіз өз аккаунтыныздан шығасыз ба?
      </Modal>
  </Space>
        </>
    )

    

}
export default Profile