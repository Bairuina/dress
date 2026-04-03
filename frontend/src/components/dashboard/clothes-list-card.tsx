import { Card, Empty, List, Space, Tag, Typography } from 'antd';

import type { ClothesItem } from '../../types/clothes';

interface ClothesListCardProps {
  clothes?: ClothesItem[];
  loading?: boolean;
  title?: string;
}

export function ClothesListCard({ clothes, loading, title = '最近衣物' }: ClothesListCardProps) {
  return (
    <Card title={title} className="dashboard-list-card stretch-card">
      <List
        loading={loading}
        dataSource={clothes ?? []}
        locale={{
          emptyText: <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="暂时还没有衣物数据" />,
        }}
        renderItem={(item) => (
          <List.Item>
            <div className="clothes-list-item">
              <div className="clothes-list-main">
                <Typography.Text strong>{item.name}</Typography.Text>
                <Typography.Text type="secondary">{item.category}</Typography.Text>
              </div>
              <Space wrap>
                <Tag>{item.category}</Tag>
                <Tag color="blue">{item.color}</Tag>
                <Tag color="green">{item.season}</Tag>
              </Space>
            </div>
          </List.Item>
        )}
      />
    </Card>
  );
}
