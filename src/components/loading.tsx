interface LoadingProps {
  isLoading: boolean;
}

export function Loading({ isLoading }: LoadingProps) {
  return (
    isLoading &&
    <div className="items-center flex justify-center text-3xl my-2 text-gray-600">
      <span>
        Loading
        <span className="loading-dots text-5xl inline-flex gap-2 ml-2">
          <span className="dot">.</span>
          <span className="dot">.</span>
          <span className="dot">.</span>
        </span>
      </span>
    </div>
  )
}
