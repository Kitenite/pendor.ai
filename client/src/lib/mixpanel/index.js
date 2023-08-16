// mixpanelService.js
import mixpanel from 'mixpanel-browser';

const MIXPANEL_TOKEN = '3347224cfc9b58cd7b28adf3b58669bf'; // Replace with your Mixpanel token.

class MixpanelService {
  constructor() {
    if (!MixpanelService.instance) {
      mixpanel.init(MIXPANEL_TOKEN);
      MixpanelService.instance = this;
    }

    return MixpanelService.instance;
  }

  track(eventName, properties = {}) {
    mixpanel.track(eventName, properties);
  }

  identify(userId) {
    mixpanel.identify(userId);
  }

  alias(newId, currentId) {
    mixpanel.alias(newId, currentId);
  }

  setProfileProperties(properties) {
    mixpanel.people.set(properties);
  }

  // Add other Mixpanel methods you need...
}

const instance = new MixpanelService();
Object.freeze(instance);

export default instance;
