import React, { Component } from "react";
import api from "../../sevices/api";
import { Link } from "react-router-dom";

class User extends Component {
  state = {
    name: "",
    imageUrl: "https://avatars0.githubusercontent.com/u/45042445?s=460&v=4",
    role: "",
    description: "",
    userId: "",
    toRegister: "",
    userNotFound: false,
  };

  async componentDidMount() {
    let { userId } = this.props.match.params;

    const userUrl = `/api/accounts/${userId}`;

    const res = await api.get(userUrl);

    if (res.status === 200) {
      const name = res.data.name;
      const role = res.data.role;
      const description = res.data.description;

      const toRegister =
        role === "estudante internacional"
          ? "/register?role=familia"
          : "/register?role=estudante";

      this.setState({ name, role, description, toRegister });
    }
    if (res.status === 204) this.setState({ userNotFound: true });
  }

  renderUser() {
    return (
      <div className="col">
        <div className="card">
          <div className="card-header">
            <div className="row align-items-center">
              <div className="col-5">
                <h5 className="float-left text-capitalize text-muted">
                  {this.state.role}
                </h5>
              </div>
              <div className="col-7">
                <div className="float-right">
                  <Link to={this.state.toRegister}>
                    <button type="button" className="btn btn-primary">
                      Entrar em contato
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-3 user-image">
                <img
                  src={this.state.imageUrl}
                  className="card-img-top rounded mx-auto mt-2 "
                />
              </div>
              <div className="col-md-9 user-info">
                <h4 className="row text-capitalize user-name">
                  {this.state.name}
                </h4>
                <div className="row align-items-center">
                  <div className={`row col-12 col-md-3`}>
                    <p className="text-muted">Descrição: </p>
                    <p>{this.state.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderUserNotFound() {
    return <h3 className="no-users">Usuário não encontrado</h3>;
  }

  render() {
    return this.state.userNotFound
      ? this.renderUserNotFound()
      : this.renderUser();
  }
}

export default User;
