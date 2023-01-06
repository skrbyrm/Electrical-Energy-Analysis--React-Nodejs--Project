import Daily from "../models/Daily.js";
import User from "../models/UserModel.js";
import { Op } from "sequelize";

// get user data
export const DailyData = async (req, res) => {
  const { ssno } = req.params;

  try {
    let response;
    response = await Daily.findAll({
      attributes: [
        "facility",
        "district",
        "date",
        "active",
        "capacitive",
        "inductive",
        "ssno",
        "userId",
        "active_cons",
        "inductive_cons",
        "capacitive_cons",
      ],
      where: {
        ssno,
      },
    });
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
