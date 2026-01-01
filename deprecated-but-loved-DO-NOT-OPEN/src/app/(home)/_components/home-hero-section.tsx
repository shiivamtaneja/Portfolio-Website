import Description from "./home-description";

const HeroSection = () => {
  return (
    <>
      <div className="h-svh sticky top-0 flex justify-center items-center z-[-1]">
        <Description />
      </div>
      <div className="h-svh"></div>
    </>
  );
};

export default HeroSection;