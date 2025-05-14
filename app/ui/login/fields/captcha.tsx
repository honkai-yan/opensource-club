import { Input } from "@/components/ui/input";

export default function Captcha({ url, onClick, ...props }: { url: string; onClick?: Function }) {
  return (
    <div className="flex h-9 gap-1">
      <Input placeholder="验证码" maxLength={4} {...props} className="border-black border-1 flex-1" />
      <div className="h-full w-[80px] bg-gray-300 rounded-md overflow-hidden cursor-pointer" onClick={onClick as any}>
        {url && (
          <img
            id="captcha"
            fetchPriority="high"
            decoding="async"
            className="w-full h-full object-cover"
            src={url}
            alt="验证码加载失败"
          />
        )}
      </div>
    </div>
  );
}
