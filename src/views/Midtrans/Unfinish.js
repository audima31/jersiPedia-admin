import React, { Component } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import logo from "../../assets/img/logoUtama.svg";

export default class Unfinish extends Component {
  render() {
    let search = window.location.search;
    let params = new URLSearchParams(search);

    const order_id = params.get("order_id");
    const transaction_status = params.get("transaction_status");

    return (
      <Row className="justify-content-center mt-5">
        <Col md="4" className="mt-5">
          <img src={logo} className="rounded mx-auto d-block" />
          <Card>
            <CardHeader tag={"h4"} align="center">
              <p>
                Maaf pembayaran anda belum selesai, Silahkan selesaikan
                dihalaman history
              </p>
              <CardBody className="text-center">
                <p>ORDER ID : {order_id}</p>
                <p>STATUS TRANSAKSI : {transaction_status}</p>

                <Button color="primary" type="submit">
                  Lanjutkan
                </Button>
              </CardBody>
            </CardHeader>
          </Card>
        </Col>
      </Row>
    );
  }
}
