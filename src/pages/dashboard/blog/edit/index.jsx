/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Button, Drawer, Form, Input, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";
import supabase from "../../../../supabaseClient";
import SvgIcon from "../../../../assets/iconSvg";
import Loading from "../../../../components/loading";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";

function EditBlog({ isOpen, onClose, data, onSave, onDelete }) {
  const [form] = Form.useForm();
  const [uploading, setUploading] = useState(false); // Trạng thái tải ảnh
  const [fileList, setFileList] = useState([]); // Quản lý danh sách file
  const [previewImage, setPreviewImage] = useState(""); // Lưu ảnh preview từ thiết bị
  const editorRef = useRef(null);
  const [editor, setEditor] = useState(null);

  console.log("data", data);

  useEffect(() => {
    if (isOpen && !editor) {
      const editorInstance = new EditorJS({
        holder: editorRef.current,
        placeholder: "Nhập mô tả...",
        tools: {
          header: {
            class: Header,
            inlineToolbar: true,
          },
          list: {
            class: List,
            inlineToolbar: true,
          },
        },
        data: data?.desc || {}, // Nạp dữ liệu vào Editor.js
      });
      setEditor(editorInstance);
    }

    return () => {
      if (onClose) {
        editor?.destroy(); // Hủy editor khi không còn sử dụng
        setEditor(null); // Reset editor khi component bị unmount
      }
    };
  }, [isOpen, data?.desc]); // Thêm `data.desc` vào dependency để khi dữ liệu `desc` thay đổi sẽ reload editor

  useEffect(() => {
    form.setFieldsValue({
      title: data?.title || "",
      thumb: data?.thumb || "",
      desc: data?.desc || {},
    });
  }, [data, form]);

  useEffect(() => {
    setPreviewImage(data?.thumb);
  }, [isOpen]);

  const onFinish = async (values) => {
    let updatedInfo = { ...data, ...values };
    setUploading(true); // Bắt đầu trạng thái loading

    try {
      // Lưu nội dung từ EditorJS vào desc
      const editorData = await editor.save(); // Lưu nội dung từ EditorJS
      updatedInfo.desc = editorData; // Gắn giá trị editorData vào desc

      // Upload ảnh đại diện nếu có
      if (Array.isArray(fileList) && fileList.length > 0) {
        const file = fileList[0].originFileObj;
        const fileName = `${Date.now()}-${Math.random()
          .toString(36)
          .substr(2, 9)}`;
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("image")
          .upload(fileName, file, { cacheControl: "3600", upsert: false });

        if (uploadError) {
          throw new Error(`Error uploading thumb: ${uploadError.message}`);
        }
        const publicURL = `https://fcijucimrhbtywyadqlb.supabase.co/storage/v1/object/public/image/${fileName}`;
        updatedInfo.thumb =
          data?.thumb === previewImage ? previewImage : publicURL;
      } else if (!data?.thumb) {
        // Nếu không có thumb cũ và cũng không có thumb mới
        throw new Error("Thumb is required but not provided.");
      }

      // Gọi hàm onSave với thông tin đã cập nhật
      onSave(updatedInfo);
      message.success("Cập nhật bài viết thành công!");
    } catch (error) {
      console.error("Error during upload process:", error.message);
      message.error(`Error: ${error.message}`);
    } finally {
      setUploading(false); // Kết thúc trạng thái loading
    }
  };

  const handleFileChange = ({ fileList }) => {
    setFileList(fileList.slice(-1)); // Chỉ giữ lại file cuối cùng

    if (fileList && fileList.length > 0) {
      const file = fileList[0].originFileObj;
      const previewUrl = URL.createObjectURL(file);
      setPreviewImage(previewUrl);
    } else {
      setPreviewImage(null);
    }
  };

  return (
    <Drawer
      title={data?.id ? "Chỉnh sửa bài viết" : "Thêm bài viết"}
      width={600}
      onClose={onClose}
      open={isOpen}
      extra={
        <div className="flex gap-2 ">
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
          thumb: data?.thumb || "",
          desc: data?.desc || {},
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
            <div className="bg-black/5 relative  w-[150px] h-[150px] sm:w-[164px] sm:h-[164px] rounded-xl">
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
          label="Tiêu đề"
          name="title"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên sản phẩm!",
            },
          ]}
        >
          <Input placeholder="Nhập tiêu đề blog" />
        </Form.Item>

        <Form.Item
          label="Mô tả"
          name="desc"
          rules={[
            {
              required: false,
              message: "Vui lòng nhập mô tả ngắn về bản thân!",
            },
          ]}
        >
          <div
            className="ant-input p-2 overflow-auto border rounded-md"
            ref={editorRef}
          />
        </Form.Item>
      </Form>
    </Drawer>
  );
}

export default EditBlog;
