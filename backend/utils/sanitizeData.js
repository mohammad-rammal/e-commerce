// -Data which return in res (Security)
// For Signup
exports.sanitizeUser = function (user) {
    return {
        _id: user._id,
        username: user.username,
        fullName: user.fullName,
    };
};
