// TestProps required as React Native for Android doesn't correctly support testIDs
// as doing so would break Facebooks own automated testing pipeline.  Until
// Facebook update their internal testing pipeline this is the recommended
// way to handle this.
//

import { Platform } from 'react-native'

export const testProps = (testId) => {
  if (Platform.OS === 'android') {
    return { testID: testId, accessibilityLabel: testId }
  }
  return { testID: testId }
}
