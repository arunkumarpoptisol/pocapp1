import { DataStore } from "aws-amplify";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Standard, StandardType } from "../src/models";
import StandardAPI from "../src/modules/standardAPI";
import styles from "../styles/Home.module.css";

export const ReactExample1 = ({ name, value, handleChange, option }: any) => (
  <select name={name} value={value} onChange={handleChange}>
    {option.map((item: any) => (
      <option value={item}>{item}</option>
    ))}
  </select>
);

export default function StandardUI() {
  const [Name, setName] = useState("");
  const [info, setinfo] = useState("");
  const [type, settype] = useState("");
  const [Standarddata, setStandarddata] = useState<Standard[]>([]);
  const router = useRouter();

  async function getData() {
    // let data = await StandardAPI.getStandardList();
    // setStandarddata(data);
  }
  useEffect(() => {
    const subscription = DataStore.observeQuery(Standard).subscribe((msg) => {
      console.log(msg);
      setStandarddata(msg.items);
    });

    return () => {
      subscription && subscription.unsubscribe();
    }; 
    // getData();
  }, []);

  async function handleSubmit() {
    let data = {
      name: Name,
      description: info,
      type: type,
    };
    await StandardAPI.handleSubmitforstnd(data);
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
          <h1 className={styles.title}>Standard</h1>
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
                <label>Type:</label>
                <ReactExample1
                  name="Type"
                  option={Object.keys(StandardType)}
                  value={type}
                  handleChange={(e: any) => {
                    settype(e.target.value);
                  }}
                />
              </fieldset>
            </div>
            <button type="button" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </div>
        <div className="col">
          {Standarddata.map((ival) => (
            <div className="card" style={{ padding: 10, margin: 10 }}>
              <div className="card-body row">
                <div className="col-lg-6">
                  <h5>{ival.name} </h5>
                  <p>{ival.description}</p>
                  <p>{ival.type}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
