'use client';

import { Cloud } from '@/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface CloudTableProps {
  clouds: Cloud[];
}

export function CloudTable({ clouds }: CloudTableProps) {
  return (
    <div className="w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Provider</TableHead>
            <TableHead>Account</TableHead>
            <TableHead>Cloud Group</TableHead>
            <TableHead>Organization</TableHead>
            <TableHead>Account ID</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Event Process</TableHead>
            <TableHead>Scan Schedule</TableHead>
            <TableHead>Realtime Monitoring</TableHead>
            <TableHead>User Activity</TableHead>
            <TableHead>Created By</TableHead>
            <TableHead className="sticky right-0 z-10 bg-white">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clouds.map(cloud => (
            <TableRow key={cloud.id}>
              <TableCell className="font-medium">{cloud.provider}</TableCell>
              <TableCell>{cloud.name}</TableCell>
              <TableCell>{cloud.cloudGroupName?.join(', ')}</TableCell>
              <TableCell>***.***.***</TableCell>
              <TableCell>***-***-***</TableCell>
              <TableCell>
                <Badge
                  variant={
                    cloud.eventProcessEnabled ? 'default' : 'destructive'
                  }
                  className={`rounded-full border px-1.5 py-0.5 text-xs font-normal ${
                    cloud.eventProcessEnabled
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  {cloud.eventProcessEnabled ? 'READY' : 'ERROR'}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge
                  variant={cloud.eventProcessEnabled ? 'default' : 'secondary'}
                  className={`rounded-full border px-1.5 py-0.5 text-xs font-normal ${
                    cloud.eventProcessEnabled
                      ? 'bg-green-100 text-green-700'
                      : 'bg-orange-100 text-orange-700'
                  }`}
                >
                  {cloud.eventProcessEnabled ? 'VALID' : 'INVALID'}
                </Badge>
              </TableCell>
              <TableCell>
                {cloud.scheduleScanEnabled ? 'Set' : 'Not Set'}
              </TableCell>
              <TableCell>
                <Badge
                  variant="default"
                  className={`rounded-full px-1.5 py-0.5 text-xs font-normal ${
                    cloud.userActivityEnabled
                      ? 'border bg-blue-100 text-blue-700'
                      : 'bg-gray-50 text-gray-500'
                  }`}
                >
                  {cloud.userActivityEnabled ? 'ON' : 'OFF'}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge
                  variant="default"
                  className={`rounded-full px-1.5 py-0.5 text-xs font-normal ${
                    cloud.userActivityEnabled
                      ? 'border bg-blue-100 text-blue-700'
                      : 'bg-gray-50 text-gray-500'
                  }`}
                >
                  {cloud.userActivityEnabled ? 'ON' : 'OFF'}
                </Badge>
              </TableCell>
              <TableCell>adr***</TableCell>
              <TableCell className="sticky right-0 z-10 bg-white">
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="cursor-pointer border-blue-200 bg-blue-100 text-blue-700 transition-colors hover:border-blue-600 hover:bg-blue-600 hover:text-white"
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    className="cursor-pointer border-red-200 bg-red-100 text-red-700 transition-colors hover:border-red-600 hover:bg-red-600 hover:text-white"
                  >
                    Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
