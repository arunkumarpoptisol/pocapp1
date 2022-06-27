import { Auth } from "aws-amplify";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuth } from "./userProvider";

export function GuardProvider({ children }: any) {
  const { user, initializing } = useAuth();

  const router = useRouter();
  useEffect(() => {
    if (!initializing) {
      //auth is initialized and there is no user
      if (!user && router.pathname.split("/")[1] != "login") {
        // void router.push("/login");
        return;
      }
    }
  }, [user, initializing, router]);

  if (initializing) {
    return <div>Loading...</div>;
  }

  if (!initializing && user) {
    return (
      <div>
        User: {user.attributes.name}
        <div className="d-inline-flex p-2">
          <button onClick={() => Auth.signOut()}>Sign Out</button>
        </div>
        <div className="d-flex justify-content-center">
          <Link href="/">Home</Link> &nbsp; &nbsp;
          <Link href="/home">TODO</Link> &nbsp; &nbsp;
          <Link href="/user/reg">Student</Link> &nbsp; &nbsp;
          <Link href="/course">Course</Link> &nbsp; &nbsp;
          <Link href="/Standard">Standard</Link> &nbsp; &nbsp;
        </div>
        <hr />
        {children}
      </div>
    );
  }

  if (!initializing && router.pathname.split("/")[1] === "login") {
    return <div>{children}</div>;
  }
  return null;
}
