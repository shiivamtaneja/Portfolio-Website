"use client";

import React, { useState } from "react";

import Link from "next/link";

import { useQuery } from "@tanstack/react-query";

import { format } from "date-fns";

import { Chat } from "@/types/chats.types";

import SiteHeader from "@/components/admin/header";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye, ChevronLeft, ChevronRight } from "lucide-react";

const fetchChats = async (page: number, limit: number) => {
  const response = await fetch(`/api/chat?page=${page}&limit=${limit}`);

  if (!response.ok) throw new Error("Error fetching chats");

  return response.json();
};

const ChatsPage = () => {
  const [page, setPage] = useState(1);
  const limit = 10;

  const {
    data: chatsData,
    isLoading,
    isFetching,
  } = useQuery<{
    chats: Chat[];
    pagination: {
      total: number;
      totalPages: number;
      page: number;
      limit: number;
    };
  }>({
    queryKey: ["allChats", page, limit],
    queryFn: () => fetchChats(page, limit),
    retry: false,
    refetchOnWindowFocus: false,
  });

  return (
    <>
      <SiteHeader title="Chats" />

      <div className="flex flex-1 flex-col p-4 space-y-4">
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {(isLoading || isFetching) && (
                <TableRow>
                  {Array.from({ length: 3 }).map((_, idx) => (
                    <TableCell className="w-96 space-y-2" key={idx}>
                      <Skeleton className="h-2" />
                      <Skeleton className="h-2" />
                      <Skeleton className="h-2" />
                    </TableCell>
                  ))}
                </TableRow>
              )}

              {chatsData?.chats?.map((chat) => (
                <TableRow key={chat.chatId}>
                  <TableCell className="w-96">
                    {chat.title ?? "No Title"}
                  </TableCell>

                  <TableCell className="w-96">
                    {format(new Date(chat.createdAt), "PPpp")}
                  </TableCell>

                  <TableCell className="w-96">
                    <Link href={`/chat/${chat.chatId}`}>
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {chatsData?.pagination && chatsData.pagination.totalPages > 1 && (
          <div className="flex items-center justify-end space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((old) => Math.max(old - 1, 1))}
              disabled={page === 1}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>
            <div className="text-sm font-medium">
              Page {page} of {chatsData.pagination.totalPages}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                if (
                  chatsData.pagination &&
                  page < chatsData.pagination.totalPages
                ) {
                  setPage((old) => old + 1);
                }
              }}
              disabled={page >= chatsData.pagination.totalPages}
            >
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default ChatsPage;
