import { prisma } from "../db/client";
import { User } from "../interfaces/user.interface";

export const getAll = async (): Promise<User[]> => {
  return await prisma.user.findMany({
    orderBy: {
      id: "asc",
    },
  });
};

export const findById = async (id: number): Promise<User | null> => {
  return await prisma.user.findUnique({
    where: {
      id,
    },
  });
};

export const create = async (userData: Omit<User, "id">): Promise<User> => {
  return await prisma.user.create({
    data: userData,
  });
};

export const update = async (
  userId: number,
  payload: Partial<Omit<User, "id">>
): Promise<User> => {
  return await prisma.user.update({
    where: {
      id: userId,
    },
    data: payload,
  });
};

export const remove = async (id: number): Promise<boolean> => {
  try {
    await prisma.user.delete({
      where: {
        id,
      },
    });
    return true;
  } catch (error) {
    return false;
  }
};

