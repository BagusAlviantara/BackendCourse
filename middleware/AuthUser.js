const User = require("../models/UserModel.js");


exports.verifyUser = async(req, res, next) => {
    try {
        if (!req.session.userId) {
            return res.status(401).json({ msg: "Mohon login ke akun Anda!" });
        }
        const user = await User.findOne({
            where: {
                id: req.session.userId
            }
        });
        if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
        req.userId = user.id;
        req.role = user.role;
        next();
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }

}

exports.adminOnly = async(req, res, next) => {
    try {
        const user = await User.findOne({
            where: {
                id: req.session.userId
            }
        });
        if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
        if (user.role !== "Admin") return res.status(403).json({ msg: "Akses terlarang" });

        next();
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

exports.studentOnly = async(req, res, next) => {
    try {
        const user = await User.findOne({
            where: {
                id: req.session.userId
            }
        });
        if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
        if (user.role !== "Student") return res.status(403).json({ msg: "Akses terlarang" });
        next();
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}