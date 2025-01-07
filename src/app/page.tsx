import CustomWrapper from '@/components/custom-wrapper';
import AboutMeSection from '@/components/home/about-me';
import ExperienceSection from '@/components/home/experience';
import OpenSourceContributionSection from '@/components/home/open-source-contribution';
import SideProjectsSection from '@/components/home/side-projects';

export default function Home() {
  return (
    <CustomWrapper>
      <AboutMeSection />
      <ExperienceSection />
      <SideProjectsSection />
      <OpenSourceContributionSection />
    </CustomWrapper>
  );
}
