import authAction from "@/api/auth";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: authAction.login,
  });
};

export const useRegisterMutation = () => {
  return useMutation({
    mutationFn: authAction.register,
  });
};

export const useSendVerifyEmailMutation = () => {
  return useMutation({
    mutationFn: authAction.sendVerifyEmail,
  })
}

export const useLogoutMutation = () => {
  return useMutation({
    mutationFn: authAction.logout,
  });
};

export const useGetMeQuery = () => {
  return useQuery({
    queryKey: ["account-me"],
    queryFn: authAction.getMe,
  });
};
