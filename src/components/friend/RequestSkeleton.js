import React from 'react';
import { View } from 'react-native';
import Skeleton from '../base/Skeleton';

const RequestSkeleton = () => {
  return (
    <View style={{ marginTop: 16, flexDirection: 'row' }}>
      <Skeleton style={{ height: 100, width: 100, borderRadius: 100 }} />
      <View style={{ marginLeft: 12, flex: 1, justifyContent: 'center' }}>
        <Skeleton style={{ height: 20, borderRadius: 6 }} />
        <Skeleton style={{ marginTop: 8, height: 38, borderRadius: 6 }} />
      </View>
    </View>
  );
};

export default RequestSkeleton;
