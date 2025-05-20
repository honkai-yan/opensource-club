"use client";

import { PackageOpenIcon } from "lucide-react";
import SearchMember from "./search-member";
import { ColumnDef, useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";
import { TableUser, TableUserBaseInfo, TableUserGroupInfo, User } from "@/app/lib/definition";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { useEffect, useMemo, useState } from "react";
import { adminRoles } from "@/app/lib/data";
import { useMediaQuery } from "@/app/lib/hooks";

export default function UserTable({ data, curUser }: { data: TableUser[]; curUser: User }) {
  const user = curUser;
  const isDesktop = useMediaQuery("(min-width: 768px)");
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

  const handleAddNewUser = () => {};

  const AddNewUser = isDesktop ? (
    <Dialog>
      <DialogTrigger asChild>
        <Button>新增成员</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>新增成员</DialogTitle>
          <DialogDescription>新增一个成员</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  ) : (
    <Drawer>
      <DrawerTrigger asChild>
        <Button>新增成员</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>新增成员</DrawerTitle>
          <DrawerDescription>新增一个成员</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">取消</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );

  return (
    <>
      <div className="flex mt-6 items-center gap-1 gap-y-2 flex-wrap">
        <SearchMember className="w-full max-w-[500px]" />
        {adminRoles.includes(user.role!) && (
          <>
            <Button>批量操作</Button>
            {AddNewUser}
          </>
        )}
      </div>
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
