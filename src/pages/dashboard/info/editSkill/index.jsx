/* eslint-disable react/prop-types */
import { Button, Drawer, Form, Input } from "antd";
import { useEffect } from "react";

function EditSkill({ isOpen, onClose, data, onSave, onDelete }) {
  const [form] = Form.useForm();
  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        nameSkill: data.nameSkill || "", // Cập nhật giá trị của field khi data thay đổi
      });
    }
  }, [data, form]);
  const onFinish = (values) => {
    const updatedInfo = { ...data, ...values }; // Gộp thông tin cũ với thông tin mới
    onSave(updatedInfo); // Gọi hàm onSave từ component cha
  };

  return (
    <Drawer
      title={data ? "Chỉnh sữa kỹ năng" : "Thêm mới kỹ năng"}
      width={500}
      onClose={onClose}
      open={isOpen}
      extra={
        <div className="flex gap-2">
          {data && <Button onClick={onDelete}>Xóa</Button>}
          <Button type="primary" onClick={() => form.submit()}>
            Lưu
          </Button>
        </div>
      }
    >
      <Form
        form={form}
        name="basic"
        layout="vertical"
        initialValues={{
          nameSkill: data ? data.nameSkill : "",
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
          label="Tên kỹ năng"
          name="nameSkill"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên kỹ năng!",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Drawer>
  );
}

export default EditSkill;
