const express = require("express");
const bodyParser = require("body-parser");
const { promisify } = require("util");
const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");
const axios = require("axios");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

const execAsync = promisify(exec);

app.post("/generateCSR", async (req, res) => {
  try {
    const {
      country,
      organization,
      organizationalUnit,
      commonName,
      registeredAddress,
      serial,
      businessCategory,
      UID_VAT,
      title,
      emailAddress,
      telNumber,
      developerType,
      otp,
      CN,
      complianceCSIDAPIURL,
    } = req.body;

    const folderName = `csr_${Date.now()}`;
    const folderPath = path.join(__dirname, folderName);

    fs.mkdirSync(folderPath);

    const configContent = `
oid_section = OIDs
[OIDs]
certificateTemplateName = 1.3.6.1.4.1.311.20.2
[req]
default_bits = 2048
emailAddress = ${emailAddress}
req_extensions = v3_req
x509_extensions = v3_ca
prompt = no
default_md = sha256
req_extensions = req_ext
distinguished_name = dn
[dn]
C=${country}
OU=${organizationalUnit}
O=${organization}
CN=${commonName}
[v3_req]
basicConstraints = CA:FALSE
keyUsage = digitalSignature, nonRepudiation, keyEncipherment
[req_ext]
certificateTemplateName = ASN1:PRINTABLESTRING:${CN}
subjectAltName = dirName:alt_names
[alt_names]
SN=${serial}
UID=${UID_VAT}
title=${title}
registeredAddress=${registeredAddress}
businessCategory=${businessCategory}
`;

    const configFilePath = path.join(folderPath, "config.cnf");
    fs.writeFileSync(configFilePath, configContent);

    const privateKeyPath = path.join(folderPath, "ec-secp256k1-priv-key.pem");
    await execAsync(
      `openssl ecparam -name secp256k1 -genkey -noout -out ${privateKeyPath}`
    );

    const publicKeyPath = path.join(folderPath, "ec-secp256k1-pub-key.pem");
    await execAsync(
      `openssl ec -in ${privateKeyPath} -pubout > ${publicKeyPath}`
    );

    await execAsync(
      `openssl base64  -in ${publicKeyPath} -out ${path.join(
        folderPath,
        "PublicKey.bin"
      )}`
    );

    const csrPath = path.join(folderPath, "stcs1000.csr");
    await execAsync(
      `openssl req -new -sha256 -key ${privateKeyPath} -extensions v3_req -config ${configFilePath} -out ${csrPath}`
    );

    const csrContent = fs.readFileSync(csrPath, "utf-8");
    console.log("CSR Content:\n", csrContent);

    // Base64 encode the CSR
    const csrBase64 = Buffer.from(csrContent).toString("base64");

    console.log("CSR Base64 encoded:\n", csrBase64);

    const postPayload = {
      csr: csrBase64,
    };

    const postHeaders = {
      Accept: "application/json",
      OTP: otp,
      "Content-Type": "application/json",
      "Accept-Version": "V2",
    };

    console.log("Post Payload:\n", postPayload);
    console.log("Post Headers:\n", postHeaders);

    const zatcaResponse = await axios.post(complianceCSIDAPIURL, postPayload, {
      headers: postHeaders,
    });

    console.log("ZATCA API Response:\n", zatcaResponse.status);
    // console.log("ZATCA API Headers:\n", zatcaResponse.headers);
    console.log("ZATCA API Data:\n", zatcaResponse.data);

    res.status(200).json({
      success: true,
      message: "CSR generated and posted successfully.",
      folderPath,
    });
  } catch (error) {
    console.error("Error generating and posting CSR:", error.message);
    if (error.response) {
      // console.error("ZATCA API Error Data:\n", error.response.data);
      // console.error("ZATCA API Error Status:\n", error.response.status);
      // console.error("ZATCA API Error Headers:\n", error.response.headers);
    } else if (error.request) {
      // console.error("No ZATCA API response received:", error.request);
    } else {
      console.error("Error setting up ZATCA API request:", error.message);
    }
    res
      .status(500)
      .json({ success: false, message: "Error generating and posting CSR." });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
