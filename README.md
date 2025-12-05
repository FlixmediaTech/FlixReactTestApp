# FlixReactTestApp

**FlixReactTestApp** is a simple proof-of-concept React Native app built with **Expo (prebuild)**.  
It demonstrates how to use the FlixMedia React Native module by rendering a single hard-coded product on screen.

## Features
- Minimal test app (POC)
- Single-screen implementation
- Renders one hard-coded product using the FlixMedia React Native bridge and Flixmedia native SDK

## Requirements
- Node.js 18+
- React Native 0.73+ (via Expo SDK 52+)
- Expo CLI
- iOS 15.6 or later
- Xcode 15+

## Getting Started

If you did **not** prebuild yet, run:
```bash
npx expo prebuild
```

Install required dependencies:
```bash
npm install react-native-webview
```

Install the FlixMedia SDK package (using your local SDK path):
```bash
npm install "path-to-SDK-package"
```

Go to the iOS folder:
```bash
cd ios
```

Make sure the iOS deployment version is at least 15.6 and verify the Podfile contains:
```
platform :ios, podfile_properties['ios.deploymentTarget'] || '15.6'
```
Install pods:
```bash
pod install
```

Run the project:
```bash
npx expo start
```

Import the Flixmedia React Native package:
```
import { InpageHtmlView, initialize } from 'react-native-flix-inpage';
```

Then insert your username and password inside initialize method like:
```
await initialize('username', 'password');
```

You can also enable the sandbox (test environment) by passing true as the third parameter:
```
await initialize('username', 'password', true);
```

Add InpageHtmlView inside the ScrollView and insert your product data inside it:
```
<ScrollView>
...
<InpageHtmlView
   productParams={{
      mpn: "",
      ean: "",
      distributorId: 0,
      isoCode: "",
      flIsoCode: "",
      brand: "",
      title: "",
      price: "",
      currency: "",
   }}
   baseUrl="https://www.example.com"
   style={{ backgroundColor: 'white' }}
   onError={(err) => console.warn('Inpage error:', err)}
   onLoadedHtml={(html) => console.log('Inpage loaded, length:', html.length)}
/>
...
</ScrollView>
```

Then open the iOS project in Xcode (./ios) and run it on a simulator or physical device.

## Notes
- The product parameters are hard-coded in the source code for demo purposes.
- This app is intended only as a proof of concept.

## License
© FlixMedia. All rights reserved.
