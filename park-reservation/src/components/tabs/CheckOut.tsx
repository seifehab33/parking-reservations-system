"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle } from "lucide-react";
import { handlePrint } from "@/lib/print";
import { useCheckOutTicket } from "@/hooks/useCheckoutTicket";

const GateCheckOut = () => {
  const { mutate: doCheckOut, data, isPending } = useCheckOutTicket();
  const [ticketId, setTicketId] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const printRef = useRef<HTMLDivElement | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketId) return;
    doCheckOut(
      { ticketId },
      {
        onSuccess: () => setConfirmed(true),
      }
    );
  };

  const handleNewCheckout = () => {
    setTicketId("");
    setConfirmed(false);
  };

  return (
    <div className="max-w-lg mx-auto p-8 bg-white rounded-2xl shadow-md border border-gray-200">
      {!confirmed ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <h2 className="text-2xl font-bold mb-4">Gate Check-Out</h2>
          <p className="text-gray-600">Enter your Ticket ID to check out:</p>

          <input
            type="text"
            value={ticketId}
            onChange={(e) => setTicketId(e.target.value)}
            placeholder="Ticket ID"
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />

          <Button
            type="submit"
            disabled={!ticketId || isPending}
            className="w-full"
          >
            {isPending ? "Processing..." : "Check Out"}
          </Button>
        </form>
      ) : (
        <div className="text-center">
          <CheckCircle className="mx-auto mb-4 h-14 w-14 text-indigo-600" />
          <h2 className="text-xl font-bold text-indigo-700 mb-2">
            Successfully Checked Out
          </h2>

          <div className="space-y-2 text-left" ref={printRef}>
            <div>
              <Badge variant="secondary">Ticket: {data?.ticketId}</Badge>
            </div>
            <div>
              <Badge variant="secondary">
                Duration: {data?.durationHours} hrs
              </Badge>
            </div>
            <div>
              <Badge variant="secondary">Total: ${data?.amount}</Badge>
            </div>
          </div>

          <div className="mt-6">
            <Button
              onClick={() => handlePrint(printRef)}
              className="w-full mb-2"
            >
              🖨 Print Receipt
            </Button>
            <Button onClick={handleNewCheckout} className="w-full">
              New Check-Out
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GateCheckOut;
