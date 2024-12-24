import { useNavigate } from "react-router-dom";
import ProductCard from "../productCard";
import useProducts from "../../hook/useProducts";

// eslint-disable-next-line react/prop-types
const ProductCardList = ({ isHome, activeTab }) => {
  const navigate = useNavigate();
  const handleCardClick = (id) => {
    navigate(`/detail/${id}`);
  };
  const { products } = useProducts();

  const filteredProducts = products?.filter(
    (product) => activeTab === "All" || product.category === activeTab
  );
  const displayedProducts = isHome ? products.slice(0, 4) : products;

  return (
    <div className="flex flex-col">
      {isHome && (
        <h2 className="text-start w-full mb-6 text-[32px] font-semibold text-gray-800 dark:text-white/80">
          Projects
        </h2>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Hiển thị Skeleton Loading hoặc sản phẩm thật */}
        {products?.map((product, index) => (
          <div key={index} className="relative">
            <ProductCard
              key={product.id}
              imageSrc={product.thumb}
              title={product.name}
              category={product.category}
              onClick={() => handleCardClick(product.id)}
            />
          </div>
        ))}
      </div>

      {/* {isHome && (
        <div className="flex justify-center items-center w-full">
          <button
            onClick={() => navigate("/projects")}
            className="font-medium transition-all px-4 py-2 text-gray-500 hover:text-gray-700 dark:text-white/90 bg-subBackground dark:bg-darkSubbg rounded-3xl dark:hover:bg-darkSubbg/50 mt-8"
          >
            Xem tất cả
          </button>
        </div>
      )} */}
    </div>
  );
};

export default ProductCardList;
