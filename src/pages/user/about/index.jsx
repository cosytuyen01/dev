import { useEffect } from "react";
import InfoPage from "../../../components/infoPage";
import { useLocation } from 'react-router-dom';
import ExperienceList from "../../../components/ExList";
function About() {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
      }, [pathname]);
  return (
    <div className="pt-16 mx-auto pb-10 px-4 sm:px-6 lg:px-8 w-full lg:w-[752px] h-[100%]">
      <InfoPage
        title={"About"}
        desc={"The journey from imagination to reality."}
      />
      <div className="pt-0 sm:pt-4 flex flex-col items-center justify-center">
        <div className="flex flex-col sm:flex-row gap-4  w-full ">
          {/* Hình ảnh xe */}
          <div className="flex flex-1 items-end justify-end ">
            <img
              src="https://framerusercontent.com/images/vOJCaM2IY4ffjbALkynqxPB3n4.jpg?scale-down-to=1024"
              alt="Car"
              className="w-full h-[150px] sm:h-[174px]  object-cover rounded-l-3xl "
            />
          </div>

          {/* Hình ảnh người phụ nữ */}
          <div className="flex flex-[2] items-center justify-center">
            <img
              src="https://framerusercontent.com/images/nDlbFwftpGnUVLMk58lmywICJvo.jpg?scale-down-to=1024"
              alt="Woman"
              className="h-[400px] sm:h-[364px] w-full object-cover rounded-tl-3xl rounded-br-3xl"
            />
          </div>

          {/* Hình ảnh chú chó */}
          <div className="flex flex-1  justify-start">
            <img
              src="https://framerusercontent.com/images/3n1nhH74OM7nip83OVk8KWLaYM.jpg?scale-down-to=1024"
              alt="Dog"
              className="w-full h-[150px] sm:h-[174px] object-cover rounded-r-3xl"
            />
          </div>
        </div>
        <div className="flex flex-col gap-4 pt-8">
          <p className="text-[18px] sm:text-[24px] text-textLightPrimary text-center md:text-start dark:text-white/90">
            A visionary product designer with a passion for weaving intuitive
            and immersive user experiences. Adept at translating complex ideas
            into elegant solutions, I constantly push the envelope of design
            innovation, crafting products that not only captivate users but also
            seamlessly integrate into their lives. Driven by a deep
            understanding of user needs and emerging technologies, I thrive in
            collaborative environments, fostering open communication and
            cross-functional teamwork to bring even the most ambitious design
            concepts to life.
          </p>
          <div className="flex gap-2 flex-col sm:flex-row">
            <div className="text-subText text-[18px] sm:text-[24px] dark:text-white/60">
              UIUX & Development &bull; Tan Phu, HCM &bull;
            </div>
            <button className="text-[18px] sm:text-[24px] text-textLightPrimary text-center md:text-start dark:text-white/90">
             DownLoad CV
            </button>
          </div>
        </div>
      </div>
      <div className="pt-10">
      <ExperienceList/>
      </div>
    </div>
  );
}

export default About;
