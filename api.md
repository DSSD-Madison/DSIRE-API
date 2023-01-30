Query
=====
Search the database.

- ## URL
  `/api/query`

- ## Method
  `⬇️ GET`

- ## Authorization
  🔐 Requires token in `Authorization` header  
  Supply exactly the token obtained from signing in at the [DSIRE-API web portal](https://google.com/).  
  ℹ️ This route additionally requires a premium account!
  📍 `"Bearer"` or other such prefixes to the token are not required; supply precisely the provided token in the header.

- ## Query Parameters
  ### Optional:
    - `states=[str,...]`  
      Restrict data to a comma-separated list of states.  
      When unspecified, data represents all states in the database.  
      States are specified by their US postal abbreviation (MN, IA, WI) or US for nation-wide; some
      special territory abbreviations are available. See [Schema: States](#schema-states).  
      **Error Response:**  
      ❗ Querying any invalid state will result in an error response.

    - `category="FI"|"RP"`  
      Restrict data returned to either Financial Inventives ("FI") or Regulatory Policies ("RP").  
      When unspecified, data represents both types of benefits.  
      ℹ️ FI or RP can be upper-, lower-, or mixed-case.  
      ⚠️ Querying any invalid policy (anything not "FI" or "RP") is ignored.  
      **Error Response:**  
      ❗ Querying both valid categories will result in an error response.

    - `pageSize=int:50`  
      Limit the maximum quantity of incentives to the provided value.  
      Defaults to 50 entries.  
      📍 Querying with a page size of 0 allows you to determine the size of the query without moving any data.  
      ⚠️ Querying a negative value or a non-integer is ignored for the default.

    - `page=int:0`  
      Specify which page of incentives to retrieve. Pages are indexed from 0 (if 5 pages are
      available, valid pages to request are 0 through 4, inclusive).  
      Negative values can be used to query from the end of the results: if 10 pages (0-9) are available...  
      `page=0`, `page=1` query pages 0 and 1, respectively  
      `page=-1`, `page=-2` query pages 9 and 8, respectively  
      ⚠️ Querying a non-integer page value is ignored.  
      **Error Response:**  
      ❗ Querying a page value outside of the possible page range will result in an error response.

- ## Body Parameters
  None accepted; any body provided is ignored

- ## Success Response
  - ### No query parameters:
    Code: `🟢 200 OK`  
    Body: `text/json`

        {
            incentives: [
                {
                    name: "Building Energy Code",
                    state: "Minnesota",
                    shortState: "MN",
                    category: "Financial Incentive",
                    type: "Rebate Program",
                    startDate: "2003-02-19",
                    endDate: "2021-03-03",
                    url: "minn.gov/code"
                },
                ...
            ],
            page: 0,
            pages: 3,
            pageSize: 50,
            results: 4815
        }

- ## Error Response
  - ### Without supplying [authorization](#authorization):
    Code: `⛔ 401 UNAUTHORIZED`  
    Body: `text/json`

        {
             message: "Unauthorized"
        }

  - ### With malformed or expired [authorization](#authorization):
    Code: `⛔ 403 FORBIDDEN`  
    Body: `text/json`

        {
             Message: "Access Denied"
        }

  - ### With a valid token for a free account:
    Code: `⛔ 403 FORBIDDEN`  
    Body: `text/json`

        {
            error: {
                code: 403
                message: "You are authenticated as DSIRE-API-Username, but this account does not have premium access."
            }
        }

  - ### With a formerly-valid token for an account which has expired:
    Code: `⛔ 401 UNAUTHORIZED`  
    Body: `text/json`

        {
            message: "The incoming token has expired"
        }

  - ### With malformed `&state=`:
    Code: `🚫 400 BAD REQUEST`  
    Body: `text/json`

        {
            error: {
                code: 400,
                message: "Malformed states in query: ['AA', 'BB']"
            }
        }

  - ### With malformed `&category=`:
    Code: `🚫 400 BAD REQUEST`  
    Body: `text/json`

        {
            error: {
                code: 400,
                message: "Queried both FI and RP; only one per request is valid"
            }
        }

  - ### With out-of-range `&page=`:
    Code: `🚫 400 BAD REQUEST`  
    Body: `text/json`

        {
            error: {
                code: 400,
                message: "Requested page 42; maximum was 23 for pageSize=1000"
            }
        }

- ## Meta
  **Since**: `1.0.0`  
  **Changelog**:


Schema: States
==============
Learn the available states for `&states=` at `/api/query`.

- ## URL
  `/api/schema/states`

- ## Method
  `⬇️ GET`

- ## Authorization
  None

- ## Query Parameters
  None

- ## Body Parameters
  None

- ## Success Response
  Code: `🟢 200 OK`  
  Body: `text/json`

      {
          states: [
          {
              state: "Virginia",
              shortState: "VA"
          },
          {
              state: "Wisconsin",
              shortState: "WI"
          },
          ...
          ]
      }

- ## Error Response
  None

- ## Meta
  **Since**: `1.0.0`  
  **Changelog**:
