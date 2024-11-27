import ExperienceCard from "../experienceCard";

const jobs = [
  {
    title: "UIUX Designer & Mobile Developer",
    company: "Công ty cổ phần công nghệ DIP Holding",
    location: "TP. Nha Trang, Khánh Hòa",
    date: "11/2022 — Hiện tại",
    description: `Thiết kế web, app CRM cho cty\nThiết kế các App, Web quản lý tòa nhà, cư dân, booking,...\nThiết kế App Vime giải pháp nông nghiệp\nXây dựng hệ thống Design system\nThiết kế Bộ nhận diện chuỗi hệ thống siêu thị Vime Agrimart\nThiết kế các bảng hiệu, banner, thư mời, banner web,...\nLập trình ứng dụng di động (React native)`,
    logo: "https://i.ibb.co/HTyjgFj/logo.png",
  },
  {
    title: "UX/UI Designer",
    company: "WORLD CONNECT",
    location: "Quận 7, TP. Hồ Chí Minh",
    date: "08/2022 - 11/2022",
    description: `Thiết kế sàn thương mai điện tử B2B ( Web, app mobile)
                  Thiết kế admin quản lý hệ thống`,
    logo: "https://i.ibb.co/QddkY9x/wct-logo.webp",
  },
  {
    title: "UI/UX Designer",
    company: "HANET Technology",
    location: "Quận 7, TP. Hồ Chí Minh",
    date: "11/2021 - 8/2022",
    description: `Nhận ý tưởng từ PM, lên wireframe.
Thiết kế Web chấm công HANET
App HANET Karaoke
App Camera.
Nghiên cứu phân tích hành vi người dùng
Xây dựng hệ thống Design system
Thiết kế UX, UI theo xu hướng.
Hỗ trợ  team dev fix lỗi UI`,
    logo: "https://i.ibb.co/txQqcdp/image.png",
  },
];

function ExperienceList() {
  return (
    <div className=" flex flex-col gap-4">
      <h2 className="text-[32px] font-semibold text-gray-800 dark:text-white/80">
        Kinh nghiệm
      </h2>
      <div className="flex flex-col gap-4">
        {jobs.map((job, index) => (
          <ExperienceCard key={index} job={job} />
        ))}
      </div>
    </div>
  );
}

export default ExperienceList;
