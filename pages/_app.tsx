import "../styles/globals.css";
import type { AppProps } from "next/app";
import config from "../src/aws-exports";
import { Amplify } from "aws-amplify";
import { Provider } from "../Componet/Provider";
import { UserProvider } from "../Componet/userProvider";
import { GuardProvider } from "../Componet/Guard";
import { SchoolProvider } from "../Componet/SchoolProvider";
import Link from "next/link";

Amplify.configure(config);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider>
      <UserProvider>
        <SchoolProvider>
          {/* <GuardProvider> */}
          <div className="d-flex justify-content-center">
            <Link href="/">Home</Link> &nbsp; &nbsp;
            <Link href="/home">TODO</Link> &nbsp; &nbsp;
            <Link href="/user/reg">Student</Link> &nbsp; &nbsp;
            <Link href="/course">Course</Link> &nbsp; &nbsp;
            <Link href="/Standard">Standard</Link> &nbsp; &nbsp;
          </div>
          <hr />
          <Component {...pageProps} />
          {/* </GuardProvider> */}
        </SchoolProvider>
      </UserProvider>
    </Provider>
  );
}

export default MyApp;
