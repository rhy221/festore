// import { UsersAPI as userAction, getUserStats } from "@/api/users.api";
// import { User, UnlockRequest } from "@/api/users.api";
// import { useMutation, useQuery } from "@tanstack/react-query";

// export const useUsers = (query?: { name?: string; status?: string; type?: string }) => {
//   return useQuery<User[]>({
//     queryKey: ["users", query],
//     queryFn: () => userAction.getUsers(query),
//   });
// };

// export const useUserDetail = (id: number) => {
//   return useQuery<User>({
//     queryKey: ["userDetail", id],
//     queryFn: () => userAction.getUserDetail(id),
//     enabled: !!id, 
//   });
// };

// export const useBlockUser = () => {
//   return useMutation({
//     mutationFn: (id: number) => userAction.blockUserAccount(id),
//   });
// };

// export const useUnlockUser = () => {
//   return useMutation({
//     mutationFn: (id: number) => userAction.unlockUser(id),
//   });
// };

// export const useDeleteUser = () => {
//   return useMutation({
//     mutationFn: (id: number) => userAction.deleteUser(id),
//   });
// };

// export const useUnlockRequests = () => {
//   return useQuery<UnlockRequest[]>({
//     queryKey: ["unlockRequests"],
//     queryFn: () => userAction.getUnlockRequests(),
//   });
// };

// export const useApproveUnlockRequest = () => {
//   return useMutation({
//     mutationFn: (id: number) => userAction.approveUnlockRequest(id),
//   });
// };

// export const useRejectUnlockRequest = () => {
//   return useMutation({
//     mutationFn: (id: number) => userAction.rejectUnlockRequest(id),
//   });
// };

// export const useUserStats = () => {
//   return useQuery({
//     queryKey: ["userStats"],
//     queryFn: getUserStats,
//   });
// };
