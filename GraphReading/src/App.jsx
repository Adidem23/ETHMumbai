import { useEffect } from "react"
import { createClient } from 'urql';

const App = () => {

  const QueryURL = "https://gateway.thegraph.com/api/8197cfefb70a8065bd3937bd6df95d08/subgraphs/id/2x1zbcjLiHYb5pz4n6ULjJAsKLLKgNB1jcBHxjj6UKKm";

  const Query = `{
    factories(first: 5) {
      id
      poolCount
      txCount
      totalVolumeUSD
    }
    bundles(first: 5) {
      id
      ethPriceUSD
    }
  }`

  const Client = createClient({
    url: QueryURL
  })


  useEffect(() => {

    const getTokens = async () => {

      const data=await Client.query(Query).toPromise();
      console.log(data)


    }

    getTokens();

  }, []);


  return (
    <div>This is GraphQL Tutorials </div>
  )
}

export default App