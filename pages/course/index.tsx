import moment from "moment";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useUsercontext } from "../../Componet/userProvider";
import { Course, User } from "../../src/models";
import CourseAPI from "../../src/modules/courseAPI";
import styles from "../../styles/Home.module.css";

export default function reg() {
  const [UserList, setUserList] = useState<Course[]>([]);
  const [Name, setName] = useState("");
  const [info, setinfo] = useState("");
  const [email, setemail] = useState("");
  const [viewStudent, setviewStudent] = useState(false);
  const [viewStudentList, setviewStudentList] = useState<User[]>([]);
  const router = useRouter();

  const contextUser = useUsercontext();
  // console.log(contextUser);

  async function name() {
    // await DataStore.delete(TODO, Predicates.ALL);
    let posts = await CourseAPI.getCourseList();
    setUserList(posts);
  }
  useEffect(() => {
    name();
  }, []);

  async function onSubmit() {
    await CourseAPI.handleSubmitforCourse(Name, info);
    name();
  }

  async function handleView(id: any) {
    const results = await CourseAPI.handleallCoursemapped(id);
    if (results) {
      setviewStudentList(results);
      setviewStudent(true);
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
      </Head>
      <div className="row">
        <div className="col">
          <h1 className={styles.title}>Course</h1>
          <div className="row form">
            <div className="col-md-12 ">
              <fieldset>
                <label>Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  onChange={(e) => setName(e.target.value)}
                />

                <label>Descr:</label>
                <textarea
                  //   type="text"
                  id="email"
                  name="email"
                  required
                  onChange={(e) => setemail(e.target.value)}
                />
              </fieldset>
            </div>
            <button type="button" onClick={onSubmit}>
              Submit
            </button>
          </div>
        </div>
        <div className="col">
          <h1 className={styles.title}>LIST</h1>
          <div>
            {!viewStudent ? (
              UserList.map((ival) => (
                <div className="card" style={{ padding: 10, margin: 10 }}>
                  <div className="card-body row">
                    <div className="col-lg-6">
                      <h5>{ival.name} </h5>
                      <p>{ival.desc}</p>
                      <p style={{ color: "#4bc970", fontSize: 10 }}>
                        {moment(ival.createdAt).format("DD-MM-YYYY HH:MM:SS")}
                      </p>
                    </div>
                    <div className="col-lg-6">
                      <span
                        className="material-symbols-outlined col-lg-6"
                        onClick={() => handleView(ival.id)}
                      >
                        visibility
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div>
                <div className="col-lg-12">
                  <span
                    className="material-symbols-outlined col-lg-6"
                    onClick={() => setviewStudent(false)}
                  >
                    arrow_back
                  </span>
                </div>
                {viewStudentList.length > 0 ? (
                  viewStudentList.map((ival) => (
                    <div className="card" style={{ padding: 10, margin: 10 }}>
                      <div className="card-body row">
                        <div className="col-lg-12">
                          <h5>
                            {ival.firstname} {ival.lastname}
                          </h5>
                          <p>{ival.email}</p>
                          <p style={{ color: "#4bc970", fontSize: 10 }}>
                            {moment(ival.createdAt).format(
                              "DD-MM-YYYY HH:MM:SS"
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No record found</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
