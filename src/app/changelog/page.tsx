import getChangeLogData from '@/utils/getChangeLogData';
import RenderData from './_components/render-data';

const page = async () => {
  const data = await getChangeLogData();

  return (
    <RenderData data={data} />
  );
};

export default page;