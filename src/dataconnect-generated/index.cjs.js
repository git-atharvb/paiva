const { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'example',
  service: 'paiva',
  location: 'us-east4'
};
exports.connectorConfig = connectorConfig;

const createUserRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateUser');
}
createUserRef.operationName = 'CreateUser';
exports.createUserRef = createUserRef;

exports.createUser = function createUser(dc) {
  return executeMutation(createUserRef(dc));
};

const getAutomationsForUserRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetAutomationsForUser');
}
getAutomationsForUserRef.operationName = 'GetAutomationsForUser';
exports.getAutomationsForUserRef = getAutomationsForUserRef;

exports.getAutomationsForUser = function getAutomationsForUser(dc) {
  return executeQuery(getAutomationsForUserRef(dc));
};

const updateAutomationRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateAutomation', inputVars);
}
updateAutomationRef.operationName = 'UpdateAutomation';
exports.updateAutomationRef = updateAutomationRef;

exports.updateAutomation = function updateAutomation(dcOrVars, vars) {
  return executeMutation(updateAutomationRef(dcOrVars, vars));
};

const listPublicSkillsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListPublicSkills');
}
listPublicSkillsRef.operationName = 'ListPublicSkills';
exports.listPublicSkillsRef = listPublicSkillsRef;

exports.listPublicSkills = function listPublicSkills(dc) {
  return executeQuery(listPublicSkillsRef(dc));
};
