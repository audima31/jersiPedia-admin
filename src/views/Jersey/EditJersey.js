import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  FormGroup,
  Input,
  Label,
  Row,
  Spinner,
} from "reactstrap";
import {
  updateJersey,
  uploadJersey,
  getDetailJersey,
} from "store/actions/JerseyAction";
import { getListLiga } from "store/actions/LigaAction";
import Swal from "sweetalert2";
import defaultImage from "../../assets/img/default-image.jpg";

class EditJersey extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      image1: defaultImage,
      image2: defaultImage,
      imageToDB1: false,
      imageToDB2: false,
      imageLama1: false,
      imageLama2: false,
      nama: "",
      harga: 0,
      berat: 0,
      jenis: "",
      ukurans: ["S", "M", "L", "XL", "XXL"],
      ukuranSelected: [],
      ready: true,
      liga: "",
      editUkuran: false,
    };
  }

  componentDidMount() {
    this.props.dispatch(getListLiga());
    this.props.dispatch(getDetailJersey(this.props.match.params.id));
  }

  //Event.target.value itu berarti setState namaLiga, bakal diisi dengan value yang ada di <input>
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleCheck = (event) => {
    const dipilih = event.target.checked;
    const value = event.target.value;
    if (dipilih) {
      //jika user ceklis ukuran
      //isi state array ukuran selected
      this.setState({
        //Ngambil semua ukuran yang di ceklis (...this.state.ukuranSelected)
        ukuranSelected: [...this.state.ukuranSelected, value],
      });
    } else {
      //jika user menghapus ukuran
      const ukuranBaru = this.state.ukuranSelected
        .filter((ukuran) => ukuran !== value)
        .map((filterUkuran) => {
          return filterUkuran;
        });
      this.setState({
        ukuranSelected: ukuranBaru,
      });
    }
  };

  handleImage = (event, imageToDB) => {
    if (event.target.files && event.target.files[0]) {
      const gambar = event.target.files[0];
      this.setState({
        //URL.createObjectURL() = Memuat file gambar ke dalam website tanpa menggunakan Server-Side Atau mengubah gambar menjadi berupa URL
        [event.target.name]: URL.createObjectURL(gambar),
      });
      //Mengirim ke action
      this.props.dispatch(uploadJersey(gambar, imageToDB));
    }
  };

  handleSubmit = (event) => {
    const { berat, harga, nama, liga, ukuranSelected, jenis } = this.state;

    event.preventDefault();

    if (nama && liga && berat && harga && ukuranSelected && jenis) {
      //Proses lanjut ke action firebase
      this.props.dispatch(updateJersey(this.state));
    } else {
      Swal.fire("Failed!", "Lengkap Data Terlebih Dahulu!", "error");
    }
  };

  componentDidUpdate(prevProps) {
    const { uploadJerseyResult, updateJerseyResult, getDetailJerseyResult } =
      this.props;

    if (
      uploadJerseyResult &&
      prevProps.uploadJerseyResult !== uploadJerseyResult
    ) {
      this.setState({
        //Mengubah tampilan gambar menjadi gambar yang baru di pilih
        [uploadJerseyResult.imageToDB]: uploadJerseyResult.image,
      });
      Swal.fire("Sukses", "Gambar berhasil di upload", "success");
    }

    if (
      updateJerseyResult &&
      prevProps.updateJerseyResult !== updateJerseyResult
    ) {
      Swal.fire("Sukses", updateJerseyResult, "success");
      this.props.history.push("/admin/jersey");
    }

    if (
      getDetailJerseyResult &&
      prevProps.getDetailJerseyResult !== getDetailJerseyResult
    ) {
      this.setState({
        image1: getDetailJerseyResult.gambar[0],
        image2: getDetailJerseyResult.gambar[1],
        imageLama1: getDetailJerseyResult.gambar[0],
        imageLama2: getDetailJerseyResult.gambar[1],
        nama: getDetailJerseyResult.nama,
        harga: getDetailJerseyResult.harga,
        berat: getDetailJerseyResult.berat,
        jenis: getDetailJerseyResult.jenis,
        ukuranSelected: getDetailJerseyResult.ukuran,
        ready: getDetailJerseyResult.ready,
        liga: getDetailJerseyResult.liga,
      });
    }
  }

  editUkuran = () => {
    this.setState({
      editUkuran: true,
      ukuranSelected: [],
    });
  };

  render() {
    const {
      image1,
      image2,
      imageLama1,
      imageLama2,
      imageToDB1,
      imageToDB2,
      nama,
      berat,
      harga,
      jenis,
      liga,
      ready,
      ukuranSelected,
      ukurans,
      editUkuran,
    } = this.state;

    const { getListLigaResult, updateJerseyLoading, getDetailJerseyResult } =
      this.props;
    console.log("Detail : ", getDetailJerseyResult);
    return (
      <div className="content">
        <Row>
          <Col>
            <Link to={"/admin/jersey"} className="btn btn-primary">
              Kembali
            </Link>
          </Col>
        </Row>

        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle>
                  <h4>Edit Jersey</h4>
                </CardTitle>
              </CardHeader>
              <CardBody>
                <form onSubmit={(event) => this.handleSubmit(event)}>
                  <Row>
                    <Col md={6}>
                      <Row>
                        <Col>
                          <img
                            src={image1}
                            width="300"
                            alt="Foto Jersey Depan"
                          ></img>
                          <FormGroup>
                            <label>Foto jersey (depan)</label>
                            <Input
                              type="file"
                              name="image1"
                              onChange={(event) =>
                                this.handleImage(event, "imageToDB1")
                              }
                            ></Input>
                          </FormGroup>
                          {image1 !== imageLama1 ? (
                            //Selesai / Proses Upload
                            imageToDB1 ? (
                              <p>
                                <i className="nc-icon nc-check-2" />
                                Selesai Upload
                              </p>
                            ) : (
                              <p>
                                <i className="nc-icon nc-user-run" />
                                Proses Upload
                              </p>
                            )
                          ) : (
                            //Belom upload
                            <p>
                              <i className="nc-icon nc-cloud-upload-94 mr-1" />
                              Belum Upload
                            </p>
                          )}
                        </Col>
                        <Col>
                          <img
                            src={image2}
                            width="300"
                            alt="Foto Jersey Belakang"
                          ></img>
                          <FormGroup>
                            <label>Foto jersey (belakang)</label>
                            <Input
                              type="file"
                              name="image2"
                              onChange={(event) =>
                                this.handleImage(event, "imageToDB2")
                              }
                            ></Input>
                          </FormGroup>
                          {image2 !== imageLama2 ? (
                            //Selesai / Proses Upload
                            imageToDB2 ? (
                              <p>
                                <i className="nc-icon nc-check-2" />
                                Selesai Upload
                              </p>
                            ) : (
                              <p>
                                <i className="nc-icon nc-user-run" />
                                Proses Upload
                              </p>
                            )
                          ) : (
                            //Belom upload
                            <p>
                              <i className="nc-icon nc-cloud-upload-94 mr-1" />
                              Belum Upload
                            </p>
                          )}
                        </Col>
                      </Row>
                    </Col>

                    <Col md={6}>
                      <FormGroup>
                        <label>Nama Jersey</label>
                        <Input
                          type="text"
                          value={nama}
                          name="nama"
                          onChange={(event) => this.handleChange(event)}
                        ></Input>
                      </FormGroup>

                      <Row>
                        <Col md={6}>
                          <FormGroup>
                            <label>Liga</label>
                            <Input
                              type="select"
                              name="liga"
                              value={liga}
                              onChange={(event) => this.handleChange(event)}
                            >
                              <option value=""> -- PILIH -- </option>
                              {Object.keys(getListLigaResult).map((key) => {
                                return (
                                  <option value={key} key={key}>
                                    {getListLigaResult[key].namaLiga}
                                  </option>
                                );
                              })}
                            </Input>
                          </FormGroup>
                        </Col>

                        <Col md={6}>
                          <FormGroup>
                            <label>Harga (Rp.)</label>
                            <Input
                              type="number"
                              value={harga}
                              name="harga"
                              onChange={(event) => this.handleChange(event)}
                            ></Input>
                          </FormGroup>
                        </Col>
                      </Row>

                      <Row>
                        <Col md={6}>
                          <FormGroup>
                            <label>Berat (Kg)</label>
                            <Input
                              type="number"
                              value={berat}
                              name="berat"
                              onChange={(event) => this.handleChange(event)}
                            ></Input>
                          </FormGroup>
                        </Col>

                        <Col md={6}>
                          <FormGroup>
                            <label>Jenis</label>
                            <Input
                              type="text"
                              value={jenis}
                              name="jenis"
                              onChange={(event) => this.handleChange(event)}
                            ></Input>
                          </FormGroup>
                        </Col>
                      </Row>

                      <Row>
                        <Col md={6}>
                          <label>
                            Ukuran Yang Tersedia Sekarang : (
                            {ukuranSelected.map((item, index) => (
                              <strong key={index}> {item} </strong>
                            ))}
                            )
                          </label>
                          {editUkuran ? (
                            <>
                              <FormGroup check>
                                {ukurans.map((ukuran, index) => (
                                  <Label key={index} check className="mr-2">
                                    <Input
                                      type="checkbox"
                                      value={ukuran}
                                      onChange={(event) =>
                                        this.handleCheck(event)
                                      }
                                    />
                                    {ukuran}
                                    <span className="form-check-sign">
                                      <span className="check"></span>
                                    </span>
                                  </Label>
                                ))}
                              </FormGroup>

                              <Button
                                color="primary"
                                size="sm"
                                onClick={() =>
                                  this.setState({ editUkuran: false })
                                }
                              >
                                Selesai Edit
                              </Button>
                            </>
                          ) : (
                            <Button
                              color="primary"
                              size="sm"
                              onClick={() => this.editUkuran()}
                            >
                              Edit Ukuran
                            </Button>
                          )}
                        </Col>

                        <Col md={6}>
                          <FormGroup>
                            <label>Ready</label>
                            <Input
                              type="select"
                              name="ready"
                              value={ready}
                              onChange={(event) => this.handleChange(event)}
                            >
                              <option value={true}>Tersedia</option>
                              <option value={false}>Kosong</option>
                            </Input>
                          </FormGroup>
                        </Col>
                      </Row>
                    </Col>
                  </Row>

                  <Row>
                    <Col>
                      {updateJerseyLoading ? (
                        <Button
                          type="submit"
                          color="primary"
                          className="float-right"
                          disabled
                        >
                          <Spinner size={"sm"} color="light" /> Loading . . .
                        </Button>
                      ) : (
                        <Button
                          type="submit"
                          color="primary"
                          className="float-right"
                        >
                          SUBMIT
                        </Button>
                      )}
                    </Col>
                  </Row>
                </form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  getListLigaLoading: state.LigaReducer.getListLigaLoading,
  getListLigaResult: state.LigaReducer.getListLigaResult,
  getListLigaError: state.LigaReducer.getListLigaError,

  uploadJerseyLoading: state.JerseyReducer.uploadJerseyLoading,
  uploadJerseyResult: state.JerseyReducer.uploadJerseyResult,
  uploadJerseyError: state.JerseyReducer.uploadJerseyError,

  getDetailJerseyLoading: state.JerseyReducer.getDetailJerseyLoading,
  getDetailJerseyResult: state.JerseyReducer.getDetailJerseyResult,
  getDetailJerseyError: state.JerseyReducer.getDetailJerseyError,

  updateJerseyLoading: state.JerseyReducer.updateJerseyLoading,
  updateJerseyResult: state.JerseyReducer.updateJerseyResult,
  updateJerseyError: state.JerseyReducer.updateJerseyError,
});

export default connect(mapStateToProps, null)(EditJersey);
