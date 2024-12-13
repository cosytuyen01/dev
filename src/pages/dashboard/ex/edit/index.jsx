/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Button, Drawer, Form, Input, Upload, message, DatePicker } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import supabase from "../../../../supabaseClient";
import SvgIcon from "../../../../assets/iconSvg";
import Loading from "../../../../components/loading";
import viVN from "antd/lib/locale/vi_VN";
import "dayjs/locale/es"; // load on demand
import dayjs from "dayjs";
const { RangePicker } = DatePicker;
function EditWork({ isOpen, onClose, data, onSave, onDelete }) {
  const [form] = Form.useForm();
  const [uploading, setUploading] = useState(false); // Trạng thái tải ảnh
  const [fileList, setFileList] = useState([]); // Quản lý danh sách file
  const [previewImage, setPreviewImage] = useState(data?.logo); // Lưu ảnh preview từ thiết bị

  useEffect(() => {
    if (isOpen) {
      form.setFieldsValue({
        title: data?.title || "",
        company: data?.company || "",
        date: data?.date || "",
        logo: data?.logo || "",
        desc: data?.desc || "",
      });
    }
    setPreviewImage(data?.logo);
  }, [isOpen, data]); // Khi isOpen hoặc data thay đổi, cập nhật form

  // Hàm xử lý submit form
  const onFinish = async (values) => {
    const file = fileList[0]?.originFileObj; // Đảm bảo chỉ lấy file nếu có
    const fileName = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`; // Tên file duy nhất
    const dateRange = values.date;

    // Lấy ngày bắt đầu và ngày kết thúc dưới dạng năm-tháng
    const startDate = dateRange
      ? dayjs(dateRange[0]).format("MM/YYYY") // Sử dụng dayjs để lấy tháng-năm
      : "";
    const endDate = dateRange
      ? dayjs(dateRange[1]).format("MM/YYYY") // Sử dụng dayjs để lấy tháng-năm
      : "";

    // Tạo đối tượng updatedInfo với dữ liệu cần lưu
    const updatedInfo = {
      ...data,
      ...values,
      date: { startDate, endDate }, // Lưu ngày dưới dạng object với tháng-năm
      logo: file
        ? `https://uvfozqvlvnitqnhykkqr.supabase.co/storage/v1/object/public/image/${fileName}`
        : data?.logo, // URL của ảnh nếu có thay đổi, nếu không thì giữ lại logo cũ
    };

    try {
      setUploading(true);

      if (file) {
        // Upload ảnh nếu có file
        const { data, error } = await supabase.storage
          .from("image")
          .upload(fileName, file, { cacheControl: "3600", upsert: false });

        if (error) throw error;

        // Lấy public URL của ảnh vừa tải lên
        const { publicURL, error: urlError } = supabase.storage
          .from("image")
          .getPublicUrl(fileName);

        if (urlError) throw urlError;

        // Cập nhật lại thông tin nếu ảnh đã tải lên
        updatedInfo.logo = publicURL;
      }

      // Gọi onSave để lưu thông tin công việc đã cập nhật
      onSave(updatedInfo);
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
      title={data?.id ? "Chỉnh sửa kinh nghiệm" : "Thêm mới kinh nghiệm"}
      width={500}
      onClose={onClose}
      open={isOpen}
      extra={
        <div className="flex gap-4">
          {data?.id && <Button onClick={onDelete}>Xóa</Button>}
          <Button type="primary" onClick={() => form.submit()}>
            Lưu
          </Button>
        </div>
      }
    >
      {uploading && <Loading />}
      <Form
        form={form}
        name="basic"
        layout="vertical"
        initialValues={{
          title: data?.title || "",
          company: data?.company || "",
          date: data?.date || "",
          logo: data?.logo || "",
          desc: data?.desc || "",
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
          label="Logo công ty"
          name="logo"
          rules={[
            {
              required: false,
              message: "Vui lòng thêm logo!",
            },
          ]}
        >
          <Upload
            name="logo"
            accept="image/*"
            fileList={fileList} // Sử dụng fileList để quản lý các file đã chọn
            showUploadList={false} // Không hiển thị danh sách ảnh đã tải lên
            onChange={handleFileChange} // Hàm xử lý khi chọn ảnh
          >
            <div className="cursor-pointer bg-black/5 relative mt-4 w-[150px] h-[150px] sm:w-[164px] sm:h-[164px] rounded-full">
              <img
                src={previewImage} // Link ảnh avatar chính
                alt="Profile"
                className="object-cover w-[150px] h-[150px] sm:w-[164px] sm:h-[164px] rounded-full overflow-hidden"
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
          label="Công ty"
          name="company"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập công ty của bạn!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Vị trí công việc"
          name="title"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập vị trí công việc!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Thời gian"
          name="date"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập thời gian làm việc tại vị trí này!",
            },
          ]}
        >
          <RangePicker locale={viVN} picker="month" style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          label="Mô tả ngắn"
          name="desc"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mô tả ngắn về công việc!",
            },
          ]}
        >
          <Input.TextArea style={{ height: 100 }} />
        </Form.Item>
      </Form>
    </Drawer>
  );
}

export default EditWork;
