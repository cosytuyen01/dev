import { useNavigate } from "react-router-dom";
import ProductCard from "../productCard";

// eslint-disable-next-line react/prop-types
const ProductCardList = ({ isHome }) => {
  const products = [
    {
      imageSrc:
        "https://framerusercontent.com/images/IRgQk69NC78yRiIYTyduEsByw0.jpeg?scale-down-to=512",
      title: "Glowella",
      category: "Web Design & Development",
    },
    {
      imageSrc:
        "https://framerusercontent.com/images/x1x6Hs6FGm9QfHFZMth5nvX1Io.jpeg?scale-down-to=512",
      title: "Modish",
      category: "Web Design & Development",
    },
    {
      imageSrc:
        "https://framerusercontent.com/images/TdPO36TH2m934cSG2slS7ahhhA.png?scale-down-to=512",
      title: "Modish",
      category: "Web Design & Development",
    },
    {
      imageSrc:
        "https://framerusercontent.com/images/Y0bAZGGKYzFegDqL7py4UWvFw.png?scale-down-to=512",
      title: "Modish",
      category: "Web Design & Development",
    },
    {
      imageSrc:
        "https://framerusercontent.com/images/x1x6Hs6FGm9QfHFZMth5nvX1Io.jpeg?scale-down-to=512",
      title: "Modish",
      category: "Web Design & Development",
    },
    {
      imageSrc:
        "https://framerusercontent.com/images/8jPglXKcPZccqMboFmQBHyOWg.jpeg?scale-down-to=512",
      title: "Modish",
      category: "Web Design & Development",
    },
    {
      imageSrc:
        "https://cdn.dribbble.com/userupload/17397031/file/original-d7322cf388762658994b45e36772b6db.png?resize=450x338&vertical=center",
      title: "Modish",
      category: "Web Design & Development",
    },
    {
      imageSrc:
        "https://cdn.dribbble.com/userupload/17451460/file/original-3acc772f5b8fe3159a6935609fd26aa6.png?resize=450x338&vertical=center",
      title: "Modish",
      category: "Web Design & Development",
    },
  ];

  const displayedProducts = isHome ? products.slice(0, 4) : products;
  const navigate = useNavigate();
  return (
    <div className="flex flex-col">
      {isHome && (
        <h2 className="text-start w-full mb-6 text-[32px] font-semibold text-gray-800 dark:text-white/80">
          Projects
        </h2>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {displayedProducts.map((product, index) => (
          <ProductCard
            key={index}
            imageSrc={product.imageSrc}
            title={product.title}
            category={product.category}
          />
        ))}
      </div>
      {isHome && (
       <div className="flex justify-center items-center w-full">
         <button
          onClick={() => navigate("/projects")}
          className="font-medium transition-all px-4 py-2 text-gray-500 hover:text-gray-700 dark:text-white/90 bg-subBackground dark:bg-darkSubbg  rounded-3xl  dark:hover:bg-darkSubbg/50 mt-8"
        >
          View All
        </button>
       </div>
      )}
    </div>
  );
};

export default ProductCardList;
