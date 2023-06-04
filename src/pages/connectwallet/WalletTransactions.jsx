import React from "react";
import TimelineNav from "../../components/timelinenav/timelineNav";

function WalletTransactions() {
  return (
    <div className="page-page-wrapper">
      <TimelineNav />
      <div className="inner-pages-container">
        <span
        className="dropd-purple"
          style={{
            width: "100%",
            textAlign: "left",
            marginTop:"10px",
            marginLeft: "10px",
          }}
        >
          Transactions
        </span>
        <div className="tx-container">
            <div className="tx-item">
                <div className="tx-item-left">
                    Page Like
                    <br/>21-04-08
                </div>
                <div className="tx-item-right">10</div>
            </div>
            <hr/>
            <div className="tx-item">
                <div className="tx-item-left">
                    Page Like
                    <br/>21-04-08
                </div>
                <div className="tx-item-right">10</div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default WalletTransactions;
