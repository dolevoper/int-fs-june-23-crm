type Ticket = {
  ticketID: string;
  customerInfo: {
    Name: string;
    id: string;
  };
  createdAt: string;
  description: string;
  assignedUser: string;
  status: "New" | "in progress" | "Closed";
};

export function SupportTicket( ){
  return
  <>
  </>
}

//create backend for ticket
// create table in db for that
