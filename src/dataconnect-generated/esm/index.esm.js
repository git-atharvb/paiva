import { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } from 'firebase/data-connect';

export const connectorConfig = {
  connector: 'example',
  service: 'paiva',
  location: 'us-east4'
};

export const createUserRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateUser');
}
createUserRef.operationName = 'CreateUser';

export function createUser(dc) {
  return executeMutation(createUserRef(dc));
}

export const getAutomationsForUserRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetAutomationsForUser');
}
getAutomationsForUserRef.operationName = 'GetAutomationsForUser';

export function getAutomationsForUser(dc) {
  return executeQuery(getAutomationsForUserRef(dc));
}

export const updateAutomationRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateAutomation', inputVars);
}
updateAutomationRef.operationName = 'UpdateAutomation';

export function updateAutomation(dcOrVars, vars) {
  return executeMutation(updateAutomationRef(dcOrVars, vars));
}

export const listPublicSkillsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListPublicSkills');
}
listPublicSkillsRef.operationName = 'ListPublicSkills';

export function listPublicSkills(dc) {
  return executeQuery(listPublicSkillsRef(dc));
}

