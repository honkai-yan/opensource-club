import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export default function RememberAutoLogin() {
  const [remember, setRemember] = useState(false);

  return (
    <Label htmlFor="remember">
      <Checkbox
        checked={remember}
        onCheckedChange={(checked) => {
          localStorage.setItem("remember", checked ? "true" : "false");
          setRemember(checked as boolean);
        }}
        name="remember"
        id="remember"
        className="border-black"
      />
      7天内自动登录
    </Label>
  );
}
