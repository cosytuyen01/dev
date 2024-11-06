
const hashtags = ["#Figma", "#Framer", "#ProductDesign", "#Development"];

const HashtagList = () => {
  return (
    <div className="flex flex-wrap gap-2 w-full">
      {hashtags.map((tag, index) => (
        <span
          key={index}
          className="px-3 py-1 bg-subBackground rounded-full text-gray-700 text-[16px] font-medium"
        >
          {tag}
        </span>
      ))}
    </div>
  );
};

export default HashtagList;
