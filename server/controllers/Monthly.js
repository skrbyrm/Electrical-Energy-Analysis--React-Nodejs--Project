import Summary from "../models/Monthly.js";
import User from "../models/UserModel.js";
import { Op } from "sequelize";

// get user data
export const getAllSummary_data = async (req, res) => {
  try {
    let response;
    if (req.role === "admin") {
      response = await Summary.findAll({
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
          "inductive_ratio",
          "capacitive_ratio",
          "penalized",
        ],
        include: [
          {
            model: User,
            attributes: ["name", "email"],
          },
        ],
        order: [["penalized", "DESC"]],
      });
    } else {
      response = await Summary.findAll({
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
          "inductive_ratio",
          "capacitive_ratio",
          "penalized",
        ],
        where: {
          userId: req.userId,
        },
        order: [["penalized", "DESC"]],
        include: [
          {
            model: User,
            attributes: ["name", "email"],
          },
        ],
      });
    }
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
