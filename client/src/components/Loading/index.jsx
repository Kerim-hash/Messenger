import React from "react";
import classNames from "classnames";

const Loading = ({item}) => {
  return (
    <div className={classNames("loading-wrapper", {"loading-inner": item})}>
      <img
        className="loading"
        src="https://img.pikbest.com/png-images/20190918/cartoon-snail-loading-loading-gif-animation_2734139.png!bw340"
        alt="loading"
      />
     </div>
  );
};

export default Loading;