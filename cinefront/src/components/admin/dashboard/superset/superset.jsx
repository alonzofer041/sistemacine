import { useEffect, useState } from "react"
import { embedDashboard } from "@superset-ui/embedded-sdk"
import axios from "axios"
function superset() {
    // const getToken = async () => {
    //   const response = await fetch("http://127.0.0.1:5001/guest-token")
    //   const token = await response.json()
    //   return token
    // }
  
    // useEffect(() => {
    //   const embed = async () => {
    //     await embedDashboard({
    //       id: "c688722b-442b-46a7-bbed-636bc647ccab",
    //       supersetDomain: "http://20.172.33.244:8088",
    //       mountPoint: document.getElementById("dashboard"),
    //       fetchGuestToken: () => getToken(),
    //       dashboardUiConfig: {
    //         hideTitle: true,
    //         hideChartControls: true,
    //         hideTab: true,
    //       },
    //     })
    //   }
    //   if (document.getElementById("dashboard")) {
    //     embed();
    //   }
    // }, [])
    return (
            <iframe
            title="Dashboard"
            src="http://20.172.33.244:8088/login?token=1234abcd456&next=/superset/dashboard/15/?native_filters=(NATIVE_FILTER-DUftD0vQH:(__cache:(label:'6',validateStatus:!f,value:!('6')),extraFormData:(filters:!((col:idempresa,op:IN,val:!('6')))),filterState:(label:'6',validateStatus:!f,value:!('6')),id:NATIVE_FILTER-DUftD0vQH,ownState:()))"
            width="100%"
            height="800px"
            sandbox="allow-same-origin allow-scripts"
           ></iframe>
            // <div className="App mt-3">
            //     <h1>How to Embed Superset Dashboard into React</h1>
            //     <div id="dashboard" />
            // </div>
    )
}
export default superset