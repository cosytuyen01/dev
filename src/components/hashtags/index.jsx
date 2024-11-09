
const hashtags = ["#Figma", "#Mobile App", "#React Naitve", "#Development", "#ReactJs", "#Web Design","#Ai","#Graphic"];

const HashtagList = () => {
  return (
    <div className="flex flex-wrap gap-2 w-full justify-center sm:justify-start">
      {hashtags.map((tag, index) => (
        <span
          key={index}
          className="px-3 py-1 bg-subBackground dark:bg-darkSubbg dark:text-white/80 rounded-full text-gray-700 text-[16px] font-medium"
        >
          {tag}
        </span>
      ))}
    </div>
  );
};

export default HashtagList;
