import {createGraphiQLFetcher} from "@graphiql/toolkit"
import {GraphiQL} from "graphiql"
import React from "react";
import ReactDOM from "react-dom"

import 'graphiql/graphiql.css'


const runner = createGraphiQLFetcher({url: `${document.getElementById("API_URL").innerText}/graphql`});

ReactDOM.render(
    <GraphiQL fetcher={runner}/>,
    document.getElementById("root")
);
