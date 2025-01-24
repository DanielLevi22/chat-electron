interface SmileProps extends React.SVGProps<SVGSVGElement> {}

export function Smile({ ...props }: SmileProps): JSX.Element {
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
      className="lucide lucide-smile"
      {...props}
    >
      <circle cx={12} cy={12} r={10} />
      <path d="M8 14s1.5 2 4 2 4-2 4-2" />
      <path d="M9 9L9.01 9" />
      <path d="M15 9L15.01 9" />
    </svg>
  )
}
