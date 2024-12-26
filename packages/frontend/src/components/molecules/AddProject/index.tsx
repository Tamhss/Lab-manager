'use client';

import { Table, Select, Input, DatePicker, InputNumber, Button, Form } from 'antd';
import React, { useState } from 'react';
import HeaderFooterBar from '@/components/molecules/ButtonHeader';
import type { TableProps } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);
const AddProject = ({ dataSource, onCancel }: { dataSource: any; onCancel: () => void }) => {
  type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection'];
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const dateFormat = 'YYYY/MM/DD';
  const titlePage = { label: '案件追加' };
  const paddingHeader = '!p-1';
  const optionFake = [
    { value: '製品A', label: '製品A' },
    { value: '製品B', label: '製品B' },
  ];

  const columns = [
    // Column 製品
    {
      title: (
        <div>
          製品<span className="text-dark-red">*</span>
        </div>
      ),
      className: paddingHeader,
      align: 'center' as const,
      children: [
        {
          title: <div>製品名</div>,
          key: 'field1',
          dataIndex: 'field1',
          className: paddingHeader,
          align: 'center' as const,
          render: (_: any, record: any) => (
            <Form>
              <Form.Item
                name={'field1'}
                style={{ margin: 0 }}
                rules={[
                  {
                    required: true,
                    message: `＊製品は必須です`,
                  },
                ]}
              >
                <Select
                  defaultValue={record.field1}
                  style={{ width: '100%' }}
                  allowClear
                  options={optionFake}
                  placeholder="選択してください"
                />
              </Form.Item>
            </Form>
          ),
        },

        {
          title: <div>製品コード</div>,
          key: 'action',
          className: paddingHeader,
          align: 'center' as const,
          render: (_: any, record: any) => (
            <Select
              defaultValue={record.field2}
              style={{ width: '100%' }}
              allowClear
              options={optionFake}
              placeholder="選択してください"
            />
          ),
        },
      ],
    },

    // Column 伝票番号
    {
      title: <div>伝票番号</div>,
      key: 'action1',
      className: paddingHeader,
      align: 'center' as const,
      render: (_: any, record: any) => (
        <Input defaultValue={record.field3} placeholder="伝票番号" style={{ width: '100%' }} />
      ),
    },

    // Column 開始日
    {
      title: <div>開始日</div>,
      key: 'actio2n',
      className: paddingHeader,
      align: 'center' as const,
      render: (_: any, record: any) => (
        <DatePicker
          defaultValue={dayjs(record.field4, dateFormat)}
          format={dateFormat}
          style={{ width: '100%' }}
          placeholder="開始日時"
        />
      ),
    },

    // Column 納期日
    {
      title: (
        <div>
          納期日<span className="text-dark-red">*</span>
        </div>
      ),
      key: 'action3',
      className: paddingHeader,
      align: 'center' as const,
      render: (_: any, record: any) => (
        <DatePicker defaultValue={dayjs(record.field5, dateFormat)} style={{ width: '100%' }} placeholder="開始日時" />
      ),
    },

    // Column 数量
    {
      title: <div>数量</div>,
      align: 'center' as const,
      className: paddingHeader,
      children: [
        {
          title: <div>案件数</div>,
          key: 'actio4n',
          className: paddingHeader,
          align: 'center' as const,
          render: (_: any, record: any) => (
            <InputNumber<string>
              defaultValue={record.field6}
              style={{ width: '100%' }}
              min="0"
              max="1000"
              step="1"
              stringMode
              placeholder="案件数"
            />
          ),
        },

        {
          title: <div>下限数</div>,
          key: 'action44',
          className: paddingHeader,
          align: 'center' as const,
          render: (_: any, record: any) => (
            <InputNumber<string>
              defaultValue={record.field7}
              style={{ width: '100%' }}
              min="0"
              max="10000"
              step="1"
              stringMode
              placeholder="下限数"
            />
          ),
        },
      ],
    },
  ];

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<any> = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  return (
    <div className="flex flex-col gap-4">
      <HeaderFooterBar titlePage={titlePage}>
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-6">
            <Button className="btn-text-primary">新規追加</Button>
            <Button className="btn-text-primary">取込</Button>
          </div>

          <Button className="btn-text-primary">閉じる</Button>
        </div>
      </HeaderFooterBar>

      <div>
        <Table
          className="table__header__primary"
          columns={columns}
          dataSource={dataSource}
          rowSelection={rowSelection}
          pagination={false}
          scroll={{ y: 300, x: 1600 }}
          bordered
        />
      </div>

      <HeaderFooterBar>
        <div className="flex items-center justify-end gap-6 w-full">
          <Button className="btn-text-primary">保存</Button>
          <Button className="btn-text-danger" onClick={onCancel}>
            削除
          </Button>
        </div>
      </HeaderFooterBar>
    </div>
  );
};

export default AddProject;
