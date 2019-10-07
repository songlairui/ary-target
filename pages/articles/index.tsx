import React from "react";
import { Button } from "antd";
import Router from "next/router";
import MainLayout from "../../components/MainLayout";

export default function Article() {
  return (
    <MainLayout>
      List
      <Button
        onClick={() => {
          Router.push("/articles/draft");
        }}
      >
        + Draft
      </Button>
    </MainLayout>
  );
}
