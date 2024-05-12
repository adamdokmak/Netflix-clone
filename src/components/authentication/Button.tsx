import { ImSpinner2 } from "react-icons/im";
import cn from "@/cn";

export default function Button({
  loading,
  className,
  cta,
}: {
  loading?: boolean;
  className?: string;
  cta?: string;
}) {
  return (
    <>
      {loading ? (
        <button
          className={cn(
            "flex w-full items-center justify-center rounded bg-[#e50914] py-3 font-semibold",
            className,
          )}
        >
          <ImSpinner2 className="h-6 w-6 animate-spin" />
        </button>
      ) : (
        <button
          className={cn(
            "w-full rounded bg-[#e50914] py-3 font-semibold capitalize",
            className,
          )}
        >
          {cta || "sign in"}
        </button>
      )}
    </>
  );
}
