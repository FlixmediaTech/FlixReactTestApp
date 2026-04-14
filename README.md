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

## iOS setup

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

Then open the iOS project in Xcode (./ios) and run it on a simulator or physical device.


## React Native setup

Import the Flixmedia React Native package:
```
import { InpageHtmlView, initialize, sendMessageToWebView } from 'react-native-flix-inpage';
```

Then insert your username and password inside initialize method like:
```
await initialize('username', 'password');
```

You can also enable the sandbox (test environment) by passing true as the third parameter:
```
await initialize('username', 'password', true);
```

To send a logger event from the Add to Cart button, call `sendMessageToWebView` in the button handler:
```js
const handleAddToCart = () => {
  sendMessageToWebView('cartButtonTapped');
};
```

Then connect it to your button:
```jsx
<TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
  <Text style={styles.addToCartText}>Add to Cart</Text>
</TouchableOpacity>
```

Add reference for InpageHtmlView and ScrollView
```
const inpageRef = useRef(null);
const scrollRef = useRef(null);
const lastScrollY = useRef(0);
```

Add InpageHtmlView inside the ScrollView and insert your product data inside it:
```
<ScrollView
    ref={scrollRef}
    onScroll={e => {
        lastScrollY.current = e.nativeEvent.contentOffset.y;
        scrollRef.current.__lastScrollY = lastScrollY.current;
        inpageRef.current?.onParentScroll();
    }}
    scrollEventThrottle={16}
>
...
<InpageHtmlView
   ref={inpageRef}
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
   parentScrollRef={scrollRef}
   onError={(err) => console.warn('Inpage error:', err)}
   onLoadedHtml={(html) => console.log('Inpage loaded, length:', html.length)}
/>
...
</ScrollView>
```

Run the project:
```bash
npx expo start
```

## Notes
- The product parameters are hard-coded in the source code for demo purposes.
- This app is intended only as a proof of concept.

## License
© FlixMedia. All rights reserved.
