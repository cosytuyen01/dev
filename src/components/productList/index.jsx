import ProductCard from "../productCard";

const ProductCardList = () => {
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
  ];

  return (
    <div className="pt-16">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-[32px] font-semibold text-gray-800">Projects</h2>
        <button className="text-gray-500 hover:text-gray-700">View All</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {products.map((product, index) => (
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
