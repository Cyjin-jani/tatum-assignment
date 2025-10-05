import { TableHead, TableHeader, TableRow } from '@/components/ui/table';

export function CloudTableHeader() {
  return (
    <TableHeader>
      <TableRow className="hover:bg-transparent">
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
        <TableHead className="sticky right-0 z-10 bg-white">Actions</TableHead>
      </TableRow>
    </TableHeader>
  );
}
