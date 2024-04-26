import GoHomeBtn from "@/components/GoHomeBtn";

import { roboto } from "@/utils/fonts";
import { ChangelogDataType } from "@/utils/getChangeLogData";

type GroupedDataType = {
  date: string,
  data: ChangelogDataType
}

const RenderData = ({
  data
}: {
  data: ChangelogDataType
}) => {

  const groupDataByDate = () => {
    const groupedData: GroupedDataType[] = [];

    data.forEach((commit) => {
      if (commit.commit.author?.date) {
        const commitDate = new Date(commit.commit.author.date).toLocaleDateString(undefined, {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        });

        const existingGroup = groupedData.find(group => group.date === commitDate);

        if (existingGroup) {
          existingGroup.data.push(commit);
        } else {
          groupedData.push({ date: commitDate, data: [commit] });
        }
      }
    });

    return groupedData.reverse();
  };

  const groupedData = groupDataByDate();

  return (
    <main className={`${roboto.className}`}>
      <section className=" flex flex-col gap-4">
        <div className="w-full border-b border-black/50 py-4 px-4 flex flex-col gap-2">
          <h1 className="font-medium text-heading-2">Changelog</h1>
          <div>
            <GoHomeBtn />
          </div>
        </div>

        <div className="px-4">
          {groupedData.map(({ data, date }, index) => (
            <div key={index} className="flex flex-col pb-4">
              <p className="text-body-3 flex flex-row items-center">
                <span className='h-2 w-2 rounded-full bg-dark-400 mr-4'></span>
                <span className="font-semibold mr-1">Changes on </span>
                <span className="text-mid-400">{date}</span>
              </p>

              <div className="pl-6 flex flex-col gap-2">
                {data.map(({ commit: { message } }, index) => (
                  <p key={index} className="changelog-message">{message}</p>
                ))}
              </div>

            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default RenderData;