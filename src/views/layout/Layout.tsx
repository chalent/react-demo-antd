import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu } from 'antd';
import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const { Header, Content, Footer, Sider } = Layout;

const items1: MenuProps['items'] = ['1', '2', '3'].map(key => ({
  key,
  label: `nav ${key}`,
}));

interface menuItems {
  key: string,
  label: string,
  link?: string,
  children?: Array<menuItems>
}

const menus: Array<menuItems> = [{
  key: "dashboard",
  label: "工作台",
  link: "/dashboard"
}, {
  key: "routeDemo",
  label: "路由示例",
  children: [
    {
      key: "basicRoute",
      label: "基础使用",
      link: "/main/routeDemo"
    }
  ]
}, {
  key: "reduxDemo",
  label: "REDUX示例",
  children: [
    {
      key: "basicRedux",
      label: "基础使用",
      link: "/main/reduxDemo"
    }
  ]
}, {
  key: "game",
  label: "小游戏",
  children: [
    {
      key: "airGame",
      label: "飞机激战",
      link: "/main/airGame"
    }
  ]
}]

const items2: MenuProps['items'] = menus.map(
  (item, index) => {
    const icons = [UserOutlined, LaptopOutlined, NotificationOutlined, NotificationOutlined];

    return {
      key: item.key,
      icon: React.createElement(icons[index]),
      label: item.label,
      children: item.children && item.children.map((cItem) => {
        return {
          key: cItem.key,
          label: cItem.label,
        };
      }),
    };
  },
);


const App: React.FC = () => {
  const navigate = useNavigate();
  // 扁平化菜单数组
  const flatMenus = () => {
    let tmpArr: Array<menuItems> = [];
    menus.forEach(item => {
      tmpArr.push(item);
      if (item.children) {
        tmpArr = tmpArr.concat(item.children)
      }
    })
    return tmpArr;
  }

  // 改变菜单
  const changeMenu = (e: any) => {
    // console.log("改变菜单", e.key);
    const allMenus = flatMenus();
    const obj = allMenus.find(v => v.key === e.key);
    if(obj?.link) {
      navigate(obj.link, {
        state: { menuKey: obj.key }
      })
    }
  }


  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} items={items1} />
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
          <Sider className="site-layout-background" width={200}>
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%' }}
              items={items2}
              onSelect={changeMenu}
            />
          </Sider>
          <Content style={{ padding: '0 24px', minHeight: 280 }}>
            <Outlet />
          </Content>
        </Layout>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
    </Layout>
  )
};

export default App;