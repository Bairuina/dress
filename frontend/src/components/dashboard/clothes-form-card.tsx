import { Button, Card, Form, Input, Select, Space } from 'antd';
import type { FormInstance } from 'antd';

import type { ClothesFormValues } from '../../types/clothes';

const CATEGORY_OPTIONS = ['上装', '下装', '连衣裙', '外套', '鞋子', '配饰'];
const SEASON_OPTIONS = ['春季', '夏季', '秋季', '冬季', '四季'];

interface ClothesFormCardProps {
  form: FormInstance<ClothesFormValues>;
  onFinish: (values: ClothesFormValues) => Promise<void>;
  loading?: boolean;
}

export function ClothesFormCard({ form, onFinish, loading }: ClothesFormCardProps) {
  return (
    <Card title="快速新增衣物" extra="适合单条录入" className="dashboard-form-card">
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item label="名称" name="name" rules={[{ required: true, message: '请输入衣物名称' }]}>
          <Input placeholder="例如：白衬衫" />
        </Form.Item>
        <Space size={16} style={{ display: 'flex' }}>
          <Form.Item label="分类" name="category" rules={[{ required: true, message: '请选择衣物分类' }]} style={{ flex: 1 }}>
            <Select options={CATEGORY_OPTIONS.map((value) => ({ label: value, value }))} />
          </Form.Item>
          <Form.Item label="季节" name="season" rules={[{ required: true, message: '请选择适合季节' }]} style={{ flex: 1 }}>
            <Select options={SEASON_OPTIONS.map((value) => ({ label: value, value }))} />
          </Form.Item>
        </Space>
        <Form.Item label="颜色" name="color" rules={[{ required: true, message: '请输入颜色' }]}>
          <Input placeholder="例如：米白色" />
        </Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          保存衣物
        </Button>
      </Form>
    </Card>
  );
}
