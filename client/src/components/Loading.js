import React from "react";
import { Oval } from "react-loader-spinner";

function Loading() {
  return (
    <section className="main-section">
      <section className="section-container">
        <Oval
          visible={true}
          height="48"
          width="48"
          strokeWidth="4"
          strokeWidthSecondary="4"
          secondaryColor="#c584e0"
          color="#612a91"
          ariaLabel="oval-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </section>
    </section>
  );
}

export default Loading;
