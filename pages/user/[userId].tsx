import moment from "moment";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Course, User, UserCourse } from "../../src/models";
import CourseAPI from "../../src/modules/courseAPI";
import userAPI from "../../src/modules/userAPI";

export const ReactExample = ({ name, value, handleChange, option }: any) => (
  <select name={name} value={value} onChange={handleChange}>
    {option.map((item: any) => (
      <option value={item.name}>{item.name}</option>
    ))}
  </select>
);

export default function UserEdit() {
  const [Name, setName] = useState("");
  const [CourseList, setCourseList] = useState<Course[]>([]);
  const [CourseMap, setCourseMap] = useState<UserCourse[]>([]);
  const router = useRouter();
  const { userId } = router.query;

  async function name() {
    // await DataStore.delete(TODO, Predicates.ALL);
    let posts = await CourseAPI.getCourseList();
    if (posts) {
      setCourseList(posts);
      setName(posts[0].name);
    }

    const results = await CourseAPI.getUserCourseListforid(userId);
    if (results) {
      setCourseMap(results);
    }
  }

  useEffect(() => {
    name();
  }, []);

  async function Update() {
    if (typeof userId === "string") {
      const course = CourseList.filter((a) => a.name == Name);
      const user = await userAPI.getUserbyid(userId);
      if (user) {
        let data = { user: user, course: course };
        await CourseAPI.handleCoursemaptoUser(data);
        router.push("/user/reg");
      }
    }
  }
  return (
    <div className="container">
      <Head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0"
        />
        <script
          src="https://code.jquery.com/jquery-3.2.1.slim.min.js"
          integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN"
          crossOrigin="anonymous"
        ></script>
        <script
          src="https://cdn.jsdelivr.net/npm/popper.js@1.12.9/dist/umd/popper.min.js"
          integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q"
          crossOrigin="anonymous"
        ></script>
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.min.js"
          integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl"
          crossOrigin="anonymous"
        ></script>
      </Head>
      <div className="row">
        <div className="col-lg-6">
          <h1>
            <span
              className="material-symbols-outlined"
              style={{ fontSize: 50 }}
              onClick={() => router.push("/user/reg")}
            >
              arrow_back
            </span>
            Student
          </h1>
          <div className="row form">
            <div className="col-md-12 ">
              <fieldset>
                <label>Course</label>
                <ReactExample
                  name="Email"
                  option={CourseList}
                  value={Name}
                  handleChange={(e: any) => {
                    setName(e.target.value);
                    console.log(e.target.value);
                  }}
                />
              </fieldset>
            </div>
            <button type="button" onClick={Update}>
              Update
            </button>
          </div>
        </div>
        <div className="col-lg-6">
          {CourseMap.map((ival) => (
            <div className="card" style={{ padding: 10, margin: 10 }}>
              <div className="card-body row">
                <div className="col-lg-12">
                  <p>{ival.user.firstname}</p>
                  <p>{ival.course.name}</p>
                  <p style={{ color: "#4bc970", fontSize: 10 }}>
                    {moment(ival.createdAt).format("DD-MM-YYYY HH:MM:SS")}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
