'use client';
import React, { useEffect, useState } from 'react';
import MainLayout from '../main-layout';
import { Form, Input, Button, Card, Row, Col, message } from 'antd';
import axios from 'axios';
const { TextArea } = Input;

const PaymentListener: React.FC = () => {
  const [form] = Form.useForm();

  interface PaymentFormValues {
    code?: string;
    message?: string;
    msgType?: string;
    txnId?: string;
    qrTrace?: string;
    bankCode?: string;
    mobile?: string;
    accountNo?: string;
    amount?: string;
    payDate?: string;
    merchantCode?: string;
    terminalId?: string;
    name?: string;
    phone?: string;
    provinceId?: string;
    districtId?: string;
    address?: string;
    email?: string;
    ccy?: string;
    checksum?: string;
    addData?: string;
  }

  const onFinish = async (values: PaymentFormValues) => {
    try {
      const body = {
        ...values,
        addData: values.addData ? JSON.parse(values.addData) : [],
      };
      const res = await axios.post('/thanhtoanqrcode', body, {
        headers: { 'Content-Type': 'application/json' },
      });
      message.success('Gửi callback thành công');
      console.log(res.data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error(error);
      }
      message.error('Gửi callback thất bại');
    }
  };

  useEffect(() => {
    form.resetFields();
    form.setFieldsValue({
      code: '00',
      message: 'Tru tien thanh cong, so trace 100550',
      msgType: '1',
      txnId: '50141',
      qrTrace: '000098469',
      bankCode: 'VIETCOMBANK',
      mobile: '0989511021',
      accountNo: '',
      amount: '1000000',
      payDate: '20180807164732',
      merchantCode: '0311609355',
      terminalId: 'FPT02',
      ccy: '704',
      checksum: '81F77683FEA4EBE2CE748AFC99CC3AE9',
      addData: JSON.stringify(
        [
          {
            merchantType: '5045',
            serviceCode: '06',
            masterMerCode: 'A000000775',
            merchantCode: '0311609355',
            terminalId: 'FPT02',
            productId: '',
            amount: '100000',
            ccy: '704',
            qty: '1',
            note: '',
          },
        ],
        null,
        2
      ),
    });
  }, []);

  return (
    <MainLayout>
      <Card title="VNPAY Callback Form" className="w-full mt-6">
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{}}
        >
          <Row gutter={16}>
            {[
              'code',
              'message',
              'msgType',
              'txnId',
              'qrTrace',
              'bankCode',
              'mobile',
              'accountNo',
              'amount',
              'payDate',
              'merchantCode',
              'terminalId',
              'name',
              'phone',
              'provinceId',
              'districtId',
              'address',
              'email',
              'ccy',
              'checksum',
            ].map((field) => (
              <Col xs={24} md={12} key={field}>
                <Form.Item name={field} label={field}>
                  <Input placeholder={field} />
                </Form.Item>
              </Col>
            ))}
            <Col span={24}>
              <Form.Item
                name="addData"
                label="addData (JSON array)"
                tooltip='Nhập dạng [{"id":"abc","amount":"123"}]'
              >
                <TextArea
                  rows={4}
                  placeholder='[{"id":"abc","amount":"123"}]'
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item className="text-center mt-4">
            <Button type="primary" htmlType="submit">
              Gửi Callback
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </MainLayout>
  );
};

export default PaymentListener;
