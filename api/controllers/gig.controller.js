import Gig from "../models/gig.model.js";
import createError from "../utils/createError.js";


export const createGig = async (req, res, next) => {
    if (!req.isSeller)
        return next(createError(403, "Only sellers can create a gig!"));

    const newGig = new Gig({
        userId: req.userId,
        ...req.body,
    });

    try {
        const savedGig = await newGig.save();
        res.status(201).json(savedGig);
    } catch (err) { 
       console.error("Gig creation error:", err);
        next(err);
    }
};

export const deleteGig = async (req, res, next) => {
  try {
    const gig = await Gig.findById(req.params.id);
    if (!gig) return next(createError(404, "Gig not found!"));

    if (gig.userId.toString() !== req.userId)
      return next(createError(403, "You can delete only your gig!"));

    await Gig.findByIdAndDelete(req.params.id);
    res.status(200).send("Gig has been deleted!");
  } catch (err) {
    next(err);
  }
};

export const getGig = async (req, res, next) => {
  try {
    const gig = await Gig.findById(req.params.id);
    if (!gig) return next(createError(404, "Gig not found!"));
    res.status(200).send(gig);
  } catch (err) {
    next(err);
  }
};

export const getGigs = async (req, res, next) => {
  const q = req.query;
  const min = q.min ? Number(q.min) : undefined;
  const max = q.max ? Number(q.max) : undefined;

  const filters = {
    ...(q.userId && { userId: q.userId }),
    ...(q.cat && { cat: q.cat }),
    ...((min !== undefined || max !== undefined) && {
      price: {
        ...(min !== undefined && { $gte: min }),
        ...(max !== undefined && { $lte: max }),
      },
    }),
    ...(q.search && { 
     // title: { $regex: q.search, $options: "i" } }),
     $or: [
    { title: { $regex: q.search, $options: "i" } },
    { shortTitle: { $regex: q.search, $options: "i" } },
    { desc: { $regex: q.search, $options: "i" } },
    { cat: { $regex: q.search, $options: "i" } },
  ],
}),
  };

  try {
    const allowedSortFields = ["createdAt", "price", "sales"];
    const sortField = allowedSortFields.includes(q.sort) ? q.sort : "createdAt";

    const gigs = await Gig.find(filters).sort({ [sortField]: -1 });
    res.status(200).send(gigs);
  } catch (err) {
    next(err);
  }
};


// export const deleteGig = async (req, res, next) => {
//   try {
//     const gig = await Gig.findById(req.params.id);
//     if (gig.userId.toString() !== req.userId)
//       return next(createError(403, "You can delete only your gig!"));

//     await Gig.findByIdAndDelete(req.params.id);
//     res.status(200).send("Gig has been deleted!");
//   } catch (err) {
//     next(err);
//   }
// };

// export const getGig = async (req, res, next) => {
//   try {
//     const gig = await Gig.findById(req.params.id);
//     if (!gig) next(createError(404, "Gig not found!"));
//     res.status(200).send(gig);
//   } catch (err) {
//     next(err);
//   }
// };
// export const getGigs = async (req, res, next) => {
//   const q = req.query;
//   const filters = {
//     ...(q.userId && { userId: q.userId }),
//     ...(q.cat && { cat: q.cat }),
//     ...((q.min || q.max) && {
//       price: {
//         ...(q.min && { $gt: q.min }),
//         ...(q.max && { $lt: q.max }),
//       },
//     }),
//     ...(q.search && { title: { $regex: q.search, $options: "i" } }),
//   };
//   try {
//     const gigs = await Gig.find(filters).sort({ [q.sort]: -1 });
//     res.status(200).send(gigs);
//   } catch (err) {
//     next(err); 
//   }
// };  