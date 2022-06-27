// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const StandardType = {
  "COURSE": "COURSE",
  "SCHOOL": "SCHOOL"
};

const { TODO, Commentdata, School, Course, User, Standard, UserCourse } = initSchema(schema);

export {
  TODO,
  Commentdata,
  School,
  Course,
  User,
  Standard,
  UserCourse,
  StandardType
};