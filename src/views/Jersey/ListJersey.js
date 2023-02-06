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
import { deleteJersey } from "store/actions/JerseyAction";
import { getListJersey } from "store/actions/JerseyAction";
import Swal from "sweetalert2";
import "../../assets/css/ListLiga.css";

class ListJersey extends Component {
  componentDidMount() {
    this.props.dispatch(getListJersey());
  }

  removeData = (images, id) => {
    //Akses ke action
    this.props.dispatch(deleteJersey(images, id));
  };

  componentDidUpdate(prevProps) {
    const { deleteJerseyResult } = this.props;
    if (
      deleteJerseyResult &&
      prevProps.deleteJerseyResult !== deleteJerseyResult
    ) {
      Swal.fire("Success", deleteJerseyResult, "success");
      this.props.dispatch(getListJersey());
    }
  }

  render() {
    const { getListJerseyLoading, getListJerseyResult, getListJerseyError } =
      this.props;
    console.log(getListJerseyResult);
    return (
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle>
                  <h4>Master Jersey</h4>
                </CardTitle>
                <Link
                  to="/admin/jersey/tambah"
                  className="btn btn-primary float-right"
                >
                  Tambah Jersey
                </Link>
              </CardHeader>
              <CardBody>
                <Table>
                  <thead className="text-primary">
                    <tr>
                      <th>Foto</th>
                      <th>Nama Jersey</th>
                      <th>Harga</th>
                      <th>Berat</th>
                      <th>Jenis</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getListJerseyResult ? (
                      Object.keys(getListJerseyResult).map((key) => {
                        return (
                          <tr key={key}>
                            <td>
                              <img
                                className="LogoLiga"
                                src={getListJerseyResult[key].gambar[0]}
                                alt={getListJerseyResult[key].nama}
                              ></img>
                            </td>
                            <td>{getListJerseyResult[key].nama}</td>
                            <td>Rp. {getListJerseyResult[key].harga}</td>
                            <td>{getListJerseyResult[key].berat} kg</td>
                            <td>{getListJerseyResult[key].jenis}</td>
                            <td>
                              <Link
                                className="btn btn-warning"
                                to={"/admin/jersey/edit/" + key}
                              >
                                <i className="nc-icon nc-ruler-pencil"></i> Edit
                              </Link>
                              <Button
                                color="danger"
                                className="ml-2"
                                onClick={() =>
                                  this.removeData(
                                    getListJerseyResult[key].gambar,
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
                    ) : getListJerseyLoading ? (
                      <tr>
                        <td colSpan="6" align="center">
                          <Spinner color="primary">Loading...</Spinner>
                        </td>
                      </tr>
                    ) : getListJerseyError ? (
                      <tr>
                        <td colSpan="6" align="center">
                          {getListJerseyError}
                        </td>
                      </tr>
                    ) : (
                      <tr>
                        <td colSpan="6" align="center">
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
  getListJerseyLoading: state.JerseyReducer.getListJerseyLoading,
  getListJerseyResult: state.JerseyReducer.getListJerseyResult,
  getListJerseyError: state.JerseyReducer.getListJerseyError,

  deleteJerseyLoading: state.JerseyReducer.deleteJerseyLoading,
  deleteJerseyResult: state.JerseyReducer.deleteJerseyResult,
  deleteJerseyError: state.JerseyReducer.deleteJerseyError,
});

export default connect(mapStateToProps, null)(ListJersey);
