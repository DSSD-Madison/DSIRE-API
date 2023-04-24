"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_1 = require("graphql");
function rename(input, map) {
    return map[input] || input;
}
var Sortable = new graphql_1.GraphQLInputObjectType({
    name: "Sortable",
    fields: {
        field: {
            type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLString),
            description: "hi"
        },
        direction: {
            type: graphql_1.GraphQLString,
            description: "hi",
            defaultValue: "asc"
        }
    }
});
var Filterable = new graphql_1.GraphQLInputObjectType({
    name: "Filterable",
    fields: {
        field: {
            type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLString),
            description: "hi"
        },
        contains: {
            type: graphql_1.GraphQLString,
            description: "hi"
        },
        inInts: {
            type: (0, graphql_1.GraphQLList)(graphql_1.GraphQLInt),
            description: "hi"
        },
        inStrs: {
            type: (0, graphql_1.GraphQLList)(graphql_1.GraphQLString),
            description: "hi"
        },
        lt: {
            type: graphql_1.GraphQLInt,
            description: "hi"
        },
        gt: {
            type: graphql_1.GraphQLInt,
            description: "hi"
        }
    }
});
var PageInfo = new graphql_1.GraphQLObjectType({
    name: "PageInfo",
    description: "Pagination status for the current query",
    fields: {
        hasPreviousPage: {
            type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLBoolean),
            description: "hi"
        },
        hasNextPage: {
            type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLBoolean),
            description: "hi"
        },
        page: {
            type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLInt),
            description: "hi"
        },
        previousPage: {
            type: graphql_1.GraphQLInt,
            description: "hi"
        },
        nextPage: {
            type: graphql_1.GraphQLInt,
            description: "hi"
        }
    }
});
var ProgramCategoryId = new graphql_1.GraphQLEnumType({
    name: "ProgramCategoryId",
    description: "The filing category of the program: either \"financial incentive\" or \"regulatory policy\"",
    values: {
        FINANICAL_INCENTIVE: {
            value: 1,
            description: "Financial Incentive"
        },
        REGULATORY_POLICY: {
            value: 2,
            description: "Regulatory Policy"
        }
    }
});
var ProgramCategory = new graphql_1.GraphQLObjectType({
    name: "ProgramCategory",
    description: "The filing category of the program; either a \"Financial Incentive\" or a \"Regulatory Policy\"",
    fields: {
        id: {
            type: ProgramCategoryId,
            description: "hi"
        },
        name: {
            type: graphql_1.GraphQLString,
            description: "hi"
        }
    }
});
var StateId = new graphql_1.GraphQLEnumType({
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
var State = new graphql_1.GraphQLObjectType({
    name: "State",
    description: "A US state or territory",
    fields: {
        id: {
            type: StateId,
            description: "hi"
        },
        name: {
            type: graphql_1.GraphQLString,
            description: "hi"
        }
    }
});
var Program = new graphql_1.GraphQLObjectType({
    name: "Program",
    description: "A financial incentive or regulatory policy",
    fields: {
        name: {
            type: graphql_1.GraphQLString,
            description: "The official title of the program"
        },
        url: {
            type: graphql_1.GraphQLString,
            description: "hi"
        },
        startDate: {
            type: graphql_1.GraphQLString,
            description: "hi",
            resolve: function (obj) { return obj.startDate ? new Date(obj.startDate).toDateString() : null; }
        },
        endDate: {
            type: graphql_1.GraphQLString,
            description: "hi"
        },
        summary: {
            type: graphql_1.GraphQLString,
            description: "hi"
        },
        programCategory: {
            type: ProgramCategory,
            description: "hi"
        },
        programType: {
            type: graphql_1.GraphQLString,
            description: "hi",
            resolve: function (obj) { return obj.programType.name; }
        },
        state: {
            type: State,
            description: "The US state or territory implementing this program"
        },
        zips: {
            type: (0, graphql_1.GraphQLList)(graphql_1.GraphQLString),
            description: "hi",
            resolve: function (obj) { return obj.zips.map(function (programZip) { return programZip.zip.code; }); }
        }
    }
});
exports.default = new graphql_1.GraphQLSchema({
    query: new graphql_1.GraphQLObjectType({
        name: "Query",
        description: "root",
        fields: {
            programs: {
                type: new graphql_1.GraphQLObjectType({
                    name: "QueryResults",
                    description: "hi",
                    fields: {
                        results: {
                            type: (0, graphql_1.GraphQLList)(Program),
                            description: "hi"
                        },
                        pageInfo: {
                            type: PageInfo,
                            description: "hi"
                        }
                    },
                }),
                description: "hi",
                args: {
                    page: {
                        type: graphql_1.GraphQLInt,
                        description: "hi",
                        defaultValue: 0
                    },
                    pageSize: {
                        type: graphql_1.GraphQLInt,
                        description: "After...",
                        defaultValue: 25
                    },
                    filter: {
                        type: (0, graphql_1.GraphQLList)(Filterable),
                        description: "hi"
                    },
                    sort: {
                        type: (0, graphql_1.GraphQLList)(Sortable),
                        description: "hi"
                    }
                },
                resolve: function (obj, args, ctx, info) { return __awaiter(void 0, void 0, void 0, function () {
                    var where, orderBy, programs, pageData;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                where = {};
                                if (args.filter) {
                                    args.filter.forEach(function (filter) {
                                        var field = filter.field, constraints = __rest(filter, ["field"]);
                                        for (var _i = 0, _a = Object.entries(constraints); _i < _a.length; _i++) {
                                            var _b = _a[_i], key = _b[0], value = _b[1];
                                            var constraint = key;
                                            if (filter[constraint] && value) {
                                                where[field] || (where[field] = {});
                                                where[field][rename(constraint, { inInts: "in", inStrs: "in" })] = value;
                                            }
                                        }
                                    });
                                }
                                orderBy = {};
                                if (args.sort) {
                                    args.sort.forEach(function (sortable) {
                                        var field = sortable.field, constraints = __rest(sortable, ["field"]);
                                        for (var _i = 0, _a = Object.entries(constraints); _i < _a.length; _i++) {
                                            var _b = _a[_i], key = _b[0], value = _b[1];
                                            var constraint = key;
                                            if (sortable[constraint] && value) {
                                                orderBy[field] || (orderBy[field] = {});
                                                orderBy[field][constraint] = value;
                                            }
                                        }
                                    });
                                }
                                return [4 /*yield*/, ctx.prisma.program.findMany({
                                        where: where,
                                        orderBy: orderBy,
                                        include: {
                                            programCategory: true,
                                            programType: true,
                                            state: true,
                                            zips: {
                                                include: {
                                                    zip: true
                                                }
                                            }
                                        },
                                        skip: args.page * args.pageSize,
                                        take: args.pageSize
                                    })];
                            case 1:
                                programs = _a.sent();
                                pageData = {
                                    // TODO
                                    hasNextPage: true,
                                    hasPreviousPage: true,
                                    nextPage: args.page + 1,
                                    previousPage: args.page - 1,
                                    page: args.page
                                };
                                return [2 /*return*/, {
                                        results: programs,
                                        pageInfo: pageData
                                    }];
                        }
                    });
                }); }
            }
        }
    })
});
