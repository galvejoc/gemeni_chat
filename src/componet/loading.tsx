
interface LoadingProps {
  isLoading: boolean;
}

export function Loading({ isLoading }: LoadingProps) {
  return (
    isLoading ? <div>Loanding</div> :
      <></>
  )
}
