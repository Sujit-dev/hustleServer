import users from "./../models/users";
import hustlers from "./../models/hustlers";
import { v4 as uuidv4 } from "uuid";

export const getAllUsers = async (req: any, res: any) => {
  try {
    const usersData = users.find({});
    return usersData;
  } catch (error) {
    return error;
  }
};

export const getUser = async (req: any, res: any) => {
  const { userId } = req.params;
  try {
    const user = await users.findOne({ userId });
    if (user == null) {
      throw "User not found!!";
    } else {
      return user;
    }
  } catch (error) {
    return error;
  }
};

export const createUser = async (req: any, res: any) => {
  const { phoneNumber } = req.params;
  const user = { ...req.body, phoneNumber, userId: uuidv4() };
  const newUser = new users(user);
  try {
    const oldUser = await users.findOne({ phoneNumber });
    if (!oldUser) {
      const oldHustler = await hustlers.findOne({ phoneNumber });
      if (oldHustler == null) {
        await newUser.save();
        res.status(201);
        return newUser;
      } else {
        throw "User already registered as hustler!";
      }
    } else {
      throw "User already exists!";
    }
  } catch (error) {
    res.status(500);
    throw error;
  }
};

export const updateUser = async (req: any, res: any) => {
  const { userId } = req.params;
  try {
    const updatedUser = { ...req.body };
    const user = await users.findOneAndUpdate({ userId }, updatedUser, {
      new: true,
    });
    if (user == null) {
      throw "No such user!";
    } else {
      return user;
    }
  } catch (error) {
    return error;
  }
};

export const deleteUser = async (req: any, res: any) => {
  const { userId } = req.params;
  try {
    const deletedUser = users.findOneAndDelete({ userId });
    if (deletedUser == null) {
      throw "No such user to delete!";
    } else {
      return deletedUser;
    }
  } catch (error) {
    return error;
  }
};
