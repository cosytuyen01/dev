import { useState } from "react";
import ButtonComponent from "../../../components/button";
import CardProduct from "../../../components/cardProduct";
import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import useProducts from "../../../hook/useProducts";
export default function ProductPage() {
  const [activeTab, setActiveTab] = useState("All");
  const categories = ["All", "Website", "Mobile"];
  const navigate = useNavigate();

  const { products, loading, error } = useProducts();

  const handleMenuClick = () => {
    navigate(`detail`);
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-col w-full p-4 gap-4">
        <div className="flex flex-row  items-center gap-4">
          <h1 className="font-bold text-white/90 text-2xl ">
            Danh sách sản phẩm
          </h1>
          <Button type="primary" shape="circle" icon={<PlusOutlined />} />
        </div>
        <div className="flex gap-4">
          {categories.map((tab, index) => (
            <ButtonComponent
              key={index}
              text={tab}
              style={{
                background: activeTab === tab ? "var(--primaryColor)" : "",
              }}
              textStyle={{
                color: activeTab === tab ? "#fff" : "var(--subTextDark)",
              }}
              onClick={() => setActiveTab(tab)}
            />
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-4 px-4 pb-10">
        {products?.map((product, index) => (
          <CardProduct
            key={index}
            title={product.name}
            category={product.category}
            description={product.description}
            url={product.image_url}
            onClick={handleMenuClick}
          />
        ))}
      </div>
    </div>
  );
}
