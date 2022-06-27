import moment from "moment";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { TODO, Commentdata } from "../../src/models";
import TodoApi from "../../src/modules/todoAPI";
import styles from "../../styles/Home.module.css";

export default function TODOITEM() {
  const router = useRouter();
  const { todoId } = router.query;

  const [Name, setName] = useState("");
  const [info, setinfo] = useState("");
  const [Comment, setComment] = useState("");
  const [CommentList, setCommentList] = useState<Commentdata[]>([]);
  useEffect(() => {
    handleMount();
  }, []);
  async function handleMount() {
    if (typeof todoId === "string") {
      let updateData = await TodoApi.getTodobyid(todoId);
      if (updateData) {
        setName(updateData.name);
        setinfo(updateData.desc);
      }
      const comments = await TodoApi.getComment(todoId);
      setCommentList(comments);
    }
  }

  async function onUpdate() {
    if (typeof todoId === "string") {
      let updateData = await TodoApi.getTodobyid(todoId);
      if (updateData) {
        let data = { name: Name, desc: info };
        await TodoApi.handleUpdatefortodo(updateData, data);
        router.push("/home");
      }
    }
  }
  async function onComment() {
    if (typeof todoId === "string") {
      await TodoApi.handleComment({ content: Comment, todoID: todoId });
      handleMount();
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
          <h1 className={styles.title}>
            <span
              className="material-symbols-outlined"
              style={{ fontSize: 50 }}
              onClick={() => router.push("/home")}
            >
              arrow_back
            </span>
            TODO
          </h1>
          <div className="row form">
            <div className="col-md-12 ">
              <fieldset>
                <label>Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={Name}
                  onChange={(e) => setName(e.target.value)}
                />
                <label>Desc:</label>
                <input
                  type="text"
                  id="desc"
                  name="desc"
                  value={info}
                  required
                  onChange={(e) => setinfo(e.target.value)}
                />
              </fieldset>
            </div>
            <button type="button" onClick={onUpdate}>
              Update
            </button>
          </div>
        </div>
        <div className="col">
          <h5 className={styles.title}>Comments</h5>

          <label>Comment:</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={Comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button type="button" onClick={onComment}>
            Comment
          </button>

          {CommentList.map((ival) => (
            <div className="card" style={{ padding: 10, margin: 10 }}>
              <div className="card-body row">
                <div className="col-lg-12">
                  <p>{ival.content}</p>
                  <p style={{ color: "#4bc970", fontSize: 10 }}>
                    {moment(ival.createdAt).format("DD-MM-YYYY HH:MM:SS")}
                  </p>
                </div>
                {/* <div className="col-lg-6">
                  <span
                    className="material-symbols-outlined col-lg-6"
                    onClick={() => router.push(`/${ival.id}`)}
                  >
                    edit
                  </span>
                  <span
                    className="material-symbols-outlined col-lg-6"
                    onClick={() => HandleDeltee(ival.id)}
                  >
                    delete
                  </span>
                </div> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
