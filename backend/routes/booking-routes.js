import express from "express";
import { deleteBooking, getBookingId, newBooking } from "../controllers/booking-controller";

const bookingsRouter = express.Router();

bookingsRouter.post('/',newBooking);
bookingsRouter.get('/:id',getBookingId);

bookingsRouter.delete('/:id',deleteBooking);

export default bookingsRouter;