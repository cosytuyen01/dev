import { useNavigate } from "react-router-dom";
import ProductCard from "../productCard";
import useProducts from "../../hook/useProducts";
import Loading from "../loading";

// eslint-disable-next-line react/prop-types
const ProductCardList = ({ isHome, activeTab }) => {
  const navigate = useNavigate();
  const handleCardClick = (id) => {
    navigate(`/detail/${id}`);
  };
  const { products, loading } = useProducts();

  const filteredProducts = products?.filter(
    (product) => activeTab === "All" || product.category === activeTab
  );
  const displayedProducts = isHome ? products.slice(0, 4) : products;
  console.log("products", products);

  return (
    <>
      <div className="flex flex-col h-full">
        {isHome && (
          <h2 className="text-start w-full mb-6 text-[32px] font-semibold text-gray-800 dark:text-white/80">
            Sản phẩm
          </h2>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {(isHome ? displayedProducts : filteredProducts)?.map(
            (product, index) => (
              <ProductCard
                key={index}
                loading={loading}
                imageSrc={product.thumb}
                title={product.name}
                category={product.category}
                onClick={() => handleCardClick(product.id)}
              />
            )
          )}
        </div>
        {isHome && (
          <div className="flex justify-center items-center w-full">
            <button
              onClick={() => navigate("/projects")}
              className="font-medium transition-all px-4 py-2 text-gray-500 hover:text-gray-700 dark:text-white/90 bg-subBackground dark:bg-darkSubbg  rounded-3xl  dark:hover:bg-darkSubbg/50 mt-8"
            >
              Xem tất cả
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductCardList;
