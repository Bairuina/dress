import { Avatar, Button, Dropdown, Layout, Menu, Space, Typography } from 'antd';
import type { MenuProps } from 'antd';
import type { PropsWithChildren } from 'react';
import { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useAuth } from '../hooks';

const { Header, Content, Sider } = Layout;

interface AppShellProps extends PropsWithChildren {
  pageTitle?: string;
  pageDescription?: string;
}

function NavIcon({ label }: { label: string }) {
  return <span className="nav-icon">{label}</span>;
}

const menuItems: MenuProps['items'] = [
  { key: '/', label: '工作台', icon: <NavIcon label="W" /> },
  { key: '/clothes', label: '衣物管理', icon: <NavIcon label="C" /> },
  { key: '/outfits', label: '穿搭展示', icon: <NavIcon label="O" /> },
  { key: '/profile', label: '个人中心', icon: <NavIcon label="P" /> },
];

export function AppShell({ children, pageTitle, pageDescription }: AppShellProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  const selectedKeys = useMemo(() => {
    if (location.pathname.startsWith('/clothes')) return ['/clothes'];
    if (location.pathname.startsWith('/outfits')) return ['/outfits'];
    if (location.pathname.startsWith('/profile')) return ['/profile'];
    return ['/'];
  }, [location.pathname]);

  return (
    <Layout className="shell-root">
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed} width={248} theme="dark" className="app-sider">
        <div className="app-logo">{collapsed ? 'DR' : 'Dress 管理台'}</div>
        <Menu theme="dark" mode="inline" selectedKeys={selectedKeys} items={menuItems} onClick={({ key }) => navigate(key)} />
      </Sider>
      <Layout className="app-main">
        <Header className="shell-header">
          <div className="shell-header-copy">
            <Typography.Title level={3} style={{ margin: 0 }}>
              {pageTitle ?? 'Dress'}
            </Typography.Title>
            {pageDescription ? (
              <Typography.Paragraph type="secondary" style={{ margin: '6px 0 0' }}>
                {pageDescription}
              </Typography.Paragraph>
            ) : null}
          </div>
          <Dropdown
            menu={{
              items: [
                { key: 'profile', label: '个人中心', onClick: () => navigate('/profile') },
                {
                  key: 'logout',
                  label: '退出登录',
                  onClick: () => {
                    logout();
                    navigate('/login', { replace: true });
                  },
                },
              ],
            }}
            placement="bottomRight"
          >
            <Button type="text" className="profile-trigger">
              <Space size={12}>
                <Avatar className="profile-avatar">{user?.avatar_text ?? 'DR'}</Avatar>
                <div className="profile-copy">
                  <div className="profile-name">{user?.display_name ?? '未登录'}</div>
                  <div className="profile-role">{user?.role ?? 'guest'}</div>
                </div>
              </Space>
            </Button>
          </Dropdown>
        </Header>
        <Content className="shell-content">{children}</Content>
      </Layout>
    </Layout>
  );
}
