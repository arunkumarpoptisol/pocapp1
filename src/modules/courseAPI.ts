import { DataStore } from "aws-amplify";
import { Course, User, UserCourse } from "../models";

async function getCourseList() {
  return DataStore.query(Course);
}

async function getUserCourseListforid(id: any) {
  return (await DataStore.query(UserCourse)).filter((pe) => pe.user.id === id);
}
async function handleallCoursemapped(id: any) {
  return (await DataStore.query(UserCourse))
    .filter((pe) => pe.course.id === id)
    .map((pe) => pe.user);
}

async function handleSubmitforCourse(Name: any, desc: any) {
  return DataStore.save(
    new Course({
      name: Name,
      desc: desc,
      schoolID: "7eb7dd4f-6944-4136-b482-ff7023d728f9",
    })
  );
}

async function handleCoursemaptoUser(data: any) {
  return DataStore.save(
    new UserCourse({
      user: data.user,
      course: data.course[0],
    })
  );
}
const CourseAPI = {
  getCourseList,
  handleCoursemaptoUser,
  getUserCourseListforid,
  handleallCoursemapped,
  handleSubmitforCourse,
};
export default CourseAPI;
