import { Cloud } from '@/types';
import { Table, TableBody } from '@/components/ui/table';
import { CloudTableHeader } from './CloudTableHeader';
import { CloudTableRow } from './CloudTableRow';

interface CloudTableProps {
  clouds: Cloud[];
}

export function CloudTable({ clouds }: CloudTableProps) {
  return (
    <div className="w-full">
      <Table>
        <CloudTableHeader />
        <TableBody>
          {clouds.map(cloud => (
            <CloudTableRow key={cloud.id} cloud={cloud} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
