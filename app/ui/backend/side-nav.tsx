import clsx from "clsx";

export default function SideNav({ show }: { show: boolean }) {
  return (
    <div
      className={clsx({
        "w-screen h-screen p-4 bg-white/40 backdrop-blur-sm flex flex-col gap-1 items-center fixed left-0 top-0 z-10 duration-300 md:w-[250px] md:bg-gray-100 md:static md:translate-x-0":
          true,
        "translate-x-[100%]": !show,
      })}
    >
      <div className="w-full h-fit mb-2 flex justify-center items-center relative">
        <img src="/logo.png" className="w-full max-w-[150px] object-contain" />
      </div>
    </div>
  );
}
