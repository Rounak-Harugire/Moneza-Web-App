import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { ContactMessage } from '../models/ContactMessage';

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export const submitContactMessage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validatedData = contactSchema.parse(req.body);

    const message = await ContactMessage.create(validatedData);

    res.status(201).json({
      success: true,
      message: 'Your message has been sent successfully',
      data: message
    });
  } catch (error) {
    next(error);
  }
};
