import { TableCell, TableRow } from '@/components/ui/table';

export function CloudTableSkeleton() {
  return (
    <>
      {Array.from({ length: 3 }).map((_, index) => (
        <TableRow key={index}>
          <TableCell className="min-w-[52px]">
            <div className="h-4 w-[52px] animate-pulse rounded bg-gray-200"></div>
          </TableCell>
          <TableCell className="min-w-[203px]">
            <div className="h-4 w-[203px] animate-pulse rounded bg-gray-200"></div>
          </TableCell>
          <TableCell className="min-w-[161px]">
            <div className="h-4 w-[161px] animate-pulse rounded bg-gray-200"></div>
          </TableCell>
          <TableCell className="min-w-[81px]">
            <div className="h-4 w-[81px] animate-pulse rounded bg-gray-200"></div>
          </TableCell>
          <TableCell className="min-w-[88px]">
            <div className="h-4 w-[88px] animate-pulse rounded bg-gray-200"></div>
          </TableCell>
          <TableCell className="min-w-[70px]">
            <div className="h-6 w-[70px] animate-pulse rounded bg-gray-200"></div>
          </TableCell>
          <TableCell className="min-w-[70px]">
            <div className="h-6 w-[70px] animate-pulse rounded bg-gray-200"></div>
          </TableCell>
          <TableCell className="min-w-[70px]">
            <div className="h-4 w-[70px] animate-pulse rounded bg-gray-200"></div>
          </TableCell>
          <TableCell className="min-w-[70px]">
            <div className="h-6 w-[70px] animate-pulse rounded bg-gray-200"></div>
          </TableCell>
          <TableCell className="min-w-[70px]">
            <div className="h-6 w-[70px] animate-pulse rounded bg-gray-200"></div>
          </TableCell>
          <TableCell className="min-w-[70px]">
            <div className="h-4 w-[70px] animate-pulse rounded bg-gray-200"></div>
          </TableCell>
          <TableCell className="sticky right-0 z-10 min-w-[120px] bg-white">
            <div className="flex gap-2">
              <div className="h-8 w-12 animate-pulse rounded bg-gray-200"></div>
              <div className="h-8 w-16 animate-pulse rounded bg-gray-200"></div>
            </div>
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}
