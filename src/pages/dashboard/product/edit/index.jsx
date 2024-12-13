/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Button, Drawer, Form, Input, Select, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import supabase from "../../../../supabaseClient";
import SvgIcon from "../../../../assets/iconSvg";

function EditInfo({ isOpen, onClose, data, onSave, onDelete }) {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]); // Quản lý danh sách file
  const [previewImage, setPreviewImage] = useState(data?.thumb); // Lưu ảnh preview từ thiết bị
  const [fileListDetailImages, setFileListDetailImages] = useState(
    data?.img_detail || []
  );
  const [previewImages, setPreviewImages] = useState(data?.img_detail);
  useEffect(() => {
    form.setFieldsValue({
      name: data?.name || "",
      thumb: data?.thumb || "",
      img_detail: data?.img_detail || [],
      category: data?.category || "",
      description: data?.description || "",
    });
  }, [data, form]);
  useEffect(() => {
    setPreviewImage(data?.thumb);
    setFileListDetailImages(data?.img_detail);
    setPreviewImages(data?.img_detail);
  }, [isOpen]);
  console.log("data", data);

  const onFinish = async (values) => {
    let updatedInfo = { ...data, ...values };

    // Upload ảnh đại diện nếu có ảnh mới
    if (Array.isArray(fileList) && fileList.length > 0) {
      const file = fileList[0].originFileObj;
      const fileName = `${Date.now()}-${file.name}`;

      try {
        const { data, error } = await supabase.storage
          .from("image")
          .upload(fileName, file, { cacheControl: "3600", upsert: false });

        if (error) throw error;

        const publicURL = `https://uvfozqvlvnitqnhykkqr.supabase.co/storage/v1/object/public/image/${fileName}`;

        form.setFieldsValue({
          thumb: publicURL,
        });

        updatedInfo.thumb = publicURL;
      } catch (error) {
        message.error("Error uploading avatar: " + error.message);
      }
    }
    const uploadedImages = await Promise.all(
      (Array.isArray(fileListDetailImages) ? fileListDetailImages : []).map(
        async (file) => {
          if (typeof file === "string") {
            return file; // Ảnh cũ, giữ nguyên URL
          }
          try {
            const fileName = `${Date.now()}-${file.name}`;
            const { error } = await supabase.storage
              .from("image")
              .upload(fileName, file.originFileObj, {
                cacheControl: "3600",
                upsert: false,
              });

            if (error) {
              console.error(
                `Upload failed for ${file.originFileObj.name}:`,
                error.message
              );
              return null;
            }

            return `https://uvfozqvlvnitqnhykkqr.supabase.co/storage/v1/object/public/image/${fileName}`;
          } catch (error) {
            console.error(
              `Unexpected error for ${file.originFileObj.name}:`,
              error.message
            );
            return null;
          }
        }
      )
    );

    const validUploadedImages = uploadedImages.filter((url) => url !== null);
    if (validUploadedImages.length > 0) {
      form.setFieldsValue({ img_detail: validUploadedImages });
      updatedInfo.img_detail = validUploadedImages;
    } else {
      message.warning("No detail images were successfully uploaded.");
    }

    // Gọi hàm onSave với dữ liệu đã cập nhật
    onSave(updatedInfo);
  };

  const handleDetailImagesChange = ({ fileList }) => {
    const currentFiles = Array.isArray(fileListDetailImages)
      ? fileListDetailImages
      : [];

    // Lấy danh sách file mới và loại bỏ trùng lặp
    const newFiles = fileList.filter(
      (file) =>
        !currentFiles.some((existingFile) => existingFile.uid === file.uid)
    );

    // Cập nhật danh sách file
    const updatedFileList = [...currentFiles, ...newFiles];
    setFileListDetailImages(updatedFileList);

    // Tạo danh sách preview URL
    const newPreviews = newFiles.map((file) => ({
      url: URL.createObjectURL(file.originFileObj),
      uid: file.uid,
      name: file.name,
      status: "done",
    }));

    // Kiểm tra và cập nhật previewImages
    setPreviewImages((prevPreviewImages) => {
      const safePreviewImages = Array.isArray(prevPreviewImages)
        ? prevPreviewImages
        : [];
      return [...safePreviewImages, ...newPreviews];
    });
  };

  const handleDeleteImage = (index) => {
    setFileListDetailImages((prevList) =>
      prevList.filter((_, i) => i !== index)
    );
    setPreviewImages((prevList) => prevList.filter((_, i) => i !== index));
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
      title={data?.id ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm"}
      width={600}
      onClose={onClose}
      open={isOpen}
      extra={
        <div className="flex gap-4 ">
          {data?.id && <Button onClick={onDelete}>Xóa</Button>}
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
          name: data?.name || "",
          thumb: data?.thumb || "",
          img_detail: data?.img_detail || "",
          category: data?.category || "",
          description: data?.description || "",
        }}
        labelCol={{
          span: 8,
        }}
        style={{
          maxWidth: 600,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          label="Hình đại diện"
          name="thumb"
          rules={[
            {
              required: true,
              message: "Vui lòng thêm thumb!",
            },
          ]}
        >
          <Upload
            name="thumb"
            accept="image/*"
            fileList={fileList}
            showUploadList={false}
            onChange={handleFileChange}
          >
            <div className="bg-black/5 relative mt-4 w-[150px] h-[150px] sm:w-[164px] sm:h-[164px] rounded-xl">
              <img
                src={previewImage}
                alt="Profile"
                className="object-cover  w-[150px] h-[150px] sm:w-[164px] sm:h-[164px] rounded-xl overflow-hidden"
              />
              <div className="absolute right-2 bottom-2 bg-white p-1 rounded-full cursor-pointer">
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
          label="Tên sản phẩm"
          name="name"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên sản phẩm!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Thuộc danh mục"
          name="category"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập địa chỉ của bạn!",
            },
          ]}
        >
          <Select>
            <Select.Option value="Mobile">Mobile</Select.Option>
            <Select.Option value="Website">Website</Select.Option>
            <Select.Option value="Graphic">Graphic</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Mô tả"
          name="description"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mô tả ngắn về bản thân!",
            },
          ]}
        >
          <Input.TextArea style={{ height: 100 }} />
        </Form.Item>
        <Form.Item
          name="img_detail"
          rules={[
            {
              required: false,
              message: "Vui lòng thêm!",
            },
          ]}
        >
          <Upload
            name="img_detail"
            accept="image/*"
            multiple
            fileList={fileListDetailImages} // Sử dụng fileList để quản lý các file đã chọn
            showUploadList={false} // Không hiển thị danh sách ảnh đã tải lên
            onChange={handleDetailImagesChange} // Hàm xử lý khi chọn ảnh
          >
            <Button icon={<UploadOutlined />}>Chọn ảnh chi tiết</Button>
          </Upload>
        </Form.Item>
        <div className="flex flex-wrap gap-2 mt-4">
          {previewImages?.map((file, index) => {
            const src = typeof file === "string" ? file : file?.url;
            return (
              <div key={index} className="relative">
                <img
                  src={src}
                  alt={file?.name || `Image ${index}`}
                  className="object-cover w-[150px] h-[150px] sm:w-[164px] sm:h-[164px] rounded-xl"
                />
                <div
                  onClick={() => handleDeleteImage(index)}
                  className="bg-white/80 absolute right-2 top-2 p-1 rounded-full cursor-pointer"
                >
                  <SvgIcon
                    name={"close"}
                    color={"black"}
                    height={24}
                    width={24}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </Form>
    </Drawer>
  );
}

export default EditInfo;
