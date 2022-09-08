const express = require("express");
const cors = require("cors");
const session = require("express-session");
const bodyParser = require('body-parser');
const dotenv = require("dotenv");
//const db = require("./config/database.js");
//const SequelizeStore = require("connect-session-sequelize");
const UserRoute = require("./routes/UserRoute.js");
const ProductRoute = require("./routes/ProductRoute.js");
const CategoryRoute = require("./routes/CategoryRoute.js");
const UnitRoute = require("./routes/UnitRoute.js");
const AuthRoute = require("./routes/AuthRoute.js");
const Employee = require("./routes/EmployeeRoute.js");
const Schedule = require("./routes/ClassScheduleRoute.js");
const Students = require("./routes/StudentRoute.js");
const StudentCourse = require("./routes/StudentCourseRoute.js");
const EmployeeSchedule = require("./routes/EmployeeScheduleRoute.js");
//test
const app = express();
//const sessionStore = SequelizeStore(session.Store);
//const router = express.Router();
const http = require('http').createServer(app).listen(3000);


dotenv.config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


// const store = new sessionStore({
//     db: db
// });

app.use(session({ secret: 'somevalue' }));

// app.use(cors({
//     origin: 'http://localhost:3000'
// }));

app.use(express.json());
app.use(UserRoute);
app.use(AuthRoute);
app.use(ProductRoute);
app.use(CategoryRoute);
app.use(UnitRoute);
app.use(Employee);
app.use(EmployeeSchedule);
app.use(Schedule);
app.use(Students);
app.use(StudentCourse);

// store.sync();
app.listen(process.env.APP_PORT, () => {
    console.log('Server is running...');
});