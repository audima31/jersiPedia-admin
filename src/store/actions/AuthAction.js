import FIREBASE from "config/FIREBASE";
import Swal from "sweetalert2";
import { dispatchError, dispatchLoading, dispatchSuccess } from "../../utils";

export const LOGIN_USER = "LOGIN_USER";

export const loginUser = (email, password) => {
  return (dispatch) => {
    dispatchLoading(dispatch, LOGIN_USER);

    FIREBASE.auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        //Nyambungin ke Realtime database, ngecek ada gaa akunnya di realtime database
        FIREBASE.database()
          .ref(`users/${userCredential.user.uid}`)
          .once("value")
          .then((userCredential) => {
            // Signed in
            if (userCredential.val()) {
              if (userCredential.val().status === "admin") {
                //NGIRIM DATA KE LOCALSTORAGE
                window.localStorage.setItem(
                  "user",
                  JSON.stringify(userCredential.val())
                );
                dispatchSuccess(dispatch, LOGIN_USER, userCredential.val());
              } else {
                dispatchError(
                  dispatch,
                  LOGIN_USER,
                  "Anda tidak memiliki akses"
                );
                Swal.fire(
                  "Tidak Memiliki Akses",
                  "Anda tidak memiliki akses",
                  "error"
                );
              }
            }
          })
          .catch((error) => {
            dispatchError(dispatch, LOGIN_USER, error.message);
            Swal.fire("Error", error.message, "error");
          });
      })
      .catch((error) => {
        dispatchError(dispatch, LOGIN_USER, error.message);
        Swal.fire("Error", error.message, "error");
      });
  };
};
