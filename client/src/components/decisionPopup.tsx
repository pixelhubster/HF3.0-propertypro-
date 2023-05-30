import React, { Children } from 'react'

const Decisionpopup = (props) => {
  return (
    <div className="h-[90%] w-10/12 overflow-y-aut0 flex flex-col">
        {props.children}
    </div>
  );
}

export default Decisionpopup