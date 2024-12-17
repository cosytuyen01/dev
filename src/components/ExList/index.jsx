import useWork from "../../hook/useWork";
import ExperienceCard from "../experienceCard";
import dayjs from "dayjs";

function ExperienceList() {
  const { work } = useWork();

  const sortedData = work.sort((a, b) => {
    // So sánh `startDate` của 2 đối tượng
    const dateA = dayjs(a.date.startDate, "MM/YYYY");
    const dateB = dayjs(b.date.startDate, "MM/YYYY");

    return dateB.isBefore(dateA) ? -1 : 1; // Nếu dateB < dateA, b đứng trước
  });

  return (
    <div className=" flex flex-col gap-4">
      <h2 className="text-[32px] font-semibold text-gray-800 dark:text-white/80">
        Kinh nghiệm
      </h2>
      <div className="flex flex-col gap-4">
        {sortedData.map((job, index) => (
          <ExperienceCard key={index} job={job} />
        ))}
      </div>
    </div>
  );
}

export default ExperienceList;
