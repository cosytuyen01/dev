/* eslint-disable react/prop-types */
import { Button, Drawer, Form, Input } from "antd";

function EditInfo({ isOpen, onClose, data, onSave }) {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    const updatedInfo = { ...data, ...values }; // Gộp thông tin cũ với thông tin mới
    onSave(updatedInfo); // Gọi hàm onSave từ component cha
  };

  return (
    <Drawer
      title="Chỉnh sửa thông tin"
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
          fullname: data?.fullname || "",
          avatar: data?.avatar || "",
          job: data?.job || "",
          location: data?.location || "",
          about: data?.about || "",
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
          label="Họ & tên"
          name="fullname"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập họ tên của bạn!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Link avatar"
          name="avatar"
          rules={[
            {
              required: true,
              message: "Vui lòng thêm link avatar!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Nghề nghiệp"
          name="job"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập nghề nghiệp của bạn!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Địa chỉ"
          name="location"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập địa chỉ của bạn!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Mô tả giới thiệu"
          name="about"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mô tả ngắn về bản thân!",
            },
          ]}
        >
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Drawer>
  );
}

export default EditInfo;
