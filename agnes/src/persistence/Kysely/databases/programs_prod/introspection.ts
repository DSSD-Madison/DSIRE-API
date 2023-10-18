import type {ColumnType} from "kysely";


export interface DB {
  authority: Authority;
  city: City;
  contact: Contact;
  county: County;
  energy_category: EnergyCategory;
  export: Export;
  implementing_sector: ImplementingSector;
  parameter: Parameter;
  parameter_set: ParameterSet;
  parameter_set_sector: ParameterSetSector;
  parameter_set_technology: ParameterSetTechnology;
  program: Program;
  program_category: ProgramCategory;
  program_city: ProgramCity;
  program_contact: ProgramContact;
  program_county: ProgramCounty;
  program_detail: ProgramDetail;
  program_detail_template: ProgramDetailTemplate;
  program_memo: ProgramMemo;
  program_sector: ProgramSector;
  program_technology: ProgramTechnology;
  program_type: ProgramType;
  program_utility: ProgramUtility;
  program_zipcode: ProgramZipcode;
  search_log: SearchLog;
  sector: Sector;
  state: State;
  state_info_content: StateInfoContent;
  subscription_memo: SubscriptionMemo;
  technology: Technology;
  technology_category: TechnologyCategory;
  technology_info_content: TechnologyInfoContent;
  user: User;
  utility: Utility;
  utility_zipcode: UtilityZipcode;
  zipcode: Zipcode;
}

export interface Authority {
  id: Generated<number>;
  program_id: number;
  order: number | null;
  code: string | null;
  website: string | null;
  enacted: Date | null;
  enactedtext: string | null;
  effective: Date | null;
  effectivetext: string | null;
  expired: Date | null;
  expiredtext: string | null;
  file_key: string | null;
  file_name: string | null;
}

export interface City {
  id: Generated<number>;
  name: string | null;
  state_id: number;
}

export interface Contact {
  id: Generated<number>;
  created_ts: Generated<Date | null>;
  updated_ts: Date | null;
  first_name: string | null;
  last_name: string | null;
  organization_name: string | null;
  web_visible_default: Generated<number>;
  phone: string | null;
  email: string | null;
  website_url: string | null;
  address: string | null;
  city: string | null;
  state_id: number | null;
  zip: string | null;
}

export interface County {
  id: Generated<number>;
  name: string | null;
  state_id: number | null;
}

export interface EnergyCategory {
  id: Generated<number>;
  name: string | null;
}

export interface Export {
  id: Generated<number>;
  key: string;
  created_ts: Generated<Date>;
  type: string;
  size: Generated<number>;
}

export interface ImplementingSector {
  id: Generated<number>;
  name: string | null;
  active: Generated<number>;
}

export interface Parameter {
  id: Generated<number>;
  parameter_set_id: number;
  source: string | null;
  qualifier: string | null;
  amount: Decimal | null;
  units: string | null;
}

export interface ParameterSet {
  id: Generated<number>;
  program_id: number;
}

export interface ParameterSetSector {
  sector_id: number;
  set_id: number;
}

export interface ParameterSetTechnology {
  technology_id: number;
  set_id: number;
}

export interface Program {
  id: Generated<number>;
  state_id: number;
  is_entire_state: Generated<number>;
  implementing_sector_id: number;
  program_category_id: number;
  program_type_id: number;
  created_by_user_id: number;
  code: string | null;
  name: string | null;
  updated_ts: Date | null;
  created_ts: Date | null;
  published: Generated<number>;
  websiteurl: string | null;
  administrator: string | null;
  fundingsource: string | null;
  budget: string | null;
  start_date: Date | null;
  start_date_text: string | null;
  end_date: Date | null;
  end_date_text: string | null;
  summary: string | null;
  additional_technologies: string | null;
  fromSir: Generated<number>;
}

export interface ProgramCategory {
  id: Generated<number>;
  name: string | null;
}

export interface ProgramCity {
  program_id: number;
  city_id: number;
}

export interface ProgramContact {
  id: Generated<number>;
  program_id: number;
  contact_id: number;
  webvisible: Generated<number>;
}

export interface ProgramCounty {
  program_id: number;
  county_id: number;
}

export interface ProgramDetail {
  id: Generated<number>;
  program_id: number;
  label: string;
  value: string | null;
  display_order: Generated<number>;
  template_id: number | null;
}

export interface ProgramDetailTemplate {
  id: Generated<number>;
  type_id: number;
  label: string;
  display_order: Generated<number>;
}

export interface ProgramMemo {
  id: Generated<number>;
  program_id: number;
  added_by_user: number;
  added: Date | null;
  memo: string | null;
}

export interface ProgramSector {
  program_id: number;
  sector_id: number;
}

export interface ProgramTechnology {
  program_id: number;
  technology_id: number;
}

export interface ProgramType {
  id: Generated<number>;
  name: string | null;
  program_category_id: number;
}

export interface ProgramUtility {
  program_id: number;
  utility_id: number;
}

export interface ProgramZipcode {
  program_id: number;
  zipcode_id: number;
}

export interface SearchLog {
  id: Generated<number>;
  searchdate: Date | null;
  ip: string | null;
  filtertype: string | null;
  text: string | null;
}

export interface Sector {
  id: Generated<number>;
  name: string | null;
  fieldname: string | null;
  is_selectable: Generated<number>;
  parent_id: number | null;
}

export interface State {
  id: Generated<number>;
  abbreviation: string;
  name: string;
  is_territory: Generated<number>;
}

export interface StateInfoContent {
  id: Generated<number>;
  state_id: number;
  introduction: string | null;
  history: string | null;
  renewable_portfolio_standard: string | null;
  organizations: string | null;
  programs: string | null;
  footnotes: string | null;
}

export interface SubscriptionMemo {
  id: Generated<number>;
  program_id: number;
  added_by_user: number;
  added: Date | null;
  memo: string | null;
}

export interface Technology {
  id: Generated<number>;
  name: string | null;
  technology_category_id: number;
  active: Generated<number>;
}

export interface TechnologyCategory {
  id: Generated<number>;
  name: string | null;
  energy_category_id: number;
}

export interface TechnologyInfoContent {
  id: Generated<number>;
  state_id: number;
  technology_filter: string;
  introduction: string | null;
  history: string | null;
  technology_details: string | null;
  programs: string | null;
  footnotes: string | null;
}

export interface User {
  id: Generated<number>;
  email: string;
  username: string | null;
  password: string | null;
  password_token: string | null;
  first_name: string | null;
  last_name: string | null;
  role: Generated<string>;
  state: Generated<string | null>;
  created_ts: Generated<Date | null>;
  updated_ts: Date | null;
}

export interface Utility {
  id: Generated<number>;
  name: string | null;
  state_id: number;
  utility_id: number;
}

export interface UtilityZipcode {
  utility_id: number;
  zipcode_id: number;
}

export interface Zipcode {
  id: Generated<number>;
  zipcode: string;
  city_id: number;
  state_id: number;
  county_id: number;
  latitude: Decimal | null;
  longitude: Decimal | null;
}


export type Decimal = ColumnType<string, string | number, string | number>;

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;
