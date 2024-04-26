import getChangeLogData from '@/utils/getChangeLogData';

import RenderData from './_components/RenderData';

const page = async () => {
  const data = await getChangeLogData();

  return (
    <RenderData data={data} />
  );
};

export default page;