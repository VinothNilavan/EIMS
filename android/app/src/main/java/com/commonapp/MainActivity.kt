package com.mindspark.edicine

import android.os.Bundle
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import org.devio.rn.splashscreen.SplashScreen
import android.content.Intent
import android.content.res.Configuration
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate

class MainActivity : ReactActivity() {

  override fun getMainComponentName(): String = "CommonApp"

  /* 
  @Override
  protected String getMainComponentName() {
    return "CommonApp";
  }
  */


  /**
   * Returns the instance of the {@link ReactActivityDelegate}. There the RootView is created and
   * you can specify the rendered you wish to use (Fabric or the older renderer).
   */
  // @Override
  // protected ReactActivityDelegate createReactActivityDelegate() {
  //   return new MainActivityDelegate(this, getMainComponentName());
  // }

  override fun onCreate(savedInstanceState: Bundle?) {
    SplashScreen.show(this, true)
    super.onCreate(null);
  }

  override fun onConfigurationChanged(newConfig: Configuration) {
    super.onConfigurationChanged(newConfig)
    val intent = Intent("onConfigurationChanged")  
    intent.putExtra("newConfig", newConfig);
    this.sendBroadcast(intent);
  }

  /* 
  @Override
  public void onConfigurationChanged(Configuration newConfig) {
    super.onConfigurationChanged(newConfig);
    Intent intent = new Intent("onConfigurationChanged");
    intent.putExtra("newConfig", newConfig);
    this.sendBroadcast(intent);
  }
*/
  override fun createReactActivityDelegate(): ReactActivityDelegate = DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)
 
  fun isConcurrentRootEnabled(): Boolean = BuildConfig.IS_NEW_ARCHITECTURE_ENABLED
 
}