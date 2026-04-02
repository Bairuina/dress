import { Button, Card, Col, Form, Input, Layout, List, Row, Select, Space, Statistic, Tag, Typography, message } from 'antd';
import { useCreateClothes, useClothes } from '../services/queries';
import type { ClothesFormValues } from '../types/clothes';

const { Header, Content } = Layout;
const CATEGORY_OPTIONS = ['上装', '下装', '连衣裙', '外套', '鞋子', '配饰'];
const SEASON_OPTIONS = ['春季', '夏季', '秋季', '冬季', '四季'];

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
    <Layout style={{ minHeight: '100vh' }}>
      {contextHolder}
      <Header className="app-header">
        <Typography.Title level={3} style={{ color: '#fff', margin: 0 }}>
          衣橱搭配
        </Typography.Title>
      </Header>
      <Content style={{ padding: 24 }}>
        <Space direction="vertical" size={24} style={{ width: '100%' }}>
          <Card>
            <Typography.Title level={4}>电子衣橱</Typography.Title>
            <Typography.Paragraph type="secondary">
              先完成衣物管理基础能力，后续可以继续扩展搭配推荐、日历穿搭和图片识别等功能。
            </Typography.Paragraph>
          </Card>

          <Row gutter={[16, 16]}>
            <Col xs={24} md={8}>
              <Card>
                <Statistic title="衣物数量" value={data?.length ?? 0} loading={isLoading} />
              </Card>
            </Col>
            <Col xs={24} md={8}>
              <Card>
                <Statistic title="分类数量" value={new Set((data ?? []).map((item) => item.category)).size} />
              </Card>
            </Col>
            <Col xs={24} md={8}>
              <Card>
                <Statistic
                  title="接口状态"
                  value={createClothesMutation.isPending || isLoading ? '加载中' : '已就绪'}
                />
              </Card>
            </Col>
          </Row>

          <Row gutter={[16, 16]} align="top">
            <Col xs={24} lg={10}>
              <Card title="新增衣物">
                <Form form={form} layout="vertical" onFinish={handleFinish}>
                  <Form.Item label="名称" name="name" rules={[{ required: true, message: '请输入衣物名称' }]}>
                    <Input placeholder="例如：白衬衫" />
                  </Form.Item>
                  <Form.Item
                    label="分类"
                    name="category"
                    rules={[{ required: true, message: '请选择衣物分类' }]}
                  >
                    <Select options={CATEGORY_OPTIONS.map((value) => ({ label: value, value }))} />
                  </Form.Item>
                  <Form.Item label="颜色" name="color" rules={[{ required: true, message: '请输入颜色' }]}>
                    <Input placeholder="例如：白色" />
                  </Form.Item>
                  <Form.Item
                    label="季节"
                    name="season"
                    rules={[{ required: true, message: '请选择适合季节' }]}
                  >
                    <Select options={SEASON_OPTIONS.map((value) => ({ label: value, value }))} />
                  </Form.Item>
                  <Button type="primary" htmlType="submit" loading={createClothesMutation.isPending}>
                    保存衣物
                  </Button>
                </Form>
              </Card>
            </Col>
            <Col xs={24} lg={14}>
              <Card title="衣物列表">
                <List
                  loading={isLoading}
                  dataSource={data ?? []}
                  locale={{ emptyText: '暂时还没有衣物数据' }}
                  renderItem={(item) => (
                    <List.Item>
                      <Space direction="vertical" size={4}>
                        <Typography.Text strong>{item.name}</Typography.Text>
                        <Space wrap>
                          <Tag>{item.category}</Tag>
                          <Tag color="blue">{item.color}</Tag>
                          <Tag color="green">{item.season}</Tag>
                        </Space>
                      </Space>
                    </List.Item>
                  )}
                />
              </Card>
            </Col>
          </Row>
        </Space>
      </Content>
    </Layout>
  );
}
