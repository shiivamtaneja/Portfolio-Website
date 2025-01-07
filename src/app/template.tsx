'use client';

import Loader from "@/components/loader";
import useLoadingStore from "@/store/loading-store";

const Template = ({ children }: { children: React.ReactNode }) => {
  const { isFirstLoad } = useLoadingStore();

  return (
    <>
      <Loader isFirstLoad={isFirstLoad} />

      {children}
    </>
  );
};

export default Template;