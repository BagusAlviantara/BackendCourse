const express = require("express");
const cors = require("cors");
const session = require("express-session");
const bodyParser = require('body-parser');
const dotenv = require("dotenv");
const UserRoute = require("./routes/UserRoute.js");
const ProductRoute = require("./routes/ProductRoute.js");
const CategoryRoute = require("./routes/CategoryRoute.js");
const UnitRoute = require("./routes/UnitRoute.js");
const AuthRoute = require("./routes/AuthRoute.js");
const Employee = require("./routes/EmployeeRoute.js");
const ClassSchedule = require("./routes/ClassScheduleRoute.js");
const Students = require("./routes/StudentRoute.js");
const StudentCourse = require("./routes/StudentCourseRoute.js");
const EmployeeSchedule = require("./routes/EmployeeScheduleRoute.js");
const Attendance = require("./routes/AttendanceRoute.js");
const Notes = require("./routes/NotesRoute.js");
const Booking = require("./routes/BookingRoute.js");
const Department = require("./routes/DepartmentRoute.js");
const StudentReport = require("./routes/StudentReportRoute.js");
const ReportTeacher = require("./routes/ReportTeacherRoute");
const ReportCourseRoute = require("./routes/ReportCourseRoute");
const ReportUnitRoute = require("./routes/ReportUnitRoute");

//test
const app = express();
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
app.use(ClassSchedule);
app.use(Students);
app.use(StudentCourse);
app.use(Attendance);
app.use(Notes);
app.use(Department);
app.use(Booking);
app.use(StudentReport);
app.use(ReportTeacher);
app.use(ReportUnitRoute);
app.use(ReportCourseRoute);


// store.sync();
app.listen(process.env.APP_PORT, () => {
    console.log('Server is running...');
});