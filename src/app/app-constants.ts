export class AppConstants {

  public static readonly BACKEND_VERSION = '1';
  public static readonly BASE_URL = `https://api.foxtrot.com.ua/api/v${AppConstants.BACKEND_VERSION}`;
  public static readonly CART_SERVICE_ENDPOINT = `https://api.foxtrot.com.ua/api/v${AppConstants.BACKEND_VERSION}`;
  public static readonly CRM_SERVICE_ENDPOINT = `https://crm-foxapp.entri.com.ua/api/v${AppConstants.BACKEND_VERSION}`;
  
  //public static readonly BASE_URL = `http://localhost/api/v${AppConstants.BACKEND_VERSION}`;
  //public static readonly CART_SERVICE_ENDPOINT = `http://localhost/api/v${AppConstants.BACKEND_VERSION}`;
  public static readonly DEV_ELASTIC_ENDPOINT = 'https://es1.foxtrot.com.ua https://es2.foxtrot.com.ua https://es3.foxtrot.com.ua';
  public static readonly BASE_PAYMENT_URL = `https://api.foxtrot.com.ua/api/v${AppConstants.BACKEND_VERSION}/payment`;
  public static readonly USE_PRODUCTION = true;
  public static readonly ELASTIC_PROD_MODE = true; // Should be true in production
  public static readonly EMAIL_SUBSCRIPTION_ENDPOINT = 'http://www.foxtrot.com.ua/Subscription/Subscription/';
  public static readonly LOCALE_DEFAULT_VALUE = 1;
  public static readonly CURRENCY_DEFAULT_VALUE = 4;
  public static readonly ID_APP = 6;
  public static readonly ROOT_APP_PARAMS_CACHE_LIFETIME = 100000;
  public static readonly ENABLE_MARKETPLACE_FEATURES = false;
}
