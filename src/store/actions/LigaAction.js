import FIREBASE from "config/FIREBASE";
import Swal from "sweetalert2";
import { dispatchError, dispatchLoading, dispatchSuccess } from "../../utils";

export const GET_LIST_LIGA = "GET_LIST_LIGA";
export const TAMBAH_LIGA = "TAMBAH_LIGA";
export const GET_DETAIL_LIGA = "GET_DETAIL_LIGA";
export const UPDATE_LIGA = "UPDATE_LIGA";
export const DELETE_LIGA = "DELETE_LIGA";

export const getListLiga = () => {
  return (dispatch) => {
    //Loading
    dispatchLoading(dispatch, GET_LIST_LIGA);

    FIREBASE.database()
      .ref("ligas")
      .once("value", (querySnapshot) => {
        console.log("querySnapshot : ", querySnapshot.val());

        //hasil
        let data = querySnapshot.val() ? querySnapshot.val() : [];
        dispatchSuccess(dispatch, GET_LIST_LIGA, data);
      })
      .catch((error) => {
        dispatchError(dispatch, GET_LIST_LIGA, error);
        alert(error.message);
      });
  };
};

export const tambahLiga = (data) => {
  return (dispatch) => {
    dispatchLoading(dispatch, TAMBAH_LIGA);

    //upload ke Storage Firebase
    var uploadTask = FIREBASE.storage()
      .ref("ligas/")
      .child(data.imageToDB.name) //nama filenya
      .put(data.imageToDB); //File yang akan di upload

    //PROSES UPLOAD
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        console.log("Snapshot TmabhLigaAction : ", snapshot);
      },
      (error) => {
        console.log("ERROR SUM LIGA : ", error);
      },
      //END PROSES UPLOAD

      //INI FUNGSI SETELAH PROSES UPLOAD GAMBAR BERHASIL
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          console.log("File available at", downloadURL);

          const dataBaru = {
            namaLiga: data.namaLiga,
            image: downloadURL,
          };

          //PROSES UPLOAD KE REALTIME DATABASE FIREBASE
          FIREBASE.database()
            .ref("ligas/")
            .push(dataBaru)
            .then((response) => {
              dispatchSuccess(dispatch, TAMBAH_LIGA, response ? response : []);
            })
            .catch((error) => {
              dispatchError(dispatch, TAMBAH_LIGA, error);
              alert(error);
            });
        });
      }
    );
  };
};

export const getDetailLiga = (id) => {
  return (dispatch) => {
    //Loading
    dispatchLoading(dispatch, GET_DETAIL_LIGA);

    FIREBASE.database()
      .ref("ligas/" + id)
      .once("value", (querySnapshot) => {
        console.log("querySnapshot : ", querySnapshot.val());

        //hasil
        let data = querySnapshot.val() ? querySnapshot.val() : [];
        dispatchSuccess(dispatch, GET_DETAIL_LIGA, data);
      })
      .catch((error) => {
        dispatchError(dispatch, GET_DETAIL_LIGA, error);
        alert(error.message);
      });
  };
};

export const updateLiga = (data) => {
  return (dispatch) => {
    dispatchLoading(dispatch, UPDATE_LIGA);

    //  ------ VERSI GAMBAR DIGANTI ------
    //Cek apakah gambar diganti
    if (data.imageToDB) {
      //Proses ganti gambar
      //Ambil dan hapus gambar yang lama dari firebase storage
      var desertRef = FIREBASE.storage().refFromURL(data.imageLama);

      // Proses hapus gambar lama dari firebase storage
      desertRef
        .delete()
        .then(() => {
          // File deleted successfully, Maka lanjut ke proses upload gambar baru
          var uploadTask = FIREBASE.storage()
            .ref("ligas/")
            .child(data.imageToDB.name) //nama filenya
            .put(data.imageToDB); //File yang akan di upload

          //PROSES UPLOAD
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              console.log("Snapshot Edit Liga : ", snapshot);
            },
            (error) => {
              console.log("ERROR Edit LIGA : ", error);
            },
            //END PROSES UPLOAD

            //INI FUNGSI SETELAH PROSES UPLOAD GAMBAR BERHASIL
            () => {
              uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                console.log("File available at", downloadURL);
                const dataBaru = {
                  namaLiga: data.namaLiga,
                  image: downloadURL,
                };

                //PROSES UPLOAD KE REALTIME DATABASE FIREBASE
                FIREBASE.database()
                  .ref("ligas/" + data.id)
                  .update(dataBaru)
                  .then((response) => {
                    dispatchSuccess(
                      dispatch,
                      UPDATE_LIGA,
                      response ? response : []
                    );
                  })
                  .catch((error) => {
                    dispatchError(dispatch, UPDATE_LIGA, error);
                    alert(error);
                  });
              });
            }
          );
        })
        .catch((error) => {
          dispatchError(dispatch, UPDATE_LIGA, error);
          alert(error.message);
        });
      //  ------ END VERSI GAMBAR DIGANTI ------
    } else {
      //  ------ VERSI HANYA TEXT DIGANTI ------
      const dataBaru = {
        namaLiga: data.namaLiga,
        image: data.image,
      };

      //PROSES UPLOAD KE REALTIME DATABASE FIREBASE
      FIREBASE.database()
        .ref("ligas/" + data.id)
        .update(dataBaru)
        .then((response) => {
          dispatchSuccess(dispatch, UPDATE_LIGA, response ? response : []);
        })
        .catch((error) => {
          dispatchError(dispatch, UPDATE_LIGA, error);
          alert(error);
        });
      //  ------ VERSI HANYA TEXT DIGANTI ------
    }
  };
};

export const deleteLiga = (image, id) => {
  return (dispatch) => {
    dispatchLoading(dispatch, DELETE_LIGA);

    //PROSES HAPUS GAMBAR DARI STORAGE
    var desertRef = FIREBASE.storage().refFromURL(image);

    desertRef
      .delete()
      .then(() => {
        //Apabila delete gambar di storgae sukses, maka lanjut ke proses hapus data yang di realtime database
        FIREBASE.database()
          .ref("ligas/" + id)
          .remove()
          .then(() => {
            dispatchSuccess(dispatch, DELETE_LIGA, "LIGA SUKSES DIHAPUS");
          })
          .catch((error) => {
            dispatchError(dispatch, DELETE_LIGA, error);
            alert(error);
          });
      })
      .catch((error) => {});
  };
};
