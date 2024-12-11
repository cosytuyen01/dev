import { useState, useEffect } from "react";
import supabase from "../supabaseClient";

const useProducts = () => {
  const [products, setProducts] = useState([]); // Lưu trữ sản phẩm
  const [loading, setLoading] = useState(true); // Trạng thái đang tải dữ liệu
  const [error, setError] = useState(null); // Lỗi khi lấy dữ liệu (nếu có)

  // Hàm fetch dữ liệu sản phẩm từ Supabase
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from("products").select("*");
      if (error) throw error;
      setProducts(data);
    } catch (err) {
      setError("Failed to fetch data from Supabase: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Hàm thêm sản phẩm mới
  const addProduct = async (newProduct) => {
    try {
      const { data, error } = await supabase
        .from("products")
        .insert([newProduct]);

      if (error) throw error;

      // Cập nhật lại danh sách sản phẩm sau khi thêm
      setProducts((prevProducts) => [...prevProducts, data[0]]);
    } catch (err) {
      setError("Failed to add product: " + err.message);
    }
  };

  // Hàm sửa thông tin sản phẩm
  const updateProduct = async (updatedProduct) => {
    try {
      const { data, error } = await supabase
        .from("products")
        .update(updatedProduct)
        .eq("id", updatedProduct.id); // Giả sử id là trường duy nhất để xác định sản phẩm

      if (error) throw error;

      // Cập nhật lại danh sách sản phẩm sau khi sửa
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === updatedProduct.id ? data[0] : product
        )
      );
    } catch (err) {
      setError("Failed to update product: " + err.message);
    }
  };

  // Hàm xóa sản phẩm
  const deleteProduct = async (productId) => {
    try {
      const { error } = await supabase
        .from("products")
        .delete()
        .eq("id", productId); // Xóa sản phẩm theo ID

      if (error) throw error;

      // Cập nhật lại danh sách sản phẩm sau khi xóa
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== productId)
      );
    } catch (err) {
      setError("Failed to delete product: " + err.message);
    }
  };

  // Fetch dữ liệu khi component được mount
  useEffect(() => {
    fetchProducts();
  }, []);

  return { products, loading, error, addProduct, updateProduct, deleteProduct };
};

export default useProducts;
