import Link from "next/link";

export function footer() {
  return (
    <footer className="left-0 mb-8 right-0 flex w-full justify-center text-xs">
    <Link href={'https://github.com/galvejoc/tic-tac-toe'}>
      <span className="mx-2">
        Tic-Tac-Toe
      </span>
      <span className="mx-2">
        <strong className="mr-1">
          Creador:
        </strong>
        José Luis Galvez Denis
      </span>
    </Link>
  </footer >
  )
}
