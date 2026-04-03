import { Button, Card, Space, Tag, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';

export function DashboardHero() {
  const navigate = useNavigate();

  return (
    <Card className="dashboard-hero">
      <Space direction="vertical" size={18} style={{ width: '100%' }}>
        <Space wrap>
          <Tag color="red">PC 管理端</Tag>
          <Tag color="gold">衣物录入</Tag>
          <Tag color="green">穿搭展示</Tag>
        </Space>
        <div>
          <Typography.Title level={2} style={{ margin: 0 }}>
            电子衣橱工作台
          </Typography.Title>
          <Typography.Paragraph className="dashboard-hero-copy">
            当前版本面向桌面端高频操作，优先支持衣物录入、衣橱整理和穿搭展示。整体视觉改为更轻松的卡通风，方便考核展示时更有记忆点。
          </Typography.Paragraph>
        </div>
        <Space wrap>
          <Button type="primary" size="large" onClick={() => navigate('/clothes')}>
            进入衣物管理
          </Button>
          <Button size="large" onClick={() => navigate('/outfits')}>
            查看穿搭展示
          </Button>
        </Space>
      </Space>
    </Card>
  );
}
