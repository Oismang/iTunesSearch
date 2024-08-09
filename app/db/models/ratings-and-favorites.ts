import mongoose from "mongoose";

interface IRatingsAndFavorites {
  id: mongoose.ObjectId;
  mediaId: string;
  rating: number;
  favorite: boolean;
}

const ratingsAndFavoritesSchema = new mongoose.Schema<IRatingsAndFavorites>({
  mediaId: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  favorite: {
    type: Boolean,
    default: false
  },
});

export default mongoose.models.RatingsAndFavorites || mongoose.model<IRatingsAndFavorites>("RatingsAndFavorites", ratingsAndFavoritesSchema);
