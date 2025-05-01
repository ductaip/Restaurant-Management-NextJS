import accountApi from "@/apis/account";
import { queryClient } from "@/components/app-provider";
import {
  GetGuestListQueryParamsType,
  UpdateEmployeeAccountBodyType,
} from "@/schemas/account.schema";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useAccountProfile = () => {
  return useQuery({
    queryKey: ["account-profile"],
    queryFn: accountApi.getPersonalAccount,
  });
};

export const useUpdatePersonalProfileMutation = () => {
  return useMutation({
    mutationFn: accountApi.updatePersonalAccount,
  });
};

export const useChangePasswordMutation = () => {
  return useMutation({
    mutationFn: accountApi.changePassword,
  });
};

export const useGetAccountList = () => {
  return useQuery({
    queryKey: ["accounts"],
    queryFn: accountApi.getListAccount,
  });
};

export const useGetEmployee = ({
  id,
  enabled,
}: {
  id: number;
  enabled: boolean;
}) => {
  return useQuery({
    queryKey: ["employee", id],
    queryFn: () => accountApi.getEmployeeDetail(id),
    enabled,
  });
};

export const useCreateEmployeeMutation = () => {
  return useMutation({
    mutationFn: accountApi.createEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
    },
  });
};

export const useUpdateAccountMutation = () => {
  return useMutation({
    mutationFn: ({
      id,
      ...body
    }: UpdateEmployeeAccountBodyType & { id: number }) =>
      accountApi.updateEmployee(id, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
    },
  });
};

export const useDeleteEmployeeMutation = () => {
  return useMutation({
    mutationFn: accountApi.deleteEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
    },
  });
};

export const useGetGuestListQuery = (
  queryParams: GetGuestListQueryParamsType
) => {
  return useQuery({
    queryFn: () => accountApi.guestList(queryParams),
    queryKey: ["guests", queryParams],
  });
};

export const useCreateGuestMutation = () => {
  return useMutation({
    mutationFn: accountApi.createGuest,
  });
};
