// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
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

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
