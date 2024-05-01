'use client'

import { Button, Input, ScrollArea, ScrollBar, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@openui-org/react/components'
import type { ColumnDef } from '@tanstack/react-table'
import { flexRender, getCoreRowModel, getFilteredRowModel, useReactTable } from '@tanstack/react-table'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  searchKey: string
}

export function DataTable<TData, TValue>({ columns, data, searchKey }: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  })

  return (
    <>
      <Input
        placeholder={`Search ${searchKey}...`}
        value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ''}
        onChange={(event: { target: { value: any } }) => table.getColumn(searchKey)?.setFilterValue(event.target.value)}
        className="w-full md:max-w-sm"
      />
      <ScrollArea className="rounded-md border h-[calc(80vh-200px)]">
        <Table className="relative">
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length
              ? (
                  table.getRowModel().rows.map(row => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && 'selected'}
                    >
                      {row.getVisibleCells().map(cell => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                )
              : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
                )}
          </TableBody>
        </Table>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <div className="flex items-center justify-end space-x-2 py-3">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length}
          {' '}
          of
          {' '}
          {table.getFilteredRowModel().rows.length}
          {' '}
          row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </>
  )
}