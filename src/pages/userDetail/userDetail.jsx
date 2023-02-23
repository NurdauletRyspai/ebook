import { Badge, Card, Space,Avatar,QRCode, Table, Image ,Button, message } from 'antd';
import { DownCircleOutlined, CloseOutlined ,UserOutlined, CheckOutlined} from '@ant-design/icons';
import { useState,useEffect } from 'react';
import { useParams } from "react-router-dom";
import axiosApiInstance from '../../components/IsAuth/auth-header';
import { Liquid } from '@ant-design/plots';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from "react-router-dom";
import url from '../../backend';
import './index.css'
const Profile = () => {
    const[userGET,setUser] = useState();
    const [passed,setPassed] = useState([]);
    const [bookAll,setBookAll] = useState([]);
    const [ref,setRef] = useState(false);
    let {userId} = useParams();

    useEffect(()=>{
    axiosApiInstance.get(`${url.BaseUrl}${url.userDetail}${userId}`).
    then((response)=>{
   
        setUser(response.data)

    }).catch((error)=>{
    console.log(error)
    })
   
    },[]
    )
    
    useEffect(()=>{
        axiosApiInstance.post(url.BaseUrl + url.passedAnaliyc,{
            id :userId,
    
        }).then((response)=>{
 
            setPassed(response.data)

    
    
        }).catch((error)=>{
        console.log(error)
        })
        axiosApiInstance.post(url.BaseUrl + url.BooksDetail,{
          id :userId,
    
      }).then((response)=>{
       
          setBookAll(response.data)
       
    
    
    
      }).catch((error)=>{
      console.log(error)
      })

    },[ref])


   const Procent =()=>{
    if (passed?.passedCount/passed?.allMnagaerCount === 0){
      return 0.02
    }
 
    return passed?.passedCount/passed?.allMnagaerCount
    
   }
    const config = {
      percent: Procent(),
      outline: {
        border: 4,
        distance: 8,
      },
      wave: {
        length: 128,
      },
    };
    const columns = [
      {
        title: 'id',
        dataIndex: 'id',
        key: 'id',
      },
      {
          title: 'Кітап аты',
          dataIndex: 'book',
          key: 'book',
          render: (item) => {
            return (
              <>
             <h4>{item.name}</h4>
        

                 
              </>
            );
          },
        },

      {
        title: 'Кітап басылымы',
        dataIndex: 'book',
        key: 'book',
        render: (item) => {
          return (
            <>
           <h4>{item.age}</h4>
      

               
            </>
          );
        },
        
      },
      {
        title: 'Кітап фотосы',
        dataIndex: 'book',
        key: 'book',
        render: (item) => {
          return (
            <>

      
              
            <Image width={200} className='image' src={url.BaseUrl + item.photo} alt="Book Image" />

               
            </>
          );
        },
      },
      {
        title: 'Кітап алынған күн',
        dataIndex: 'Date_start',
        key: 'Date_start',
      },
      {
          title: 'Кітап тапсыру күні',
          dataIndex: 'Date_end',
          key: 'Date_end',
        },
      {
          title: 'Тапсырылды',
          dataIndex: 'passed',
          key: 'passed',
          render: (item) => {
              return (
                <>
                {
                item
                ?
               <DownCircleOutlined style={{color:'green'}}/>
                :
                <CloseOutlined style={{color:'red'}} />
                }

                   
                </>
              );
            },
    
      },


{
  title: 'Кітап QR коды',
  dataIndex: 'book',
  key: 'book',
  render: (item) => {
      return (
        <>
               <QRCode
  errorLevel="H"
  value={`eBook ${item.name}`}
  icon="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
/>
           
        </>
      );
    },
    

},
{
  title: 'Тапсыру',

  render: (item) => {
    return (
      <>

    {
    item.passed 
    ?
    <></>
    :
    
    <Button type="primary" onClick={()=>{
      axiosApiInstance.post(url.BaseUrl+url.BooksPassed,
     {
      id:item.id,
     },
      ).then((response)=>{
      
          if(response.status === 200){
            setRef(!ref)
            message.success(`Аты ${item.book.name} кітап қайта тапсырылды`);
          }
      }).catch((error)=>{
        console.log(error)

      })

    }} icon={<CheckOutlined />}> Тапсыру </Button>

    }
      </>
    );
  },
},

    ];
    return(
        <>
        <div style={{justifyContent:'center',alignItems:'center',display:'flex'}}>

        <Badge dot={true} >
 
        <Avatar shape="square" size={96} icon={<UserOutlined />} />
        </Badge>
        <br/>
        </div>
  
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        <Badge.Ribbon text="ЖСН" color="red">
      <Card title="ЖСН" size="small">
        {userGET?.iin}
      </Card>
    </Badge.Ribbon>
    <Badge.Ribbon text="Аты">
      <Card title="Аты" size="small">
      {userGET?.first_name}
      </Card>
    </Badge.Ribbon>

    <Badge.Ribbon text="Тегі" >
      <Card title="Тегі" size="small">
      {userGET?.last_name}
      </Card>
    </Badge.Ribbon>
    <Badge.Ribbon text="email">
      <Card title="email" size="small" >
       {userGET?.email}
      </Card>
    </Badge.Ribbon>
    <Badge.Ribbon text="Тіркелген уақыты" >
      <Card title="Тіркелген уақыты" size="small">
      {userGET?.date_register}
      </Card>
    </Badge.Ribbon>
    <Badge.Ribbon text="id" >
      <Card title="id" size="small">
      {userGET?.id}
      </Card>
    </Badge.Ribbon>
    <Badge.Ribbon text="Менеджер статусы" >
      <Card title="Менеджер статусы"  size="small">
      {userGET?.is_superuser
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
    value={`{eBook:${userGET?.iin},profile_email:${userGET?.email}}`}
    icon="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
  />
            </div> 
      </Card>
    </Badge.Ribbon>

    <Card title={<div style={{textAlign:'center'}}>eBook</div>} QR size="small" >
    <Card title={<div style={{textAlign:'center'}}>Пайдаланушының кітаптарды қайтарған проценті </div>} QR size="small" >
    <Liquid {...config} />
    </Card>
    <Card title={<div style={{textAlign:'center'}}>Пайдаланушының кітаптар алу тарихы </div>} QR size="small" >
    <Table dataSource={bookAll} columns={columns} />
      </Card>
      </Card>
      
  </Space>
        </>
    )

    

}
export default Profile

ReactDOM.render(  <Router><Profile /></Router>, document.getElementById('root'));