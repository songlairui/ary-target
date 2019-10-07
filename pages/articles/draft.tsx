import React from "react";
import MainLayout from "../../components/MainLayout";

import KeygenEditor from "../../components/KeygenEditor";
import Plain from "slate-plain-serializer";

export default function Draft() {
  return (
    <MainLayout>
      <div className="wrapper">
        <KeygenEditor
        // onChange={({ value }: any) => {
        //   console.info(Plain.serialize(value));
        // }}
        />
      </div>
      <style jsx>
        {`
          .wrapper {
            width: 100%;
            background: rgb(255, 255, 255);
            margin: 20px auto;
            padding: 20px;
          }
        `}
      </style>
    </MainLayout>
  );
}
