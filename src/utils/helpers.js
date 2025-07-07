exports.isEmail = (email) => /.+@.+\..+/.test(email);
exports.isUsername = (username) => /^[a-zA-Z0-9_]{3,20}$/.test(username);
exports.isPasswordStrong = (password) => password.length >= 6; 