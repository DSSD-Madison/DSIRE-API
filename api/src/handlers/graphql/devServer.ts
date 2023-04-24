import {createServer} from "http"
import {createYoga} from "graphql-yoga"
import {PrismaClient} from "@prisma/client"

import schema from "./schema"


createServer(createYoga({schema, context: {prisma: new PrismaClient()}})).listen(8080, () => console.log("Listening on http://localhost:8080/graphql"));
