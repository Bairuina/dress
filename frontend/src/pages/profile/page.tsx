import { Avatar, Card, Col, Descriptions, Row, Space, Tag, Typography } from 'antd';

import { useAuth } from '../../hooks';
import { AppShell } from '../../layouts';

export function ProfilePage() {
  const { user } = useAuth();

  return (
    <AppShell pageTitle="个人中心" pageDescription="查看当前账号信息和这套 PC 端的使用角色。">
      <Row gutter={[16, 16]}>
        <Col xs={24} xl={10}>
          <Card>
            <Space size={16} align="start">
              <Avatar size={72}>{user?.avatar_text ?? 'DR'}</Avatar>
              <Space direction="vertical" size={4}>
                <Typography.Title level={4} style={{ margin: 0 }}>
                  {user?.display_name ?? '未登录用户'}
                </Typography.Title>
                <Typography.Text type="secondary">@{user?.username ?? '-'}</Typography.Text>
                <Tag color="processing">{user?.role ?? 'guest'}</Tag>
              </Space>
            </Space>
            <Typography.Paragraph style={{ marginTop: 16, marginBottom: 0 }}>
              {user?.bio ?? '暂无简介'}
            </Typography.Paragraph>
          </Card>
        </Col>
        <Col xs={24} xl={14}>
          <Card title="账号信息">
            <Descriptions column={1} bordered>
              <Descriptions.Item label="账号">{user?.username ?? '-'}</Descriptions.Item>
              <Descriptions.Item label="显示名称">{user?.display_name ?? '-'}</Descriptions.Item>
              <Descriptions.Item label="角色">{user?.role ?? '-'}</Descriptions.Item>
              <Descriptions.Item label="使用说明">当前主要用于衣物录入、衣物展示和穿搭展示。</Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>
      </Row>
    </AppShell>
  );
}
