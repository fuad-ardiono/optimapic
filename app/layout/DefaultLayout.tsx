import {Layout, Menu, theme} from "antd";
import React, {useEffect, useState, useTransition} from "react";
import {useMenuStore} from "~/store/menu.store";
import {useNavigate, useLocation} from "@remix-run/react";

const { Header, Content, Footer } = Layout;

interface DefaultLayoutProps {
  children: React.ReactNode
}

export function DefaultLayout({ children }: DefaultLayoutProps) {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const { menuList, changeMenu, getMenuLink, currentMenu } = useMenuStore()
  const navigate = useNavigate()
  const location = useLocation()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
      const menu = menuList.find((obj) => obj.link === location.pathname)

      if (menu) {
        changeMenu(menu.key)
      }
      setIsLoading(false)
  }, []);

  const handleClickMenu = (e) => {
      changeMenu(e.key)
      navigate(getMenuLink())
  };

  if (!isLoading) {
    return (
      <Layout>
        <Header
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 1,
            width: '100%',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <div className="demo-logo text-white text-center mx-5">OptimaPic</div>
          <Menu
            onClick={handleClickMenu}
            selectedKeys={[currentMenu]}
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={[currentMenu]}
            items={menuList.map((menu) => ({ label: menu.label, key: menu.key }))}
            style={{ flex: 1, minWidth: 0 }}
          />
        </Header>
        <Content style={{ padding: '0 48px' }}>
          <div
            style={{
              padding: 24,
              minHeight: 380,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            { children }
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          OptimaPic - {new Date().getFullYear()}
        </Footer>
      </Layout>
    )
  }
}
