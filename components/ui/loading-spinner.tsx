import * as React from "react";
import { useEffect, useState } from "react";
import { PiSpinnerGapThin } from "react-icons/pi";


export default function LoadingSpinner() {

  return (
    <div className="flex items-center">
      <span>Loading</span>
      <PiSpinnerGapThin className="animate-spin w-5 h-5 ml-2" />
    </div>
  )
}