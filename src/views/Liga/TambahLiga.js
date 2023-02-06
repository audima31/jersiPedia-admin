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
  Row,
  Spinner,
} from "reactstrap";
import { tambahLiga } from "store/actions/LigaAction";
import Swal from "sweetalert2";
import GambarDefaultLogo from "../../assets/img/default-image.jpg";

class TambahLiga extends Component {
  constructor(props) {
    super(props);

    this.state = {
      image: GambarDefaultLogo,
      imageToDB: false,
      namaLiga: "",
    };
  }

  //Event.target.value itu berarti setState namaLiga, bakal diisi dengan value yang ada di <input>
  handleChange = (event) => {
    this.setState({
      namaLiga: event.target.value,
    });
  };

  handleImage = (event) => {
    console.log("Event : ", event);
    if (event.target.files && event.target.files[0]) {
      const gambar = event.target.files[0];
      this.setState({
        //URL.createObjectURL() = Memuat file gambar ke dalam website tanpa menggunakan Server-Side Atau mengubah gambar menjadi berupa URL
        image: URL.createObjectURL(gambar),
        imageToDB: gambar,
      });
    }
  };

  handleSubmit = (event) => {
    const { imageToDB, namaLiga } = this.state;
    event.preventDefault();
    if (imageToDB && namaLiga) {
      //Proses lanjut ke action firebase
      this.props.dispatch(tambahLiga(this.state));
    } else {
      Swal.fire("Failed!", "Lengkap Data Terlebih Dahulu!", "error");
    }
  };

  componentDidUpdate(prevProps) {
    const { tambahLigaResult } = this.props;

    if (tambahLigaResult && prevProps.tambahLigaResult !== tambahLigaResult) {
      Swal.fire("Good job!", "Tambah liga telah berhasil", "success");
      this.props.history.push("/admin/liga");
    }
  }

  render() {
    const { image, namaLiga } = this.state;
    const { tambahLigaLoading } = this.props;
    return (
      <div className="content">
        <Row>
          <Col>
            <Link to={"/admin/liga"} className="btn btn-primary">
              Kembali
            </Link>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle>
                  <h4>Tambah Liga</h4>
                </CardTitle>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col>
                    <img src={image} width={200} alt={"Logo Liga"}></img>
                  </Col>
                </Row>

                <form onSubmit={(event) => this.handleSubmit(event)}>
                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <label>Logo Liga</label>
                        <Input
                          type="file"
                          onChange={(event) => this.handleImage(event)}
                        />
                      </FormGroup>
                    </Col>

                    <Col md={6}>
                      <FormGroup>
                        <label>Nama Liga</label>
                        <Input
                          type="text"
                          value={namaLiga}
                          name="namaLiga"
                          onChange={(event) => this.handleChange(event)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      {tambahLigaLoading ? (
                        <Button color="primary" type="submit" disabled>
                          <Spinner size="sm" color="light" /> Loading
                        </Button>
                      ) : (
                        <Button color="primary" type="submit">
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
  tambahLigaLoading: state.LigaReducer.tambahLigaLoading,
  tambahLigaResult: state.LigaReducer.tambahLigaResult,
  tambahLigaError: state.LigaReducer.tambahLigaError,
});

export default connect(mapStateToProps, null)(TambahLiga);
