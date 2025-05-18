import PageHeader from "@/app/ui/backend/page-header";
import RouteFinishNotifier from "@/app/ui/route-finish-notifier";

export default function My() {
  return (
    <>
      <RouteFinishNotifier />
      <PageHeader title="我的" />
    </>
  );
}
