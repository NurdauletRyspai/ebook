import { Avatar, Card, Image, Col, Row ,Skeleton} from 'antd';
import { FormOutlined, createFromIconfontCN } from '@ant-design/icons'
import { useEffect, useState } from 'react';
import axiosApiInstance from '../../components/IsAuth/auth-header';
import url from '../../backend';
const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js',
});
const { Meta } = Card;
const News = () => {
  const [data,setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(()=>{
    axiosApiInstance.get(url.BaseUrl + url.newsAll).
    then((res)=>{
      console.log(res.data)
      setData(res.data);
      setLoading(false);

    }).catch((err)=>{
      console.log(err);
      setLoading(false);
    })
  },[])
    return(
      <Row gutter={16}>
 
          {
            loading
            ?
            <>
            <Card style={{width:"100%"}}>
            <Skeleton loading={loading} avatar active>
              <Meta
                avatar={<Avatar src="https://joesch.moe/api/v1/random" />}
                title="Card title"
                description="This is the description"
              />
            </Skeleton>
            </Card>
            <Card style={{width:"100%"}}>
            <Skeleton loading={loading} avatar active>
              <Meta
                avatar={<Avatar src="https://joesch.moe/api/v1/random" />}
                title="Card title"
                description="This is the description"
              />
            </Skeleton>
            </Card>
            <Card style={{width:"100%"}}>
            <Skeleton loading={loading} avatar active>
              <Meta
                avatar={<Avatar src="https://joesch.moe/api/v1/random" />}
                title="Card title"
                description="This is the description"
              />
            </Skeleton>
            </Card>
            <Card style={{width:"100%"}}>
            <Skeleton loading={loading} avatar active>
              <Meta
                avatar={<Avatar src="https://joesch.moe/api/v1/random" />}
                title="Card title"
                description="This is the description"
              />
            </Skeleton>
            </Card>
            </>
            :
            data.map((res)=>{ return(
<Col key={res?.id} span={8} style={{width:"30%"}}>
<Card.Grid > 
    <Card
        style={{
     
          width: "100%",
       

    
        }}
        cover={
          <Image
            alt="example"
            src={url.BaseUrl +res.image}
          />
        }
        actions={[<div><IconFont type="icon-twitter" /> <FormOutlined twoToneColor="#52c41a"/> {res.Date_news_created}</div>
        ]}
      >
        <Meta
          avatar={<Avatar src="https://joesch.moe/api/v1/random" />}
          title={res.name}
          description={res.descriptionNews}
        />
      </Card>
      </Card.Grid>

      </Col>
      

            )})


      }
      
      
  </Row>
    )
};
export default News;