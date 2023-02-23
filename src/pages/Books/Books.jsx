import { PoweroffOutlined, SearchOutlined ,PlusOutlined, UploadOutlined, DeleteOutlined} from '@ant-design/icons';
import {Input,Table ,Card,Skeleton,QRCode,DatePicker,Button, Col, Divider, Row,Modal,Form,message,InputNumber,Image,Upload, Avatar} from 'antd';
import React, { useState, useEffect } from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import ReactDOM from 'react-dom';
import axios from 'axios';
import url from '../../backend'
import './index.css'
import axiosApiInstance from '../../components/IsAuth/auth-header';





const { Meta } = Card;


const Books = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const { Search } = Input;
  const [books, setBooks] = useState([]);
  const [load,setLoad] = useState(true);
  const [updated,setUpdated] = useState(true);
  const [image,setImage] = useState(true);
  const Basedurl = url.BaseUrl;

  const onChange = (date, dateString) => {
   
    axiosApiInstance.get(url.BaseUrl+url.booksFilter + `?age__gte=${dateString}`)
    .then((response)=>{

      setBooks(response.data.results)
    }).catch((error)=>{
      console.log(error)
    })

  };

  const onChangeLte =(date,dateString) =>{
    axiosApiInstance.get(url.BaseUrl+url.booksFilter + `?age__lte=${dateString}`)
    .then((response)=>{

      setBooks(response.data.results)
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

  

  const onSearch = (value) => {
    axiosApiInstance.get(url.BaseUrl+url.BooksSearchName + `?search=${value}`)
    .then((response)=>{

      setBooks(response.data.results)
    }).catch((error)=>{
      console.log(error)
    })
  }


    

      
      const columns = [
        {
            title: 'id',
            dataIndex: 'id',
            key: 'id',
          },
        {
            title: 'Кітап аты',
            dataIndex: 'name',
            key: 'name',
          },
        {
          title: 'Басылым',
          dataIndex: 'age',
          key: 'age',
          
        },
        {
          title: 'Фотосы',
          dataIndex: 'photo',
          key: 'photo',
          render: (item) => {
            let urls = 0;
          
            if (item.indexOf(Basedurl)=== 0){
    
              urls = item

            }
            else {
    
              urls = url.BaseUrl + item
            }
      
            return (
              
          
            <Image width={200} className='image' src={urls} alt="Book Image" />
           
            )
          }
        },
        {
          title: 'Тіркелген күні',
          dataIndex: 'date_add',
          key: 'date_add',
        },
        
       

  {
    title: 'Кітап QR коды',
    dataIndex: 'name',
    key: 'name',
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
  title: 'Кітап саны',
  dataIndex: 'count',
  key: 'count',
  

},
{
  dataIndex: 'id',
  render: (userId) => {
      return (
        <>

<Button type="primary" danger icon={<DeleteOutlined />} onClick={()=>{
  console.log(userId)
axiosApiInstance.delete(`${url.BaseUrl}${url.BooksDelete}${userId}`)
.then((response)=>{
  if(response.status === 200){
    setUpdated(!updated);
  }

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
}

      ];

  useEffect(() => {

    axios.get(url.BaseUrl + url.booksAll).then((response)=>{
  
        setBooks(response.data)
        setLoad(false);

        }).catch((err)=>{
            console.log(err)
            setLoad(false);
        })
  }, [updated]);



  const configuration = {
    headers: {'content-type': 'multipart/form-data'}}   
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  const onFinish = (values) => {
    let formData = new FormData();
    console.log(image.originFileObj)
    formData.append('name',values['BookName'])
    formData.append('photo',image.originFileObj)
    formData.append('age',values['datePublished'])
    formData.append('count',values['count'])

    axiosApiInstance.post(url.BaseUrl + url.BooksAdd,
     formData,
     configuration ).then((response)=>{

      message.success(`Аты ${response.data.name} кітап жүйеге жүктелінді жүктелінді`);
      setUpdated(!updated);
      handleCancel();

    }).catch((error)=>{
    
      if(error.response.status === 409){
        message.error(`${values['BookName']} кітап жүйеде бар`);
      }
      console.log(error)
    })
  }
  const props = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        setImage(info.file);
        message.success(`${info.file.name} кітап фотосы жүктелінді`);
      }

    },
  };
  return (
<>

<Modal title="Кітап қосу" open={isModalOpen} onCancel={handleCancel}
    footer={null}
  >

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
      label="Кітап аты"
      name="BookName"
      help ="Тонкое искусство пофигизма"
      rules={[
        {
          required: true,
            message: 'Кітап атын жазыңыз!',
        },
      ]}
    >
  <Input placeholder="Кітап аты" />
        </Form.Item>
   
        <Form.Item
      label="Шыққан жылы"
      name="datePublished"
      help ="2019"
      rules={[
        {
          required: true,
            message: 'Кітап шықан жылын жазыңыз!',
        },
      ]}
    >
  <InputNumber placeholder="Басылым" style={{width:'100%'}} />
        </Form.Item>
    <Form.Item
      label="Кітапханадағы кітап саны"
      name="count"
      help ="10"
      rules={[
        {
          required: true,
            message: 'Кітаптың кітапханадағы саны!',
        },
      ]}
    >
  <InputNumber placeholder="Кітап санын енгізіңіз" style={{width:'100%'}} />
        </Form.Item>

    <Form.Item
      label="Кітаптың фотосы"
      name="image"
   
      rules={[
        {
          required: true,
            message: 'Кітаптың фотосын таңданыз!',
        },
      ]}
    >
      <Card>
    <Upload
    {...props}
      maxCount={1}
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      listType="picture"

    >
      <Button icon={<UploadOutlined />}>жүктеу</Button>
    </Upload>
    </Card>
  </Form.Item>
    <Form.Item label=" ">
      <Button type="primary" htmlType="submit">
        Қосу
      </Button>
    </Form.Item>
  </Form>
        </Card>
      </Modal>
<Card
            title="Кітап қосу"
    bordered={false}

  >
     <div style={{justifyContent:'center',alignItems:'center',display:'flex'}}>
<Button           type="primary"

          size={'large'} onClick={()=>showModal()} icon={<PlusOutlined />}>Кітапты Қосу</Button>

</div>
  </Card> 
           
           <Card
            title="Кітаптарды фильтрлеу"
    bordered={false}
    style={{
      width: '100%',
    }}
  >
      <Card
            title="Фильтр"
    bordered={false}

  >




        <Divider orientation="left">Басылым бойынша (үлкен)</Divider>
    <Row gutter={8}>
      <Col className="gutter-row" span={6}>
      <DatePicker onChange={onChange} picker="year" placeholder='жылды таңданыз' />
      </Col>
      <Col className="gutter-row" span={6}>
      <Button
          type="primary"
          icon={<PoweroffOutlined />}
          size={'large'}
          onClick={() => setUpdated(!updated)}
        >
         Деректерді артқа қайтару
        </Button>
      </Col>
    
    </Row>


    <Divider orientation="left">Басылым бойынша (кіші)</Divider>
    <Row gutter={8}>
      <Col className="gutter-row" span={6}>
      <DatePicker onChange={onChangeLte} picker="year" placeholder='жылды таңданыз'/>
      </Col>
 
    
    </Row>

    

</Card>
<Card
            title="Жүйеден кітапты табу"
    bordered={false}

  >
    <Divider orientation="left">Кітапты табу <SearchOutlined /></Divider>

    <Search placeholder="Кітаптын атауын жазыңыз" onSearch={onSearch} enterButton />

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
           <Table dataSource={books} columns={columns} />
  }
  </>

  );
};
export default Books;


ReactDOM.render(
  <Router>
<Books />
</Router>, document.getElementById('root'));