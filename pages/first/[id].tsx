import { NextPage } from "next";
import { withApollo } from "../../lib/apollo";
import { useRouter } from "next/router";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { FunctionComponent } from "react";
import { FirstItem } from "../../interfaces/home.interface";

const DETAIL_FIRST = gql`
  query Detail($id: Int) {
    api_first_detail(id: $id) {
      id
      title
      itemType
      createdAt
      desc
      icon
      links
    }
  }
`;

const ItemDetail: FunctionComponent<{ meta: FirstItem }> = function({
  meta: { id, title, itemType, createdAt, desc, icon, links }
}) {
  return (
    <div>
      <div className="icon">{icon}</div>
      <h3 className="title">{title || "-"}</h3>
      <div className="desc">{desc || "-"}</div>
      <div className="links">{links || "-"}</div>
      <div className="itemType">{itemType || "-"}</div>
      <div className="createdAt">{new Date(createdAt).toLocaleString()}</div>
    </div>
  );
};

const First: NextPage<any, any> = function() {
  const router = useRouter();
  const { id } = router.query;
  const { loading, data, error, refetch, updateQuery } = useQuery(
    DETAIL_FIRST,
    { variables: { id: +id } }
  );

  return (
    <div>
      <h1>First Detail: {id}</h1>
      {loading || error ? `${loading || error}` : null}
      {data && data.api_first_detail ? (
        <ItemDetail meta={data.api_first_detail} />
      ) : null}
    </div>
  );
};

export default withApollo(First, { ssr: false });
