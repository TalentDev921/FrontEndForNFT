import { Axios, Canceler } from '../../../core/axios';
import * as actions from '../../actions';
import api from '../../../core/api';

export const fetchNftsBreakdown = (authorId) => async (dispatch, getState) => {
  
  //access the state
  const state = getState();
  console.log(state);

  dispatch(actions.getNftBreakdown.request(Canceler.cancel));

  try {
    let filter = authorId ? 'author='+authorId : '';
    const { data } = await Axios.get(`${api.baseUrl}${api.nfts}?${filter}`, {
      cancelToken: Canceler.token,
      params: {}
    });

    dispatch(actions.getNftBreakdown.success(data));
  } catch (err) {
    dispatch(actions.getNftBreakdown.failure(err));
  }
};

export const fetchNftShowcase = () => async (dispatch) => {

  dispatch(actions.getNftShowcase.request(Canceler.cancel));

  try {
    const { data } = await Axios.get(`${api.baseUrl}${api.nftShowcases}`, {
      cancelToken: Canceler.token,
      params: {}
    });

    dispatch(actions.getNftShowcase.success(data));
  } catch (err) {
    dispatch(actions.getNftShowcase.failure(err));
  }
};

export const fetchNftDetail = (nftId) => async (dispatch) => {

  dispatch(actions.getNftDetail.request(Canceler.cancel));

  try {
    const { data } = await Axios.get(`${api.baseUrl}${api.nfts}/${nftId}`, {
      cancelToken: Canceler.token,
      params: {}
    });

    dispatch(actions.getNftDetail.success(data));
  } catch (err) {
    dispatch(actions.getNftDetail.failure(err));
  }
};

export const createSingleNft = (formData) => async (dispatch) => {
  dispatch(actions.postNftFile.request(Canceler.cancel));

  try {
    const { data } = await Axios.post(`${api.baseUrl}${api.nfts}`, formData, {
      cancelToken: Canceler.token,
      params: {}
    });

    dispatch(actions.postNftFile.success(data));
  } catch (err) {
    dispatch(actions.postNftFile.failure(err));
  }
};

export const createMultipleNft = (formData) => async (dispatch) => {
  try {
    for(let index in formData.files) {
      let param = formData;
      delete param.files;
      param.file = formData.files[index];
      const { data } = await Axios.post(`${api.baseUrl}${api.nfts}`, param, {
        cancelToken: Canceler.token,
        params: {}
      });
      console.log(data);
    }
  } catch (err) {
  }
};

export const mintedNft = (nftId) => async (dispatch) => {
  dispatch(actions.getNftBreakdown.request(Canceler.cancel));

  try {
    const { data } = await Axios.put(`${api.baseUrl}${api.nfts}/${nftId}`,
    {"status" : "minted"},
    {
      cancelToken: Canceler.token,
      params: {}
    });

    dispatch(actions.getNftDetail.success(data));
  } catch (err) {
    dispatch(actions.getNftDetail.failure(err));
  } 
};