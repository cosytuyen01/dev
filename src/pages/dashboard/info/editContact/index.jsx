/* eslint-disable react/prop-types */
import { Button, Drawer, Form, Input } from "antd";

function EditContact({ isOpen, onClose, data, onSave }) {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    const updatedInfo = { ...data, ...values }; // Gộp thông tin cũ với thông tin mới
    onSave(updatedInfo); // Gọi hàm onSave từ component cha
  };

  return (
    <Drawer
      title="Chỉnh sửa liên hệ"
      width={500}
      onClose={onClose}
      open={isOpen}
      extra={
        <Button type="primary" onClick={() => form.submit()}>
          Lưu
        </Button>
      }
    >
      <Form
        form={form}
        name="basic"
        layout="vertical"
        initialValues={{
          cv: data?.cv || "",
          fb: data?.fb || "",
          skype: data?.skype || "",
        }}
        labelCol={{
          span: 8,
        }}
        style={{
          maxWidth: 500,
        }}
        variant={"filled"}
        onFinish={onFinish}
      >
        <Form.Item
          label="Facebook"
          name="fb"
          rules={[
            {
              required: true,
              message: "Vui lòng thêm link FBs!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Skype"
          name="skype"
          rules={[
            {
              required: true,
              message: "Vui lòng thêm link Skype!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="CV"
          name="cv"
          rules={[
            {
              required: true,
              message: "Vui lòng thêm link CV",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Drawer>
  );
}

export default EditContact;
