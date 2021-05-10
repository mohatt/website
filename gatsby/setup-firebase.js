const React = require('react')
const env = require('../config/environment')

module.exports = ({ setHeadComponents, setPostBodyComponents }) => {
  if (env.isDevelopment())
    return

  /**
   * First Input Delay polyfill library
   *
   * @see https://firebase.google.com/docs/perf-mon/get-started-web#add-first-input-delay-polyfill
   * @see https://github.com/GoogleChromeLabs/first-input-delay
   */
  const FIDPolyfill = `!function(n,e){var t,o,i,c=[],f={passive:!0,capture:!0},r=new Date,a="pointerup",u="pointercancel";function p(n,c){t||(t=c,o=n,i=new Date,w(e),s())}function s(){o>=0&&o<i-r&&(c.forEach(function(n){n(o,t)}),c=[])}function l(t){if(t.cancelable){var o=(t.timeStamp>1e12?new Date:performance.now())-t.timeStamp;"pointerdown"==t.type?function(t,o){function i(){p(t,o),r()}function c(){r()}function r(){e(a,i,f),e(u,c,f)}n(a,i,f),n(u,c,f)}(o,t):p(o,t)}}function w(n){["click","mousedown","keydown","touchstart","pointerdown"].forEach(function(e){n(e,l,f)})}w(n),self.perfMetrics=self.perfMetrics||{},self.perfMetrics.onFirstInputDelay=function(n){c.push(n),s()}}(addEventListener,removeEventListener);`
  setHeadComponents([
    <script key='fb-perf-fid-lib' dangerouslySetInnerHTML={{ __html: FIDPolyfill }} />,
    <link key='fb-anal-gtag-preconnect' rel='preconnect' href='https://www.googletagmanager.com' />,
    <link key='fb-api-preconnect' rel='preconnect' href='https://firebase.googleapis.com' />,
    <link key='fb-inst-preconnect' rel='preconnect' href='https://firebaseinstallations.googleapis.com' />,
    <link key='fb-anal-ga-preconnect' rel='preconnect' href='https://www.google-analytics.com' />,
    <link key='fb-rc-preconnect' rel='preconnect' href='https://firebaseremoteconfig.googleapis.com' />,
  ])

  setPostBodyComponents([
    <script key='fb-anal-gtag' async src={`https://www.googletagmanager.com/gtag/js?id=${env.config.firebase.measurementId}`} />,
  ])
}
