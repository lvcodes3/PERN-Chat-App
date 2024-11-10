export const MessageSkeleton = () => {
  return (
    <>
      <div className="flex items-center gap-3">
        <div className="skeleton w-10 h-10 shrink-0 rounded-full" />
        <div className="flex flex-col gap-1">
          <div className="skeleton w-40 h-4" />
          <div className="skeleton w-40 h-4" />
        </div>
      </div>

      <div className="flex justify-end items-center gap-3">
        <div className="flex flex-col gap-1">
          <div className="skeleton w-40 h-4" />
        </div>
        <div className="skeleton w-10 h-10 shrink-0 rounded-full" />
      </div>
    </>
  );
};
