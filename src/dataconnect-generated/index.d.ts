import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface AutomationStep_Key {
  id: UUIDString;
  __typename?: 'AutomationStep_Key';
}

export interface Automation_Key {
  id: UUIDString;
  __typename?: 'Automation_Key';
}

export interface CreateUserData {
  user_insert: User_Key;
}

export interface GetAutomationsForUserData {
  automations: ({
    id: UUIDString;
    name: string;
    description: string;
  } & Automation_Key)[];
}

export interface Integration_Key {
  id: UUIDString;
  __typename?: 'Integration_Key';
}

export interface ListPublicSkillsData {
  skills: ({
    id: UUIDString;
    name: string;
    description: string;
  } & Skill_Key)[];
}

export interface Skill_Key {
  id: UUIDString;
  __typename?: 'Skill_Key';
}

export interface UpdateAutomationData {
  automation_update?: Automation_Key | null;
}

export interface UpdateAutomationVariables {
  id: UUIDString;
  name?: string | null;
  description?: string | null;
}

export interface User_Key {
  id: UUIDString;
  __typename?: 'User_Key';
}

interface CreateUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<CreateUserData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<CreateUserData, undefined>;
  operationName: string;
}
export const createUserRef: CreateUserRef;

export function createUser(): MutationPromise<CreateUserData, undefined>;
export function createUser(dc: DataConnect): MutationPromise<CreateUserData, undefined>;

interface GetAutomationsForUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetAutomationsForUserData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetAutomationsForUserData, undefined>;
  operationName: string;
}
export const getAutomationsForUserRef: GetAutomationsForUserRef;

export function getAutomationsForUser(): QueryPromise<GetAutomationsForUserData, undefined>;
export function getAutomationsForUser(dc: DataConnect): QueryPromise<GetAutomationsForUserData, undefined>;

interface UpdateAutomationRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateAutomationVariables): MutationRef<UpdateAutomationData, UpdateAutomationVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateAutomationVariables): MutationRef<UpdateAutomationData, UpdateAutomationVariables>;
  operationName: string;
}
export const updateAutomationRef: UpdateAutomationRef;

export function updateAutomation(vars: UpdateAutomationVariables): MutationPromise<UpdateAutomationData, UpdateAutomationVariables>;
export function updateAutomation(dc: DataConnect, vars: UpdateAutomationVariables): MutationPromise<UpdateAutomationData, UpdateAutomationVariables>;

interface ListPublicSkillsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListPublicSkillsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListPublicSkillsData, undefined>;
  operationName: string;
}
export const listPublicSkillsRef: ListPublicSkillsRef;

export function listPublicSkills(): QueryPromise<ListPublicSkillsData, undefined>;
export function listPublicSkills(dc: DataConnect): QueryPromise<ListPublicSkillsData, undefined>;

