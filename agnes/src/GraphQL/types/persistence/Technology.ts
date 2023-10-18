// Not presently implemented--but leaving around so no one needs to map these
// again if such a mapping proves useful :)


/*
import {
    GraphQLEnumType as QLEnum,
    GraphQLObjectType as QLObject,
    GraphQLString as QLString,
    GraphQLNonNull as QLNonNull
} from "graphql";

export enum TechnologyId_t {
    Solar_Passive = 1,
    Solar_Water_Heat = 2,
    Solar_Space_Heat = 3,
    Geothermal_Electric = 4,
    Solar_Thermal_Electric = 5,
    Solar_Thermal_Process_Heat = 6,
    Solar_Photovoltaics = 7,
    Wind_All = 8,
    Biomass = 9,
    Hydroelectric = 10,
    Geothermal_Heat_Pumps = 12,
    Municipal_Solid_Waste = 13,
    Combined_Heat_And_Power = 14,
    Fuel_Cells_using_NonRenewable_Fuels = 15,
    Renewable_Fuels = 17,
    Landfill_Gas = 18,
    Tidal = 19,
    Wave = 20,
    Ocean_Thermal = 21,
    Daylighting = 23,
    Solar_Pool_Heating = 24,
    Lighting = 80,
    Chillers = 82,
    Boilers = 84,
    Air_conditioners = 86,
    Heat_recovery = 88,
    Processing_and_Manufacturing_Equipment = 107,
    Comprehensive_Measures_Whole_Building = 109,
    Custom_Others_pending_approval = 110,
    Yes_specific_technologies_not_identified = 113,
    Wind_Small = 117,
    Hydroelectric_Small = 118,
    Geothermal_DirectUse = 119,
    Anaerobic_Digestion = 121,
    Fuel_Cells_using_Renewable_Fuels = 124,
    Other_Distributed_Generation_Technologies = 125,
    Microturbines = 134,
    Lithium_ion = 207
}

export const TechnologyId = new QLEnum({
    name: "TechnologyId",
    description: "Sustainable technology",
    values: {
        Solar_Passive: {
            value: 1,
            description: "Solar - Passive"
        },
        Solar_Water_Heat: {
            value: 2,
            description: "Solar Water Heat"
        },
        Solar_Space_Heat: {
            value: 3,
            description: "Solar Space Heat"
        },
        Geothermal_Electric: {
            value: 4,
            description: "Geothermal Electric"
        },
        Solar_Thermal_Electric: {
            value: 5,
            description: "Solar Thermal Electric"
        },
        Solar_Thermal_Process_Heat: {
            value: 6,
            description: "Solar Thermal Process Heat"
        },
        Solar_Photovoltaics: {
            value: 7,
            description: "Solar Photovoltaics"
        },
        Wind_All: {
            value: 8,
            description: "Wind (All)"
        },
        Biomass: {
            value: 9,
            description: "Biomass"
        },
        Hydroelectric: {
            value: 10,
            description: "Hydroelectric"
        },
        Geothermal_Heat_Pumps: {
            value: 12,
            description: "Geothermal Heat Pumps"
        },
        Municipal_Solid_Waste: {
            value: 13,
            description: "Municipal Solid Waste"
        },
        Combined_Heat_And_Power: {
            value: 14,
            description: "Combined Heat & Power"
        },
        Fuel_Cells_using_NonRenewable_Fuels: {
            value: 15,
            description: "Fuel Cells using Non-Renewable Fuels"
        },
        Renewable_Fuels: {
            value: 17,
            description: "Renewable Fuels"
        },
        Landfill_Gas: {
            value: 18,
            description: "Landfill Gas"
        },
        Tidal: {
            value: 19,
            description: "Tidal"
        },
        Wave: {
            value: 20,
            description: "Wave"
        },
        Ocean_Thermal: {
            value: 21,
            description: "Ocean Thermal"
        },
        Daylighting: {
            value: 23,
            description: "Daylighting"
        },
        Solar_Pool_Heating: {
            value: 24,
            description: "Solar Pool Heating"
        },
        Lighting: {
            value: 80,
            description: "Lighting"
        },
        Chillers: {
            value: 82,
            description: "Chillers"
        },
        Boilers: {
            value: 84,
            description: "Boilers"
        },
        Air_conditioners: {
            value: 86,
            description: "Air conditioners"
        },
        Heat_recovery: {
            value: 88,
            description: "Heat recovery"
        },
        Processing_and_Manufacturing_Equipment: {
            value: 107,
            description: "Processing and Manufacturing Equipment"
        },
        Comprehensive_Measures_Whole_Building: {
            value: 109,
            description: "Comprehensive Measures/Whole Building"
        },
        Custom_Others_pending_approval: {
            value: 110,
            description: "Custom/Others pending approval"
        },
        Yes_specific_technologies_not_identified: {
            value: 113,
            description: "Yes; specific technologies not identified"
        },
        Wind_Small: {
            value: 117,
            description: "Wind (Small)"
        },
        Hydroelectric_Small: {
            value: 118,
            description: "Hydroelectric (Small)"
        },
        Geothermal_DirectUse: {
            value: 119,
            description: "Geothermal Direct-Use"
        },
        Anaerobic_Digestion: {
            value: 121,
            description: "Anaerobic Digestion"
        },
        Fuel_Cells_using_Renewable_Fuels: {
            value: 124,
            description: "Fuel Cells using Renewable Fuels"
        },
        Other_Distributed_Generation_Technologies: {
            value: 125,
            description: "Other Distributed Generation Technologies"
        },
        Microturbines: {
            value: 134,
            description: "Microturbines"
        },
        Lithium_ion: {
            value: 207,
            description: "Lithium-ion"
        }
    }
});

export type Technology_t = {
    id: TechnologyId_t;
    name: string;
};
export const Technology = new QLObject({
    name: "Technology",
    description: "Eligible technology",
    fields: {
        id: {
            type: new QLNonNull(TechnologyId),
            description: "Technology id i.e. Landfill_Gas"
        },
        name: {
            type: new QLNonNull(QLString),
            description: "Technology name"
        }
    }
});
*/
