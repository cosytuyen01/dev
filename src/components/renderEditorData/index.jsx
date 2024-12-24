import SvgIcon from "../../assets/iconSvg";
import "./style.css";

const RenderEditorData = ({ editorData }) => {
  if (!editorData || !editorData?.blocks) {
    return <p>Không có dữ liệu để hiển thị</p>; // Tránh lỗi nếu không có data
  }

  // Hàm để thay thế thẻ <a> trong văn bản với màu sắc cho liên kết
  const renderTextWithLinks = (text) => {
    // Tìm tất cả các thẻ <a> trong text và gắn màu cho chúng
    return text.replace(/<a href="([^"]+)">([^<]+)<\/a>/g, (match, p1, p2) => {
      // Gắn style trực tiếp cho thẻ <a> để thay đổi màu sắc
      return `<a href="${p1}" style="color: #6F6ADC; " target="_blank">${p2}</a>`;
    });
  };

  return editorData.blocks?.map((block) => {
    switch (block.type) {
      case "paragraph":
        return (
          <p
            className="text-[16px] sm:text-[24px]"
            key={block.id || Math.random()} // Dùng id nếu có, nếu không tạo ngẫu nhiên
            dangerouslySetInnerHTML={{
              __html: renderTextWithLinks(block.data.text),
            }}
          />
        );

      case "header":
        return (
          <h2
            className="text-[16px] sm:text-[24px]"
            key={block.id || Math.random()} // Dùng id nếu có, nếu không tạo ngẫu nhiên
            dangerouslySetInnerHTML={{
              __html: renderTextWithLinks(block.data.text),
            }}
          />
        );

      case "list":
        if (block.data.style === "checklist") {
          // Hiển thị checklist (danh sách có checkbox)
          return (
            <ul key={block.id || Math.random()} className="checklist">
              {block.data.items.map((item, index) => (
                <li
                  key={item.content || index}
                  className={
                    item.meta.checked
                      ? "text-black/80 dark:text-white/80"
                      : "text-black/50 dark:text-white/50"
                  }
                >
                  <SvgIcon
                    name={"done"}
                    height={20}
                    width={20}
                    color={item.meta.checked ? "#6F6ADC" : "gray"}
                  />
                  <span
                    className="text-[16px] sm:text-[24px] ml-2"
                    dangerouslySetInnerHTML={{
                      __html: renderTextWithLinks(item.content),
                    }}
                  />
                </li>
              ))}
            </ul>
          );
        } else if (block.data.style === "ordered") {
          // Hiển thị danh sách có số (numeric list)
          return (
            <ol key={block.id || Math.random()}>
              {block.data.items.map((item, index) => (
                <li
                  className="text-[16px] sm:text-[24px]"
                  key={item.content || index}
                  dangerouslySetInnerHTML={{
                    __html: renderTextWithLinks(item.content),
                  }}
                />
              ))}
            </ol>
          );
        } else {
          // Hiển thị danh sách không có số (unordered list)
          return (
            <ul key={block.id || Math.random()}>
              {block.data.items.map((item, index) => (
                <li
                  className="text-[16px] sm:text-[24px]"
                  key={item.content || index}
                  dangerouslySetInnerHTML={{
                    __html: renderTextWithLinks(item.content),
                  }}
                />
              ))}
            </ul>
          );
        }

      default:
        return null;
    }
  });
};

export default RenderEditorData;
