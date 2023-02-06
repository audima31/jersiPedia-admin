import FIREBASE from "config/FIREBASE";
import { dispatchError, dispatchLoading, dispatchSuccess } from "../../utils";

export const GET_LIST_PESANAN = "GET_LIST_PESANAN";
export const UPDATE_PESANAN = "UPDATE_PESANAN";

export const getListPesanan = () => {
  return (dispatch) => {
    //Loading
    dispatchLoading(dispatch, GET_LIST_PESANAN);

    FIREBASE.database()
      .ref("histories/")
      .once("value", (querySnapshot) => {
        console.log("querySnapshot : ", querySnapshot.val());

        //hasil
        let data = querySnapshot.val() ? querySnapshot.val() : [];
        dispatchSuccess(dispatch, GET_LIST_PESANAN, data);
      })
      .catch((error) => {
        dispatchError(dispatch, GET_LIST_PESANAN, error);
        alert(error.message);
      });
  };
};

export const updatePesanan = (order_id, transaction_status) => {
  return (dispatch) => {
    //Loading
    dispatchLoading(dispatch, UPDATE_PESANAN);

    const status =
      transaction_status === "settlement" || transaction_status === "capture"
        ? "lunas"
        : transaction_status;

    FIREBASE.database()
      .ref("histories/")
      .child(order_id)
      .update({ status: status })
      .then((response) => {
        //hasil
        dispatchSuccess(dispatch, UPDATE_PESANAN, response ? response : []);
      })
      .catch((error) => {
        dispatchError(dispatch, UPDATE_PESANAN, error);
        alert(error.message);
      });
  };
};
