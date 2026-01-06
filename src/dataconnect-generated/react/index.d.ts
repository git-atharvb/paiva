import { CreateUserData, GetAutomationsForUserData, UpdateAutomationData, UpdateAutomationVariables, ListPublicSkillsData } from '../';
import { UseDataConnectQueryResult, useDataConnectQueryOptions, UseDataConnectMutationResult, useDataConnectMutationOptions} from '@tanstack-query-firebase/react/data-connect';
import { UseQueryResult, UseMutationResult} from '@tanstack/react-query';
import { DataConnect } from 'firebase/data-connect';
import { FirebaseError } from 'firebase/app';


export function useCreateUser(options?: useDataConnectMutationOptions<CreateUserData, FirebaseError, void>): UseDataConnectMutationResult<CreateUserData, undefined>;
export function useCreateUser(dc: DataConnect, options?: useDataConnectMutationOptions<CreateUserData, FirebaseError, void>): UseDataConnectMutationResult<CreateUserData, undefined>;

export function useGetAutomationsForUser(options?: useDataConnectQueryOptions<GetAutomationsForUserData>): UseDataConnectQueryResult<GetAutomationsForUserData, undefined>;
export function useGetAutomationsForUser(dc: DataConnect, options?: useDataConnectQueryOptions<GetAutomationsForUserData>): UseDataConnectQueryResult<GetAutomationsForUserData, undefined>;

export function useUpdateAutomation(options?: useDataConnectMutationOptions<UpdateAutomationData, FirebaseError, UpdateAutomationVariables>): UseDataConnectMutationResult<UpdateAutomationData, UpdateAutomationVariables>;
export function useUpdateAutomation(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateAutomationData, FirebaseError, UpdateAutomationVariables>): UseDataConnectMutationResult<UpdateAutomationData, UpdateAutomationVariables>;

export function useListPublicSkills(options?: useDataConnectQueryOptions<ListPublicSkillsData>): UseDataConnectQueryResult<ListPublicSkillsData, undefined>;
export function useListPublicSkills(dc: DataConnect, options?: useDataConnectQueryOptions<ListPublicSkillsData>): UseDataConnectQueryResult<ListPublicSkillsData, undefined>;
