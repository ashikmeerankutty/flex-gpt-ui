import { Box, SkeletonLoader } from "@twilio-paste/core";
import { FC } from "react";

interface DataLoaderProps {
  n?: number;
}

export const DataLoader: FC<DataLoaderProps> = ({ n = 5 }) => {
  const skeletons = Array.from(Array(n).keys());

  return (
    <>
      {skeletons.map((s) => (
        <Box marginY="space30" key={s}>
          <SkeletonLoader height="30px" width="100%" />
        </Box>
      ))}
    </>
  );
};
