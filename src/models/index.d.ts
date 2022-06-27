import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";

export enum StandardType {
  COURSE = "COURSE",
  SCHOOL = "SCHOOL"
}



type TODOMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type CommentdataMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type SchoolMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type CourseMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type UserMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type StandardMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type UserCourseMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class TODO {
  readonly id: string;
  readonly name: string;
  readonly desc: string;
  readonly comments?: (Commentdata | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<TODO, TODOMetaData>);
  static copyOf(source: TODO, mutator: (draft: MutableModel<TODO, TODOMetaData>) => MutableModel<TODO, TODOMetaData> | void): TODO;
}

export declare class Commentdata {
  readonly id: string;
  readonly todoID: string;
  readonly content: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Commentdata, CommentdataMetaData>);
  static copyOf(source: Commentdata, mutator: (draft: MutableModel<Commentdata, CommentdataMetaData>) => MutableModel<Commentdata, CommentdataMetaData> | void): Commentdata;
}

export declare class School {
  readonly id: string;
  readonly schoolName: string;
  readonly schoolAddress: string;
  readonly Courses?: Course[] | null;
  readonly Students?: User[] | null;
  readonly Standards?: Standard[] | null;
  readonly contactName?: string | null;
  readonly email?: string | null;
  readonly phone?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<School, SchoolMetaData>);
  static copyOf(source: School, mutator: (draft: MutableModel<School, SchoolMetaData>) => MutableModel<School, SchoolMetaData> | void): School;
}

export declare class Course {
  readonly id: string;
  readonly name: string;
  readonly desc: string;
  readonly schoolID: string;
  readonly user?: (UserCourse | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Course, CourseMetaData>);
  static copyOf(source: Course, mutator: (draft: MutableModel<Course, CourseMetaData>) => MutableModel<Course, CourseMetaData> | void): Course;
}

export declare class User {
  readonly id: string;
  readonly firstname: string;
  readonly lastname: string;
  readonly email: string;
  readonly schoolID: string;
  readonly Course?: (UserCourse | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<User, UserMetaData>);
  static copyOf(source: User, mutator: (draft: MutableModel<User, UserMetaData>) => MutableModel<User, UserMetaData> | void): User;
}

export declare class Standard {
  readonly id: string;
  readonly name: string;
  readonly description?: string | null;
  readonly type: StandardType | keyof typeof StandardType;
  readonly schoolID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Standard, StandardMetaData>);
  static copyOf(source: Standard, mutator: (draft: MutableModel<Standard, StandardMetaData>) => MutableModel<Standard, StandardMetaData> | void): Standard;
}

export declare class UserCourse {
  readonly id: string;
  readonly course: Course;
  readonly user: User;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<UserCourse, UserCourseMetaData>);
  static copyOf(source: UserCourse, mutator: (draft: MutableModel<UserCourse, UserCourseMetaData>) => MutableModel<UserCourse, UserCourseMetaData> | void): UserCourse;
}