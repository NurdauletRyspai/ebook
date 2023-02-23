import { DownCircleOutlined, CloseOutlined, PoweroffOutlined ,PlusOutlined,DeleteOutlined, InfoCircleOutlined, SearchOutlined} from '@ant-design/icons';
import { Table, Card, Skeleton, QRCode, Switch, Button,Col, Row, Modal, Select, Form, DatePicker, notification, Divider, message, Input, Avatar} from 'antd';
import { Column } from '@ant-design/plots';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import url from '../../backend'
import axiosApiInstance from '../../components/IsAuth/auth-header'
import { useNavigate } from "react-router-dom";
const { Meta } = Card;
const {Option} = Select;

const Main = () => {
  const navigate = useNavigate();
  const { Search } = Input;
  const [isModalOpen, setIsModalOpen] = useState(false);
    const [data, setData] = useState([]);
    const [user, setUser] = useState([]);
    const [load,setLoad] = useState(true);
    const [show,setShow] = useState(true);
    const [books, setBooks] = useState([]);
    const [updated,setUpdated] = useState(true);
    const [userBookAdd,setUserBookAdd] = useState(0);
    const [api, contextHolder] = notification.useNotification();
    const [apiDelete, contextHolderDelete] = message.useMessage();
    const [UserAddBook,setUserAddBook] = useState(false);
    
    const filter =(data)=>{
        console.log(data)
        axios.get(`${url.BaseUrl}${url.filterUserAmin}${data}`).then((response)=>{
      
          setUser(response.data.results)
        }).catch((error)=>{
            console.log(error)
        })
    }
    const showModal = () => {
      setIsModalOpen(true);
    };

    const handleCancel = () => {
      setIsModalOpen(false);
    };
    
const Message =(userId)=>{
  return     apiDelete.success(`id ${userId} қолданушы жүйеден жойылды`);
}
      
      const columns = [
        {
            title: 'ЖСН',
            dataIndex: 'iin',
            key: 'iin',
          },
        {
            title: 'id',
            dataIndex: 'id',
            key: 'id',
          },
        {
          title: 'Аты',
          dataIndex: 'first_name',
          key: 'first_name',
        },
        {
          title: 'Тегі',
          dataIndex: 'last_name',
          key: 'last_name',
        },
        {
          title: 'Email',
          dataIndex: 'email',
          key: 'email',
        },
        {
            title: 'Тіркелген күні',
            dataIndex: 'date_register',
            key: 'date_register',
          },
        {
            title: 'Администратор',
            dataIndex: 'is_superuser',
            key: 'is_superuser',
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
    title: 'Қолданушының QR коды',
    dataIndex: 'iin',
    key: 'iin',
    render: (item) => {
        return (
          <>
                 <QRCode
    errorLevel="H"
    value={`eBook ${item}`}
    icon="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
  />
             
          </>
        );
      },
      

},
{
  dataIndex: 'id',
  render: (userId) => {
      return (
        <>

<Button type="primary"  icon={<PlusOutlined />} onClick={()=>{
  console.log(userId)
  setUserBookAdd(userId);
  showModal()

}



}


>
  
    
      </Button>


           
        </>
      );
    },

    

},
{
  dataIndex: 'id',
  render: (userId) => {
      return (
        <>

<Button type="primary" danger icon={<DeleteOutlined twoToneColor="#eb2f96"/>} onClick={()=>{
axiosApiInstance.delete(`${url.BaseUrl}${url.userDelete}/${userId}` ).then(()=>{
Message(userId)
setUpdated(!updated)
}).catch((error)=>{
  console.log(error)
})


}



}


>
  
    
      </Button>


           
        </>
      );
    },

    

},

{
  dataIndex: 'id',
  render: (userId) => {
      return (
        <>

<Button type="primary"  icon={<InfoCircleOutlined twoToneColor="#eb2f96"/>} onClick={()=>{
navigate(`/user/detail/${userId}`, { replace: true })

}



}


>
  
    
      </Button>


           
        </>
      );
    },

    

},

      ];

  useEffect(() => {
    asyncFetch();
    axios.get(url.BaseUrl + url.userAll).then((response)=>{
  
        setUser(response.data)
        setLoad(false);

        }).catch((err)=>{
            console.log(err)
            setLoad(false);
        })

    axios.get(url.BaseUrl + url.booksAll).then((response)=>{
  console.log(response.data)
          setBooks(response.data)
 
  
          }).catch((err)=>{
              console.log(err)

          })
  }, [updated]);

  const asyncFetch = () => {
    fetch('https://gw.alipayobjects.com/os/antfincdn/8elHX%26irfq/stack-column-data.json')
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        console.log('fetch data failed', error);
      });
  };
  const config = {
    data,
    isStack: true,
    xField: 'year',
    yField: 'value',
    seriesField: 'type',
    label: {
      // 可手动配置 label 数据标签位置
      position: 'middle',
      // 'top', 'bottom', 'middle'
      // 可配置附加的布局方法
      layout: [
        // 柱形图数据标签位置自动调整
        {
          type: 'interval-adjust-position',
        }, // 数据标签防遮挡
        {
          type: 'interval-hide-overlap',
        }, // 数据标签文颜色自动调整
        {
          type: 'adjust-color',
        },
      ],
    },
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  const onFinish = (values) => {
    setUserAddBook(true)
    axiosApiInstance.post(url.BaseUrl+url.booksUserAdd,
  {
    user:userBookAdd,
    book:values['book'],
    Date_end:`${values['time'].$y}-${values['time'].$M+1}-${values['time'].$D} ${values['time'].$H}:${values['time'].$m}`
  }
  ).then((response)=>{
   
    if (response.status){
      console.log(response)
      setUserAddBook(false)
      api.success({
        message: `Кітап жүйеге тіркелінді`,
        description: `Кітапты беруге рұқсат, оны қайтару күні ${response.data.Date_end}`,
  
      });
      handleCancel()
      
    }


}).catch((error)=>{
  setUserAddBook(false)
  console.log(error)
  if (error.response.status === 409)
    api.error({
      message: `Берілген кітап тапсырылмаған`,
      description: `Кітапты тапсырмаған`,

    });
    if (error.response.status === 410)
    api.error({
      message: `Берілген кітап жүйеде қалмады`,
      description: `Кітап жүйеде таусылған`,

    });
})
    console.log('Success:', values);
  };
const onChange = (value) => {
  console.log(`selected ${value}`);
};
const onSearch = (value) => {
  console.log('search:', value);
};


  return (
    <>
      {contextHolderDelete}
  <Modal title="Кітап беру" open={isModalOpen} onCancel={handleCancel}
    footer={null}
  >
      {contextHolder}
    {
      UserAddBook
      ?
      <Skeleton />
      :
      <>

        <Card>
      
        <Form
    name="wrap"
    labelCol={{
      flex: '110px',
    }}
    labelAlign="left"
    labelWrap
    wrapperCol={{
      flex: 1,
    }}
    colon={false}
    style={{
      maxWidth: 600,
    }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
  >

        <Form.Item
      label="Қанша уақытқа алынады"
      name="time"
      rules={[
        {
          required: true,
          message: 'Кітап қанша уақытқа берілетінің таңданыз!',
        },
      ]}
    >
  <DatePicker showTime placeholder="Кітаптың берілу уақыты"  />
        </Form.Item>
    <Form.Item
      label="Кітаптар"
      name="book"
      rules={[
        {
          required: true,
          message: 'Кітапты таңданыз!',
        },
      ]}
    >
<Select
    className='табу'
    showSearch
    placeholder="Кітапты табу"
    optionFilterProp="children"
    onChange={onChange}
    onSearch={onSearch}

  
  >
    {books &&
    books.map((item,index) => {
                return (
                    <Option key={index} value={item.id} label={item.name} {...item}>
                      {item.name}
                    </Option>
                );
              })}
    </Select>
    </Form.Item>

    <Form.Item label=" ">
      <Button type="primary" htmlType="submit" >
        Тіркеу
      </Button>
    </Form.Item>
  </Form>
        </Card>
        </>
}
      </Modal>

       
           <Card
            title="Қолданушыларды фильтрлеу"
    bordered={false}
    style={{
      width: '100%',
    }}
  >
      <Card
            title="Тек Администратор"
    bordered={false}

  >
       <Row gutter={{
        xs: 8,
        sm: 16,
        md: 24,
        lg: 32,
      }}>
   <Row gutter={{
        xs: 8,
        sm: 16,
        md: 24,
        lg: 32,
      }}>
  <Col span={12}>
<Switch checked={show} onChange={(res) => {setShow(!show); filter(res)}}  /> 
</Col>
<Col span={12}>
<Button
          type="primary"
          icon={<PoweroffOutlined />}
  
          onClick={() => setUpdated(!updated)}
        >
         Деректерді артқа қайтару
        </Button>
        </Col>
        </Row>
        </Row>
</Card>
<Card
            title="Жүйеден кітапты табу"
    bordered={false}

  >
    <Divider orientation="left">Адам табу <SearchOutlined /></Divider>

    <Search placeholder="Адам атын немесе ЖСН ді жазыңыз" onSearch={
      (value)=>{
        axiosApiInstance.get(`${url.BaseUrl}${url.userSearch}?search=${value}`)
        .then((response)=>{
          setUser(response.data.results)
        })
        .catch((error)=>{
          console.log(error)
        })
      }

    } enterButton />

    </Card>
  </Card>
  {
  load
  ?

  <>
  <Card style={{width:"100%"}}>
  <Skeleton loading={load} avatar active>
    <Meta
      avatar={<Avatar src="https://joesch.moe/api/v1/random" />}
      title="Card title"
      description="This is the description"
    />
  </Skeleton>
  </Card>
  <Card style={{width:"100%"}}>
  <Skeleton loading={load} avatar active>
    <Meta
      avatar={<Avatar src="https://joesch.moe/api/v1/random" />}
      title="Card title"
      description="This is the description"
    />
  </Skeleton>
  </Card>
  <Card style={{width:"100%"}}>
  <Skeleton loading={load} avatar active>
    <Meta
      avatar={<Avatar src="https://joesch.moe/api/v1/random" />}
      title="Card title"
      description="This is the description"
    />
  </Skeleton>
  </Card>
  <Card style={{width:"100%"}}>
  <Skeleton loading={load} avatar active>
    <Meta
      avatar={<Avatar src="https://joesch.moe/api/v1/random" />}
      title="Card title"
      description="This is the description"
    />
  </Skeleton>
  </Card>
  </>
  :
           <Table dataSource={user} columns={columns} onClick={(data)=>{console.log(data)}}/>
  }
        <Column {...config} />
      </>
  );
};
export default Main;


