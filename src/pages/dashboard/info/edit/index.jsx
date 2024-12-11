/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Button, Drawer, Form, Input, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import supabase from "../../../../supabaseClient";

function EditInfo({ isOpen, onClose, data, onSave }) {
  const [form] = Form.useForm();
  const [uploading, setUploading] = useState(false); // Trạng thái tải ảnh
  const [fileList, setFileList] = useState([]); // Quản lý danh sách file
  const [previewImage, setPreviewImage] = useState(data?.avatar); // Lưu ảnh preview từ thiết bị
  useEffect(() => {
    setPreviewImage(data?.avatar);
  }, [isOpen]);
  // Hàm xử lý submit form
  const onFinish = async (values) => {
    // Nếu có ảnh mới, upload ảnh lên Supabase
    if (fileList.length > 0) {
      const file = fileList[0].originFileObj;
      const fileName = `${Date.now()}-${file.name}`;
      const updatedInfo = {
        ...data,
        ...values,
        avatar: `https://uvfozqvlvnitqnhykkqr.supabase.co/storage/v1/object/public/image/${fileName}`,
      };

      try {
        setUploading(true);
        const { data, error } = await supabase.storage
          .from("image") // Tên bucket "image"
          .upload(fileName, file, { cacheControl: "3600", upsert: false });

        if (error) throw error;

        const { publicURL, error: urlError } = supabase.storage
          .from("image")
          .getPublicUrl(fileName);

        if (urlError) throw urlError;

        form.setFieldsValue({
          avatar: publicURL,
        });
        message.success("Avatar uploaded successfully");
      } catch (error) {
        message.error("Error uploading avatar: " + error.message);
      } finally {
        setUploading(false);
        onSave(updatedInfo);
      }
    }
  };

  // Hàm xử lý khi chọn ảnh từ thiết bị
  const handleFileChange = ({ fileList }) => {
    // Chỉ cho phép 1 file duy nhất
    setFileList(fileList.slice(-1)); // Cắt chỉ giữ lại file cuối cùng

    if (fileList && fileList.length > 0) {
      // Tạo ảnh preview cho ảnh vừa chọn
      const file = fileList[0].originFileObj;
      const previewUrl = URL.createObjectURL(file);
      setPreviewImage(previewUrl);
    } else {
      setPreviewImage(null);
    }
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

        {/* Trường Avatar - chọn ảnh từ thiết bị */}
        <Form.Item
          label="Avatar"
          name="avatar"
          rules={[
            {
              required: true,
              message: "Vui lòng thêm avatar!",
            },
          ]}
        >
          <Upload
            name="avatar"
            accept="image/*"
            fileList={fileList} // Sử dụng fileList để quản lý các file đã chọn
            showUploadList={false} // Không hiển thị danh sách ảnh đã tải lên
            onChange={handleFileChange} // Hàm xử lý khi chọn ảnh
          >
            <Button icon={<UploadOutlined />} disabled={uploading}>
              {uploading ? "Uploading..." : "Chọn ảnh avatar"}
            </Button>
          </Upload>
        </Form.Item>

        <div style={{ marginBottom: "16px" }}>
          <img
            src={previewImage} // Link ảnh avatar chính
            alt="Profile"
            className="object-cover  w-[150px] h-[150px] sm:w-[164px] sm:h-[164px] rounded-full overflow-hidden"
          />
        </div>

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
