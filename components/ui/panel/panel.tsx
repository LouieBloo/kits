import * as React from "react";

export default function Panel({children}) {
  return (
    <div className="border-solid border-2 rounded p-4" >
        {children}
    </div>
  )
}
