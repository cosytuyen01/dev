// src/components/Login.js
import { Form, Input, Button, Typography, message } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

function Login() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  );

  // Kiểm tra và chuyển hướng nếu đã đăng nhập
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard"); // Chuyển hướng đến dashboard nếu đã đăng nhập
    }
  }, [isAuthenticated, navigate]);

  // Xử lý khi form submit
  const onFinish = (values) => {
    const { username, password } = values;

    // Tài khoản mặc định
    const defaultUsername = "admin";
    const defaultPassword = "123456";

    // Kiểm tra thông tin đăng nhập
    if (username === defaultUsername && password === defaultPassword) {
      message.success("Login successful!");
      window.location.reload();
      localStorage.setItem("isAuthenticated", "true");
      setIsAuthenticated(true); // Cập nhật trạng thái xác thực và trigger lại useEffect
    } else {
      message.error("Invalid username or password!");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md h-full md:h-auto  pt-20">
        <Title level={2} className="text-center text-gray-700 dark:text-white">
          Login
        </Title>
        <Form
          name="login"
          layout="vertical"
          onFinish={onFinish}
          initialValues={{ remember: true }}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input placeholder="Enter your username" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full">
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Login;
