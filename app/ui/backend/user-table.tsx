"use client";

import { PackageOpenIcon } from "lucide-react";
import SearchMember from "./search-member";
import { ColumnDef, useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";
import { TableUser, TableUserBaseInfo, TableUserGroupInfo } from "@/app/lib/definition";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/app/lib/store";
import { useMemo } from "react";
import { adminRoles } from "@/app/lib/data";

export default function UserTable({ data }: { data: TableUser[] }) {
  const { user } = useUserStore();
  const columns: ColumnDef<TableUser>[] = useMemo(() => {
    return [
      {
        accessorKey: "baseInfo",
        header: "成员基本信息",
        cell: ({ row }) => {
          const baseInfo = row.getValue("baseInfo") as TableUserBaseInfo;
          return (
            <div className="flex items-center gap-2">
              {baseInfo.avatarSrc ? (
                <Image src={baseInfo.avatarSrc} alt="avatar" width={32} height={32} className="rounded-full" />
              ) : (
                <div className="size-[32px] rounded-full bg-gray-500"></div>
              )}
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-1 max-w-[20ch] overflow-hidden text-ellipsis">
                  <span>{baseInfo.name}</span>
                  <span className="text-xs text-gray-500 max-w-[20ch] overflow-hidden text-ellipsis">
                    {baseInfo.nickName}
                  </span>
                </div>
                <p className="text-xs text-gray-500 max-w-[20ch] md:max-w-[40ch] overflow-hidden text-ellipsis">
                  {baseInfo.description}
                </p>
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: "department",
        header: "所在部门",
      },
      {
        accessorKey: "role",
        header: "职位",
      },
      {
        accessorKey: "group",
        header: () => {
          return <div className="flex justify-center">小组</div>;
        },
        cell: ({ row }) => {
          let { groupName, direction } = row.getValue("group") as TableUserGroupInfo;
          groupName = groupName ?? "未分组";
          return (
            <div className="flex gap-1 items-center justify-center">
              <span>{direction}</span>-<span>{groupName}</span>
            </div>
          );
        },
      },
      {
        id: "actions",
        cell: () => {
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary" className="h-8 w-8 p-0 flex justify-center items-center">
                  <img className="w-[50%]" src="/more.png" alt="" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>查看详细</DropdownMenuItem>
                {adminRoles.includes(user.role!) && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>编辑</DropdownMenuItem>
                    <DropdownMenuItem>
                      <span className="text-destructive">删除</span>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ];
  }, [data]);
  const table = useReactTable({
    data: data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <SearchMember />
      <Table className="mt-4">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {flexRender(header.isPlaceholder ? null : header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                <div className="flex gap-1 items-center justify-center">
                  <PackageOpenIcon />
                  <span>没有数据</span>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}
