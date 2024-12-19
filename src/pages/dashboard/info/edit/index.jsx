/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Button, Drawer, Form, Input, Upload, message } from "antd";
import { useEffect, useState } from "react";
import supabase from "../../../../supabaseClient";
import SvgIcon from "../../../../assets/iconSvg";
import Loading from "../../../../components/loading";
function EditInfo({ isOpen, onClose, data, onSave }) {
  const [form] = Form.useForm();
  const [uploading, setUploading] = useState(false); // Trạng thái tải ảnh
  const [fileList, setFileList] = useState([]); // Quản lý danh sách file
  const [previewImage, setPreviewImage] = useState(data?.avatar); // Lưu ảnh preview từ thiết bị
  console.log("data", data);

  useEffect(() => {
    setPreviewImage(data?.avatar);
    form.setFieldsValue({
      avatar: data?.avatar || "",
    });
  }, [isOpen]);
  // Hàm xử lý submit form
  const onFinish = async (values) => {
    const file = fileList[0]?.originFileObj;
    const fileName = `${Date.now()}-${file?.name}`;
    const publicURL = `https://fcijucimrhbtywyadqlb.supabase.co/storage/v1/object/public/image/${fileName}`;
    const updatedInfo = {
      ...data,
      ...values,
    };
    updatedInfo.avatar = publicURL !== previewImage ? publicURL : previewImage;
    try {
      setUploading(true);
      const { data, error } = await supabase.storage
        .from("image")
        .upload(fileName, file, { cacheControl: "3600", upsert: false });

      if (error) throw error;

      const { publicURL, error: urlError } = supabase.storage
        .from("image")
        .getPublicUrl(fileName);

      if (urlError) throw urlError;

      // Cập nhật avatar vào form
      form.setFieldsValue({
        avatar: publicURL, // Cập nhật lại avatar ở đây
      });

      message.success("Chỉnh sửa thông tin thành công");

      // Lưu thông tin đã cập nhật
      onSave(updatedInfo);
      console.log("updatedInfo", updatedInfo);
    } catch (error) {
      message.error("Chỉnh sửa thất bại: " + error.message);
    } finally {
      setUploading(false);
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
      {uploading && <Loading />}
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
            <div className="cursor-pointer bg-black/5 relative mt-4 w-[150px] h-[150px] sm:w-[164px] sm:h-[164px] rounded-full">
              <img
                src={previewImage} // Link ảnh avatar chính
                alt="Profile"
                className="object-cover  w-[150px] h-[150px] sm:w-[164px] sm:h-[164px] rounded-full overflow-hidden"
              />
              <div className="absolute right-4 bottom-0 bg-white p-1 rounded-full cursor-pointer">
                <SvgIcon
                  name={"image"}
                  color={"#6F6ADC"}
                  height={24}
                  width={24}
                />
              </div>
            </div>
          </Upload>
        </Form.Item>

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
          <Input.TextArea style={{ height: 100 }} />
        </Form.Item>
      </Form>
    </Drawer>
  );
}

export default EditInfo;
