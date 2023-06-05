import express from "express";
import customerController from "../controllers/customerController";

const router = express.Router();

const {getCustomer, getCustomers, postCustomer, patchCustomer, deleteCustomer} = customerController;

router.route("/")
	.get(getCustomers)
	.post(postCustomer);

router.route("/:id")
	.get(getCustomer)
	.patch(patchCustomer)
	.delete(deleteCustomer);

export default router;