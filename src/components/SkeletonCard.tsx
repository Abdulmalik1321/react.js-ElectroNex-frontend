import { Card } from "@/shadcn/ui/card";
import { Skeleton, SkeletonTow } from "@/shadcn/ui/skeleton";
// import { skeletonnon } from "../shadcn/ui/skeletonNegative";

export function SkeletonCard({ customClass = "" }: { customClass?: string }) {
  return (
    <div
      className={`flex flex-col space-y-3 xxs:w-full md:w-60 xxs:h-full md:h-[400px]  ${customClass}`}>
      <Skeleton
        className={`xxs:w-full md:w-60 h-full  flex flex-col justify-between relative  overflow-hidden ${customClass}`}>
        <Card className="xxs:w-full md:w-60 h-full  flex flex-col justify-between  p-4">
          <div className="bg-gradient-to-r from-transparent via-foreground opacity-15 to-transparent -translate-x-full animate-[shimmer_2s_infinite] h-full w-full absolute top-0 delay-1000"></div>
          <div className="flex flex-col items-left justify-center">
            <SkeletonTow className="xxs:h-36 md:h-48 w-full" />
            <div className="flex justify-center gap-1 mt-2 mb-2">
              {[...Array(4)].map((i, index) => {
                return (
                  <SkeletonTow
                    key={`SkeletonTow-${i}-${index}`}
                    className="h-3 w-3 border border-muted-foreground rounded-full block"
                  />
                );
              })}
            </div>
          </div>
          <div className="h-[40px] w-full flex justify-between items-center flex-col md:mt-3 xxs:mt-4 md:mb-0 xxs:mb-2">
            <SkeletonTow className="h-4 w-[80%]" />
            <SkeletonTow className="h-4 w-[60%]" />
            {/* <SkeletonTow className="h-4 w-[60%]" /> */}
          </div>
          <div className="flex justify-between items-center p-2">
            <SkeletonTow className="h-4 w-[30%]" />
            <SkeletonTow className="h-8 w-[38%]" />
          </div>
        </Card>
      </Skeleton>
    </div>
  );
}
