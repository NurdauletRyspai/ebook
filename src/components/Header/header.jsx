import { FileOutlined, PieChartOutlined, UserOutlined,DesktopOutlined,TeamOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme,Avatar,Badge} from 'antd';
import React, { useState } from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import {useNavigate,} from 'react-router-dom';
import ReactDOM from 'react-dom';




const { Header, Content, Footer, Sider } = Layout;

const Heder = ({content,navi}) => {
  const navigate = useNavigate();
  const [nav,setNav] = useState('main');
  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }
  const items = [
    getItem('Басты Бет', 'main', <PieChartOutlined />),
    getItem('Кітаптар', 'books', <DesktopOutlined />),
    getItem('Жаңалықтар', 'sub1', <UserOutlined />),
    getItem('Қолданушыны тіркеу','sub2', <UserOutlined />),
    getItem('Кешігушілер', 'sub3', <TeamOutlined />),
    getItem('Алғандар', 'sub4', <FileOutlined />),
  ];
  


  
  
    
    const route =(index)=>{
        if(index.key ==="sub2"){
          setNav('sub2')
          navigate("/userRegister", { replace: true });
          
        }
        if(index.key ==="books"){
          setNav('books')
          navigate("/books", { replace: true });
        
        }
        if(index.key ==="main"){
            setNav('main')
            navigate("/", { replace: true });
           
          }
          if(index.key ==="sub1"){
            setNav('sub1')
            navigate("/ebook_news", { replace: true });
           
          }
          if(index.key ==="sub3"){
            setNav('sub3')
            navigate("/beLate", { replace: true });
           
          }
          if(index.key ==="sub4"){
            setNav('sub4')
            navigate("/usersWhoTook", { replace: true });
           
          }

          

          
      }
    

     

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <>

    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
 
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
      <div
className='ebook'
        >eBook soft</div>
        <Menu theme="dark" defaultSelectedKeys={[nav]} mode="inline" items={items} onClick={(index)=>{route(index)}}/>
      </Sider>
      <Layout className="site-layout">
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
        
          }}
        >
<Menu
        theme="light"
        mode="horizontal"
        style={{ lineHeight: '64px' }}
      >
 

        <Menu.Item key="1" onClick={()=>{navigate("/profile", { replace: true })}} style={{  position: 'absolute', 
  top: '0.6em',
  right: 0}}>         <Badge dot={true} >
            <Avatar className='avatar' src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
            </Badge></Menu.Item>

      </Menu>
            </Header>
            
        <Content
          style={{
            margin: '0 16px',
          }}
        >
          <Breadcrumb
            style={{
              margin: '16px 0',
            }}
          >
            <Breadcrumb.Item>Басты бет</Breadcrumb.Item>
            <Breadcrumb.Item>{navi}</Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
            }}
          >
          {content}
          </div>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          Ant Design ©2023 Created by Nurdaulet Burusov
        </Footer>
      </Layout>
    </Layout>
    </>
  );
};
export default Heder;


ReactDOM.render(
  <Router>
<Heder /></Router>, document.getElementById('root'));