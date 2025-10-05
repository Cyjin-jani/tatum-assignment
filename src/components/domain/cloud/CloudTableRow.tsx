import { Cloud } from '@/types';
import { TableCell, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { CloudBadge } from './CloudBadge';
import { EditCloudButton } from './EditCloudButton';

interface CloudTableRowProps {
  cloud: Cloud;
}

export function CloudTableRow({ cloud }: CloudTableRowProps) {
  return (
    <TableRow key={cloud.id}>
      <TableCell className="font-medium">{cloud.provider}</TableCell>
      <TableCell>{cloud.name}</TableCell>
      <TableCell>{cloud.cloudGroupName?.join(', ')}</TableCell>
      <TableCell>***.***.***</TableCell>
      <TableCell>***-***-***</TableCell>
      <TableCell>
        <CloudBadge type="status" isEnabled={cloud.eventProcessEnabled} />
      </TableCell>
      <TableCell>
        <CloudBadge type="event" isEnabled={cloud.eventProcessEnabled} />
      </TableCell>
      <TableCell>{cloud.scheduleScanEnabled ? 'Set' : 'Not Set'}</TableCell>
      <TableCell>
        <CloudBadge type="monitoring" isEnabled={cloud.userActivityEnabled} />
      </TableCell>
      <TableCell>
        <CloudBadge type="monitoring" isEnabled={cloud.userActivityEnabled} />
      </TableCell>
      <TableCell>adr***</TableCell>
      <TableCell className="sticky right-0 z-10 bg-white">
        <div className="flex gap-2">
          <EditCloudButton cloudData={cloud} />
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
  );
}
