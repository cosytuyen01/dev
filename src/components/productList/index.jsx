import ProductCard from "../productCard";

// eslint-disable-next-line react/prop-types
const ProductCardList = ({isHome }) => {
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

  // Nếu isHome tồn tại, chỉ lấy 4 sản phẩm đầu tiên
  const displayedProducts = isHome ? products.slice(0, 4) : products;

  return (
    <div className="">
      {isHome && (
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-[32px] font-semibold text-gray-800 dark:text-white/80">Projects</h2>
          <button className="text-gray-500 hover:text-gray-700 dark:text-white/70">
            View All
          </button>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {displayedProducts.map((product, index) => (
          <ProductCard
            key={index}
            imageSrc={product.imageSrc}
            title={product.title}
            category={product.category}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductCardList;
