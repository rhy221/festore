import { useMutation, useQuery } from "@tanstack/react-query";
import { LoginBodyType, LoginResType } from "@/schema/auth.schema";
import authAction from "@/api/auth.api";

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: authAction.login
  });
};

// export const useRegisterMutation = () => {
//   return useMutation({
//     mutationFn: authAction.register,
//   });
// };

// export const useSendVerifyEmailMutation = () => {
//   return useMutation({
//     mutationFn: authAction.sendVerifyEmail,
//   })
// }

// export const useForgotPasswordMutation = () => {
//   return useMutation({
//     mutationFn: authAction.forgotPassword,
//   })
// }

// export const useChangePasswordMutation = () => {
//   return useMutation({
//     mutationFn: authAction.changePassword,
//   })
// }

// export const useLogoutMutation = () => {
//   return useMutation({
//     mutationFn: authAction.logout,
//   });
// };

// export const useGetMeQuery = () => {
//   return useQuery({
//     queryKey: ["account-me"],
//     queryFn: authAction.getMe,
//   });
// };
