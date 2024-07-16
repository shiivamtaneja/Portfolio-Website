'use client';

import Loader from "@/components/Loader";
import useLoadingStore from "@/store/loadingStore";

const template = ({ children }: { children: React.ReactNode }) => {
  const { isFirstLoad } = useLoadingStore();

  return (
    <>
      <Loader isFirstLoad={isFirstLoad} />

      {children}
    </>
  );
};

export default template;