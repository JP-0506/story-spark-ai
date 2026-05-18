"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.otpRateLimiter = void 0;
const api_error_1 = __importDefault(require("../../../errors/api_error"));
const http_status_1 = __importDefault(require("http-status"));
const rateLimitStore = {};
const MAX_ATTEMPTS = 5;
const WINDOW_TIME = 15 * 60 * 1000; // 15 minutes
/**
 * Rate limiting middleware for OTP verification
 * Limits to 5 attempts per email per 15 minutes
 */
const otpRateLimiter = (req, res, next) => {
    var _a;
    const email = (_a = req.body) === null || _a === void 0 ? void 0 : _a.email;
    if (!email) {
        throw new api_error_1.default(http_status_1.default.BAD_REQUEST, "Email is required");
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
            throw new api_error_1.default(http_status_1.default.TOO_MANY_REQUESTS, `Too many OTP verification attempts. Please try again after 15 minutes.`);
        }
        rateLimitStore[key].attempts += 1;
    }
    else {
        rateLimitStore[key] = {
            attempts: 1,
            resetTime: now + WINDOW_TIME,
        };
    }
    next();
};
exports.otpRateLimiter = otpRateLimiter;
