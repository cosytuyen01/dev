import { useState } from "react";
import ButtonComponent from "../../../components/button";
import CardProduct from "../../../components/cardProduct";
import { PlusOutlined } from "@ant-design/icons";
import { Button, message } from "antd";
import useProducts from "../../../hook/useProducts";
import EditProduct from "../product/edit";
import Loading from "../../../components/loading";

export default function ProductPage() {
  const [activeTab, setActiveTab] = useState("All");
  const categories = ["All", "Website", "Mobile"];
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(null);
  const {
    products,
    loading,
    updateProduct,
    addProduct,
    deleteProduct,
    fetchProducts,
  } = useProducts();

  const handleEdit = (data) => {
    setOpen(true);
    setData(data);
  };
  const handleDelete = async () => {
    try {
      await deleteProduct(data.id);
      message.success("Xóa sản phẩm thành công");
      setOpen(false);
      fetchProducts();
    } catch (err) {
      message.error("Có lỗi khi xóa kỹ năng", err); // Thông báo lỗi nếu có
    }
  };
  const handleSave = async (product) => {
    try {
      (await data?.id) ? updateProduct(product) : addProduct(product);
      setOpen(false);
      message.success("Thêm sản phẩm thành công!");
    } catch (err) {
      console.error("Failed to save info:", err.message);
    }
  };
  const onCloseAdd = () => {
    setOpen(false);
    setData(null);
  };
  const filteredProducts =
    activeTab === "All"
      ? products
      : products.filter((product) => product.category === activeTab);
  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-col w-full p-4 gap-4">
        <div className="flex flex-row  items-center gap-4">
          <h1 className="font-bold text-white/90 text-2xl ">
            Danh sách sản phẩm
          </h1>
          <Button
            onClick={() => setOpen(true)}
            type="primary"
            shape="circle"
            icon={<PlusOutlined />}
          />
        </div>
        <div className="flex gap-4">
          {categories.map((tab, index) => (
            <ButtonComponent
              key={index}
              text={tab}
              style={{
                background: activeTab === tab ? "#6F6ADC" : "",
              }}
              textStyle={{
                color: activeTab === tab ? "#fff" : "var(--subTextDark)",
              }}
              onClick={() => setActiveTab(tab)}
            />
          ))}
        </div>
      </div>
      {loading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-4 px-4 pb-10">
          {filteredProducts?.map((product, index) => (
            <CardProduct
              key={index}
              title={product.name}
              category={product.category}
              description={product.description}
              imageSrc={product.thumb}
              onClick={() => handleEdit(product)}
            />
          ))}
        </div>
      )}

      <EditProduct
        isOpen={open}
        onClose={onCloseAdd}
        data={data}
        onSave={handleSave}
        onDelete={handleDelete}
      />
    </div>
  );
}
