import React, { Component } from "react";
import { connect } from "react-redux";
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
  Spinner,
} from "reactstrap";
import { loginUser } from "store/actions/AuthAction";
import Swal from "sweetalert2";
import logo from "../../assets/img/logoUtama.svg";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    if (this.state.email && this.state.password) {
      //Action Login
      this.props.dispatch(loginUser(this.state.email, this.state.password));
    } else {
      Swal.fire("Gagal Login", "Email dan password tidak terdaftar", "error");
    }
  };

  componentDidUpdate(prevProps) {
    const { loginResult } = this.props;

    if (loginResult && prevProps.loginResult !== loginResult) {
      this.props.history.push("/admin/dashboard");
    }
  }

  render() {
    const { email, password } = this.state;
    const { loginLoading } = this.props;

    return (
      <div>
        <Row className="justify-content-center mt-5">
          <Col md="4" className="mt-5">
            <img src={logo} className="rounded mx-auto d-block" />
            <Card>
              <CardHeader tag={"h4"}>
                LOGIN
                <CardBody>
                  <form onSubmit={(event) => this.handleSubmit(event)}>
                    <FormGroup>
                      <Label for="email">Email Address</Label>
                      <Input
                        type="email"
                        name="email"
                        value={email}
                        placeholder="Masukan Email"
                        onChange={(event) => this.handleChange(event)}
                      ></Input>
                    </FormGroup>

                    <FormGroup>
                      <Label for="password">Password</Label>
                      <Input
                        type="password"
                        name="password"
                        value={password}
                        placeholder="Masukan password"
                        onChange={(event) => this.handleChange(event)}
                      ></Input>
                    </FormGroup>

                    {loginLoading ? (
                      <Button color="primary" type="submit" disabled>
                        <Spinner />
                        Loading
                      </Button>
                    ) : (
                      <Button color="primary" type="submit">
                        Login
                      </Button>
                    )}
                  </form>
                </CardBody>
              </CardHeader>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loginLoading: state.AuthReducer.loginLoading,
  loginResult: state.AuthReducer.loginResult,
  loginError: state.AuthReducer.loginError,
});

export default connect(mapStateToProps, null)(Login);
