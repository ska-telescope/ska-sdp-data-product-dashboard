import axios from 'axios';

async function MetaData() {
  async function fetchMetaData() {
    const apiUrl = process.env.REACT_APP_SKA_SDP_DATA_PRODUCT_API_URL;
    const filename = "ska-data-product.yaml";
    const path = "product/eb_id_2/ska-sub-system/scan_id_2/pb_id_2";
    const params = {
      "relativeFileName": `${path}/${filename}`,
      "fileName": filename
    };

    try {
      return await axios.post(`${apiUrl}/dataproductmetadata`,  params, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      });
    } catch (e) {
      const noData = 'API unreachable, SDP meta data not available';
      return noData;
    }
  }
  return fetchMetaData();
}

export default MetaData;
