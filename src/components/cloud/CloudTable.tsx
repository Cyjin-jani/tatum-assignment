import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Table, TableBody } from '@/components/ui/table';
import { ErrorFallback } from '@/components/shared/ErrorFallback';
import { CloudTableHeader } from './CloudTableHeader';
import { CloudTableRows } from './CloudTableRows';
import { CloudTableSkeleton } from './CloudTableSkeleton';

export function CloudTable() {
  return (
    <div className="w-full">
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Table>
          <CloudTableHeader />
          <TableBody>
            <Suspense fallback={<CloudTableSkeleton />}>
              <CloudTableRows />
            </Suspense>
          </TableBody>
        </Table>
      </ErrorBoundary>
    </div>
  );
}
