interface PlusProps extends React.SVGProps<SVGSVGElement> {}

export function Plus({ ...props }: PlusProps): JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-plus "
      {...props}
    >
      <path d="M5 12h14M12 5v14" />
    </svg>
  )
}
