import { Card, Col, Row, Statistic } from 'antd';

import type { ClothesItem } from '../../types/clothes';

interface ClothesSummaryProps {
  clothes?: ClothesItem[];
  loading?: boolean;
  mutationPending?: boolean;
}

export function ClothesSummary({ clothes, loading, mutationPending }: ClothesSummaryProps) {
  const total = clothes?.length ?? 0;
  const categories = new Set((clothes ?? []).map((item) => item.category)).size;
  const colors = new Set((clothes ?? []).map((item) => item.color)).size;

  return (
    <Row gutter={[18, 18]}>
      <Col xs={24} md={8}>
        <Card className="stat-card">
          <Statistic title="衣物数量" value={total} loading={loading} />
        </Card>
      </Col>
      <Col xs={24} md={8}>
        <Card className="stat-card">
          <Statistic title="分类数量" value={categories} loading={loading} />
        </Card>
      </Col>
      <Col xs={24} md={8}>
        <Card className="stat-card">
          <Statistic title="已录入颜色" value={colors} suffix={mutationPending || loading ? '更新中' : '种'} loading={loading} />
        </Card>
      </Col>
    </Row>
  );
}
