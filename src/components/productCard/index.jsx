
// eslint-disable-next-line react/prop-types
const ProductCard = ({ imageSrc, title, category }) => {
  return (
    <div className="w-full rounded-xl cursor-pointer">
      <div className="overflow-hidden rounded-xl">
        <img
          src={imageSrc}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 ease-in-out transform hover:scale-110"
        />
      </div>
      <h3 className="mt-2 text-lg font-semibold text-textColor">{title}</h3>
      <p className="text-subText">{category}</p>
    </div>
  );
};

export default ProductCard;
