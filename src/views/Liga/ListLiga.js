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
  Row,
  Spinner,
  Table,
} from "reactstrap";
import { getListLiga, deleteLiga } from "store/actions/LigaAction";
import Swal from "sweetalert2";
import "../../assets/css/ListLiga.css";

class ListLiga extends Component {
  componentDidMount() {
    this.props.dispatch(getListLiga());
  }

  removeData = (image, id) => {
    //Akses ke action
    this.props.dispatch(deleteLiga(image, id));
  };

  componentDidUpdate(prevProps) {
    const { deleteLigaResult } = this.props;
    if (deleteLigaResult && prevProps.deleteLigaResult !== deleteLigaResult) {
      Swal.fire("Success", deleteLigaResult, "success");
      this.props.dispatch(getListLiga());
    }
  }

  render() {
    const { getListLigaResult, getListLigaLoading, getListLigaError } =
      this.props;
    return (
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle>
                  <h4>Master Liga</h4>
                </CardTitle>
                <Link
                  to="/admin/liga/tambah"
                  className="btn btn-primary float-right"
                >
                  Tambah Liga
                </Link>
              </CardHeader>
              <CardBody>
                <Table>
                  <thead className="text-primary">
                    <tr>
                      <th>Logo</th>
                      <th>Nama Liga</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getListLigaResult ? (
                      Object.keys(getListLigaResult).map((key) => {
                        return (
                          <tr key={key}>
                            <td>
                              <img
                                className="LogoLiga"
                                src={getListLigaResult[key].image}
                                alt={getListLigaResult[key].namaLiga}
                              ></img>
                            </td>
                            <td>{getListLigaResult[key].namaLiga}</td>
                            <td>
                              <Link
                                className="btn btn-warning"
                                to={"/admin/liga/edit/" + key}
                              >
                                <i className="nc-icon nc-ruler-pencil"></i> Edit
                              </Link>
                              <Button
                                color="danger"
                                className="ml-2"
                                onClick={() =>
                                  this.removeData(
                                    getListLigaResult[key].image,
                                    key
                                  )
                                }
                              >
                                <i className="nc-icon nc-basket"></i> Hapus
                              </Button>
                            </td>
                          </tr>
                        );
                      })
                    ) : getListLigaLoading ? (
                      <tr>
                        <td colSpan="3" align="center">
                          <Spinner color="primary">Loading...</Spinner>
                        </td>
                      </tr>
                    ) : getListLigaError ? (
                      <tr>
                        <td colSpan="3" align="center">
                          {getListLigaError}
                        </td>
                      </tr>
                    ) : (
                      <tr>
                        <td colSpan="3" align="center">
                          Data Kosong
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
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

  deleteLigaLoading: state.LigaReducer.deleteLigaLoading,
  deleteLigaResult: state.LigaReducer.deleteLigaResult,
  deleteLigaError: state.LigaReducer.deleteLigaError,
});

export default connect(mapStateToProps, null)(ListLiga);
