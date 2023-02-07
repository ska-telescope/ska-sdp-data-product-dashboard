import axios from 'axios';

const FetchDataProductList = async () => {
  const apiUrl = process.env.REACT_APP_SKA_SDP_DATA_PRODUCT_API_URL;
  const URL_LIST = '/dataproductsearch';

  // TODO: Add date selection and data entry to dasboard for these parameters + Search Button
  const bodyParameters = {
    "start_date": "20211212",
    "end_date": "20221212",
    "key_pair" : "execution_block:eb-m002-20191031-12345"
  };
  const config = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }, 
  };

  // NOTE: set this to true to use the dummy data instead of requesting real data from the API
  const USE_DUMMY_DATA = false;

  if (USE_DUMMY_DATA){
    /* TODO: Start of dummy data from the API */
    const dummyData = [
      {"id": 1, "interface": "http://schema.skao.int/ska-data-product-meta/0.1", "execution_block": "eb-m001-20191031-12345", "date_created": "20230101", "dataproduct_file": "product/eb-m001-20221212-12345", "metadata_file": "product/eb-m001-20221212-12345/ska-data-product.yaml"}, 
      {"id": 2, "interface": "http://schema.skao.int/ska-data-product-meta/0.1", "execution_block": "eb-m002-20221212-12345", "date_created": "20230101", "dataproduct_file": "product/eb-m002-20221212-12345", "metadata_file": "product/eb-m002-20221212-12345/ska-data-product.yaml"},
      {"id": 3, "interface": "http://schema.skao.int/ska-data-product-meta/0.1", "execution_block": "eb-m003-20191031-12345", "date_created": "20230101", "dataproduct_file": "product/eb-m001-20221212-12345", "metadata_file": "product/eb-m001-20221212-12345/ska-data-product.yaml"}, 
      {"id": 4, "interface": "http://schema.skao.int/ska-data-product-meta/0.1", "execution_block": "eb-m004-20221212-12345", "date_created": "20230101", "dataproduct_file": "product/eb-m002-20221212-12345", "metadata_file": "product/eb-m002-20221212-12345/ska-data-product.yaml"},
      {"id": 5, "interface": "http://schema.skao.int/ska-data-product-meta/0.1", "execution_block": "eb-m005-20191031-12345", "date_created": "20230101", "dataproduct_file": "product/eb-m001-20221212-12345", "metadata_file": "product/eb-m001-20221212-12345/ska-data-product.yaml"}, 
      {"id": 6, "interface": "http://schema.skao.int/ska-data-product-meta/0.1", "execution_block": "eb-m006-20221212-12345", "date_created": "20230101", "dataproduct_file": "product/eb-m002-20221212-12345", "metadata_file": "product/eb-m002-20221212-12345/ska-data-product.yaml"},
    ];
    /* TODO: End of dummy data from the API */

    return {
      data: dummyData
    };
  }

  try {
    const result = await axios.post(`${apiUrl}${URL_LIST}`, bodyParameters, config);

    // NOTE: within the test framework, axios.post does not seem to throw an exception on failure? so instead we check if the result is undefined
    if (typeof result === "undefined"){
      return "API unreachable, SDP data not available";
    } else {
      return result;
    }
  } catch(e) {
    return "API unreachable, SDP data not available";
  }
}

export default FetchDataProductList