import api from "../../../api/api";

export async function userAuthorization(email: string, password: string) {
  return await api("auth/user", "post", { email, password }, "user");
}

export async function getUserInfo(userAuth: any) {
  const user = await api(
    `api/user/getUserById/${userAuth.data.Id}`,
    "post",
    {},
    "user"
  );
  return {
    userId: user.data.userId,
    userName: user.data.name,
    userLogIn: true,
  };
}
