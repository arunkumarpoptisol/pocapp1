import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { TODO } from "../src/models";
import styles from "../styles/Home.module.css";
import moment from "moment";
import TodoApi from "../src/modules/todoAPI";

export default function home() {
  const [TODOO, setTODOO] = useState<TODO[]>([]);
  const [Name, setName] = useState("");
  const [info, setinfo] = useState("");
  const router = useRouter();

  async function name() {
    // await DataStore.delete(TODO, Predicates.ALL);
    let posts = await TodoApi.getTodoList();
    setTODOO(posts);
  }
  useEffect(() => {
    name();
  }, []);

  async function onSubmit() {
    await TodoApi.handleSubmitforTodo(Name, info);
    name();
  }
  async function HandleDeltee(id: string) {
    const todelete = await TodoApi.getTodobyid(id);
    if (todelete) {
      await TodoApi.handleDelete(todelete);
      name();
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
          <h1 className={styles.title}>TODO</h1>
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
                <label>Desc:</label>
                <input
                  type="text"
                  id="desc"
                  name="desc"
                  required
                  onChange={(e) => setinfo(e.target.value)}
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
            {TODOO.map((ival) => (
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
                      onClick={() => router.push(`/todo/${ival.id}`)}
                    >
                      edit
                    </span>
                    <span
                      className="material-symbols-outlined col-lg-6"
                      onClick={() => HandleDeltee(ival.id)}
                    >
                      delete
                    </span>
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
