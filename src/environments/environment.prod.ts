export const environment = {
  production: true,
  auth0: {
    domain: 'socius-mms.au.auth0.com',
    clientId: '4lZFims4BdHl6pZ9hvQDz4gHilVPitjK',
    callbackURL: 'http://localhost:4200/login'
  },
  membershipSettings: [
    {name: 'Student', value: 'ST'},
    {name: 'Employee', value: 'EM'},
    {name: 'General Public', value: 'GP'}
  ],
  paymentSettings: [
    {name: 'Monthly', value: 'MN'},
    {name: 'Half-Yearly', value: 'HY'},
    {name: 'Yearly', value: 'YR'}
  ]
};
