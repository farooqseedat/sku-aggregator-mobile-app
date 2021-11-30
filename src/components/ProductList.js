import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Image,
  FlatList,
  View,
  Text,
  StatusBar,
  Button,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {connect} from 'react-redux';
import {fetchProducts} from '../actions';
import {useEffect} from 'react';
import {URL} from 'whatwg-url';
import {Buffer} from 'buffer';

global.Buffer = Buffer;

const ProductList = (props) => {
  const {products, fetchProducts, navigation, fetching} = props;
  const {nextPage, prevPage} = props;

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => console.log(fetching, 'lfdgjl'), [fetching]);

  const handlePress = (id) => {
    navigation.navigate('detail', {id: id});
  };

  const handlePressPagingButton = (url) => {
    const offset = new URL(url).searchParams.get('offset');
    fetchProducts({offset});
  };

  const renderPagingButtons = () => {
    return (
      <View style={styles.listFooter}>
        <Button
          title="Previous"
          disabled={prevPage ? false : true}
          onPress={() => handlePressPagingButton(prevPage)}
        />
        <Button
          title="Next"
          disabled={nextPage ? false : true}
          onPress={() => handlePressPagingButton(nextPage)}
        />
      </View>
    );
  };

  const renderProduct = ({item}) => {
    if (!item) return null;
    return (
      <TouchableOpacity
        onPress={() => handlePress(item.id)}
        style={styles.productCard}>
        <View style={{flex: 3, flexDirection: 'column', alignItems: 'center'}}>
          <Image
            style={styles.tinyLogo}
            source={{
              uri: item.image_urls[0],
            }}
            resizeMethod="resize"
            resizeMode="contain"
          />
          <Text>{item.name}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ActivityIndicator
          size="large"
          color="grey"
          animating={fetching}
          hidesWhenStopped={!fetching}
        />
        <FlatList
          ListFooterComponent={renderPagingButtons}
          data={products}
          renderItem={renderProduct}
          keyExtractor={(item) => item.id.toString()}
        />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  tinyLogo: {
    width: 100,
    height: 200,
  },
  listFooter: {
    marginBottom: 50,
    marginTop: 10,
  },
  productCard: {
    borderWidth: 0.1,
    marginBottom: 3,
    borderRadius: 1,
  },
});

const mapStateToProps = (state) => {
  return {
    products: state.entities.products,
    nextPage: state.paging.next,
    prevPage: state.paging.previous,
    noOfProducts: state.paging.count,
    fetching: state.entities.fetching,
  };
};

export default connect(mapStateToProps, {fetchProducts})(ProductList);
