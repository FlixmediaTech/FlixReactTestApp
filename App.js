import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, Alert, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { InpageHtmlView, initialize, sendMessageToWebView } from 'react-native-flix-inpage';

function MainContent() {
  const [isInitialized, setIsInitialized] = useState(false);
  const [initError, setInitError] = useState(null);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    let mounted = true;
    async function initSdk() {
      try {
        await initialize('username', 'password');
        console.log('[FlixInpage] initialize() successful');
        if (mounted) setIsInitialized(true);
      } catch (e) {
        const msg = e && e.message ? e.message : String(e);
        console.warn('SDK init failed', msg);
        if (mounted) setInitError(msg);
        Alert.alert('SDK init failed', msg);
      }
    }
    initSdk();
    return () => { mounted = false; };
  }, []);

  const handleAddToCart = () => {
    sendMessageToWebView("onCartButtonTapped");
    Alert.alert('Add to Cart', 'Product added to cart!');
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 80 + insets.bottom }}>
        {/* HEADER PLACEHOLDER */}
        <View style={styles.header}>
          <Text style={styles.placeholderIcon}>🛍️</Text>
          <Text style={styles.productName}>Product Name</Text>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* INPAGE HTML SECTION */}
        <View style={{ minHeight: 200, justifyContent: 'center', alignItems: 'center' }}>
          {!isInitialized && !initError && <ActivityIndicator size="large" />}
          {!isInitialized && initError && <Text>Failed to initialize SDK: {initError}</Text>}

          {isInitialized && (
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
          )}
        </View>
      </ScrollView>

      {/* ADD TO CART BUTTON - SAFE AREA */}
      <View style={{ paddingBottom: insets.bottom }}>
        <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <MainContent />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    paddingTop: 80,
    padding: 8,
  },
  placeholderIcon: {
    fontSize: 80,
    marginBottom: 12,
  },
  productName: {
    fontSize: 18,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 12,
  },
  addToCartButton: {
    backgroundColor: '#FF6B00',
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addToCartText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
