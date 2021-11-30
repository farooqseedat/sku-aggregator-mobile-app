import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Image,
  FlatList,
  View,
  Text,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {connect} from 'react-redux';
import {fetchProduct, fetchAvailableSkus, selectSize} from '../actions';
import {useEffect} from 'react';

const ProductDetail = (props) => {
  const {route, fetching, fetchProduct, productDetail} = props;
  const {id} = route.params;

  useEffect(() => {
    fetchProduct(id);
  }, []);

  const renderImage = ({item}) => {
    return (
      <View style={{width: Dimensions.width, alignItems: 'stretch'}}>
        <Image
          style={styles.tinyLogo}
          source={{
            uri: item,
          }}
        />
      </View>
    );
  };

  const renderProductDetail = () => {
    if (!productDetail) return null;
    return (
      <SafeAreaView>
        <ActivityIndicator size="small" animating={fetching} />
        <FlatList
          data={productDetail.image_urls}
          renderItem={renderImage}
          horizontal={true}
          keyExtractor={(item) => item}
        />
        <View style={{marginRight: 10, marginLeft: 10, marginTop: 10}}>
          <Text style={styles.heading}>{productDetail.name}</Text>
          <Text style={{fontWeight: 'bold'}}>Description</Text>
          <Text>{productDetail.description}</Text>
        </View>
      </SafeAreaView>
    );
  };
  return <View>{renderProductDetail()}</View>;
};

const styles = StyleSheet.create({
  tinyLogo: {
    width: 400,
    height: 400,
  },
  heading: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 10,
  },
});

const mapStateToProps = (state) => {
  const {productDetail} = state.entities;
  return {
    productDetail: productDetail.detail,
    availableSkus: productDetail.availableSkus,
    selectedSize: productDetail.selectedSize,
    fetching: state.entities.fetching,
  };
};

export default connect(mapStateToProps, {
  fetchProduct,
  fetchAvailableSkus,
  selectSize,
})(ProductDetail);
