<div align="center" >
  <img  src="handarbeit.jpg" alt="Informationsfreiheit bleibt Handarbeit, Werbebanner mit der App">
</div>

# FragDenStaat App [![Build Status](https://travis-ci.org/jfilter/frag-den-staat-app.svg?branch=master)](https://travis-ci.org/jfilter/frag-den-staat-app) [![dependencies Status](https://david-dm.org/jfilter/frag-den-staat-app/status.svg)](https://david-dm.org/jfilter/frag-den-staat-app) [![devDependency Status](https://david-dm.org/jfilter/frag-den-staat-app/dev-status.svg)](https://david-dm.org/jfilter/frag-den-staat-app#info=devDependencies)

This app is for [FragDenStaat](https://fragdenstaat.de/), a platform to simplify the process of sending and managing FOI requests to German public bodies. The app includes basic functionalities of the website such as browsing through requests, searching, and creating new requests. It is been developed with [React Native](https://facebook.github.io/react-native/) for Android and iOS.

## Looking for Contributors / Commiters

There are currently no plans for further development ([see the blog post](https://fragdenstaat.de/blog/2020/03/27/die-fragdenstaat-app/)). If you want to help our or take over the development, please contact [@jfilter](//github.com/jfilter).

## Releases

### In Production

Get the app on the [App Store](https://itunes.apple.com/us/app/fragdenstaat-politik-ifg/id1327918030), on the [Play Store](https://play.google.com/store/apps/details?id=de.fragdenstaat.app) or on [F-Droid](https://f-droid.org/packages/de.fragdenstaat.app/).

### Beta

If you want to join the beta program, have a look at the [website](https://fragdenstaat.de/app/).

## Developing

1.  Install [yarn](https://yarnpkg.com/lang/en/docs/install/)
2.  Set up your [development environment](https://facebook.github.io/react-native/docs/getting-started.html) ("Building Projects with Native Code")
3.  `git clone https://github.com/jfilter/frag-den-staat-app && cd frag-den-staat-app && yarn install`
4.  Run the app in a simulator with e.g. `react-native run-ios` or [on a device](https://facebook.github.io/react-native/docs/running-on-device.html).

### Building for Production

Building the Android version for production is tricky. Recently, [jetifier](https://www.npmjs.com/package/jetifier) seems to fix some compilation issues (`npx jetify`).

## Contributing

If you have a **question**, found a **bug** or want to propose a new **feature**, have a look at the [issues](https://github.com/jfilter/frag-den-staat-app/issues).

## License

MIT.
