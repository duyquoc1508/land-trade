import {
  FILLING_FORM,
  // CREATE_REQUESTING,
  CREATE_SUCCESS,
  CREATE_ERROR
} from "./constants";

const initialState = {
  requesting: false,
  success: false,
  errors: [],
  messages: [],
  data: {
    owners: [],
    title: "",
    // attestor: "",
    // II. Land lot, house and other properties attaching with land
    properties: {
      landLot: null,
      house: null,
      otherConstruction: "",
      prodForestIsArtificial: "",
      perennialTree: "",
      notice: ""
    },
    images: []
  }
};

function createReducer(state = initialState, action) {
  switch (action.type) {
    case FILLING_FORM:
      // console.log(action.data.owner.hasOwnProperty("values"));
      if (
        action.data.hasOwnProperty("owners") &&
        action.data.owners.hasOwnProperty("values")
      )
        state.data.owners = action.data.owners.values.publicAddress;
      if (
        action.data.hasOwnProperty("land") &&
        action.data.land.hasOwnProperty("values")
      )
        state.data.properties.landLot = action.data.land.values;
      if (
        action.data.hasOwnProperty("house") &&
        action.data.house.hasOwnProperty("values")
      )
        state.data.properties.house = action.data.house.values;
      if (
        action.data.hasOwnProperty("construction") &&
        action.data.construction.hasOwnProperty("values")
      )
        state.data.properties.otherConstruction =
          action.data.construction.values.otherConstruction;
      if (
        action.data.hasOwnProperty("forest") &&
        action.data.forest.hasOwnProperty("values")
      )
        state.data.properties.prodForestIsArtificial =
          action.data.forest.values.prodForestIsArtificial;
      if (
        action.data.hasOwnProperty("tree") &&
        action.data.tree.hasOwnProperty("values")
      )
        state.data.properties.perennialTree =
          action.data.tree.values.perennialTree;
      if (
        action.data.hasOwnProperty("note") &&
        action.data.note.hasOwnProperty("values")
      )
        state.data.properties.notice = action.data.note.values.notice;
      if (
        action.data.hasOwnProperty("upload") &&
        action.data.upload.hasOwnProperty("values")
      )
        state.data.images = action.data.upload.values.images;
      return state;
    case CREATE_SUCCESS:
      return {
        Hello: action.payload
      };
    case CREATE_ERROR:
      return {};
    default:
      return state;
  }
}

export default createReducer;
