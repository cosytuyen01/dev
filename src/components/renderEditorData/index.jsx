import "./style.css";

const RenderEditorData = ({ editorData }) => {
  console.log("editorData", editorData); // Kiểm tra xem dữ liệu có đúng không

  if (!editorData || !editorData?.blocks) {
    return <p>Không có dữ liệu để hiển thị</p>; // Tránh lỗi nếu không có data
  }

  return editorData.blocks?.map((block) => {
    switch (block.type) {
      case "paragraph":
        return (
          <p
            key={block.id || Math.random()} // Dùng id nếu có, nếu không tạo ngẫu nhiên
            dangerouslySetInnerHTML={{ __html: block.data.text }}
          />
        );
      case "header":
        return (
          <h1
            key={block.id || Math.random()} // Dùng id nếu có, nếu không tạo ngẫu nhiên
            dangerouslySetInnerHTML={{ __html: block.data.text }}
          />
        );
      case "list":
        // Xử lý các kiểu danh sách (unordered, ordered, checklist)
        if (block.data.style === "checklist") {
          // Hiển thị checklist (danh sách có checkbox)
          return (
            <ul key={block.id || Math.random()} className="checklist">
              {block.data.items.map((item, index) => (
                <li
                  key={item.content || index}
                  className={item.meta.checked ? "checked" : ""}
                >
                  <input type="checkbox" checked={item.meta.checked} readOnly />
                  <span dangerouslySetInnerHTML={{ __html: item.content }} />
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
                  key={item.content || index}
                  dangerouslySetInnerHTML={{ __html: item.content }}
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
                  key={item.content || index}
                  dangerouslySetInnerHTML={{ __html: item.content }}
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
