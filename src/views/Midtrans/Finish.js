/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Spinner,
} from "reactstrap";
import { updatePesanan } from "store/actions/PesananAction";
import logo from "../../assets/img/logoUtama.svg";

class Finish extends Component {
  constructor(props) {
    super(props);

    this.state = {
      order_id: "",
      transaction_status: "",
    };
  }

  componentDidMount() {
    //Mengambil paramater yang ada di website
    let search = window.location.search;
    let params = new URLSearchParams(search);

    const order_id = params.get("order_id");
    const transaction_status = params.get("transaction_status");

    if (order_id) {
      this.setState({
        order_id: order_id,
        transaction_status: transaction_status,
      });

      //Masuk ke action update status di history
      this.props.dispatch(updatePesanan(order_id, transaction_status));
    }
  }

  //Suapaya User(Mobile), setelah bayar akan diarahkan ke history pembayaran
  toHistory = () => {
    window.ReactNativeWebView.postMessage("Selesai");
  };

  render() {
    const { order_id, transaction_status } = this.state;
    const { updateStatusLoading } = this.props;

    return (
      <Row className="justify-content-center mt-5">
        {updateStatusLoading ? (
          <Spinner color="primary"></Spinner>
        ) : (
          <Col md="4" className="mt-5">
            <img src={logo} className="rounded mx-auto d-block" />
            <Card>
              <CardHeader tag={"h4"} align="center">
                Pembayaran Telah Berhasil
                <CardBody className="text-center">
                  <p>
                    {transaction_status === "pending" &&
                      "Untuk Selanjutnya Harap Selesaikan Pembayarannya jika belum bayar, dan Silahkan Update Status Pembayaran di Halaman History"}
                  </p>

                  <p>ORDER ID : {order_id}</p>
                  <p>
                    STATUS TRANSAKSI :{" "}
                    {transaction_status === "settlement" ||
                    transaction_status === "capture"
                      ? "lunas"
                      : transaction_status}
                  </p>

                  <Button
                    color="primary"
                    type="submit"
                    onClick={() => this.toHistory()}
                  >
                    Lanjutkan
                  </Button>
                </CardBody>
              </CardHeader>
            </Card>
          </Col>
        )}
      </Row>
    );
  }
}

const mapStateToProps = (state) => ({
  updateStatusLoading: state.PesananReducer.updateStatusLoading,
});

export default connect(mapStateToProps, null)(Finish);
