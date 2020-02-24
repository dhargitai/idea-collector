import React from "react";
export function onRenderBody(
  { setHeadComponents }
) {
  setHeadComponents([
    <script defer src="https://use.fontawesome.com/releases/v5.3.1/js/all.js"></script>,
  ]);
}