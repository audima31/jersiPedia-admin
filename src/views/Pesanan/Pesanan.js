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
import { getListPesanan } from "store/actions/PesananAction";
import Swal from "sweetalert2";
// import { numberWithCommas } from "utils";
import "../../assets/css/ListLiga.css";

class Pesanan extends Component {
  componentDidMount() {
    this.props.dispatch(getListPesanan());
  }

  render() {
    const { getListPesananLoading, getListPesananResult, getListPesananError } =
      this.props;
    console.log(getListPesananResult);
    return (
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle>
                  <h4>Master Pesanan</h4>
                </CardTitle>
              </CardHeader>
              <CardBody>
                <Table>
                  <thead className="text-primary">
                    <tr>
                      <th>Tanggal & Order ID</th>
                      <th>Pesanan</th>
                      <th>Status</th>
                      <th>Total Harga</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getListPesananResult ? (
                      Object.keys(getListPesananResult).map((key) => {
                        return (
                          <tr key={key}>
                            <td>
                              <p>{getListPesananResult[key].tanggal}</p>
                              <p>
                                <strong>
                                  ({getListPesananResult[key].order_id})
                                </strong>
                              </p>
                            </td>
                            <td>
                              {Object.keys(
                                getListPesananResult[key].pesanans
                              ).map((id) => {
                                console.log(
                                  "list : ",
                                  getListPesananResult[key].pesanans[id].product
                                );
                                return (
                                  <Row key={key}>
                                    <Col md={2}>
                                      <img
                                        src={
                                          getListPesananResult[key].pesanans[id]
                                            .product.gambar[0]
                                        }
                                      />
                                    </Col>

                                    <Col md={5}>
                                      <p>
                                        {
                                          getListPesananResult[key].pesanans[id]
                                            .product.nama
                                        }
                                      </p>
                                      <p>
                                        Rp.
                                        {/* {numberWithCommas(
                                          getListPesananResult[key].pesanans[id]
                                            .product.harga
                                        )} */}
                                        {
                                          getListPesananResult[key].pesanans[id]
                                            .product.harga
                                        }
                                      </p>
                                    </Col>

                                    <Col md={5}>
                                      <p>
                                        Pesan :
                                        {
                                          getListPesananResult[key].pesanans[id]
                                            .jumlahPesanan
                                        }
                                      </p>
                                      <p>
                                        Total Harga : RP.
                                        {/* {numberWithCommas(
                                          getListPesananResult[key].pesanans[id]
                                            .totalHarga
                                        )} */}
                                        {
                                          getListPesananResult[key].pesanans[id]
                                            .totalHarga
                                        }
                                      </p>
                                    </Col>
                                  </Row>
                                );
                              })}
                            </td>
                            <td>{getListPesananResult[key].status}</td>
                            <td align="right">
                              <p>
                                Total Harga : Rp.{" "}
                                {/* {numberWithCommas(
                                  getListPesananResult[key].totalHarga
                                )} */}
                                {getListPesananResult[key].totalHarga}
                              </p>

                              {/* <p>
                                {" "}
                                Total Ongkir : Rp.{" "}
                                {numberWithCommas(
                                  getListPesananResult[key].ongkir
                                )}
                              </p> */}

                              {/* <p>
                                <strong>
                                  Total : Rp.{" "}
                                  {numberWithCommas(
                                    getListPesananResult[key].totalHarga +
                                      getListPesananResult[key].ongkir
                                  )}
                                </strong>
                              </p> */}
                            </td>

                            <td>
                              <a
                                href={getListPesananResult[key].url}
                                className="btn btn-primary"
                                target="_blank"
                              >
                                <i className="nc-icon nc-money-icons">
                                  Midtrans
                                </i>
                              </a>
                            </td>
                          </tr>
                        );
                      })
                    ) : getListPesananLoading ? (
                      <tr>
                        <td colSpan="6" align="center">
                          <Spinner color="primary">Loading...</Spinner>
                        </td>
                      </tr>
                    ) : getListPesananError ? (
                      <tr>
                        <td colSpan="6" align="center">
                          {getListPesananError}
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
  getListPesananLoading: state.PesananReducer.getListPesananLoading,
  getListPesananResult: state.PesananReducer.getListPesananResult,
  getListPesananError: state.PesananReducer.getListPesananError,
});

export default connect(mapStateToProps, null)(Pesanan);
