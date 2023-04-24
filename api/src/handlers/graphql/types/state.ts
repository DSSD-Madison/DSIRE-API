import {
  GraphQLEnumType as QlEnum,
  GraphQLObjectType as QlObject,
  GraphQLString as QlString
} from "graphql"


export enum StateId_t {
  AL = 1,
  AK = 2,
  AZ = 3,
  AS = 4,
  AR = 5,
  CA = 6,
  CO = 7,
  CT = 8,
  DE = 9,
  DC = 10,
  US = 11,
  FL = 12,
  GA = 13,
  GU = 14,
  HI = 15,
  ID = 16,
  IL = 17,
  IN = 18,
  IA = 19,
  KS = 20,
  KY = 21,
  LA = 22,
  ME = 23,
  MD = 24,
  MA = 25,
  MI = 26,
  MN = 27,
  MS = 28,
  MO = 29,
  MT = 30,
  MP = 31,
  NE = 32,
  NV = 33,
  NH = 34,
  NJ = 35,
  NM = 36,
  NY = 37,
  NC = 38,
  ND = 39,
  OH = 40,
  OK = 41,
  OR = 42,
  PW = 43,
  PA = 44,
  PR = 45,
  RI = 46,
  SC = 47,
  SD = 48,
  TN = 49,
  TX = 50,
  UT = 51,
  VT = 52,
  VI = 53,
  VA = 54,
  WA = 55,
  WV = 56,
  WI = 57,
  WY = 58,
  MH = 59,
  FM = 60
}
export const StateId = new QlEnum({
  name: "StateId",
  description: "A US state or territory",
  values: {
    AL: {
      value: 1,
      description: "Alabama"
    },
    AK: {
      value: 2,
      description: "Alaska"
    },
    AZ: {
      value: 3,
      description: "Arizona"
    },
    AS: {
      value: 4,
      description: "?"
    },
    AR: {
      value: 5,
      description: "Arkansas"
    },
    CA: {
      value: 6,
      description: "California"
    },
    CO: {
      value: 7,
      description: "Colorado"
    },
    CT: {
      value: 8,
      description: "Conneticut"
    },
    DE: {
      value: 9,
      description: "Delaware"
    },
    DC: {
      value: 10,
      description: "Washington, D.C."
    },
    US: {
      value: 11,
      description: "?"
    },
    FL: {
      value: 12,
      description: "Florida"
    },
    GA: {
      value: 13,
      description: "Georgia"
    },
    GU: {
      value: 14,
      description: "?"
    },
    HI: {
      value: 15,
      description: "Hawaii"
    },
    ID: {
      value: 16,
      description: "Idaho"
    },
    IL: {
      value: 17,
      description: "Illinois"
    },
    IN: {
      value: 18,
      description: "Indiana"
    },
    IA: {
      value: 19,
      description: "Iowa"
    },
    KS: {
      value: 20,
      description: "Kansas"
    },
    KY: {
      value: 21,
      description: "Kentucky"
    },
    LA: {
      value: 22,
      description: "Louisiana"
    },
    ME: {
      value: 23,
      description: "Maine"
    },
    MD: {
      value: 24,
      description: "Maryland"
    },
    MA: {
      value: 25,
      description: "Massachusetts"
    },
    MI: {
      value: 26,
      description: "Michigan"
    },
    MN: {
      value: 27,
      description: "Minnesota"
    },
    MS: {
      value: 28,
      description: "Mississippi"
    },
    MO: {
      value: 29,
      description: "Missouri"
    },
    MT: {
      value: 30,
      description: "Montana"
    },
    MP: {
      value: 31,
      description: "?"
    },
    NE: {
      value: 32,
      description: "Nebraska"
    },
    NV: {
      value: 33,
      description: "Nevada"
    },
    NH: {
      value: 34,
      description: "New Hampshire"
    },
    NJ: {
      value: 35,
      description: "New Jersey"
    },
    NM: {
      value: 36,
      description: "New Mexico"
    },
    NY: {
      value: 37,
      description: "New York"
    },
    NC: {
      value: 38,
      description: "North Carolina"
    },
    ND: {
      value: 39,
      description: "North Dakota"
    },
    OH: {
      value: 40,
      description: "Ohio"
    },
    OK: {
      value: 41,
      description: "Oklahoma"
    },
    OR: {
      value: 42,
      description: "Oregon"
    },
    PW: {
      value: 43,
      description: "?"
    },
    PA: {
      value: 44,
      description: "Pennsylvania"
    },
    PR: {
      value: 45,
      description: "Puerto Rico"
    },
    RI: {
      value: 46,
      description: "Rhode Island"
    },
    SC: {
      value: 47,
      description: "South Carolina"
    },
    SD: {
      value: 48,
      description: "South Dakota"
    },
    TN: {
      value: 49,
      description: "Tennessee"
    },
    TX: {
      value: 50,
      description: "Texas"
    },
    UT: {
      value: 51,
      description: "Utah"
    },
    VT: {
      value: 52,
      description: "Vermont"
    },
    VI: {
      value: 53,
      description: "U.S. Virgin Islands"
    },
    VA: {
      value: 54,
      description: "Virginia"
    },
    WA: {
      value: 55,
      description: "Washington"
    },
    WV: {
      value: 56,
      description: "West Virginia"
    },
    WI: {
      value: 57,
      description: "Wisconsin"
    },
    WY: {
      value: 58,
      description: "Wyoming"
    },
    MH: {
      value: 59,
      description: "?"
    },
    FM: {
      value: 60,
      description: "?"
    }
  }
});

export type State_t = {
  id: StateId_t
  name: string
}
export const State = new QlObject({
  name: "State",
  description: "A US state or territory",
  fields: {

    id: {
      type: StateId,
      description: "hi"
    },

    name: {
      type: QlString,
      description: "hi"
    }
  }
});
