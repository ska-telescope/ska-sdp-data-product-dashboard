import axios from 'axios';

const FetchDataProductList = async () => {
  const apiUrl = process.env.REACT_APP_SKA_SDP_DATA_PRODUCT_API_URL;
  const URL_LIST = '/dataproductlist';

  try {
    const results = await axios.get(`${apiUrl}${URL_LIST}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    });

    /* dummy data from the API */
    const dummyData = [
      {"id": 1, "interface": "http://schema.skao.int/ska-data-product-meta/0.1", "execution_block": "eb-m001-20191031-12345"},
      {"id": 2, "interface": "http://schema.skao.int/ska-data-product-meta/0.1", "execution_block": "eb-m001-20191031-12345"},
      {"id": 3, "interface": "http://schema.skao.int/ska-data-product-meta/0.1", "execution_block": "eb-m001-20191031-12345"},
      {"id": 4, "interface": "http://schema.skao.int/ska-data-product-meta/0.1", "execution_block": "eb-m001-20191031-12345"},
      {"id": 5, "interface": "http://schema.skao.int/ska-data-product-meta/0.1", "execution_block": "eb-m001-20191031-12345"},
      {"id": 6, "interface": "http://schema.skao.int/ska-data-product-meta/0.1", "execution_block": "eb-m001-20191031-12345"},
      {"id": 7, "interface": "http://schema.skao.int/ska-data-product-meta/0.1", "execution_block": "eb-m001-20191031-12345"},
      {"id": 8, "interface": "http://schema.skao.int/ska-data-product-meta/0.1", "execution_block": "eb-m001-20191031-12345"},
      {"id": 9, "interface": "http://schema.skao.int/ska-data-product-meta/0.1", "execution_block": "eb-m001-20191031-12345"},
      {"id": 10, "interface": "http://schema.skao.int/ska-data-product-meta/0.1", "execution_block": "eb-m001-20191031-12345"}
    ];

    /* here we temporarily return the dummyData in place of the actual data received from the API */
    return dummyData;
  } catch (e) {
    return "API unreachable, SDP data not available";
  }
}

export default FetchDataProductList