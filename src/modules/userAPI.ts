import { DataStore } from "aws-amplify";
import { User, UserCourse } from "../models";

async function getUserList() {
  return DataStore.query(User);
}

async function getUserbyid(id: any) {
  return DataStore.query(User, id);
}
async function handleSubmitforTodo(data: any) {
  return DataStore.save(
    new User({
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
      schoolID: "7eb7dd4f-6944-4136-b482-ff7023d728f9",
    })
  );
}
const userAPI = {
  getUserList,
  getUserbyid,
  handleSubmitforTodo,
};
export default userAPI;
