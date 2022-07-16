import hustlers from "../models/hustlers";
import users from "./../models/users";

export const generateOtp = async (req: any, res: any) => {
  const { phoneNumber } = req.params;
  try {
    const user = await users.findOne({ phoneNumber });
    if (user == null) {
      const hustler = await hustlers.findOne({ phoneNumber });
      if (hustler == null) {
        return {
          userId: null,
          type: null,
          phoneNumber,
          status: "Otp sent succesfully!",
        };
      } else {
        return {
          userId: hustler.userId,
          type: hustler.type,
          phoneNumber,
          status: "Otp sent succesfully!",
        };
      }
    } else {
      return {
        userId: user.userId,
        type: user.type,
        phoneNumber,
        status: "Otp sent succesfully!",
      };
    }
  } catch (error) {
    throw error;
  }
};

export const verifyOtp = (req: any, res: any, next: any) => {
  const { otp } = req.body;

  if (otp) {
    next();
  } else {
    throw { statusCode: 418, message: "Invalid Otp!" };
  }
};

export const login = async (req: any, res: any) => {
  try {
    const { userId } = req.params;
    const { type } = req.body;
    if (type === 0) {
      const user = await users.findOne({ userId });
      return user;
    } else if (type === 1) {
      const hustler = await hustlers.findOne({ userId });
      return hustler;
    } else {
      res.status(500).send("type of user undefined!");
    }
  } catch (error) {
    throw error;
  }
};
