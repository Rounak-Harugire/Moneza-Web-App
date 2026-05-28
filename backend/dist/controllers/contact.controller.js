"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.submitContactMessage = void 0;
const zod_1 = require("zod");
const ContactMessage_1 = require("../models/ContactMessage");
const contactSchema = zod_1.z.object({
    name: zod_1.z.string().min(2, "Name must be at least 2 characters"),
    email: zod_1.z.string().email("Invalid email address"),
    subject: zod_1.z.string().min(3, "Subject must be at least 3 characters"),
    message: zod_1.z.string().min(10, "Message must be at least 10 characters"),
});
const submitContactMessage = async (req, res, next) => {
    try {
        const validatedData = contactSchema.parse(req.body);
        const message = await ContactMessage_1.ContactMessage.create(validatedData);
        res.status(201).json({
            success: true,
            message: 'Your message has been sent successfully',
            data: message
        });
    }
    catch (error) {
        next(error);
    }
};
exports.submitContactMessage = submitContactMessage;
