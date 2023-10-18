The DSIRE API Ecosystem
=======================

Contents
--------

1. [Application Infrastructure](#application-infrastructure)
2. [GitHub Environment Variables/Secrets](#github-environment-variablessecrets)
3. [Deploying the Ecosystem on AWS](#deploying-the-ecosystem-on-aws)
4. [Deploying for Testing During Development](#deploying-for-testing-during-development)
5. [Using GitHub Actions CD](#using-github-actions-cd)
6. [API Specifications](#api-specifications)
    - [GraphQL API (Agnes)](#agnes)
    - [Verification API (Betty)](#betty)

--------------------------------------------------------------------------------


### Application Infrastructure

The ecosystem consists of three logical components powered by several AWS
entities.

- **Agnes**: a GraphQL API providing a holistic view on the programs database
- **Betty**: a verification API posing a registration challenge and initiating
  the token authorization flow
- **Clara**: a statically-rendered site providing an interface for the
  authorization flow and a platform for further UI

The components are maintained using the CloudFormation templates in `cf/`. Their
relation to the components is best understood by tracing a request to each.
Italicized parentheticals denote the logical names of CloudFormation resources
in their respective template.

#### Agnes
`GET http://apigateway-url.com/STAGE_NAME/api/graphql/`

The request arrives at an API Gateway *(DsireApi/Api)*, which selects the
correct Lambda handler *(DsireApiHandlers/Agnes)* version for serving the
request using `STAGE_NAME` and matching stage variables (parameterized at the
time the handlers are deployed; see [Deploying for Testing During
Development](#deploying-for-testing-during-development)). For Agnes, only the
`graphql/` endpoint is proxied and handled as a GraphQL API
*(DsireApi/AgnesResource & DsireApiHandlers/Agnes)*, whereas Betty proxy-passes
the entire request URL after `verification/`, resolving `/api/verification/...`
*(DsireApi/BettyProxyResource & DsireApiHandlers/Betty)* as a REST API. The
handler (Agnes) is made a member of the program database's VPC to facilitate
populating the response. *Internet gateways are expensive, so a second handler
is thus required to facilitate verification humanness/mailing*.

#### Betty
`GET http://apigateway-url.com/STAGE_NAME/api/verification/ENDPOINT/`

The request proceeds as above. The handler, not a member of any VPC, implements
a simple REST API and userflow for `ENDPOINT` described in [Verification API
("Betty")](#betty) for generating user tokens.

#### Clara
`GET http://root-hosting-url.com/PAGE/`

A hosting provider responds with `PAGE`, where the webroot is `clara/dist/`
after rendering `clara/templates/` using `clara/render.sh`.


### GitHub Environment Variables/Secrets

Each is required for basic application functionality. If unconfigured or
out-of-date in the deployment environment, update them.

| GitHub ref                       | Usage                                                                                               |
|:---------------------------------|:----------------------------------------------------------------------------------------------------|
| secrets.AWS_CD_ROLE_ARN          | The ARN assumed by GitHub Actions during CD workflows.                                              |
| secrets.DB_PASSWORD              | The password of a database user having SELECT on `programs_prod.*`.                                 |
| vars.AWS_REGION                  | The AWS region GitHub Actions deploys to.                                                           |
| vars.DB_DATABASE                 | The name of the programs database (`programs_prod`).                                                |
| vars.DB_HOST                     | The hostname of the programs database (`ncsolardevmysql.crll8akiiuas.us-east-1.rds.amazonaws.com`). |
| vars.DB_PORT                     | The port the database is hosted on (`3306`).                                                          |
| vars.DB_USER                     | The username of a database user having SELECT on `programs_prod.*`.                                 |
| vars.NODE_OPTIONS                | Command-line options for Lambda's Node.js enironment.                                               |
| vars.NODE_VERSION_GITHUB_ACTIONS | The Node.js version to use in GitHub Actions workflows.                                             |


### Deploying the Ecosystem on AWS

All mentioned CloudFormation templates are located in the `cf/` directory.
Remember to tag them if desired!  
*Asterisks identify components of the deployment which were automated at one
point. `git switch old-automated` to view how this was accomplished.*

#### Bootstrapping GitHub Actions

1. Deploy `GitHubActionsCD`. This creates an IAM role
  *(GitHubActionsCD/GitHubActionsRole)* which will be assumed by GitHub Actions
  via OIDC during CD workflows.

#### Deploying the API Infrastructure*

1. Deploy `DsireApi`, optionally configuring the API's endpoints according to the
  parameters.

#### Deploying Production Handlers*

1. Deploy `DsireApiHandlers` and set the parameter `Name` to `main`. These are
   the handlers which will receive packages from the GitHub Actions deployments.  
   To retrieve the staged (query) URL for the production API, navigate to [API
   Gateway][1], select `DsireApi`, select **Stages** in the leftmost navigation
   panel, and select `main` from the navigation panel which appears to the right.
   The staged URL appears next to the heading **Invoke URL**. This is the URL all
   documentation is assumed to be prefixed with and should be distributed to
   customers or proxied to another URL.

  [1]: https://us-east-1.console.aws.amazon.com/apigateway/main/apis?region=us-east-1 "API Gateway on us-east-1"


### Deploying for Testing During Development*

1. Ensure the following dependencies (`PATH` binaries) are available in your
   shell:
   - AWS CLI 2.x.x (`aws`)
   - Zip (`zip`)
2. Deploy an additional instance of `DsireApiHandlers` and set the parameter
  `Name` to anything valid other than `main`. Set the variable
  `DSIRE_API_DEPLOY_STAGE` in your shell environment to the same value.  
   That `Name` will be the stage used to query your testing deployment--retrieve
   its staged URL as described in [Deploying Production
   Handlers](#deploying-production-handlers), selecting the `Name` you chose
   instead of `main` under **Stages**, or replace `main` in the URL from above
   with the value of `Name` you selected.
3. [Confiure][2] the AWS CLI for your AWS cloud.
4. With working directory `agnes/` or `betty/`, execute either `npm run build`
   or `npm run build-dev` as desired for your deployment, followed by `npm run
   package` and `npm run deploy`. Either Agnes or Betty will be updated with a
   package containing your version of their handler. Note that quick edits may
   be made directly in the AWS Console, if you don't mind scrolling past the
   bundler emissions :)
5. Congifure necessary environment variables in Lambda for your use-case, or
   dispatch the `AWS Environment Sync` GitHub workflow with the value you chose
   for the parameter `Name` to populate that handler with the production (branch
   `main`) environment.
6. When finished testing, delete your deployment of `DsireApiHandlers`. Some
   deployment artifacts may be left in AWS-generated S3 buckets, which can be
   removed as desired.

[2]: https://docs.aws.amazon.com/cli/latest/userguide/getting-started-quickstart.html "Set up the AWS CLI"


### Using GitHub Actions CD

After deployment as described in [Deploying the Ecosystem on
AWS](#deploying-the-ecosystem-on-aws), any tagged commit matching `v*` will be
deployed to the handlers configured in [Deploying Production
Handlers](#deploying-production-handlers).  
GitHub requires this deployment to have succeeded before a commit is eligible to
be referenced from branch `main`.


### API Specifications

#### GraphQL API (Agnes)

[GraphQL](https://graphql.org/) is a query language for APIs. As opposed to a
Rest API which has specifically defined query parameters and endpoints, GraphQL
provides users greater flexibility to specify the data they would like to be
returned. GraphQL is not a storage model or database query language. The graph
refers to graph structures defined in the schema, where nodes define objects and
edges define relationships between objects. the API traverses and returns
application data based on the schema definitions, independent of how the data is
stored.

For user purposes, the GraphQL API has one endpoint to request information about
certain DSIRE incentive programs: `http://apigateway-url.com/STAGE_NAME/api/graphql/`

Since GraphQL parameters are discoverable, the DSIRE GraphQL schema can be
queried for details about itself. The `__schema` keyword can be queried to list
all types defined in the schema and retrieve details about each:

```graphql
{
    __schema {
        types {
            name
            kind
            fields {
                name
            }
        }
    }
}
```

Queries are built by specifying fields within fields until only scalars are
returned. Scalars are primitives such as: `Int`,`Float`,`String`, or `Boolean`.

##### GraphQL API Query Examples

The below query and variables demonstrate a majority of query functionality
presently available. Some filters are left unused.

```graphql
fragment sectorMetadata on ImplementingSector {
  id
  name
  active
}

query Query($whereProgram: WhereProgram, $page: PageInput) {
  program(where: $whereProgram, page: $page) {
    data {
      id
      is_entire_state
      name
      start_date
      end_date
      summary(first: 16)
      implementing_sector {
        id
        name
        active
      }
    }
    page {
      limit
      offset
    }
  }
  firstSectorQuery: implementing_sector(where: {
    name: {
      in: ["State"]
    }
  }) {
    firstSectorData: data {
      ...sectorMetadata
    }
    page {
      limit
      offset
    }
  }
  secondSectorQuery: implementing_sector(where: {
    name: {
      notIn: ["State", "Local"]
    }
  }) {
    secondSectorData: data {
      ...sectorMetadata
    }
  }
}
```

```json
{
  "whereProgram": {
    "id": {
      "gt": 200
    },
    "name": {
      "contains": "Property Tax"
    },
    "start_date": {
      "lt": "2010-01-01"
    },
    "implementing_sector": {
      "name": {
        "notIn": ["State", "Federal"]
      }
    }
  },
  "page": {
    "limit": 5,
    "offset": 0
  }
}
```

#### Verification API (Betty)
