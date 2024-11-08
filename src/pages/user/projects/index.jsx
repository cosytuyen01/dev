import InfoPage from "../../../components/infoPage";
import ProductCardList from "../../../components/productList";
import Tabs from "../../../components/tabs";

function Projects() {
  return (
    <div className="pt-16 mx-auto pb-10 px-4 sm:px-6 lg:px-8 w-full lg:w-[752px] h-[100%]">
      <InfoPage
        title={"Projects"}
        desc={
          "Fusing artistry and precision to bring unique design concepts to life in each project"
        }
      />
      <div className="pt-0 sm:pt-4 items-center">
        <div className="pb-4 items-center">
          <Tabs />
        </div>
        <ProductCardList />
      </div>
    </div>
  );
}

export default Projects;
