import React, { Component } from "react";
import { Table } from "react-bootstrap";
import { connect } from "react-redux";
import { previewPrice, postOrder } from "../../redux/actions/previewActions";

class OrdersPreviewTable extends Component {
  render() {
    const { orders } = this.props.preview;
    return (
      <Table striped bordered hover variant="dark" size="sm">
        <thead>
          <tr>
            <th>Quantity</th>
            <th>Side</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((x, i) => {
            return (
              <tr key={String(i)}>
                <td key={x * i + "a"}>{x.orderQty}</td>
                <td key={x * i + "b"}>{x.side}</td>
                <td key={x * i + "c"}>{x.price}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    );
  }
}

const mapStateToProps = state => ({
  preview: state.preview
});
export default connect(
  mapStateToProps,
  { previewPrice, postOrder }
)(OrdersPreviewTable);
