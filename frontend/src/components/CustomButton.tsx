interface CustomButtonProps {
  onClick: () => void;
  text: string;
  variant?: "primary" | "secondary";
  icon?: string;
  className?: string;
}
export default function CustomButton({
  onClick,
  text,
  variant = "primary",
  icon,
  className,
}: CustomButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`${
        variant === "primary"
          ? "bg-primary-200 hover:bg-primary-200/70 "
          : "bg-primary-400 hover:bg-primary-400/70 text-black"
      } font-semibold py-1 px-6 rounded-xl text-lg flex items-center justify-center gap-4 transition-all duration-150 ${className}`}
    >
      <p>{text}</p>
      {icon && <img src={icon} alt="icon" className="w-5 h-5 object-contain" />}
    </button>
  );
}
