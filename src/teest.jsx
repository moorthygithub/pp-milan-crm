import React, { useEffect, useRef, useState } from "react";
import Page from "../../layout/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../base/BaseUrl";
import ReactToPrint from "react-to-print";
import {
  Building2,
  Phone,
  Mail,
  Globe,
  User,
  MapPin,
  Tag,
  ShoppingBag,
  Printer,
  FileAxis3D,
  Loader2,
  Calendar,
  BarChart2,
  Briefcase,
  Shield,
  FileText,
} from "lucide-react";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
} from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";
import { Badge } from "@material-tailwind/react";

const ViewNewRegister = () => {
  const { id } = useParams();
  const printRef = useRef(null);
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState([]);

  const getTemplateData = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/panel-fetch-by-id/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data?.user) {
        setData(res.data.user);
      } else {
        throw new Error("User data is missing");
      }
    } catch (error) {
      console.error("Failed to fetch user:", error);
      toast.error("Failed to load user data");
    }
  };
  useEffect(() => {
    getTemplateData();
  }, [id]);
  if (!id) {
    return (
      <Page>
        <div>No ID provided</div>
      </Page>
    );
  }

  //   if (isLoading)
  //     return (
  //       <Page>
  //         <div className="flex justify-center items-center h-full">
  //           <Button disabled>
  //             <Loader2 className="h-4 w-4 animate-spin" />
  //             Loading Payment View
  //           </Button>
  //         </div>
  //       </Page>
  //     );

  //   if (error) {
  //     return (
  //       <Page>
  //         <Card className="w-full max-w-md mx-auto mt-10">
  //           <CardHeader>
  //             <CardTitle className="text-red-500">
  //               Error Fetching Payment View
  //             </CardTitle>
  //           </CardHeader>
  //           <CardBody>
  //             <Button onClick={() => refetch()} variant="outlined">
  //               Try Again
  //             </Button>
  //           </CardBody>
  //         </Card>
  //       </Page>
  //     );
  //   }

  return (
    <Page>
      <div className=" container mx-auto px-4 py-6">
        {/* <div className=" ">
          <ReactToPrint
            trigger={() => (
              <Button
                variant="outlined"
                size="sm"
                className=" right-10 top-10  bg-gray-500 "
              >
                <Printer className="mr-2 h-4 w-4" /> Print Directory
              </Button>
            )}
            content={() => printRef.current}
            documentTitle={`Directory-${data.name_of_firm}`}
            pageStyle={`
              @page {
                size: auto;
                margin: 2mm;
              }
              @media print {
                body {
                  border: 1px solid #000;
                  margin: 1mm;
                  padding: 1mm;
                  min-height: 100vh;
                }
                .print-hide {
                  display: none;
                }
              }
            `}
          />
        </div> */}

        <Card
          ref={printRef}
          className="w-full shadow-2xl rounded-xl print:shadow-none print:rounded-none overflow-hidden"
        >
          {/* Header Section */}
          <div className="bg-gradient-to-r from-primary to-primary/10 text-white p-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center space-x-6">
                {data.image && (
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white print:shadow-none shadow-lg">
                    <img
                      src={`https://agsrebuild.store/public/app_images/directory/${data.image}`}
                      alt={`${data.name_of_firm} Logo`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div>
                  <h1 className="text-3xl font-bold mb-2">
                    {data.name_of_firm}
                  </h1>
                  <Badge color="blue" className="text-sm">
                    {data.membership_category}
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 p-6">
            {/* Contact Information */}
            <div className="bg-secondary/10 p-5 print:rounded-none rounded-lg">
              <h2 className="text-xl font-semibold mb-4 flex items-center text-primary">
                <User className="mr-3 h-6 w-6" /> Contact Information
              </h2>
              <div className="space-y-3 grid pgrid-cols-2 print:gap-1">
                <DetailRow label="Contact Person" value={data.contact_person} />
                <DetailRow label="Office Phone" value={data.office_ph_no} />
                <DetailRow label="Cell Phone" value={data.cell_no} />
                <DetailRow label="Email" value={data.mail_id} />
                {data.fax_no && <DetailRow label="Fax" value={data.fax_no} />}
                {data.website && (
                  <DetailRow label="Website" value={data.website} />
                )}
                <div className="print:col-span-2">
                  <DetailRow label="Address" value={data.contact_address} />
                </div>
              </div>
            </div>

            {/* Business Details */}
            <div className="bg-secondary/10 p-5 print:rounded-none rounded-lg">
              <h2 className="text-xl font-semibold mb-4 flex items-center text-primary">
                <ShoppingBag className="mr-3 h-6 w-6" /> Business Details
              </h2>
              <div className="space-y-3 print:grid print:grid-cols-3 print:gap-1">
                <DetailRow
                  label="Nature of Business"
                  value={data.nature_of_business}
                />
                <DetailRow label="Manufacturers" value={data.manufacturers} />
                <DetailRow label="Brands" value={data.brands} />
              </div>
            </div>

            {/* Additional Information */}
            <div className="bg-secondary/10 p-5 print:rounded-none rounded-lg">
              <h2 className="text-xl font-semibold mb-4 flex items-center text-primary">
                <Shield className="mr-3 h-6 w-6" /> Additional Details
              </h2>
              <div className="space-y-3 print:grid print:grid-cols-3 print:gap-1">
                {!data.year_of_establishment && (
                  <DetailRow
                    label="Year of Establishment"
                    value={data.year_of_establishment}
                  />
                )}
                {!data.tin_number && (
                  <DetailRow label="TIN Number" value={data.tin_number} />
                )}
                {!data.ssi_registration_number && (
                  <DetailRow
                    label="SSI Registration"
                    value={data.ssi_registration_number}
                  />
                )}
                {!data.dgtd_number && (
                  <DetailRow label="DGTD Number" value={data.dgtd_number} />
                )}
                {!data.gst && <DetailRow label="GST" value={data.gst} />}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </Page>
  );
};

// Reusable Detail Row Component
const DetailRow = ({ icon, label, value }) => (
  <div className="flex items-start">
    {icon && <div>{icon}</div>}
    <div>
      <p className="text-xs text-gray-500">{label}</p>
      <p className="text-sm font-medium">{value || "Not Provided"}</p>
    </div>
  </div>
);

export default ViewNewRegister;
