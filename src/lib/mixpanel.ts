/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require */
/**
 * import('mixpanel-browser')와 import('mixpanel')를 사용하면 비동기 처리가 되므로
 * 동기적으로 처리되는 require()를 사용하기 위해 eslint-disable를 추가합니다.
 */
import { InitConfig, Mixpanel as MixpanelServer } from 'mixpanel';
import { Config, OverridedMixpanel as MixpanelClient } from 'mixpanel-browser';

const dev = process.env.NEXT_PUBLIC_MIXPANEL_DEV_TOKEN;
const prod = process.env.NEXT_PUBLIC_MIXPANEL_PROD_TOKEN;

let token = '';
let options: Partial<Config | InitConfig> = {};
let mixpanel;

if (process.env.NEXT_PUBLIC_NODE_ENV === 'dev') {
  token = dev as string;
  options = {
    debug: true,
  };
} else {
  token = prod as string;
}

if (typeof window === 'undefined') {
  const mixpanelModule = require('mixpanel');
  mixpanel = mixpanelModule.default as MixpanelServer;
  mixpanel?.init(token, options);
  console.log('Using Server Side Mixpanel');
} else {
  const mixpanelModule = require('mixpanel-browser');
  mixpanel = mixpanelModule.default as MixpanelClient;
  mixpanel?.init(token, {
    ...options,
    persistence: 'localStorage',
  });
  console.log('Using Client Side Mixpanel');
}

export default mixpanel as MixpanelClient & MixpanelServer;
