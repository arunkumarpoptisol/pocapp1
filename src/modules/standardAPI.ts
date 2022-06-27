import { DataStore } from "aws-amplify";
import { School, Standard } from "../models";

async function getStandardList() {
  return DataStore.query(Standard);
}

async function getSchoolList() {
  return DataStore.query(School);
}
async function getStandardobyid(id: any) {
  return DataStore.query(Standard, id);
}
async function handleSubmitforstnd(data: any) {
  return DataStore.save(
    new Standard({
      name: data.name,
      description: data.description,
      type: data.type,
      schoolID: "7eb7dd4f-6944-4136-b482-ff7023d728f9",
    })
  );
}
const StandardAPI = {
  getStandardList,
  getSchoolList,
  getStandardobyid,
  handleSubmitforstnd,
};
export default StandardAPI;
