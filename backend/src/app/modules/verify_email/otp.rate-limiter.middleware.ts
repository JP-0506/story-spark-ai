import { Request, Response, NextFunction } from "express";
import ApiError from "../../../errors/api_error";
import httpStatus from "http-status";

interface RateLimitStore {
  [key: string]: { attempts: number; resetTime: number };
}

const rateLimitStore: RateLimitStore = {};
const MAX_ATTEMPTS = 5;
const WINDOW_TIME = 15 * 60 * 1000; // 15 minutes

/**
 * Rate limiting middleware for OTP verification
 * Limits to 5 attempts per email per 15 minutes
 */
export const otpRateLimiter = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const email = req.body?.email;

  if (!email) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Email is required");
  }

  const now = Date.now();
  const key = `otp_${email}`;

  // Clean up old entries
  if (rateLimitStore[key] && now > rateLimitStore[key].resetTime) {
    delete rateLimitStore[key];
  }

  // Check if limit exceeded
  if (rateLimitStore[key]) {
    if (rateLimitStore[key].attempts >= MAX_ATTEMPTS) {
      throw new ApiError(
        httpStatus.TOO_MANY_REQUESTS,
        `Too many OTP verification attempts. Please try again after 15 minutes.`
      );
    }
    rateLimitStore[key].attempts += 1;
  } else {
    rateLimitStore[key] = {
      attempts: 1,
      resetTime: now + WINDOW_TIME,
    };
  }

  next();
};
