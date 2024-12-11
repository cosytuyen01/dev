import { useState } from "react";
import ButtonComponent from "../../../components/button";
import CardProduct from "../../../components/cardProduct";
import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

export default function ProductPage() {
  const [activeTab, setActiveTab] = useState(1);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();

  const handleMenuClick = () => {
    navigate(`detail`);
  };

  console.log("Products:", products);
  console.log("Categories:", categories);

  return (
    <div className="flex flex-col">
      <div className="flex flex-col w-full p-4 gap-4">
        <div className="flex flex-row  items-center gap-4">
          <h1 className="font-bold text-textDarkPrimary text-2xl ">
            Danh sách sản phẩm
          </h1>
          <Button type="primary" shape="circle" icon={<PlusOutlined />} />
        </div>
        <div className="flex gap-4">
          {categories.map((tab) => (
            <ButtonComponent
              key={tab.id}
              text={tab.name}
              style={{
                background: activeTab === tab.id ? "var(--primaryColor)" : "",
              }}
              textStyle={{
                color: activeTab === tab.id ? "#fff" : "var(--subTextDark)", // Màu chữ thay đổi theo trạng thái
              }}
              onClick={() => setActiveTab(tab.id)}
            />
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-4 px-4 pb-10">
        {products?.map((product, index) => (
          <CardProduct
            key={index}
            title={product.title}
            category={product.category}
            description={product.description}
            url={product.thumbnail}
            onClick={handleMenuClick}
          />
        ))}
      </div>
    </div>
  );
}
