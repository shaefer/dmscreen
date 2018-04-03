export const SOME_ACTION = 'SOME_ACTION'

export const someAction = (incomingData) => ({
    type: SOME_ACTION,
    data: incomingData
  });