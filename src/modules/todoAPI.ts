import { DataStore, SortDirection } from "aws-amplify";
import { Commentdata, Course, TODO } from "../models";

// todo apis
async function getTodoList() {
  return DataStore.query(TODO);
}
async function getTodobyid(id: any) {
  return DataStore.query(TODO, id);
}

async function handleSubmitforTodo(Name: any, desc: any) {
  return DataStore.save(
    new TODO({
      name: Name,
      desc: desc,
    })
  );
}

async function handleUpdatefortodo(updateData: any, data: any) {
  return DataStore.save(
    TODO.copyOf(updateData, (updated) => {
      updated.name = data.name;
      updated.desc = data.desc;
    })
  );
}

//comments api
async function getComment(id: any) {
  return DataStore.query(Commentdata, (c) => c.todoID("eq", id), {
    sort: (s) => s.createdAt(SortDirection.DESCENDING),
  });
}

async function handleComment(data: any) {
  return DataStore.save(
    new Commentdata({
      content: data.content,
      todoID: data.todoID,
    })
  );
}
async function handleDelete(data: any) {
  return DataStore.delete(data);
}

const TodoApi = {
  getTodoList,
  handleSubmitforTodo,
  handleUpdatefortodo,
  getComment,
  handleComment,
  getTodobyid,
  handleDelete,
};
export default TodoApi;
