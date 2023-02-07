import axios from 'axios';

const FetchDataProductList = async (startDate, endDate, metadata_key, metadata_value) => {
  const apiUrl = process.env.REACT_APP_SKA_SDP_DATA_PRODUCT_API_URL;
  const URL_LIST = '/dataproductsearch';
  const bodyParameters = {
    "start_date": startDate,
    "end_date": endDate,
    "key_pair" : metadata_key+":"+metadata_value
  };
  const config = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }, 
  };

  try {
    const results = await axios.post(`${apiUrl}${URL_LIST}`, bodyParameters, config);

    /* TODO: Start of dummy data from the API */
    // const dummyData = [
    //   {"id": 1, "interface": "http://schema.skao.int/ska-data-product-meta/0.1", "execution_block": "eb-m001-20191031-12345", "date_created": "20230101", "dataproduct_file": "product/eb-m001-20221212-12345", "metadata_file": "product/eb-m001-20221212-12345/ska-data-product.yaml"}, 
    //   {"id": 2, "interface": "http://schema.skao.int/ska-data-product-meta/0.1", "execution_block": "eb-m002-20221212-12345", "date_created": "20230101", "dataproduct_file": "product/eb-m002-20221212-12345", "metadata_file": "product/eb-m002-20221212-12345/ska-data-product.yaml"},
    //   {"id": 3, "interface": "http://schema.skao.int/ska-data-product-meta/0.1", "execution_block": "eb-m003-20191031-12345", "date_created": "20230101", "dataproduct_file": "product/eb-m001-20221212-12345", "metadata_file": "product/eb-m001-20221212-12345/ska-data-product.yaml"}, 
    //   {"id": 4, "interface": "http://schema.skao.int/ska-data-product-meta/0.1", "execution_block": "eb-m004-20221212-12345", "date_created": "20230101", "dataproduct_file": "product/eb-m002-20221212-12345", "metadata_file": "product/eb-m002-20221212-12345/ska-data-product.yaml"},
    //   {"id": 5, "interface": "http://schema.skao.int/ska-data-product-meta/0.1", "execution_block": "eb-m005-20191031-12345", "date_created": "20230101", "dataproduct_file": "product/eb-m001-20221212-12345", "metadata_file": "product/eb-m001-20221212-12345/ska-data-product.yaml"}, 
    //   {"id": 6, "interface": "http://schema.skao.int/ska-data-product-meta/0.1", "execution_block": "eb-m006-20221212-12345", "date_created": "20230101", "dataproduct_file": "product/eb-m002-20221212-12345", "metadata_file": "product/eb-m002-20221212-12345/ska-data-product.yaml"},
    // ];
    // return dummyData;
    /* TODO: End of dummy data from the API */

    // TODO: Replace dummy data with the following results.data when API is used
    return results.data;
  } catch (e) {
    return "API unreachable, SDP data not available";
  }
}

export default FetchDataProductList