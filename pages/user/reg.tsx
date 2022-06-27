import moment from "moment";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { User } from "../../src/models";
import userAPI from "../../src/modules/userAPI";
import styles from "../../styles/Home.module.css";

export default function reg() {
  const [UserList, setUserList] = useState<User[]>([]);
  const [Name, setName] = useState("");
  const [info, setinfo] = useState("");
  const [email, setemail] = useState("");
  const router = useRouter();

  async function name() {
    // await DataStore.delete(TODO, Predicates.ALL);
    let posts = await userAPI.getUserList();
    setUserList(posts);
  }
  useEffect(() => {
    name();
  }, []);

  async function onSubmit() {
    let data = {
      firstname: Name,
      lastname: info,
      email: email,
    };
    await userAPI.handleSubmitforTodo(data);
    name();
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
          <h1 className={styles.title}>Student</h1>
          <div className="row form">
            <div className="col-md-12 ">
              <fieldset>
                <label>First Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  onChange={(e) => setName(e.target.value)}
                />
                <label>Last name:</label>
                <input
                  type="text"
                  id="desc"
                  name="desc"
                  required
                  onChange={(e) => setinfo(e.target.value)}
                />
                <label>Email:</label>
                <input
                  type="text"
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
            {UserList.map((ival) => (
              <div className="card" style={{ padding: 10, margin: 10 }}>
                <div className="card-body row">
                  <div className="col-lg-6">
                    <h5>{ival.firstname} </h5>
                    <p>{ival.lastname}</p>
                    <p>{ival.email}</p>
                    <p style={{ color: "#4bc970", fontSize: 10 }}>
                      {moment(ival.createdAt).format("DD-MM-YYYY HH:MM:SS")}
                    </p>
                  </div>
                  <div className="col-lg-6">
                    <span
                      className="material-symbols-outlined col-lg-6"
                      onClick={() => router.push(`/user/${ival.id}`)}
                    >
                      edit
                    </span>
                    {/* <span
                      className="material-symbols-outlined col-lg-6"
                      onClick={() => HandleDeltee(ival.id)}
                    >
                      delete
                    </span> */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
