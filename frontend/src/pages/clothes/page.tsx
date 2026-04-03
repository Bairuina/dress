import { Button, Card, Col, Form, Input, Modal, Row, Select, Space, message } from 'antd';
import { useMemo, useState } from 'react';

import { ClothesListCard } from '../../components/dashboard';
import { useClothes, useCreateClothes, useCreateClothesBatch } from '../../hooks';
import { AppShell } from '../../layouts';
import type { ClothesFormValues } from '../../types';

const CATEGORY_OPTIONS = ['上装', '下装', '连衣裙', '外套', '鞋子', '配饰'];
const SEASON_OPTIONS = ['春季', '夏季', '秋季', '冬季', '四季'];
const EMPTY_BATCH_ITEMS: ClothesFormValues[] = [
  { name: '', category: '', color: '', season: '' },
  { name: '', category: '', color: '', season: '' },
  { name: '', category: '', color: '', season: '' },
];

interface FilterValues {
  name?: string;
  category?: string;
  color?: string;
  season?: string;
}

export function ClothesPage() {
  const [filterForm] = Form.useForm<FilterValues>();
  const [createForm] = Form.useForm<ClothesFormValues>();
  const [batchForm] = Form.useForm<{ items: ClothesFormValues[] }>();
  const { data, isLoading } = useClothes();
  const createClothesMutation = useCreateClothes();
  const createClothesBatchMutation = useCreateClothesBatch();
  const [messageApi, contextHolder] = message.useMessage();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isBatchOpen, setIsBatchOpen] = useState(false);
  const [filters, setFilters] = useState<FilterValues>({});

  const filteredClothes = useMemo(() => {
    const source = data ?? [];

    return source.filter((item) => {
      const matchName = !filters.name || item.name.toLowerCase().includes(filters.name.toLowerCase());
      const matchCategory = !filters.category || item.category === filters.category;
      const matchColor = !filters.color || item.color.toLowerCase().includes(filters.color.toLowerCase());
      const matchSeason = !filters.season || item.season === filters.season;

      return matchName && matchCategory && matchColor && matchSeason;
    });
  }, [data, filters]);

  function handleFilter(values: FilterValues) {
    setFilters(values);
  }

  function handleResetFilter() {
    filterForm.resetFields();
    setFilters({});
  }

  async function handleCreate(values: ClothesFormValues) {
    try {
      await createClothesMutation.mutateAsync(values);
      messageApi.success('衣物录入成功');
      createForm.resetFields();
      setIsCreateOpen(false);
    } catch {
      messageApi.error('衣物录入失败');
    }
  }

  async function handleBatchCreate(values: { items?: ClothesFormValues[] }) {
    const items = (values.items ?? []).filter((item) => item.name && item.category && item.color && item.season);

    if (items.length === 0) {
      messageApi.error('请至少填写一条完整衣物信息');
      return;
    }

    try {
      await createClothesBatchMutation.mutateAsync(items);
      messageApi.success(`批量录入成功，新增 ${items.length} 件衣物`);
      batchForm.resetFields();
      batchForm.setFieldsValue({ items: EMPTY_BATCH_ITEMS });
      setIsBatchOpen(false);
    } catch {
      messageApi.error('批量录入失败');
    }
  }

  function openBatchModal() {
    setIsBatchOpen(true);
    batchForm.setFieldsValue({ items: EMPTY_BATCH_ITEMS });
  }

  return (
    <AppShell pageTitle="衣物管理" pageDescription="上方筛选，下方展示列表，支持单条和批量录入衣物。">
      {contextHolder}
      <div className="screen-page">
        <Space direction="vertical" size={16} style={{ width: '100%' }} className="screen-stack">
          <Card
            title="筛选条件"
            extra={
              <Space size={10}>
                <Button onClick={openBatchModal}>批量新增</Button>
                <Button type="primary" onClick={() => setIsCreateOpen(true)}>
                  新增衣物
                </Button>
              </Space>
            }
            className="compact-filter-card"
          >
            <Form form={filterForm} layout="vertical" onFinish={handleFilter}>
              <Row gutter={16}>
                <Col xs={24} md={12} xl={6}>
                  <Form.Item label="衣物名称" name="name">
                    <Input placeholder="输入名称关键词" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12} xl={6}>
                  <Form.Item label="分类" name="category">
                    <Select
                      allowClear
                      placeholder="选择分类"
                      options={CATEGORY_OPTIONS.map((value) => ({ label: value, value }))}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12} xl={6}>
                  <Form.Item label="颜色" name="color">
                    <Input placeholder="例如：白色" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12} xl={6}>
                  <Form.Item label="季节" name="season">
                    <Select
                      allowClear
                      placeholder="选择季节"
                      options={SEASON_OPTIONS.map((value) => ({ label: value, value }))}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Space size={10}>
                <Button type="primary" htmlType="submit">
                  应用筛选
                </Button>
                <Button onClick={handleResetFilter}>重置</Button>
              </Space>
            </Form>
          </Card>

          <div className="screen-page-flex">
            <ClothesListCard clothes={filteredClothes} loading={isLoading} title="衣物列表" />
          </div>
        </Space>
      </div>

      <Modal
        destroyOnHidden
        open={isCreateOpen}
        title="新增衣物"
        onCancel={() => {
          setIsCreateOpen(false);
          createForm.resetFields();
        }}
        footer={null}
      >
        <Form form={createForm} layout="vertical" onFinish={handleCreate}>
          <Form.Item label="名称" name="name" rules={[{ required: true, message: '请输入衣物名称' }]}>
            <Input placeholder="例如：白衬衫" />
          </Form.Item>
          <Form.Item label="分类" name="category" rules={[{ required: true, message: '请选择衣物分类' }]}>
            <Select options={CATEGORY_OPTIONS.map((value) => ({ label: value, value }))} />
          </Form.Item>
          <Form.Item label="颜色" name="color" rules={[{ required: true, message: '请输入颜色' }]}>
            <Input placeholder="例如：白色" />
          </Form.Item>
          <Form.Item label="季节" name="season" rules={[{ required: true, message: '请选择适合季节' }]}>
            <Select options={SEASON_OPTIONS.map((value) => ({ label: value, value }))} />
          </Form.Item>
          <Space size={10}>
            <Button type="primary" htmlType="submit" loading={createClothesMutation.isPending}>
              保存衣物
            </Button>
            <Button
              onClick={() => {
                setIsCreateOpen(false);
                createForm.resetFields();
              }}
            >
              取消
            </Button>
          </Space>
        </Form>
      </Modal>

      <Modal
        destroyOnHidden
        open={isBatchOpen}
        title="批量新增衣物"
        width={860}
        onCancel={() => {
          setIsBatchOpen(false);
          batchForm.resetFields();
        }}
        footer={null}
      >
        <Form form={batchForm} layout="vertical" onFinish={handleBatchCreate}>
          <Form.List name="items">
            {(fields, { add, remove }) => (
              <Space direction="vertical" size={16} style={{ width: '100%' }}>
                {fields.map((field, index) => (
                  <Card
                    key={field.key}
                    size="small"
                    title={`衣物 ${index + 1}`}
                    extra={
                      fields.length > 1 ? (
                        <Button type="link" danger onClick={() => remove(field.name)}>
                          删除
                        </Button>
                      ) : null
                    }
                  >
                    <Row gutter={16}>
                      <Col span={6}>
                        <Form.Item label="名称" name={[field.name, 'name']} rules={[{ required: true, message: '请输入名称' }]}>
                          <Input placeholder="例如：白衬衫" />
                        </Form.Item>
                      </Col>
                      <Col span={6}>
                        <Form.Item label="分类" name={[field.name, 'category']} rules={[{ required: true, message: '请选择分类' }]}>
                          <Select options={CATEGORY_OPTIONS.map((value) => ({ label: value, value }))} />
                        </Form.Item>
                      </Col>
                      <Col span={6}>
                        <Form.Item label="颜色" name={[field.name, 'color']} rules={[{ required: true, message: '请输入颜色' }]}>
                          <Input placeholder="例如：白色" />
                        </Form.Item>
                      </Col>
                      <Col span={6}>
                        <Form.Item label="季节" name={[field.name, 'season']} rules={[{ required: true, message: '请选择季节' }]}>
                          <Select options={SEASON_OPTIONS.map((value) => ({ label: value, value }))} />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Card>
                ))}
                <Space size={10}>
                  <Button onClick={() => add({ name: '', category: '', color: '', season: '' })}>再加一条</Button>
                  <Button type="primary" htmlType="submit" loading={createClothesBatchMutation.isPending}>
                    批量保存
                  </Button>
                  <Button
                    onClick={() => {
                      setIsBatchOpen(false);
                      batchForm.resetFields();
                    }}
                  >
                    取消
                  </Button>
                </Space>
              </Space>
            )}
          </Form.List>
        </Form>
      </Modal>
    </AppShell>
  );
}
