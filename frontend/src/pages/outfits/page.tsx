import { Card, Col, Row, Space, Tag, Typography } from 'antd';

import { AppShell } from '../../layouts';

const outfitSamples = [
  { id: 1, title: '通勤简约搭配', scene: '通勤', season: '春季', items: ['白衬衫', '黑裤子', '乐福鞋'] },
  { id: 2, title: '周末休闲搭配', scene: '休闲', season: '四季', items: ['宽松卫衣', '牛仔裤', '运动鞋'] },
  { id: 3, title: '约会轻熟风', scene: '约会', season: '秋季', items: ['针织上衣', '半身裙', '短靴'] },
];

export function OutfitsPage() {
  return (
    <AppShell pageTitle="穿搭展示" pageDescription="先展示典型穿搭方案，后续再接入真实穿搭 CRUD。">
      <Row gutter={[16, 16]}>
        {outfitSamples.map((outfit) => (
          <Col xs={24} md={12} xl={8} key={outfit.id}>
            <Card title={outfit.title}>
              <Space direction="vertical" size={12}>
                <Space wrap>
                  <Tag color="blue">{outfit.scene}</Tag>
                  <Tag color="green">{outfit.season}</Tag>
                </Space>
                <div>
                  <Typography.Text strong>搭配单品</Typography.Text>
                  <Typography.Paragraph style={{ marginTop: 8, marginBottom: 0 }}>
                    {outfit.items.join(' / ')}
                  </Typography.Paragraph>
                </div>
              </Space>
            </Card>
          </Col>
        ))}
      </Row>
    </AppShell>
  );
}
