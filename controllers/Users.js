const User = require("../models/UserModel.js");
const argon2 = require("argon2");


exports.getUsers = async(req, res) => {
    try {
        const response = await User.findAll({
            attributes: ['id', 'full_name', 'phone', 'email', 'password', 'role']
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

exports.getUsersbyStudent = async(req, res) => {
    try {
        const response = await User.findAll({
            attributes: ['id', 'full_name', 'phone', 'email', 'password', 'role'],
            where: {
                role: "Student"
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

exports.getUsersbyEmployee = async(req, res) => {
    try {
        const response = await User.findAll({
            attributes: ['id', 'full_name', 'phone', 'email', 'password', 'role'],
            where: {
                role: "Employee"
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}
exports.getUserById = async(req, res) => {
    try {
        const response = await User.findOne({
            attributes: ['id', 'full_name', 'phone', 'email', 'password', 'role'],
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

exports.createUser = async(req, res) => {
    const user = await User.findOne({
        where: {
            email: req.body.email,
        }
    });
    if (user) {
        return res.status(409).json({ msg: "email already exists" });
    }
    const { full_name, phone, email, password, confPassword, role } = req.body;
    if (password !== confPassword) return res.status(400).json({ msg: "Password dan Confirm Password tidak cocok" });
    const hashPassword = await argon2.hash(password);
    try {
        await User.create({
            full_name: full_name,
            phone: phone,
            email: email,
            password: hashPassword,
            role: role
        });
        res.status(201).json({ msg: "Register Berhasil" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

exports.registerStudent = async(req, res) => {
    const user = await User.findOne({
        where: {
            email: req.body.email,
        }
    });
    if (user) {
        return res.status(409).json({ msg: "email already exists" });
    }
    const { full_name, phone, email, password, confPassword, role } = req.body;
    if (password !== confPassword) return res.status(400).json({ msg: "Password dan Confirm Password tidak cocok" });
    const hashPassword = await argon2.hash(password);
    try {
        await User.create({
            full_name: full_name,
            phone: phone,
            email: email,
            password: hashPassword,
            role: "Student"
        });
        res.status(201).json({ msg: "Register Berhasil" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

exports.updateUser = async(req, res) => {
    //Check id user
    const user = await User.findOne({
        where: {
            id: req.params.id,
        }
    });
    if (!user) {
        return res.status(404).json({ msg: "User tidak ditemukan" });
    }

    const { full_name, phone, email, password, confPassword, role } = req.body;
    let hashPassword;
    if (password === "" || password === null) {
        hashPassword = user.password
    } else {
        hashPassword = await argon2.hash(password);
    }
    if (password !== confPassword) return res.status(400).json({ msg: "Password dan Confirm Password tidak cocok" });
    try {
        await User.update({
            full_name: full_name,
            phone: phone,
            email: email,
            password: hashPassword,
            role: role
        }, {
            where: {
                id: user.id
            }
        });
        res.status(200).json({ msg: "User Updated" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

exports.updateUserName = async(req, res) => {
    const user = await User.findOne({
        where: {
            id: req.params.id
        }
    });
    if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
    const { full_name, phone } = req.body;
    try {
        await User.update({
            full_name: full_name,
            phone: phone,
        }, {
            where: {
                id: user.id
            }
        });
        res.status(200).json({ msg: "User Updated" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}


exports.deleteUser = async(req, res) => {
    const user = await User.findOne({
        where: {
            id: req.params.id
        }
    });
    if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
    try {
        await User.destroy({
            where: {
                id: user.id
            }
        });
        res.status(200).json({ msg: "User Deleted" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

// exports.createUser = async(req, res) => {
//     // checks if email already exists
//     const { full_name, phone, email, password, confPassword, role } = req.body;
//     User.findOne({
//             where: {
//                 email: email,
//             }
//         })
//         .then(dbUser => {
//             if (dbUser) {
//                 return res.status(409).json({ message: "email already exists" });
//             } else if (email && password) {
//                 // password hash
//                 if (password !== confPassword) return res.status(400).json({ msg: "Password dan Confirm Password tidak cocok" });
//                 argon2.hash(password, 7, (err, passwordHash) => {
//                     if (err) {
//                         return res.status(500).json({ message: "couldnt hash the password" });
//                     } else if (passwordHash) {
//                         await User.create(({
//                                 full_name: full_name,
//                                 phone: phone,
//                                 email: email,
//                                 password: passwordHash,
//                                 role: role
//                             }))
//                             .then(() => {
//                                 res.status(200).json({ message: "user created" });
//                             })
//                             .catch(err => {
//                                 console.log(err);
//                                 res.status(502).json({ message: "error while creating the user" });
//                             });
//                     };
//                 });
//             } else if (!req.body.password) {
//                 return res.status(400).json({ message: "password not provided" });
//             } else if (!req.body.email) {
//                 return res.status(400).json({ message: "email not provided" });
//             };
//         })
//         .catch(err => {
//             console.log('error', err);
//         });
// };      });
// };