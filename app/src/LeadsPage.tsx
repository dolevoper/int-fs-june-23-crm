import axios from "axios";
import "./LeadsPage.scss";
import { useState, useEffect } from "react";

const server = axios.create({
  baseURL: "http://localhost:5173",
});

interface Lead {
  id: string;
  createdAt: string;
  priority: "Low" | "Medium" | "High";
  stage:
    | "New"
    | "Acknowledged"
    | "Negotiation"
    | "Contract Sent"
    | "Customer"
    | "Closed";
  owner?: string; // Who's contacting this lead (id)
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  jobTitle: string;
  companyName: string;
  sector: string;
  employeeCount?: number;
  address?: string;
}

export function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const response = await server.get("http://localhost:3000/leads");
        setLeads(response.data);
        console.log(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchLeads();
  }, []);

  return (
    <div>
      <h1>Browse Leads</h1>
      <table className="leadsTable">
        <thead>
          <tr className="leadsTable__headers">
            <th>Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Priority</th>
            <th>Stage</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead, index) => (
            <tr key={index} className="leadsTable__leadInfo">
              <td className="leadsTable__leadInfo__name">{lead.firstName} {lead.lastName}</td>
              <td>{lead.email}</td>
              <td>{lead.phoneNumber}</td>
              <td>{lead.priority}</td>
              <td>{lead.stage}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}