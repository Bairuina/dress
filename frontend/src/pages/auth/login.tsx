import { Button, Card, Form, Input, Space, Typography, message } from 'antd';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

import { useAuth } from '../../hooks';
import type { LoginPayload } from '../../types';

export function LoginPage() {
  const [form] = Form.useForm<LoginPayload>();
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, isInitializing, login } = useAuth();

  if (!isInitializing && isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  async function handleFinish(values: LoginPayload) {
    try {
      await login(values);
      messageApi.success('登录成功');
      const nextPath = (location.state as { from?: string } | null)?.from ?? '/';
      navigate(nextPath, { replace: true });
    } catch {
      messageApi.error('用户名或密码错误');
    }
  }

  return (
    <div className="auth-page">
      {contextHolder}
      <Card className="auth-card">
        <Space direction="vertical" size={20} style={{ width: '100%' }}>
          <div>
            <Typography.Title level={2} style={{ marginBottom: 8 }}>
              Dress PC 管理台
            </Typography.Title>
            <Typography.Paragraph type="secondary">
              当前版本面向桌面端，聚焦衣物录入、衣橱展示和穿搭管理。
            </Typography.Paragraph>
          </div>

          <Card size="small" className="glass-inner-card">
            <Typography.Text strong>演示账号</Typography.Text>
            <Typography.Paragraph style={{ marginBottom: 0, marginTop: 8 }}>
              用户名：admin
              <br />
              密码：dress123
            </Typography.Paragraph>
          </Card>

          <Form
            form={form}
            layout="vertical"
            onFinish={handleFinish}
            initialValues={{ username: 'admin', password: 'dress123' }}
          >
            <Form.Item label="用户名" name="username" rules={[{ required: true, message: '请输入用户名' }]}>
              <Input placeholder="请输入用户名" />
            </Form.Item>
            <Form.Item label="密码" name="password" rules={[{ required: true, message: '请输入密码' }]}>
              <Input.Password placeholder="请输入密码" />
            </Form.Item>
            <Button block type="primary" htmlType="submit" size="large">
              登录
            </Button>
          </Form>
        </Space>
      </Card>
    </div>
  );
}
