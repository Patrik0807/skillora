import createError from "../utils/createError.js";
import User from "../models/user.model.js";

export const deleteUser = async (req, res,next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send("User not found");
    }

    if (req.userId !== user._id.toString()) {
      return next(createError(403,"You can delete only your account"))
    }

    await User.findByIdAndDelete(req.params.id);
    res.status(200).send("Deleted");
  } catch (error) {
    res.status(500).send("Something went wrong");
  }
};

export const getUser = async (req, res, next) => {
  const user = await User.findById(req.params.id);

  res.status(200).send(user);
}; 
// import User from "../models/user.model.js"

// export const deleteUser = async (req, res) => {

//     const user = await User.findById(req.params.id);
    


//         if (req.userId !== user._id.toString()) {
//             return res.status(403).send("you can delete only your acount");
//         }
//         await User.findByIdAndDelete(req.params.id)
//         res.status(200).send("deleted")
  
// };