import { useState } from "react";
import axios from "axios";

const FormComponent = () => {
  const [formData, setFormData] = useState({
    country: "",
    organization: "",
    organizationalUnit: "",
    commonName: "",
    registeredAddress: "",
    serial: "",
    businessCategory: "",
    UID_VAT: "",
    title: "",
    emailAddress: "",
    telNumber: "",
    developerType: "",
    otp: "",
    CN: "",
    complianceCSIDAPIURL: "",
    complianceInvoicesAPIURL: "",
    ProductionCSIDAPIURL: "",
  });
  const developerOptions = ["core", "simulation", "test-developer"];
  const [selectedDeveloper, setSelectedDeveloper] = useState("core");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleDeveloperChange = (e) => {
    const selectedType = e.target.value;
    setSelectedDeveloper(selectedType);

    const defaultValues = {
      "test-developer": {
        otp: "123345",
        CN: "TSTZATCA-Code-Signing",
        complianceCSIDAPIURL:
          "https://gw-fatoora.zatca.gov.sa/e-invoicing/developer-portal/compliance",
        complianceInvoicesAPIURL:
          "https://gw-fatoora.zatca.gov.sa/e-invoicing/developer-portal/compliance/invoices",
        ProductionCSIDAPIURL:
          "https://gw-fatoora.zatca.gov.sa/e-invoicing/developer-portal/production/csids",
      },
      core: {
        otp: "",
        CN: "ZATCA-Code-Signing",
        complianceCSIDAPIURL:
          "https://gw-fatoora.zatca.gov.sa/e-invoicing/core/compliance",
        complianceInvoicesAPIURL:
          "https://gw-fatoora.zatca.gov.sa/e-invoicing/core/compliance/invoices",
        ProductionCSIDAPIURL:
          "https://gw-fatoora.zatca.gov.sa/e-invoicing/core/production/csids",
      },
      simulation: {
        otp: "",
        CN: "PREZATCA-Code-Signing",
        complianceCSIDAPIURL:
          "https://gw-fatoora.zatca.gov.sa/e-invoicing/simulation/compliance",
        complianceInvoicesAPIURL:
          "https://gw-fatoora.zatca.gov.sa/e-invoicing/simulation/compliance/invoices",
        ProductionCSIDAPIURL:
          "https://gw-fatoora.zatca.gov.sa/e-invoicing/simulation/production/csids",
      },
    };

    setFormData({
      ...formData,
      ...defaultValues[selectedType],
      developerType: selectedType,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);

    try {
      const response = await axios.post(
        "http://localhost:3000/generateCSR",
        formData
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="">
      <div className="max-w-2xl mx-auto mt-8 p-4 bg-white rounded shadow-md grid grid-cols-2 gap-10">
        <div className="mb-4">
          <label htmlFor="country">Country:</label>
          <input
            type="text"
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
            className="w-full border rounded p-2"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="organization">Organization:</label>
          <input
            type="text"
            id="organization"
            name="organization"
            value={formData.organization}
            onChange={handleChange}
            required
            className="w-full border rounded p-2"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="organizationalUnit">Organizational Unit:</label>
          <input
            type="text"
            id="organizationalUnit"
            name="organizationalUnit"
            value={formData.organizationalUnit}
            onChange={handleChange}
            required
            className="w-full border rounded p-2"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="commonName">Common Name:</label>
          <input
            type="text"
            id="commonName"
            name="commonName"
            value={formData.commonName}
            onChange={handleChange}
            required
            className="w-full border rounded p-2"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="registeredAddress">Registered Address:</label>
          <input
            type="text"
            id="registeredAddress"
            name="registeredAddress"
            value={formData.registeredAddress}
            onChange={handleChange}
            required
            className="w-full border rounded p-2"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="serial">Serial:</label>
          <input
            type="text"
            id="serial"
            name="serial"
            value={formData.serial}
            onChange={handleChange}
            required
            className="w-full border rounded p-2"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="businessCategory">Business Category:</label>
          <input
            type="text"
            id="businessCategory"
            name="businessCategory"
            value={formData.businessCategory}
            onChange={handleChange}
            required
            className="w-full border rounded p-2"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="UID_VAT">UID_VAT:</label>
          <input
            type="text"
            id="UID_VAT"
            name="UID_VAT"
            value={formData.UID_VAT}
            onChange={handleChange}
            required
            className="w-full border rounded p-2"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="title">Title:</label>
          <select
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full border rounded p-2"
          >
            <option value="" disabled>
              Select Title
            </option>
            <option value="1100">1100</option>
            <option value="1000">1000</option>
            <option value="0100">0100</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="emailAddress">Email Address:</label>
          <input
            type="email"
            id="emailAddress"
            name="emailAddress"
            value={formData.emailAddress}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="telNumber">Telephone Number:</label>
          <input
            type="tel"
            id="telNumber"
            name="telNumber"
            value={formData.telNumber}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>
      </div>
      <div className="max-w-2xl mx-auto mt-8 p-4 bg-white rounded shadow-md grid grid-cols-2 gap-10">
        <div className="mb-4 col-span-2">
          <label htmlFor="developerType">Developer Type:</label>
          <select
            id="developerType"
            name="developerType"
            value={selectedDeveloper}
            onChange={handleDeveloperChange}
            className="w-full border rounded p-2"
          >
            {developerOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="otp">OTP:</label>
          <input
            type="text"
            id="otp"
            name="otp"
            value={formData.otp}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="CN">CN:</label>
          <input
            type="text"
            id="CN"
            name="CN"
            value={formData.CN}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="complianceCSIDAPIURL">Compliance CSID API URL:</label>
          <input
            type="text"
            id="complianceCSIDAPIURL"
            name="complianceCSIDAPIURL"
            value={formData.complianceCSIDAPIURL}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="complianceInvoicesAPIURL">
            Compliance Invoices API URL:
          </label>
          <input
            type="text"
            id="complianceCSIDAPIURL"
            name="complianceCSIDAPIURL"
            value={formData.complianceInvoicesAPIURL}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="ProductionCSIDAPIURL">Production CSID API URL:</label>
          <input
            type="text"
            id="complianceCSIDAPIURL"
            name="complianceCSIDAPIURL"
            value={formData.ProductionCSIDAPIURL}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>
      </div>

      <div className="mb-4 flex flex-col items-center mt-5 p-4">
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-6 rounded border-none hover:bg-blue-700"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default FormComponent;
