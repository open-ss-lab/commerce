import CategoriesTable from '@/components/tables/categories/categories-table'

export function Get() {
  return (

    <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
      <CategoriesTable />
    </div>
  )
}
