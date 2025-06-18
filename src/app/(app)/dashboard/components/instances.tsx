'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { PlusCircle, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { InstanceCard } from '../../components/instance-card'
import { useState } from 'react'
import { useListInstances } from '@/core/instance/instance.query'
import { useInfiniteScroll } from '@/hooks/use-infinite-scroll'
import { Skeleton } from '@/components/ui/skeleton'

export function Instances() {
  const [search, setSearch] = useState('')
  const infiniteInstances = useListInstances({
    page: 1,
    limit: 10,
    name: search.length > 0 ? search : undefined,
  })

  const {
    ref: refTriggerScroll,
    items: instances,
    estimate,
  } = useInfiniteScroll(infiniteInstances, 10)

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Virtual Machines</CardTitle>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search instances..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-8"
            />
          </div>
          <Link href="/instance/create">
            <Button className="flex items-center gap-1">
              <PlusCircle className="h-4 w-4" />
              New Instance
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden md:table-cell">
                  Operating System
                </TableHead>
                <TableHead className="hidden lg:table-cell">
                  Resources
                </TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {instances.map(instance => (
                <InstanceCard
                  key={instance.id}
                  id={instance.id}
                  name={instance.name}
                  os_id={instance.os_id}
                  arch_id={instance.arch_id}
                  cpu={instance.cpu}
                  ram={instance.ram}
                  storage={instance.storage}
                >
                </InstanceCard>
              ))}
              {Array.from({ length: estimate }).map((_, index) => (
                <TableRow key={index} className="animate-pulse">
                  <TableCell colSpan={5} className="">
                    <Skeleton className="h-14 w-full" />
                  </TableCell>
                </TableRow>
              ))}
              <TableRow ref={refTriggerScroll} />
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>

  )
}
