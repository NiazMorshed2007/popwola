import api from "@/appwrite/appwrite";
import { LoginInterface, RegisterInterface } from "@/interfaces/auth.interface";

export const register = async (registerBody: RegisterInterface) => {
  try {
    const userData = await api.createAccount(registerBody);
    if (userData) {
      const session = await api.createSession({
        email: registerBody.email,
        password: registerBody.password,
      });
      if (session) {
        const account = await api.getAccount();
        return account;
      }
    }
  } catch (error) {
    console.error("Error occurred during registration:", error);
    throw error;
  }
};

export const login = async (loginBody: LoginInterface) => {
  try {
    const session = await api.createSession(loginBody);
    if (session) {
      const account = await api.getAccount();
      return account;
    }
  } catch (error) {
    console.error("Error occurred during login:", error);
    throw error;
  }
};

export const getSession = async () => {
  try {
    const account = await api.getAccount();
    return account;
  } catch (error) {
    console.error("Error occurred during getSession:", error);
  }
};
