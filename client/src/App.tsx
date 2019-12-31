import { Suspense, lazy } from "react";
import React from "react";

import { Container } from "react-bootstrap";
import { connect } from "react-redux";

import { ScaledContainer } from "./containers";

import { showPreviewSelector } from "./redux/selectors";

import styles from "./css/root.module.css";

const OrdersPreviewTable = lazy(() =>
  import("./components/OrdersPreviewTable")
);

class App extends React.Component<any, any> {
  render() {
    const { showPreview } = this.props;

    return (
      <>
        <ScaledContainer />

        {showPreview && (
          <Container className={styles.myContainer}>
            <Suspense fallback={<div>Loading...</div>}>
              <OrdersPreviewTable />
            </Suspense>
          </Container>
        )}
      </>
    );
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  // preview: state.preview
  showPreview: showPreviewSelector(state)
});

export default connect(mapStateToProps, null)(App);

// done list
// Subscribes on connect instead of send
