import tableApiRequest from '@/apis/table'
import { queryClient } from '@/components/app-provider'
import { UpdateTableBodyType } from '@/schemas/table.schema'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const useTableListQuery = () => {
  return useQuery({
    queryKey: ['tables'],
    queryFn: tableApiRequest.getListTables
  })
}

export const useGetTableQuery = ({
  id,
  enabled
}: {
  id: number
  enabled: boolean
}) => {
  return useQuery({
    queryKey: ['tables', id],
    queryFn: () => tableApiRequest.getTableById(id),
    enabled
  })
}

export const useAddTableMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: tableApiRequest.createTable,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['tables']
      })
    }
  })
}

export const useUpdateTableMutation = () => { 

  return useMutation({
    mutationFn: ({ id, ...body }: UpdateTableBodyType & { id: number }) =>
      tableApiRequest.updateTable(id, body),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['tables'],
        exact: true
      })
    }
  })
}

export const useDeleteTableMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: tableApiRequest.deleteTable,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['tables']
      })
    }
  })
}
