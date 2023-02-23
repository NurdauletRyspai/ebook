import { Image, Table, Tag, Card, Divider, Input,Skeleton, Avatar } from 'antd';
import {SearchOutlined} from '@ant-design/icons'
import { useEffect, useState } from 'react';
import url from '../../backend';
import axiosApiInstance from '../../components/IsAuth/auth-header';
import { Gauge,Bullet } from '@ant-design/plots';
const { Meta } = Card;
const UsersWhoTook = () => {
    const { Search } = Input;
    const [userBeLate,setUserBeLate] = useState([])
    const [anlis,setanalis] = useState([])
    const [load,setLoad] = useState(true);
    useEffect(()=>{
        axiosApiInstance.get(url.BaseUrl+url.WhoTookUrl).
        then((response)=>{
                console.log(response.data)
                setLoad(false);
            setUserBeLate(response.data)
        }).catch((error)=>{
          setLoad(false);
            console.log(error)
        })
        axiosApiInstance.get(url.BaseUrl + url.analisticTook).then((res)=>{
          console.log(res.data)
          setanalis(res.data)
        }).catch((err)=>{
          console.log(err)
        })
    },[])
    const columns = [
        {
          title: 'ЖСН',
 
          render: (item) => {
            return(
                <>{item.user.iin}</>
            )
        },
        },
        {
          title: 'Аты',
          render: (item) => {
            return(
                <>{item.user.first_name}</>
            )
        },
        },
        {
          title: 'Электронды пошта',

          render: (item) => {
            return(
                <>{item.user.email}</>
            )
        },
        },
        {
          title: 'Кітап аты',
   
          render: (item) => {
            
              return(
          
                  <Tag color={'green'} key={item.id}>
                  {item.book.name}
                  </Tag>
              )
              
            
              },
        },
        {
            title: 'Алынған күн',
     
            render: (item) => {
              
                return(
            
                    <Tag color={'green'} key={item.id}>
                    {item.Date_start
}
                    </Tag>
                )
                
              
                },
          },
          {
            title: 'Қайтару керек уақыты',
     
            render: (item) => {
              
                return(
            
                    <Tag color={'red'} key={item.id}>
                    {item.Date_end
}
                    </Tag>
                )
                
              
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
      ];

      

      const config = {
        percent: anlis.value/100,
        range: {
          ticks: [0, 1 / 3, 2 / 3, 1],
          color: ['#F4664A', '#FAAD14', '#30BF78'],
        },
        indicator: {
          pointer: {
            style: {
              stroke: '#D0D0D0',
            },
          },
          pin: {
            style: {
              stroke: '#D0D0D0',
            },
          },
        },
        statistic: {
          content: {
            style: {
              fontSize: '36px',
              lineHeight: '36px',
            },
          },
        },
      };

      const data = [
        {
          title: 'Алушылар',
          ranges: [100],
          measures: [anlis.value],
          target: 100,
        },
      ]; 
      const configure = {
        data,
        measureField: 'measures',
        rangeField: 'ranges',
        targetField: 'target',
        xField: 'title',
        color: {
          range: '#f0efff',
          measure: '#5B8FF9',
          target: '#3D76DD',
        },
        xAxis: {
          line: null,
        },
        yAxis: false,
        layout: 'vertical',
        label: {
          measure: {
            position: 'middle',
            style: {
              fill: '#fff',
            },
          },
        },
        // 自定义 legend
        legend: {
          custom: true,
          position: 'bottom',
          items: [
            {
              value: 'Алушылар',
              name: 'Алушылар',
              marker: {
                symbol: 'square',
                style: {
                  fill: '#5B8FF9',
                  r: 5,
                },
              },
            },
            {
              value: 'барлық қолданушылар',
              name: 'барлық қолданушылар',
              marker: {
                symbol: 'line',
                style: {
                  stroke: '#3D76DD',
                  r: 5,
                },
              },
            },
          ],
        },
      };

  return (
   <>  
<div style={{ textAlign:'center'}}>
<Card>
  <Gauge style={{ display:'inline-block'}}{...config} />
  <Bullet style={{ display:'inline-block'}} {...configure} />
  </Card>
  </div>
  <Card
            title="Жүйеден алғандарды  табу"
    bordered={false}

  >
    <Divider orientation="left">Алғандарды табу <SearchOutlined /></Divider>

    <Search placeholder="Адам атын немесе ЖСН ді жазыңыз" onSearch={
      (value)=>{
        axiosApiInstance.get(`${url.BaseUrl}${url.WhoTookBooks}?search=${value}`)
        .then((response)=>{
          setUserBeLate(response.data.results)
        })
        .catch((error)=>{
          console.log(error)
        })
      }

    } enterButton />

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
        <Table columns={columns} dataSource={userBeLate} />
    }
   
   </>
  )
};
export default UsersWhoTook;


