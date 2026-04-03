import { Col, Form, Row, Space, message } from 'antd';

import { ClothesFormCard, ClothesListCard, ClothesSummary, DashboardHero } from '../../components/dashboard';
import { useClothes, useCreateClothes } from '../../hooks';
import { AppShell } from '../../layouts';
import type { ClothesFormValues } from '../../types';

export function DashboardPage() {
  const [form] = Form.useForm<ClothesFormValues>();
  const { data, isLoading } = useClothes();
  const createClothesMutation = useCreateClothes();
  const [messageApi, contextHolder] = message.useMessage();

  async function handleFinish(values: ClothesFormValues) {
    try {
      await createClothesMutation.mutateAsync(values);
      messageApi.success('新增衣物成功');
      form.resetFields();
    } catch {
      messageApi.error('新增衣物失败');
    }
  }

  return (
    <AppShell pageTitle="工作台" pageDescription="集中查看衣橱概览，并继续完成衣物录入。">
      {contextHolder}
      <div className="screen-page">
        <Space direction="vertical" size={18} style={{ width: '100%' }}>
          <DashboardHero />
          <ClothesSummary clothes={data} loading={isLoading} mutationPending={createClothesMutation.isPending} />
          <Row gutter={[18, 18]} className="screen-page-row">
            <Col xs={24} xl={15} className="screen-page-col">
              <ClothesFormCard form={form} onFinish={handleFinish} loading={createClothesMutation.isPending} />
            </Col>
            <Col xs={24} xl={9} className="screen-page-col">
              <ClothesListCard clothes={data} loading={isLoading} title="最近录入衣物" />
            </Col>
          </Row>
        </Space>
      </div>
    </AppShell>
  );
}
