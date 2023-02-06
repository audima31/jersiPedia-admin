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
import { updateLiga, getDetailLiga } from "store/actions/LigaAction";
import Swal from "sweetalert2";
import GambarDefaultLogo from "../../assets/img/default-image.jpg";

class EditLiga extends Component {
  constructor(props) {
    super(props);

    this.state = {
      //this.props.match.params.id = Merupakan ID dari FIREBASE
      id: this.props.match.params.id,
      imageLama: GambarDefaultLogo,
      image: GambarDefaultLogo,
      imageToDB: false,
      namaLiga: "",
    };
  }

  componentDidMount() {
    //this.props.match.params.id = Merupakan ID dari FIREBASE
    this.props.dispatch(getDetailLiga(this.props.match.params.id));
  }

  //Event.target.value itu berarti setState namaLiga, bakal diisi dengan value yang ada di <input>
  handleChange = (event) => {
    this.setState({
      namaLiga: event.target.value,
    });
  };

  handleImage = (event) => {
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
    const { namaLiga } = this.state;
    event.preventDefault();
    if (namaLiga) {
      //Proses lanjut ke action firebase
      this.props.dispatch(updateLiga(this.state));
    } else {
      Swal.fire("Failed!", "Nama liga wajib diisi!", "error");
    }
  };

  componentDidUpdate(prevProps) {
    const { detailLigaResult, updateLigaResult } = this.props;
    //BUAT NAMPILIN DATA DI DETAIL PAGE
    if (detailLigaResult && prevProps.detailLigaResult !== detailLigaResult) {
      this.setState({
        image: detailLigaResult.image,
        namaLiga: detailLigaResult.namaLiga,
        imageLama: detailLigaResult.image,
      });
    }

    if (updateLigaResult && prevProps.updateLigaResult !== updateLigaResult) {
      Swal.fire("Good job!", "Update liga telah berhasil", "success");
      this.props.history.push("/admin/liga");
    }
  }

  render() {
    const { image, namaLiga } = this.state;
    const { updateLigaLoading } = this.props;
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
                  <h4>Edit Liga</h4>
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
                      {updateLigaLoading ? (
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
  updateLigaLoading: state.LigaReducer.updateLigaLoading,
  updateLigaResult: state.LigaReducer.updateLigaResult,
  updateLigaError: state.LigaReducer.updateLigaError,

  detailLigaLoading: state.LigaReducer.detailLigaLoading,
  detailLigaResult: state.LigaReducer.detailLigaResult,
  detailLigaError: state.LigaReducer.detailLigaError,
});

export default connect(mapStateToProps, null)(EditLiga);
