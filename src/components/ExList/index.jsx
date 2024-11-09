import ExperienceCard from "../experienceCard";

const jobs = [
  {
    title: 'Senior Product Designer',
    company: 'TechXperience Inc.',
    location: 'New York, USA',
    date: 'Feb. 2016 — Today',
    description: 'Spearheaded the design team, overseeing the development of cutting-edge user interfaces for a range of tech products, resulting in a 25% increase in user engagement.',
    icon: 'https://via.placeholder.com/40?text=1'
  },
  {
    title: 'UX/UI Designer',
    company: 'CreativeSolutions Co.',
    location: 'New York, USA',
    date: 'Jan. 2014 — Feb. 2016',
    description: 'Spearheaded the design team, overseeing the development of cutting-edge user interfaces for a range of tech products, resulting in a 25% increase in user engagement.',
    icon: 'https://via.placeholder.com/40?text=2'
  },
  {
    title: 'Freelance Product Designer',
    company: 'Freelance Design Studio',
    location: 'New York, USA',
    date: 'Jan. 2012 — Feb. 2014',
    description: 'Spearheaded the design team, overseeing the development of cutting-edge user interfaces for a range of tech products, resulting in a 25% increase in user engagement.',
    icon: 'https://via.placeholder.com/40?text=3'
  }
];

function ExperienceList() {
  return (
    <div className=" flex flex-col gap-4">
       <h2 className="text-[32px] font-semibold text-gray-800 dark:text-white/80">
       Experience
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
