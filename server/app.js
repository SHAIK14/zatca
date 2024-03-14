const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const port = 3000;

app.use(express.json());

app.post("/generateCSR", (req, res) => {
  const formDetails = req.body;

  const configContent = `
[ req ]
default_bits = 2048
prompt = no
default_md = sha256
req_extensions = req_ext
distinguished_name = dn

[ dn ]
C = ${formDetails.country}
OU = ${formDetails.organizationalUnit}
O = ${formDetails.organization}
CN = ${formDetails.commonName}

[ req_ext ]
subjectAltName = @alt_names

[ alt_names ]
1.3.6.1.4.1.311.20.2 = ASN1:UTF8String:${formDetails.serial}
UID = ${formDetails.UID_VAT}
title = ${formDetails.title}
registeredAddress = ${formDetails.registeredAddress}
businessCategory = ${formDetails.businessCategory}

[ v3_req ]
basicConstraints = CA:FALSE
keyUsage = digitalSignature, nonRepudiation, keyEncipherment

[ req_ext ]
certificateTemplateName = ASN1:PRINTABLESTRING:${formDetails.CN}
subjectAltName = dirName:alt_names
`;

  const certificatesFolderPath = path.join(__dirname, "../certificates");
  const configFilePath = path.join(certificatesFolderPath, "config.cnf");

  if (!fs.existsSync(certificatesFolderPath)) {
    fs.mkdirSync(certificatesFolderPath);
  }

  fs.writeFileSync(configFilePath, configContent);

  res.send("Form submitted successfully!");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
