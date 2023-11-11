import React from "react"
import { Button, Card, Skeleton } from "@nextui-org/react"

export default function PlayerListLoading({ count }: { count: number }) {
  return (
    <>
      {/* {Array.from(Array(count).keys()).map((idx) => (
        <Card key={`loading-${idx}`} className="space-y-5 p-4" radius="lg">
          <div className="space-y-3">
            <Skeleton className="w-3/5 rounded-lg">
              <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
            </Skeleton>
            <Skeleton className="w-4/5 rounded-lg">
              <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
            </Skeleton>
            <Skeleton className="w-2/5 rounded-lg">
              <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
            </Skeleton>
          </div>
          <Skeleton className="rounded-lg w-full">
            <div className="w-full aspect-video rounded-lg bg-default-300"></div>
          </Skeleton>
        </Card>
      ))} */}
      <div className="col-span-full w-full flex justify-center items-center">
        <Button variant="faded" isLoading></Button>
      </div>
    </>
  )
}
