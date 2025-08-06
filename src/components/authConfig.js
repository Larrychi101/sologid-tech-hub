export const msalConfig = {
  auth: {
    clientId: '9c181b2b-6bcc-401b-82bc-da73bbdcaaf7',
    authority: 'https://login.microsoftonline.com/a73123de-bf24-4ff8-8307-e56f06f34a82',
    redirectUri: typeof window !== 'undefined' ? window.location.origin : '',
  },
};

export const loginRequest = {
  scopes: ['https://cognitiveservices.azure.com/.default'],
};
