const axios = require("axios");
const fs = require("fs");

// const csrFilePath = "C:/Desktop/Projects/zatca/certificates/.csr";
// const csrContent = fs.readFileSync(csrFilePath, "utf8");

const apiUrl =
  "https://gw-fatoora.zatca.gov.sa/e-invoicing/developer-portal/compliance";
const otp = "123345";

axios
  .post(
    apiUrl,
    {
      csr: `LS0tLS1CRUdJTiBDRVJUSUZJQ0FURSBSRVFVRVNULS0tLS0KTUlJQnhUQ0NBV3NDQVFBd1NERUxNQWtHQTFVRUJoTUNVMEV4RXpBUkJnTlZCQXNNQ2pNd01EYzFOVFEyTVRZeApEakFNQmdOVkJBb01CVUZVVkVWQ01SUXdFZ1lEVlFRRERBdGhkR1ZsWW5SbGJHTnZiVEJXTUJBR0J5cUdTTTQ5CkFnRUdCU3VCQkFBS0EwSUFCUGViN2RaWG1PVHdzSll5U3JDZEVxSW5UTTJGbWFsYjR4cGhsN2tIZTRteHkxTWMKMWZtQmg3ZXNXcVZNVTVLYitvVnczK2htQnJFNW5Tb0gvYVVBOHk2Z2djTXdnY0FHQ1NxR1NJYjNEUUVKRGpHQgpzakNCcnpBa0Jna3JCZ0VFQVlJM0ZBSUVGeE1WVkZOVVdrRlVRMEV0UTI5a1pTMVRhV2R1YVc1bk1JR0dCZ05WCkhSRUVmekI5cEhzd2VURWxNQ01HQTFVRUJBd2NNUzFRV0U1OE1pMHhNM3d6TFRNd01EQXdNREUxTnpJeE1EQXcKTXpFZk1CMEdDZ21TSm9tVDhpeGtBUUVNRHpNd01EQXdNREUxTnpJeE1EQXdNekVOTUFzR0ExVUVEQXdFTVRBdwpNREVPTUF3R0ExVUVHZ3dGVDJ4aGVXRXhFREFPQmdOVkJBOE1CMVJsYkdWamIyMHdDZ1lJS29aSXpqMEVBd0lEClNBQXdSUUlnWWs0VnhzVHZENkRZV3hvL2RHdnVBa0c4VlJPUVJmWkFGUjI4MUhvZ1MrVUNJUUM1UnNLbVlwQjQKaHEyL1dMc2pZUGt0Vy9rdm5uUTA1cGRsa0FMQUJmZ1cwdz09Ci0tLS0tRU5EIENFUlRJRklDQVRFIFJFUVVFU1QtLS0tLQ==`,
    },
    {
      headers: {
        accept: "application/json",
        OTP: otp,
        "Accept-Version": "V2",
        "Content-Type": "application/json",
      },
      timeout: 5000,
    }
  )
  .then((response) => {
    console.log("API Response:", response.data);
  })
  .catch((error) => {
    console.error("API Request Error:", error.message);
  });
