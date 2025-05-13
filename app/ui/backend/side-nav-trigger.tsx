import clsx from "clsx";

export default function SideNavTrigger({ active, onClick }: { active: boolean; onClick?: () => void }) {
  const internalElmClass = "w-[40%] h-[2px] bg-black rounded-[2px] transform-gpu duration-300";

  return (
    <div
      onClick={onClick as any}
      className="md:hidden size-[40px] fixed z-20 right-4 top-4 flex flex-col gap-1 justify-center items-center duration-150 overflow-hidden active:*:bg-gray-400"
    >
      <div
        className={`${internalElmClass} ${clsx({
          "rotate-45 translate-y-[6px]": active,
        })}`}
      ></div>
      <div
        className={`${internalElmClass} ${clsx({
          "translate-x-[40px]": active,
        })}`}
      ></div>
      <div
        className={`${internalElmClass} ${clsx({
          "rotate-[-45deg] translate-y-[-6px]": active,
        })}`}
      ></div>
    </div>
  );
}
