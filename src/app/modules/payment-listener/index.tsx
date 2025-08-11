'use client';
import React, { useEffect, useState } from 'react';
import MainLayout from '../main-layout';
import { Form, Input, Button, Card, Row, Col, message } from 'antd';
import axios from 'axios';
import { post } from '@/app/lib/api-service';
import { encodeMD5LowerCase } from '@/app/lib/common-function';
const { TextArea } = Input;

const SECRET_KEY = '3J10jONB58yKWOocfRwEhvnKU3G69u5V';

const safe = (v?: string) => (v ?? '').trim();

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

  interface QrCodeItemPayment {
    productId: string;
    amount: string;
    tipAndFee: string;
    ccy: string;
    qty: string;
    note: string;
  }

  const onFinish = async (values: PaymentFormValues) => {
    try {
      const raw = [
        safe(values.code),
        safe(values.msgType),
        safe(values.txnId),
        safe(values.qrTrace),
        safe(values.bankCode),
        safe(values.mobile),
        safe(values.accountNo),
        safe(values.amount),
        safe(values.payDate),
        safe(values.merchantCode),
        SECRET_KEY,
      ].join('|');

      const checksum = encodeMD5LowerCase(raw);

      const response = await post('tthgroup/api/thanhtoanqrcode', {
        ...values,
        checksum,
      });
      const result = await response.json();
      const { message: msg } = result;

      if (!response.ok) {
        message.error(msg || 'Lỗi không xác định');
        throw new Error(msg || 'Lỗi không xác định');
      }

      message.success(msg || 'Gửi callback thành công');

      if (result) {
        console.log(result);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    form.resetFields();
    const addData: QrCodeItemPayment[] = [
      {
        // merchantType: '5045',
        // serviceCode: '06',
        // masterMerCode: 'A000000775',
        // merchantCode: '0311609355',
        // terminalId: 'FPT02',
        productId: '',
        amount: '100000',
        tipAndFee: '0',
        ccy: '704',
        qty: '1',
        note: '',
      },
    ];

    form.setFieldsValue({
      code: '00',
      message: 'Tru tien thanh cong, so trace 100550',
      msgType: '1',
      txnId: 'PTU250800002205_G1HZ',
      qrTrace: '000098469',
      bankCode: 'MBBANK',
      mobile: '0989511021',
      accountNo: '',
      amount: '100000',
      payDate: '20180807164732',
      merchantCode: '0311609355',
      terminalId: 'FPT02',
      ccy: '704',
      checksum: '7BC8794CEC9D570BA1B0F0EB8D211263',
      addData,
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
