import RouteFinishNotifier from "../ui/route-finish-notifier";
import PageHeader from "../ui/backend/page-header";
import UserTable from "../ui/backend/user-table";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import { queryUsersByName } from "../lib/query";
import { TableUser } from "../lib/definition";

export default async function Members({ searchParams }: { searchParams: any }) {
  // 请求用户列表
  const users = await queryUsersByName((await searchParams).query || "");
  users.map((item) => {
    if (!item.description || item.description === "") {
      item.description = "这个人没有描述";
    }
  });
  const tableUsers: TableUser[] = users.map((user) => {
    return {
      id: user.id,
      baseInfo: {
        avatarSrc: user.avatar_src,
        name: user.name,
        nickName: user.nick_name,
        description: user.description,
      },
      department: user.department,
      role: user.role,
      group: {
        groupName: user.group_name,
        direction: user.direction,
      },
    };
  });

  return (
    <>
      <RouteFinishNotifier />
      <PageHeader title="成员列表" />
      <Suspense
        fallback={
          <div className="flex justify-center gap-1 mt-8">
            <Loader2 className="animate-spin" />
            <p>加载中，请稍后</p>
          </div>
        }
      >
        <UserTable data={tableUsers} />
      </Suspense>
    </>
  );
}
