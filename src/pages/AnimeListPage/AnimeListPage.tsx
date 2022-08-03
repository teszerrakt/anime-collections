import { useQuery } from "@apollo/client";
import { ANIME_LIST } from "../../gql/queries";

export default function AnimeListPage() {
  const { loading, error, data } = useQuery(ANIME_LIST)

  if (loading) return <div>Loading ...</div>
  if (error) return <div>{JSON.stringify(error)}</div>

  return <div>{JSON.stringify(data, null, 2)}</div>
}