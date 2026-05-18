"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const http_status_1 = __importDefault(require("http-status"));
const google_auth_library_1 = require("google-auth-library");
const user_model_1 = require("../user/user.model");
const jwt_helper_1 = require("../../../utils/jwt.helper");
const config_1 = __importDefault(require("../../../config"));
const api_error_1 = __importDefault(require("../../../errors/api_error"));
const otp_model_1 = require("../verify_email/otp.model");
const googleClient = new google_auth_library_1.OAuth2Client(config_1.default.google_client_id);
const login = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email: userEmail, password } = payload;
    const isExistUser = yield user_model_1.User.findOne({ email: userEmail });
    if (!isExistUser) {
        throw new api_error_1.default(http_status_1.default.NOT_FOUND, "User not found!");
    }
    // Check if user has password (Google users might not)
    if (!isExistUser.password) {
        throw new api_error_1.default(http_status_1.default.UNAUTHORIZED, "Please use Google login for this account!");
    }
    const match = yield bcrypt_1.default.compare(password, isExistUser.password);
    if (!match) {
        throw new api_error_1.default(http_status_1.default.UNAUTHORIZED, "Password is not valid!");
    }
    const { _id, email, role, subscriptionType, name, postsCount } = isExistUser;
    const accessToken = jwt_helper_1.JwtHalers.createToken({ _id, email, role, subscriptionType, name, postsCount }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    const refreshToken = jwt_helper_1.JwtHalers.createToken({ _id, email, role, subscriptionType, name, postsCount }, config_1.default.jwt.refresh_secret, config_1.default.jwt.refresh_expires_in);
    return {
        accessToken,
        refreshToken,
    };
});
const register = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email: userEmail, verificationToken } = payload;
    // FIX #4: Verify that email was verified via OTP before allowing registration
    if (!verificationToken) {
        throw new api_error_1.default(http_status_1.default.UNAUTHORIZED, "Email verification required. Please verify your email with OTP before registering.");
    }
    // Check if verification token is valid
    const otpRecord = yield otp_model_1.OTPModel.findOne({
        email: userEmail,
        isVerified: true,
        verificationToken,
    });
    if (!otpRecord) {
        throw new api_error_1.default(http_status_1.default.UNAUTHORIZED, "Invalid or expired verification token. Please verify your email again.");
    }
    // Check if verification token has expired
    if (!otpRecord.verificationTokenExpires ||
        new Date() > otpRecord.verificationTokenExpires) {
        throw new api_error_1.default(http_status_1.default.UNAUTHORIZED, "Verification token has expired. Please verify your email again.");
    }
    const isExistUser = yield user_model_1.User.findOne({ email: userEmail });
    if (isExistUser) {
        throw new api_error_1.default(http_status_1.default.NOT_FOUND, "User already exist!");
    }
    const result = yield user_model_1.User.create(payload);
<<<<<<< HEAD
    const { _id, email, role, subscriptionType, name, postsCount } = result;
    const accessToken = jwt_helper_1.JwtHalers.createToken({ _id, email, role, subscriptionType, name, postsCount }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    const refreshToken = jwt_helper_1.JwtHalers.createToken({ _id, email, role, subscriptionType, name, postsCount }, config_1.default.jwt.refresh_secret, config_1.default.jwt.refresh_expires_in);
=======
    // Clean up OTP record after successful registration
    yield otp_model_1.OTPModel.deleteOne({ email: userEmail });
    const { email, role, subscriptionType, name, postsCount } = result;
    const accessToken = jwt_helper_1.JwtHalers.createToken({ email, role, subscriptionType, name, postsCount }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    const refreshToken = jwt_helper_1.JwtHalers.createToken({ email, role, subscriptionType, name, postsCount }, config_1.default.jwt.refresh_secret, config_1.default.jwt.refresh_expires_in);
>>>>>>> 422a0bf (CORRECT: Verify OTP)
    return {
        accessToken,
        refreshToken,
    };
});
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    let verifiedToken = null;
    try {
        verifiedToken = jwt_helper_1.JwtHalers.verifyToken(token, config_1.default.jwt.refresh_secret);
    }
    catch (error) {
        throw new api_error_1.default(http_status_1.default.FORBIDDEN, "Invalid refresh token");
    }
    const { email: userEmail } = verifiedToken;
    const user = yield user_model_1.User.findOne({ email: userEmail });
    if (!user) {
        throw new api_error_1.default(http_status_1.default.NOT_FOUND, "User not found!");
    }
    const { _id, email, role, subscriptionType, name, postsCount } = user;
    const newAccessToken = jwt_helper_1.JwtHalers.createToken({ _id, email, role, subscriptionType, name, postsCount }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    return {
        accessToken: newAccessToken,
    };
});
const googleLogin = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!config_1.default.google_client_id) {
            throw new api_error_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, "Google OAuth not configured");
        }
        const ticket = yield googleClient.verifyIdToken({
            idToken: payload.token,
            audience: config_1.default.google_client_id,
        });
        const payload_data = ticket.getPayload();
        if (!payload_data || !payload_data.email) {
            throw new api_error_1.default(http_status_1.default.BAD_REQUEST, "Invalid Google token");
        }
        const { email, name: googleName, picture } = payload_data;
        let user = yield user_model_1.User.findOne({ email });
        // If user doesn't exist, create a new user
        if (!user) {
            const newUser = {
                email: email,
                name: (googleName || email || "Google User").slice(0, 100),
                profile: {
                    avatar: picture || "",
                    bio: "",
                    social: {
                        facebook: "",
                        twitter: "",
                        linkedin: "",
                        instagram: "",
                    },
                },
            };
            user = yield user_model_1.User.create(newUser);
        }
        const { _id, role, subscriptionType, postsCount, name } = user;
        const accessToken = jwt_helper_1.JwtHalers.createToken({ _id, email, role, subscriptionType, name, postsCount }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
        const refreshTokenData = jwt_helper_1.JwtHalers.createToken({ _id, email, role, subscriptionType, name, postsCount }, config_1.default.jwt.refresh_secret, config_1.default.jwt.refresh_expires_in);
        return {
            accessToken,
            refreshToken: refreshTokenData,
        };
    }
    catch (error) {
        console.log("Google login error:", error);
        // If it's already an ApiError, re-throw it
        if (error instanceof api_error_1.default) {
            throw error;
        }
        throw new api_error_1.default(http_status_1.default.UNAUTHORIZED, error.message || "Google login failed");
    }
});
exports.AuthService = {
    login,
    register,
    refreshToken,
    googleLogin,
};
